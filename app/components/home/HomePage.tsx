'use client';
import Home from "./Home";
import DidSection from "./DidSection";

export default function HomePage() {// Use the useAuth hook to get the login state

    return (
        <div className="w-full relative">
            <Home />
            <DidSection />
        </div>
    );
}
