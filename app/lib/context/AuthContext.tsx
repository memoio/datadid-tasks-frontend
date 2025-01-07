"use client";
import { ReactNode, useEffect, createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { API_URL } from "@/app/components/config/config";

interface UserInfo {
  uid: string;
  token: string;
}

interface AuthContextType {
  isExist: boolean;
  setBindWallet: () => void;
  userInfo: UserInfo | null;
}
// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { isConnected, address } = useAccount();
  const [isExist, setIsExist] = useState(false);


  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const setBindWallet = () => {
    if (address) {
      const bindWallet = async () => {
        try {
          const response = await axios.post(
            API_URL.AIRDROP_USER_WALLET_BIND,
            {
              walletAddress: address,
            },
            {
              headers: {
                accept: "application/hal+json",
                uid: "11735283", // 根据您的实际情况传入 uid
                token: "37595d3a6e43876682b37cdcf941938e", // 根据您的实际情况传入 token
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.result === 1) {
            setUserInfo({
              uid: response.data.data.uid,
              token: response.data.data.token,
            });
          } else {
            alert(`Failed to bind wallet: ${JSON.stringify(response.data)}`);
          }
        } catch (error) {
          alert(`Error binding wallet: ${error}`);
        }
      };

      bindWallet();
      setIsExist(true);
    }
  }

  useEffect(() => {
    if (isConnected && address && !isExist) {
      setBindWallet()
    }
  }, [isConnected, address]);

  return (
    <AuthContext.Provider value={{ isExist, userInfo, setBindWallet }}>
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
