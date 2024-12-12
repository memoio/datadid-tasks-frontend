'use client';

import { useContext } from "react";
import { FlagContext } from "@/app/lib/context/FlagContext";
import Home from "./Home";
import Did from "./Did";
import Activity from "./Activity";


export default function HomePage() {
    const { flag } = useContext(FlagContext);

    return (
        <div className="w-full relative">
            {flag === 'activity' && <Activity />}
            {flag === 'task' && (
                <>
                    <Home />
                    <Did />
                </>
            )}
        </div>
    );
}
