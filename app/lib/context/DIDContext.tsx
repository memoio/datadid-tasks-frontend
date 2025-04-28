"use client";

import { API_URL } from "@/app/components/config/config";
import axios from "axios";
// import { tree } from "next/dist/build/templates/app-page";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAccount } from "wagmi";


interface DIDContextType {
  isOpenDid: boolean;
  setToggleDid: () => void;
  isCreatingDidState: boolean;
  setIsCreatingDid: () => void;
  isCreatedState: boolean;
  setIsCreatedDid: () => void;
  didInfo: {
    did: string;
    number: string;
  };

  isDIDExistState: boolean;
  setIsDIDExist: (arg0: boolean) => void;
  isDIDInfoState: boolean;
}

// Create the context
const DIDContext = createContext<DIDContextType | undefined>(undefined);

interface DIDContextProviderProps {
  children: ReactNode;
}

// Create the provider component
export const DIDContextProvider = ({ children }: DIDContextProviderProps) => {
  const [isOpenDid, setIsOpenDid] = useState(false);
  const [isCreatingDidState, setIsCreatingDidState] = useState(false);
  const [isCreatedState, setIsCreatedState] = useState(false);
  const [didInfo, setDIDInfo] = useState({
    did: "-",
    number: "-",
  });
  const { isConnected, address } = useAccount();
  const [isDIDExistState, setIsDIDExistState] = useState(false);
  const [isDIDInfoState, setIsDIDInfoState] = useState(false);
  const setToggleDid = () => {
    setIsOpenDid((prev) => !prev);
  };


  const setIsCreatingDid = () => {
    setIsCreatingDidState(true);
  };

  const setIsCreatedDid = () => {
    setIsCreatedState(true);
  };

  useEffect(() => {
    console.log("didstate", isDIDExistState)
    if (isConnected && address) {
      const getDIDInfo = async () => {

        const response = await axios.get(
          API_URL.BACKEND_DID_INFO,
          {
            params: {
              address,
            },
          }
        );

        if (response.data.result === 1) {
          if (response.data.data.exist === 1) {
            setDIDInfo({
              did: response.data.data.did,
              number: response.data.data.number.toString().padStart(6, '0'),
            })
            console.log("did info", response.data.data)
            setIsDIDExistState(true)
          } else {
            setIsDIDExistState(false)
          }
        } else {
          alert(response.data.error)
        }
      };

      getDIDInfo();
    }
  }, [isConnected])


  const setDIDInfoExist = (flag: boolean) => {
    setIsDIDInfoState(flag)
  }

  const setIsDIDExist = (flag: boolean) => {
    setIsDIDExistState(flag)
  }

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
        isDIDExistState,
        setIsDIDExist,
        isDIDInfoState
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