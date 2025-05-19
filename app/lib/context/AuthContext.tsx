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


// Create the provider component
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { isConnected, address, isDisconnected } = useAccount();
  const [isExist, setIsExist] = useState(false);
  const searchParams = useSearchParams()

  const source = searchParams.get('source')?.toString() || 'airdrop';
  const channel = searchParams.get('channel')?.toString() || '';
  const activity = searchParams.get('activity')?.toString() || '';

  const bindChannel = async () => {
    if (address && channel !== "") {
      try {
        const response = await axios.post(
          API_URL.BACKEND_ACTIVITY_BIND_CHANNEL,
          {
            address: address,
            channel: channel,
          },
        );
      } catch (error) {
        alert(`Error binding channel: ${error}`);
      }
    }
  }

  const bindActivity = async () => {
    if (address && activity !== "") {
      try {
        const response = await axios.post(
          API_URL.BACKEND_ACTIVITY_BIND_ACTIVITY,
          {
            address: address,
            activity: activity,
          },
        );
      } catch (error) {
        alert(`Error binding activity: ${error}`);
      }
    }
  }


  const setBindWallet = () => {
    if (address && !isExist) {
      const bindWallet = async () => {
        try {

          const response = await axios.post(
            API_URL.BACKEND_AIRDROP_BIND,
            {
              address: address,
              source: source,
              useragent: navigator.userAgent,
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
      bindActivity()
      bindChannel() 
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
