import Head from "next/head";
import "./globals.css";
import { MyThemeProvider } from "@/components/ui/MyComponents/ThemeProvider";

export const metadata = {
	title: "UniVerse",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<body>
				<MyThemeProvider attribute="class" defaultTheme="system">
					{children}
				</MyThemeProvider>
			</body>
		</html>
	);
}
