'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface DidContextType {
  isOpenDid: boolean;
  setToggleDid: () => void;
  isCreatingDidState: boolean;
  setIsCreatingDid: () => void;
  isCreatedState: boolean;
  setIsCreatedDid: () => void;
}

// Create the context with default undefined value
const DidContext = createContext<DidContextType | undefined>(undefined);

// Define the provider component props
interface DidContextProviderProps {
  children: ReactNode;
}

// Create the provider component
export const DidContextProvider = ({ children }: DidContextProviderProps) => {
  const [isOpenDid, setIsOpenDid] = useState(false);
  const [isCreatingDidState, setIsCreatingDidState] = useState(false);
  const [isCreatedState, setIsCreatedState] = useState(false);

  // Toggle the DID state
  const setToggleDid = () => {
    setIsOpenDid((prev) => !prev);
  };

  const setIsCreatingDid = () => {
    setIsCreatingDidState(true);
  }

  const setIsCreatedDid = () => {
    setIsCreatedState(true);
  }

  return (
    <DidContext.Provider value={{ isOpenDid, setToggleDid, isCreatingDidState, setIsCreatingDid, isCreatedState, setIsCreatedDid }}>
      {children}
    </DidContext.Provider>
  );
};

// Custom hook to use the DidContext
export const useDid = (): DidContextType => {
  const context = useContext(DidContext);

  // Throw an error if the hook is used outside the provider
  if (!context) {
    throw new Error('useDid must be used within a DidContextProvider');
  }

  return context;
};
