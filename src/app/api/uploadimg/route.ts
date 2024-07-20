import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import path from "path";

const AWS_S3_BUCKET_NAME = process.env.BUCKET_NAME;
const AWS_REGION = process.env.REGION;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// Create S3 service client
const s3Client = new S3Client({
  region: `${AWS_REGION}`,
  credentials: {
    accessKeyId: `${AWS_ACCESS_KEY}`,
    secretAccessKey: `${AWS_SECRET_KEY}`,
  },
});
const uploadImageFromUrl = async (imageUrl: string) => {
  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const imageBuffer = await response.arrayBuffer();

    const fileName = path.basename(new URL(imageUrl).pathname);

    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(imageBuffer),
      ACL: "public-read" as ObjectCannedACL,
    };

    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    console.log(`File uploaded successfully. ETag: ${data.ETag}`);
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
};

const uploadMultipleImagesFromUrls = async (imageUrls: string[]) => {
  for (const url of imageUrls) {
    try {
      await uploadImageFromUrl(url);
    } catch (error) {
      console.error(`Failed to upload image from URL: ${url}`, error);
    }
  }
};

// Example usage
const imagesToUpload: string[] = ["https://cdn.lunarcrush.com/arweave.png"];


const intervalid = setInterval(function () { uploadMultipleImagesFromUrls(imagesToUpload) }, 3000)
  ;

// return clearInterval(intervalid)