'use client';

import React, { useState, useEffect } from 'react';
import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useUser } from "@/app/lib/context/AuthContext";
import { useAction } from "@/app/lib/context/ActionContext";
import axios from 'axios';
import { useAccount } from "wagmi";
import { useDIDInfo } from '@/app/lib/context/DIDContext';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export const cards = [
    { id: 1, imgSrc: "/Cycle1.png", participants: 800, name: "Metis", text: "Metis is a permissionless Layer 2 network powering the next generation of decentralized applications." },
    { id: 2, imgSrc: "/Cycle2.png", participants: 800, name: "Arkreen", text: "Arkreen Network is a Web3-based infrastructure for globally distributed renewable energy resources that enables the connection and monetization of carbon reduction applications." },
    { id: 3, imgSrc: "/Cycle3.png", participants: 800, name: "zCloak Network", text: "zCloak Network leads the Web3 revolution, focusing on trust and privacy in the AI age. Their solutions, using technologies like Zero-Knowledge Proof and Decentralized Identity, protect personal data and secure transactions. " },
    { id: 4, imgSrc: "/Cycle4.png", participants: 800, name: "Adot", text: "Adot is a decentralized AI Internet search network. It not only provides users with a more convenient and intelligent Web3 content search experience, but also helps developers quickly build their own personalized search functions." },
    { id: 5, imgSrc: "/Cycle5.png", participants: 800, name: "Infinitar", text: "Infinitar is a Web3 MOBA game that supports multiple arena modes, including 421 levels of individual ranked, 3v3, and 5v5 battles to satisfy different players' preferences." },
    { id: 6, imgSrc: "/Cycle6.png", participants: 800, name: "Odyssey", text: "Odyssey is an open-source, decentralized meta-universe stack where each user owns their own meta-universe, can modify it to their liking, and can implement their own business model, completely independent of the platform itself." },
    { id: 7, imgSrc: "/Cycle7.png", participants: 800, name: "Ultiland", text: "Ultiland focuses on real-world asset (RWA) issuance and lending protocols, addressing market pain points in RWA and digital art." },
    { id: 8, imgSrc: "/Cycle8.png", participants: 800, name: "Do Network", text: "Do Network is a decentralized network with ultra-high performance.It has achieved a scalable DPOS consensus agreement through a number of technological innovations." },
    { id: 9, imgSrc: "/Cycle9.png", participants: 800, name: "FLock.io", text: "FLock.io is a revolutionary end-to-end AI co-creation platform that redefines the process of training, fine-tuning, and inference of AI models by integrating decentralized machine learning technologies in the chain." },
    { id: 10, imgSrc: "/Cycle10.png", participants: 800, name: ".bit", text: "The d.id is building protocols for proof of humanity and achievement network, connecting every human. Own your ID and achievement through  blockchain-powered protocol network, and be ready for the next societal breakthrough." },
];

export default function CyclePage() {
    const { joinProject, cycleAction } = useAction();
    const [points, setPoints] = useState("")

    const { userInfo, setUserInfo } = useUser();
    const { isConnected, address } = useAccount();
    const { isDIDExistState } = useDIDInfo();
    const { openConnectModal } = useConnectModal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const targetDate = new Date(new Date().setHours(15, 0, 0, 0) + 60 * 24 * 60 * 60 * 1000).getTime();

    const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    let isJoined = false;

    const projects = new Array<number>(cards.length).fill(0);
    let completed = 0;
    cycleAction.map((t) => {
        projects[t.projectId] = projects[t.projectId] + 1;
        if (projects[t.projectId] === 3) {
            completed = completed + 1;
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            // const now = new Date();
            // const distance = targetDate - now.getTime();
            const distance = 60 * 24 * 60 * 60 * 1000

            if (distance < 0) {
                clearInterval(interval);
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setCountdown({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    useEffect(() => {
        if (isConnected && address) {
            if (!userInfo) {
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
                            alert(`Failed to bind wallet: ${JSON.stringify(response.data)}`);
                            return
                        }
                    } catch (error) {
                        alert(`Error binding wallet: ${error}`);
                        return
                    }
                };

                bindWallet();
            } else {
                const getUserPoints = async () => {

                    try {
                        const response = await axios.get('https://airdrop.7nc.top/api/user/info', {
                            headers: {
                                'accept': '*/*',
                                'uid': userInfo.uid, // 根据实际情况传入 uid
                                'token': userInfo.token, // 根据实际情况传入 token
                            },

                        });
                        setPoints(response.data.data.points)
                        console.log(response.data.data.points);
                    } catch (error) {
                        alert(error);
                        return
                    }

                };
                getUserPoints();
            }

        }
    }, [address, isConnected, setUserInfo, userInfo]);

    return (
        <div className="mt-[55px]">
            {/* Header Section */}
            <div className="text-center">
                <h1 className={`${paytoneOne.className} text-transparent bg-clip-text bg-gradient-to-b from-[#214177] to-[#05F292] text-[34px] md:text-[48px] font-bold animate-fade-in`}>
                    Activity Cycle
                </h1>
                <p className="text-white text-[16px] md:text-[24px] mt-3 animate-fade-in-delay">
                    Complete Cycle To Receive Points Rewards
                </p>
                <p className="text-[#05F292] text-[22px] mt-5 animate-pulse">
                    This Cycle Ends In:
                </p>
                <div className="flex justify-center items-center gap-3 mt-4 animate-fade-in-delay">
                    {(['Days', 'Hours', 'Minutes', 'Seconds'] as const).map((unit, i) => (
                        <div key={i} className="flex items-center">
                            <div className="flex flex-col items-center mr-[10px]">
                                <div className="w-[80px] h-[80px] bg-[#1E4874] rounded-sm flex justify-center items-center text-[28px] font-bold text-white">
                                    {countdown[unit.toLowerCase() as keyof typeof countdown]}
                                </div>
                                <p className="text-[#05F292] text-[18px] mt-2">{unit}</p>
                            </div>
                            {i !== 3 && (
                                <div className="text-[#FFC917] text-[20px]">:</div>
                            )}
                        </div>
                    ))}

                </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row justify-around items-center mt-[65px] gap-8 px-6 animate-fade-in bg-[#05F2920D] border-x-[3px] border-[#05F292] rounded-[10px] py-[20px]">
                {[
                    { label: 'Total Projects Completed', value: completed },
                    { label: 'Total Tasks Accomplished', value: cycleAction.length },
                    { label: 'Total Points Earned', value: points },
                ].map((stat, i) => (
                    <div key={i}>
                        <div className="text-center">
                            <p className="text-white text-[16px] sm:text-[20px]">{stat.label}</p>
                            <p className="text-[#05F292] text-[28px] font-bold mt-2">{stat.value}</p>
                        </div>
                    </div>

                ))}
            </div>

            {/* Cards Section */}
            <div className="mt-[56px] flex justify-around flex-wrap gap-8 animate-fade-in">
                {cards.map((card, index) => {
                    isJoined = false;
                    let count = 0;
                    cycleAction.forEach((task) => {
                        if (task.projectId == index) {
                            isJoined = true;
                            count = count + 1;
                        }
                    });

                    const cardBackground = isJoined
                        ? 'bg-gradient-to-br from-[#1E4874] to-[#0EB476] border-b-[5px] border-[#05F292] scale-105'
                        : 'bg-[#0663412B] hover:scale-105';

                    const buttonClasses = isJoined
                        ? 'bg-[#038C54] text-white cursor-default'
                        : 'bg-[#05F292] text-black hover:bg-gradient-to-b hover:from-[#05F292] hover:to-[#038C54] cursor-pointer';

                    return (
                        <div
                            key={card.id}
                            className={`w-full sm:w-[46%] lg:w-[30%] p-4 rounded-[10px] transform transition-transform duration-300 ${cardBackground}`}
                        >
                            <div className="flex justify-between items-center">
                                <Image src={card.imgSrc} width={100} height={100} alt={card.name} />
                                <div className="text-[40px] text-white">{card.name}</div>
                            </div>
                            <div className="text-white text-[15px] leading-[18px] mb-4 mt-[20px]">{card.text}</div>
                            <div>
                                <p className="text-white text-[20px] font-bold">{card.participants} Participants</p>
                                <div
                                    onClick={() => (isConnected ? isDIDExistState && joinProject ? joinProject(index) : alert("Please create did first!") : openConnectModal ? openConnectModal() : alert("Can not connect to chain"))}
                                    className={`mt-3 py-2 px-4 rounded-full text-[17.5px] font-bold transition-colors duration-300  cursor-pointer ${buttonClasses} `}
                                >
                                    {isJoined ? (
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="text-center text-white text-[22px]">Joined</div>
                                            <div className='text-[#038C54] w-[25px] h-[25px] rounded-full bg-white text-center'>{count}</div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-white text-[22px]">Join</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
