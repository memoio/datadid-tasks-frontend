'use client';

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode, Suspense } from "react"; // Import ReactNode from react
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from './wagmi';
import { AuthContextProvider } from "@/app/lib/context/AuthContext";
import { DIDContextProvider } from "@/app/lib/context/DIDContext";
import { WalletContextProvider } from "./lib/context/WalletContext";
import { ActionProvider } from "@/app/lib/context/ActionContext";
import { Inter } from "next/font/google";
import GoogleAnalytics from "@/app/components/googleanalytics";

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode; // Explicitly type the 'children' prop
}

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        {/* Wrap your app in the AuthContextProvider to provide context globally */}
        <Suspense fallback={<div>Loading...</div>}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider locale="en-US">
                <AuthContextProvider>
                  <WalletContextProvider>
                    <ActionProvider>
                      <DIDContextProvider>
                        {children}
                        <GoogleAnalytics />
                      </DIDContextProvider>
                    </ActionProvider>
                  </WalletContextProvider>
                </AuthContextProvider>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </Suspense>
      </body>
    </html >
  );
}
