// Docs: https://aws.amazon.com/developer/application-security-performance/articles/image-optimization
export default function cloudfrontLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
	const url = new URL(`${process.env.CLOUDFLARE_CDN_URL}/${src}`);
	url.searchParams.set('format', 'auto');
	url.searchParams.set('width', width.toString());
	url.searchParams.set('quality', (quality || 75).toString());
	return url.href;
}
