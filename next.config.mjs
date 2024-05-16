/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["res.cloudinary.com", "placehold.co"],
		dangerouslyAllowSVG: true, // Enable SVG support
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Add a CSP for security
	},
};

export default nextConfig;
