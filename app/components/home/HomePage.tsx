'use client';

import { useEffect } from "react";
// import { FlagContext } from "@/app/lib/context/FlagContext";
import Home from "./Home";
import DidSection from "./DIDSection";


export default function HomePage() {
    return (
        <div className="w-full relative">
            <Home />
            <DidSection />
        </div>
    );
}
