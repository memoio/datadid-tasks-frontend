'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface WalletContextType {
    isInvited: boolean;
    invite: () => void;
    // skiped: boolean;
    // skip: () => void;
    isShown: boolean;
    // isOpened: boolean;
    // toggleWallet: () => void;
    setIsShown: (value: boolean) => void;
    closeInvite: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

interface WalletContextProviderProps {
    children: ReactNode;
}

export const WalletContextProvider = ({ children }: WalletContextProviderProps) => {
    const [isInvited, setIsInvited] = useState(false);

    // const [skiped, setSkiped] = useState(false);
    const [isShown, setIsShown] = useState(false);
    // const [isOpened, setIsOpened] = useState(false);

    const invite = () => setIsInvited(true);
    const closeInvite = () => setIsInvited(false);
    // const skip = () => setSkiped(true);



    return (
        <WalletContext.Provider
            value={{
                isInvited,
                invite,
                closeInvite,
                // skiped,
                // skip
                isShown,
                // isOpened,
                // toggleWallet,
                setIsShown,
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
