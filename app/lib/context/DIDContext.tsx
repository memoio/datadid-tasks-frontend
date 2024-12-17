"use client";

import {
  useEffect,
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
    number: number;
  };
  setDIDInfoExist: (didInfo: {
    did: string;
    number: number;
  }) => void;
  isDIDInfoExist: boolean;
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
    number: 0,
  });
  const [isDIDInfoExist, setIsDIDInfoExist] = useState(false);

  const setToggleDid = () => {
    setIsOpenDid((prev) => !prev);
  };

  const setIsCreatingDid = () => {
    setIsCreatingDidState(true);
  };

  const setIsCreatedDid = () => {
    setIsCreatedState(true);
  };

  const setDIDInfoExist = ({ did, number }: { did: string; number: number }) => {
    setDIDInfo({
      did: did,
      number: number,
    })
    setIsDIDInfoExist(true)
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
        setDIDInfoExist,
        isDIDInfoExist,
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
