import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Providers from './providers';
import { ClerkProvider } from '@clerk/nextjs';
import Provider from './_trpc/provider';
import NavBar from '@/components/navbar';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "Noah's Next.js Starter",
	description: 'TypeScript, Next.js, Tailwind CSS, Drizzle ORM, Shadcn ui',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body className={inter.className}>
				<ClerkProvider>
					<Providers>
						<Provider>
							<NavBar />
							{children}
						</Provider>
					</Providers>
				</ClerkProvider>
			</body>
		</html>
	);
}
