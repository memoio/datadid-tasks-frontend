"use client";

"use client";
import {
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useAccount } from "wagmi";
import axios from "axios";

interface DIDContextType {
  isOpenDid: boolean;
  setToggleDid: () => void;
  isCreatingDidState: boolean;
  setIsCreatingDid: () => void;
  isCreatedState: boolean;
  setIsCreatedDid: () => void;
  didInfo: {
    did: string;
    number: number;
  };
  setDIDInfo: (didInfo: {
    did: string;
    number: number;
  }) => void;
}

// Create the context
const DIDContext = createContext<DIDContextType | undefined>(undefined);

interface DIDContextProviderProps {
  children: ReactNode;
}

// Create the provider component
export const DIDContextProvider = ({ children }: DIDContextProviderProps) => {
  const { isConnected, address } = useAccount();
  const [isOpenDid, setIsOpenDid] = useState(false);
  const [isCreatingDidState, setIsCreatingDidState] = useState(false);
  const [isCreatedState, setIsCreatedState] = useState(false);
  const [didInfo, setDIDInfo] = useState({
    did: "",
    number: 0,
  });

  const setToggleDid = () => {
    setIsOpenDid((prev) => !prev);
  };

  const setIsCreatingDid = () => {
    setIsCreatingDidState(true);
  };

  const setIsCreatedDid = () => {
    setIsCreatedState(true);
  };

  // Get DID Info
  useEffect(() => {
    if (isConnected && address) {
      const getDIDInfo = async () => {
        try {
          const response = await axios.get(
            "http://119.147.213.61:38082/did/info",
            {
              params: {
                address,
              },
            }
          );

          if (response.status === 200) {
            console.log("didinfo:", response.data);
            setDIDInfo({
              did: response.data.did,
              number: response.data.number,
            });
          }
        } catch (error) {
          console.error("Error binding wallet:", error);
        }
      };

      getDIDInfo();
      console.log("didinfo did", didInfo);
    }
  }, [setIsCreatedDid]);

  return (
    <DIDContext.Provider
      value={{
        isOpenDid,
        setToggleDid,
        isCreatingDidState,
        setIsCreatingDid,
        isCreatedState,
        setIsCreatedDid,
        didInfo,
        setDIDInfo,
      }}
    >
      {children}
    </DIDContext.Provider>
  );
};

export const useDIDInfo = (): DIDContextType => {
  const context = useContext(DIDContext);

  if (!context) {
    throw new Error("useDid must be used within a DidContextProvider");
  }

  return context;
};
