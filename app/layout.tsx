import BreweryContextProvider from "@/context/BreweryContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BreweryContextProvider>{children}</BreweryContextProvider>
      </body>
    </html>
  );
}
