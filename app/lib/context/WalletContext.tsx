'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  isInvited: boolean;
  invite: () => void;
  isShown: boolean;
  isOpened: boolean;
  toggleWallet: () => void;
  showWallet: () => void;
  walletId: string;
  chooseWallet: (id: string) => void;
  closeInvite: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider = ({ children }: WalletContextProviderProps) => {
  const [isInvited, setIsInvited] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [walletId, setWalletId] = useState("");

  const invite = () => setIsInvited(true);
  const closeInvite = () => setIsInvited(false);
  const showWallet = () => setIsShown(!isShown);
  const toggleWallet = () => { 
    setIsOpened(!isOpened);
    setIsInvited(false);
  }
  const chooseWallet = (id: string) => setWalletId(id);

  console.log(walletId);

  return (
    <WalletContext.Provider
      value={{
        isInvited,
        invite,
        closeInvite,
        isShown,
        isOpened,
        toggleWallet,
        showWallet,
        walletId,
        chooseWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook with proper typing
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error('useWallet must be used within a WalletContextProvider');
  }

  return context;
};
