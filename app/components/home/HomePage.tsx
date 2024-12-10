'use client';

import { useContext } from "react";
import { FlagContext } from "@/app/lib/context/FlagContext";
import CarvWallet from "./CarvWallet";
import Task from "./Task";
import Activity from "./Activity";
import { useAuth } from '@/app/lib/context/AuthContext';

export default function HomePage() {
    const { flag } = useContext(FlagContext);
    const { isLoggedIn } = useAuth(); // Use the useAuth hook to get the login state

    return (
        <div className="w-full relative">
            {flag === 'activity' && <Activity />}
                {flag === 'task' && (
                    <>
                    {isLoggedIn ? (
                        <div className="absolute top-0 right-0 z-30">
                                <CarvWallet />
                        </div>
                        ) : (
                        <div></div>
                    )}
                        <Task />
                    </>
            )}
        </div>
    );
}
