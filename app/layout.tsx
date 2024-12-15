import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss  = false;

import "./globals.css";
import { AuthContextProvider } from "./lib/context/AuthContext";
import { WalletContextProvider } from "./lib/context/WalletContext";
import { DidContextProvider } from "./lib/context/DidContext";
import { ActivityContextProvider } from "./lib/context/ActivityContext";
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
          <WalletContextProvider>
            <DidContextProvider>
              <ActivityContextProvider>
                {children}
              </ActivityContextProvider>
            </DidContextProvider>
          </WalletContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
