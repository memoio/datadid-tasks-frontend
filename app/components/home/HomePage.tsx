'use client';

import { useEffect, useState } from "react";
// import { FlagContext } from "@/app/lib/context/FlagContext";
import Home from "./Home";
import DidSection from "./DIDSection";
import AutoTurnstileModal from "../AutoTurnstileModal";


export default function HomePage() {
    const [showModal, setShowModal] = useState(false);

    // 在页面加载后显示弹窗（可根据需求调整）
    useEffect(() => {
        // 根据业务逻辑判断是否需要显示弹窗
        const shouldShowModal = true; // 这里可以添加业务逻辑

        if (shouldShowModal) {
            setShowModal(true);
        }
    }, []);

    return (
        <div className="w-full relative">
            {showModal && <AutoTurnstileModal />}
            <Home />
            <DidSection />
        </div>
    );
}
