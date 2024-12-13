'use client';

import { useContext, useEffect } from "react";
import { FlagContext } from "@/app/lib/context/FlagContext";
import Home from "./Home";
import Did from "./Did";
import CreateDID from "./CreateDID";
import Activity from "./Activity";
import { useAccount } from "wagmi";
import axios from "axios";
import { useUser } from "../../lib/context/AuthContext"

export default function HomePage() {
    const { flag } = useContext(FlagContext);
    const { isConnected, address } = useAccount();
    const { setUserInfo } = useUser();

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
                    } else {
                        console.error("Failed to bind wallet:", response.data);
                    }
                } catch (error) {
                    console.error("Error binding wallet:", error);
                }
            };

            bindWallet();
        }
    }, [isConnected, address, setUserInfo]);

    return (
        <div className="w-full relative">
            {flag === 'activity' && <Activity />}

            {flag === 'task' && (
                <>
                    <Home />
                    <Did />
                    <CreateDID />
                </>
            )}
        </div>
    );
}
