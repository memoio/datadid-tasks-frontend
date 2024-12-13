'use client';

import { useEffect, createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import axios from 'axios';
// import { useUser } from "./AuthContext";

export const FlagContext = createContext();

export function FlagProvider({ children }) {
    const [flag, setFlag] = useState("task"); // Default flag value

    return (
        <FlagContext.Provider value={{ flag, setFlag }}>
            {children}
        </FlagContext.Provider>
    );
}

export const DailyActionContext = createContext();
export const QuestActionContext = createContext();
export const CycleActionContext = createContext();

export const DailyActionProvider = ({ children }) => {
    const [dailyAction, setDailyAction] = useState(new Set());
    const [questAction, setQuestAction] = useState(new Set());
    const [cycleAction, setCycleAction] = useState(new Set());
    const { isConnected, address } = useAccount();

    useEffect(() => {
        if (isConnected && address) {
            // 调用绑定钱包接口
            const HandleDailyAction = async () => {
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
                        const oneTimeRespond = await axios.get("https://airdrop.7nc.top/api/record/list?page=1&size=20&type=1",
                            {
                                headers: {
                                    "uid": response.data.data.uid,
                                    "token": response.data.data.token,
                                }
                            });

                        if (oneTimeRespond.status === 200) {
                            oneTimeRespond.data.data.forEach(element => {
                                const action = element.action;
                                // console.log(action);
                                if (action >= 50 && action <= 53) {
                                    console.log(action - 50);
                                    setQuestAction((prev) => new Set(prev).add(action - 50));
                                } else {
                                    console.log((action - 1012) / 10);
                                    setCycleAction((prev) => new Set(prev).add((action - 1012) / 10))
                                }
                            });
                        }

                        const dailyRespond = await axios.get("https://airdrop.7nc.top/api/record/list?page=1&size=20&type=2",
                            {
                                headers: {
                                    "uid": response.data.data.uid,
                                    "token": response.data.data.token,
                                }
                            }
                        );

                        if (dailyRespond.status === 200) {
                            dailyRespond.data.data.forEach(element => {
                                const action = element.action - 70;
                                console.log(action);
                                const preDayTime = Date.now() - 86400000;
                                if (element.time > preDayTime) {
                                    setDailyAction((prev) => new Set(prev).add(action));
                                }
                            });
                        }
                    } else {
                        console.error("Failed to bind wallet:", response.data);
                    }
                } catch (error) {
                    console.error("Error binding wallet:", error);
                }
            };

            HandleDailyAction();
        }
    }, [isConnected, address]);
    console.log("daily: ", dailyAction);
    console.log("quest: ", questAction);
    console.log("cycle: ", cycleAction);

    return (
        <DailyActionContext.Provider value={{ dailyAction, setDailyAction }}>
            <QuestActionContext.Provider value={{ questAction, setQuestAction }}>
                <CycleActionContext.Provider value={{ cycleAction, setCycleAction }}>
                    {children}
                </CycleActionContext.Provider>
            </QuestActionContext.Provider>
        </DailyActionContext.Provider>
    );
}

export const useDailyAction = () => {
    return useContext(DailyActionContext);
};

export const useQuestAction = () => {
    return useContext(QuestActionContext);
}

export const useCycleAction = () => {
    return useContext(CycleActionContext);
}