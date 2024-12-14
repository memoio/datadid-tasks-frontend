'use client';

import { createContext, useState } from "react";

export const FlagContext = createContext();

export function FlagProvider({ children }) {
    const [flag, setFlag] = useState("task"); // Default flag value

    return (
        <FlagContext.Provider value={{ flag, setFlag }}>
            {children}
        </FlagContext.Provider>
    );
}
