'use client';

import { useEffect } from "react";
// import { FlagContext } from "@/app/lib/context/FlagContext";
import Home from "./Home";
import DidSection from "./DIDSection";
// import Activity from "./Activity";
import { useAccount } from "wagmi";
import axios from "axios";
import { useUser } from "@/app/lib/context/AuthContext"
import { useWallet } from "@/app/lib/context/WalletContext";

export default function HomePage() {
    // const { flag } = useContext(FlagContext);
    const { isConnected, address } = useAccount();
    const { setUserInfo } = useUser();
    const { invite } = useWallet();

    useEffect(() => {
        if (isConnected && address) {
            // 调用绑定钱包接口
            const bindWallet = async () => {
                try {
                    const response = await axios.post(
                        "https://airdrop.7nc.top/api/user/wallet/bind",
                        {
                            walletAddress: address,
                        },
                        {
                            headers: {
                                accept: "application/hal+json",
                                uid: "11735283", // 根据您的实际情况传入 uid
                                token: "37595d3a6e43876682b37cdcf941938e", // 根据您的实际情况传入 token
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.data.result === 1) {
                        setUserInfo({
                            uid: response.data.data.uid,
                            token: response.data.data.token,
                        });

                        if (response.data.data.lastLoginTime == 0) {
                            invite();
                        }

                    } else {
                        console.error("Failed to bind wallet:", response.data);
                        return;
                    }
                } catch (error) {
                    console.error("Error binding wallet:", error);
                    return;
                }
            };

            bindWallet();
        }
    }, [isConnected]);

    return (
        <div className="w-full relative">
            <Home />
            <DidSection />
        </div>
    );
}
