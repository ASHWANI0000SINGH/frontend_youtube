import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import SideNavbar from "@/components/Sidenavbar/SideNavbar";
import ThemeProvider from "./provider";
import ReactQueryProvider from "@/components/queryclient/ReactQueryClientProvider";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./Storeprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "VideoPlaying App",
	description: "Created By Ashwani Singh",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ReduxProvider>
					<ReactQueryProvider>
						<ThemeProvider>
							<Navbar />
							<Toaster position="top-center" />

							{children}
							<SideNavbar />
						</ThemeProvider>
					</ReactQueryProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
