import "./globals.css";
import { AuthContextProvider } from "./lib/context/AuthContext";
import { ReactNode } from "react"; // Import ReactNode from react

interface RootLayoutProps {
  children: ReactNode; // Explicitly type the 'children' prop
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* Wrap your app in the AuthContextProvider to provide context globally */}
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
