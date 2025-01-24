"use client";

// import { tree } from "next/dist/build/templates/app-page";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


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
  setDID: (didInfo: {
    did: string;
    number: string;
  }) => void;
  setDIDInfoExist: (arg0: boolean) => void;
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
    did: "",
    number: "000000",
  });
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

  const setDID = ({ did, number }: { did: string; number: string }) => {
    setDIDInfo({
      did: did,
      number: number,
    })
  }

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
        setDID,
        setDIDInfoExist,
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