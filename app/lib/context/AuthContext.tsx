"use client";
import { ReactNode, useEffect, createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { API_URL } from "@/app/components/config/config";
import { useSearchParams } from "next/navigation";


interface AuthContextType {
  isExist: boolean;
  setBindWallet: () => void;
}
// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const getUserIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Failed to get IP address:', error);
    return null;
  }
};

// Create the provider component
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { isConnected, address, isDisconnected } = useAccount();
  const [isExist, setIsExist] = useState(false);
  const searchParams = useSearchParams()

  const source = searchParams.get('source')?.toString() || 'airdrop';

  const setBindWallet = () => {
    if (address && !isExist) {
      const bindWallet = async () => {
        try {

          const ip = await getUserIP();
          console.log(ip)
          const response = await axios.post(
            API_URL.BACKEND_AIRDROP_BIND,
            {
              address: address,
              source: source,
              useragent: navigator.userAgent,
              ip: ip
            },
          );

          if (response.data.result === 1) {
            setIsExist(true);

          } else {
            alert(`Failed to bind wallet: ${JSON.stringify(response.data)}`);
          }
        } catch (error) {
          alert(`Error binding wallet: ${error}`);
        }
      };

      bindWallet();
    }
  }

  useEffect(() => {
    if (isConnected && address && !isExist) {
      setBindWallet()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    console.log("isDisconnected: ", isDisconnected);
    if (isDisconnected) {
      setIsExist(false);
      // setInviteCode('******');
    }

  }, [isDisconnected])
  return (
    <AuthContext.Provider value={{ isExist, setBindWallet }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useWallet must be used within a AuthContextProvider');
  }

  return context;
};
