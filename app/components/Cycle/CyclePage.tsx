'use client';

import { useState, useEffect } from 'react';
import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useUser } from "../../lib/context/AuthContext"
import axios from 'axios';
import { useAccount } from "wagmi";


export default function CyclePage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [points, setPoints] = useState("")

    const { userInfo, setUserInfo } = useUser();
    const { isConnected, address } = useAccount();

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
                            console.error("Failed to bind wallet:", response.data);
                        }
                    } catch (error) {
                        console.error("Error binding wallet:", error);
                    }
                };

                bindWallet();
            }
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
                    console.error(error);
                }

            };
            getUserPoints();
        }
    }, [address, isConnected, setUserInfo, userInfo]);

    const cards = [
        { id: 1, imgSrc: "/Cycle1.png", participants: 800, desc: "Metis is a permissionless Layer 2 network powering the next generation of decentralized applications." },
        { id: 2, imgSrc: "/Cycle2.png", participants: 800, desc: "Arkreen Network is a Web3-based infrastructure for globally distributed renewable energy resources that enables the connection and monetization of carbon reduction applications." },
        { id: 3, imgSrc: "/Cycle3.png", participants: 800, desc: "zCloak Network leads the Web3 revolution, focusing on trust and privacy in the AI age. Their solutions, using technologies like Zero-Knowledge Proof and Decentralized Identity, protect personal data and secure transactions. " },
        { id: 4, imgSrc: "/Cycle4.png", participants: 800, desc: "Adot is a decentralized AI Internet search network. It not only provides users with a more convenient and intelligent Web3 content search experience, but also helps developers quickly build their own personalized search functions." },
        { id: 5, imgSrc: "/Cycle5.png", participants: 800, desc: "Infinitar is a Web3 MOBA game that supports multiple arena modes, including 421 levels of individual ranked, 3v3, and 5v5 battles to satisfy different players' preferences." },
        { id: 6, imgSrc: "/Cycle6.png", participants: 800, desc: "Odyssey is an open-source, decentralized meta-universe stack where each user owns their own meta-universe, can modify it to their liking, and can implement their own business model, completely independent of the platform itself." },
        { id: 7, imgSrc: "/Cycle7.png", participants: 800, desc: "Ultiland focuses on real-world asset (RWA) issuance and lending protocols, addressing market pain points in RWA and digital art." },
        { id: 8, imgSrc: "/Cycle8.png", participants: 800, desc: "Do Network is a decentralized network with ultra-high performance.It has achieved a scalable DPOS consensus agreement through a number of technological innovations." },
        { id: 9, imgSrc: "/Cycle9.png", participants: 800, desc: "FLock.io is a revolutionary end-to-end AI co-creation platform that redefines the process of training, fine-tuning, and inference of AI models by integrating decentralized machine learning technologies in the chain." },
        { id: 10, imgSrc: "/Cycle10.png", participants: 800, desc: "The d.id is building protocols for proof of humanity and achievement network, connecting every human. Own your ID and achievement through  blockchain-powered protocol network, and be ready for the next societal breakthrough." },
    ];

    const handleClick = async (index: number) => {
        try {
            const actionId = 1012 + 10 * index;
            console.log(actionId);
            const respond = await axios.post("https://airdrop.7nc.top/api/record/add", {
                "action": actionId
            }, {
                headers: {
                    "accept": "application/hal+json",
                    "Content-Type": "application/json",
                    "uid": userInfo.uid,
                    "token": userInfo.token
                }
            });

            if (respond.status === 200) {
                setActiveIndex(index);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                    {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, i) => (
                        <div key={i} className="flex items-center">
                            <div className="flex flex-col items-center mr-[10px]">
                                <div className="w-[80px] h-[80px] bg-[#1E4874] rounded-sm flex justify-center items-center text-[28px] font-bold text-white">
                                    00
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
                    { label: 'Total Projects Completed', value: '1' },
                    { label: 'Total Tasks Accomplished', value: '4' },
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
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`w-full sm:w-[46%] lg:w-[30%] p-4 rounded-[10px] transform transition-transform duration-300 ${activeIndex === index
                            ? 'bg-gradient-to-br from-[#1E4874] to-[#0EB476] border-b-[5px] border-[#05F292] scale-105'
                            : 'bg-[#0663412B] hover:scale-105'
                            } cursor-pointer`}
                        onClick={() => handleClick(index)}
                    >
                        <div className="text-white text-[17.5px] leading-[28.5px] mb-4">
                            {/*Moso is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency.*/}
                            {card.desc}
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-white text-[20px] font-bold">
                                    {card.participants} Participants
                                </p>
                                <div
                                    className={`flex justify-center items-center gap-2 mt-3 py-2 px-4 rounded-full text-[17.5px] font-bold ${activeIndex === index
                                        ? 'bg-gradient-to-b from-[#05F292] to-[#038C54]'
                                        : 'bg-[#05F292] hover:bg-gradient-to-b hover:from-[#05F292] hover:to-[#038C54]'
                                        } transition-colors duration-300`}
                                >
                                    <p>{activeIndex === index ? 'JOINED' : 'JOIN'}</p>
                                    <Image
                                        src="/check.png"
                                        alt="check"
                                        width={18}
                                        height={18}
                                        className={`${activeIndex === index ? 'block' : 'hidden'
                                            }`}
                                    />
                                </div>
                            </div>
                            <Image
                                src={card.imgSrc}
                                width={50}
                                height={50}
                                alt="Cycle"
                                className="w-[50px] h-[50px] transition-transform duration-300 hover:rotate-6"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
