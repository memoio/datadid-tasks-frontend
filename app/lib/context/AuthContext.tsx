"use client";
import { ReactNode, useEffect, createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { API_URL } from "@/app/components/config/config";


interface UidInfo {
  uid: string;
  token: string;
}

interface AuthContextType {
  isExist: boolean;
  setBindWallet: () => void;
}
// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { isConnected, address, isDisconnected } = useAccount();
  const [isExist, setIsExist] = useState(false);
  const setBindWallet = () => {
    if (address && !isExist) {
      const bindWallet = async () => {
        try {
          const response = await axios.post(
            API_URL.BACKEND_AIRDROP_BIND,
            {
              address: address,
              source: "airdrop"
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
  }, [isConnected, address]);

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
