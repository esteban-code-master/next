/** @type {import('next').NextConfig} */
const nextConfig = {
	// webpack: (config, { isServer }) => {
	// 	if (!isServer) {
	// 		config.output.publicPath = './';
	// 	}
	// 	return config;
	// }
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '45.90.223.119',
				port: '3005',
				pathname: '/public/**'
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3005',
				pathname: '/public/**'
			},
			{
				protocol: 'http',
				hostname: '192.168.1.8',
				port: '3005',
				pathname: '/public/**'
			},
			{
				protocol: 'http',
				hostname: 'quicklyservices-api.com',
				pathname: '/public/**'
			}
		]
	}
};

export default nextConfig;
