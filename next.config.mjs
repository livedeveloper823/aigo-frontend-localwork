import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/server/imageloader.ts',
  },
  env: {
    TOKEN: process.env.TOKEN,
    API_BASE_URI: process.env.API_BASE_URI,
    CLOUDFLARE_CDN_URL:process.env.CLOUDFLARE_CDN_URL,
    REGION:process.env.REGION,
    AWS_ACCESS_KEY:process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
    BUCKET_NAME:process.env.BUCKET_NAME
  },
};

export default withNextIntl(nextConfig);
