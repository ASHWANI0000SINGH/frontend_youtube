import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import SideNavbar from "@/components/Sidenavbar/SideNavbar";
import ThemeProvider from "./provider";

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
				<ThemeProvider>
					<Navbar />
					{children}
					<SideNavbar />
				</ThemeProvider>
			</body>
		</html>
	);
}
