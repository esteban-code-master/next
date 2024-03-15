import type { Config } from "tailwindcss";

const config: Config = {
  	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem'	
			},
		},
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
				"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			container: {
			
			}
		},
		colors: {
			'primary': "#EE2225 !important",
			"secondary": "#FDE401",
			'blue-dark': "#4B6A7E",
			'title': "#303F4A",
			"info": "#2943E7",
			"primary-dark": "#4B0405",
			"disabled": "#7F9FB1",
			"paragraph": "#7F9FB1",
			'white': '#ffffff !important',
			'success': '#40A741',
			'text': '#303F4A'
		},		
	},
	plugins: [],
	important: true
};
export default config;
