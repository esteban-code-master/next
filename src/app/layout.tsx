import { Providers } from '@core/store/provider';
import theme from '@core/theme';
import { ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@common/presentation/components/header';
import { Toolbar } from '@common/presentation/components/toolbar';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Quickly Service',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} bg-[#F6F8F9]`}
				style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
			>
				<ThemeProvider theme={theme}>
					<Providers>
						<Header />
						<div className="flex-1">{children}</div>
						<Toolbar />
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
