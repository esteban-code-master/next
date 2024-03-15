'use client';

import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import { poppins } from './fonts';

const theme = createTheme({
	palette: {
		primary: {
			main: '#2442AF'
		},
		secondary: {
			main: '#19857b'
		},
		error: {
			main: red.A400
		}
	},
	typography: {
		fontFamily: poppins.style.fontFamily
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				h1: {
					fontSize: 24,
					margin: '15px 0',
					fontWeight: 600,
					color: '#1E1F21'
				},
				h2: {
					fontSize: 18,
					fontWeight: 'bold',
					color: '#1E1F21'
				},
				h3: {
					fontSize: '16px !important'
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					width: '100%'
				}
			}
		}
	}
});

export default theme;
