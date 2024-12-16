'use client';

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from "react"; // Import ReactNode from react
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from './wagmi';
import { AuthContextProvider } from "./lib/context/AuthContext";
import { DailyActionProvider } from "./lib/context/FlagContext";
import { WalletContextProvider } from "./lib/context/WalletContext";

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode; // Explicitly type the 'children' prop
}



export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* Wrap your app in the AuthContextProvider to provide context globally */}
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider locale="en-US">
              <AuthContextProvider>
                <DailyActionProvider>
                  <WalletContextProvider>
                    {children}
                  </WalletContextProvider>
                </DailyActionProvider>
              </AuthContextProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
