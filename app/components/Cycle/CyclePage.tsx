'use client';

import React, { useState, useEffect } from 'react';
import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useAuth } from "@/app/lib/context/AuthContext";
import { useAction } from "@/app/lib/context/ActionContext";
import axios from 'axios';
import { useAccount } from "wagmi";
import { useDIDInfo } from '@/app/lib/context/DIDContext';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { API_URL } from '../config/config';
import { disconnect } from 'process';

export const cards = [
    { id: 1, imgSrc: "/Cycle1.png", participants: 800, name: "Metis", aliases: "metis", short: "Superfluid Self-Sustainable Blockchain.", text: "Metis is a permissionless Layer 2 network powering the next generation of decentralized applications." },
    { id: 2, imgSrc: "/Cycle2.png", participants: 800, name: "Arkreen", aliases: "arkreen", short: "Net Zero DeEnergy Data Network.", text: "Arkreen Network is a Web3-based infrastructure for globally distributed renewable energy resources that enables the connection and monetization of carbon reduction applications." },
    { id: 3, imgSrc: "/Cycle3.png", participants: 800, name: "zCloak", aliases: "zcloak-network", short: "DID and ZKP Infrastructure for Web3.", text: "zCloak Network leads the Web3 revolution, focusing on trust and privacy in the AI age. Their solutions, using technologies like Zero-Knowledge Proof and Decentralized Identity, protect personal data and secure transactions. " },
    { id: 4, imgSrc: "/Cycle4.png", participants: 800, name: "Adot", aliases: "adot", short: "Web3 search engine in the age of AI.", text: "Adot is a decentralized AI Internet search network. It not only provides users with a more convenient and intelligent Web3 content search experience, but also helps developers quickly build their own personalized search functions." },
    { id: 5, imgSrc: "/Cycle5.png", participants: 800, name: "Infinitar", aliases: "infinitar", short: "Web3's Next Generation of MOBA and eSports Games.", text: "Infinitar is a Web3 MOBA game that supports multiple arena modes, including 421 levels of individual ranked, 3v3, and 5v5 battles to satisfy different players' preferences." },
    { id: 6, imgSrc: "/Cycle6.png", participants: 800, name: "Odyssey", aliases: "odyssey", short: "Revolutionizing Travel with Web 3.0 and Blockchain.", text: "Odyssey is an open-source, decentralized meta-universe stack where each user owns their own meta-universe, can modify it to their liking, and can implement their own business model, completely independent of the platform itself." },
    { id: 7, imgSrc: "/Cycle7.png", participants: 800, name: "Ultiland", aliases: "ultiland", short: "RWA Asset Issuance and servicing stack.", text: "Ultiland focuses on real-world asset (RWA) issuance and lending protocols, addressing market pain points in RWA and digital art." },
    { id: 8, imgSrc: "/Cycle8.png", participants: 800, name: "Do Network", aliases: "do-network", short: "High Performance Decentralized Network.", text: "Do Network is a decentralized network with ultra-high performance.It has achieved a scalable DPOS consensus agreement through a number of technological innovations." },
    { id: 9, imgSrc: "/Cycle9.png", participants: 800, name: "FLock.io", aliases: "flock-io", short: "World’s 1st Decentralised AI Training Platform.", text: "FLock.io is a revolutionary end-to-end AI co-creation platform that redefines the process of training, fine-tuning, and inference of AI models by integrating decentralized machine learning technologies in the chain." },
    { id: 10, imgSrc: "/Cycle10.png", participants: 800, name: ".bit", aliases: "bit", short: "Decentralized identity protocol.", text: "The d.id is building protocols for proof of humanity and achievement network, connecting every human. Own your ID and achievement through  blockchain-powered protocol network, and be ready for the next societal breakthrough." },
    { id: 11, imgSrc: "/Cycle11.png", participants: 800, name: "Meter", aliases: "meter", short: "Web3 infrastructure for a fast, fair and stable economy.", text: "High Performance Blockchain Infrastructure catalyzing borderless economy w disruptive innovations in DeFi, Interoperability, Scalability, Freedom of Money" },
    { id: 12, imgSrc: "/Cycle12.png", participants: 800, name: "Flap", aliases: "flap", short: "The first memecoin launchpad on BNB.", text: "Flap is a token fair launch and trading platform that allows anyone to issue an instantly tradable token for less than $1 in less than 30 seconds, without having to provide liquidity." },
    { id: 13, imgSrc: "/Cycle13.png", participants: 800, name: "CCarbon", aliases: "ccarbon", short: "Global carbon asset trading solution.", text: "ccarbon is committed to solving the problem of non-circulation of global carbon assets and promoting smoother and more efficient transactions of carbon assets around the world." },
    { id: 14, imgSrc: "/Cycle14.png", participants: 800, name: "Only Layer", aliases: "only-layer", short: "Next-Gen Consumer Blockchain Built for everyone. ", text: "OnlyLayer is a Layer 2 extension framework focused on real-time scalability and EVM compatibility, powered by zkproofs. OnlyLayer is unlocking new possibilities for decentralized applications with ZK proofs and OP stacks." },
    { id: 15, imgSrc: "/Cycle15.png", participants: 800, name: "Cluster Protocol", aliases: "cluster-protocol", short: "Permissionless Co-ordination Layer for AI Agents.", text: "Cluster Protocol is a computational validation protocol and open source community for decentralized AI models. Through the clever integration of Fully Homomorphic Encryption (FHE), Cluster ensures a paradigm shift by facilitating secure and consistent incentives for GPU providers to empower individuals and SMEs worldwide." },
    { id: 16, imgSrc: "/Cycle16.png", participants: 800, name: "Harmony", aliases: "harmony", short: "Open blockchain with data sharding and fast termination.", text: "Harmony is an open-source public chain for building decentralized applications (DAPPs) that uses a technique known as stateful sharding, which divides a chain into multiple segments that process transactions and store data in parallel to support fast transactions." },
    { id: 17, imgSrc: "/Cycle17.png", participants: 800, name: "4everland", aliases: "4everland", short: "A web3 cloud computing platform dedicated to DePIN. ", text: "4EVERLAND is a Web 3.0 cloud computing platform that combines storage, computing, and networking core capabilities to provide cross-chain communication, decentralized front-end, write-once, run-any-blockchain solutions, and web services." },
    { id: 18, imgSrc: "/Cycle18.png", participants: 800, name: "IO", aliases: "io", short: "An advanced distributed computing network.", text: "io.net is an advanced distributed computing network that provides access to unlimited computing power for machine learning engineers by offering GPU computing services that are cheaper, faster, and more flexible than traditional centralized services." },
    { id: 19, imgSrc: "/Cycle19.png", participants: 800, name: "Sugre", aliases: "sugre", short: "A decentralized mobile infrastructure network.", text: "Sugre Network is building a decentralized mobile infrastructure network, integrating advanced AI technology, DePIN, and the Web3 ecosystem. Through seamless integration of smartphones with decentralized networks, redefining the future of mobile technology. " },
    { id: 20, imgSrc: "/Cycle20.png", participants: 800, name: "ESCC", aliases: "escc", short: "Stablecoin chain based on EOS technology.", text: "Eos Stable Coin Chain (ESCC) is a public blockchain based on EOS and EOS EVM architecture, designed to support stablecoin scenarios." },
];

export default function CyclePage() {
    const { userInfos, joinProject, cycleAction } = useAction();
    const { isExist, userInfo, setBindWallet } = useAuth();
    const { isConnected, address } = useAccount();
    const { isDIDExistState } = useDIDInfo();
    const { openConnectModal } = useConnectModal();

    const targetDate = new Date('2025-04-07T23:59:59').getTime();

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
            const now = new Date();
            const distance = targetDate - now.getTime();
            // const distance = 60 * 24 * 60 * 60 * 1000

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


    return (
        <div className="mt-[120px]">
            {/* Header Section */}
            <div className="text-center">
                <h1 className={`${paytoneOne.className} text-transparent bg-clip-text bg-gradient-to-b from-[#214177] to-[#05F292] text-[34px] md:text-[48px] font-bold animate-fade-in`}>
                    Activity Cycle
                </h1>
                <p className="text-white text-[16px] md:text-[24px] mt-3 animate-fade-in-delay">
                    Complete Cycle To Receive Rewards
                </p>
                <p className="text-[#05F292] text-[22px] mt-5 animate-pulse">
                    This Cycle Ends In:
                </p>
                <div className="flex justify-center items-center mt-4 animate-fade-in-delay">
                    {(['Days', 'Hours', 'Minutes', 'Seconds'] as const).map((unit, i) => (
                        <div key={i} className="flex items-center">
                            <div className="flex flex-col items-center mr-[5px]">
                                <div className="w-[80px] h-[80px] bg-[#1E4874] rounded-sm flex justify-center items-center text-[28px] font-bold text-white">
                                    {countdown[unit.toLowerCase() as keyof typeof countdown]}
                                </div>
                                <p className="text-[#05F292] text-[18px] mt-2">{unit}</p>
                            </div>
                            {i !== 3 && (
                                <div className="text-[#FFC917] text-[20px] mb-[35px]">:</div>
                            )}
                        </div>
                    ))}

                </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row justify-around items-center mt-[65px] gap-5 px-6 animate-fade-in bg-[#05F2920D] rounded-[10px] py-[20px] border border-[#0079F2]">
                {[
                    { label: 'Rank', value: userInfos.PointsRank },
                    { label: 'Projects Completed', value: completed },
                    { label: 'Tasks Accomplished', value: cycleAction.length },
                    { label: 'Rewards Earned', value: userInfos.points },
                    { label: 'Friends Invited', value: userInfos.inviteCount },
                ].map((stat, i) => (
                    <div key={i}>
                        <div className="text-center">
                            <p className="text-white text-[16px] sm:text-[20px]">{stat.label}</p>
                            <p className="text-[#05F292] text-[28px] font-bold mt-2">{isConnected ? stat.value : "-"}</p>
                        </div>
                    </div>

                ))}
            </div>

            {/* Cards Section */}
            <div className="mt-[56px] flex flex-wrap gap-5 justify-between">
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
                        ? 'bg-[#0663412B] hover:scale-105'
                        : 'bg-gradient-to-br from-[#1E4874] to-[#0EB476] border-b-[5px] border-[#05F292] scale-105';

                    const buttonClasses = isJoined
                        ? 'bg-[#0079F2] text-white cursor-default'
                        : 'bg-[#0079F2] text-black hover:bg-[#05f292] cursor-pointer';

                    return (
                        <div
                            key={card.id}
                            className={`w-full mt-[10px] sm:w-[46%] lg:w-[23%] p-4 rounded-[10px] transform transition-transform duration-300 ${cardBackground}`}
                        >
                            <div className="flex justify-between items-center">
                                <Image src={card.imgSrc} width={68} height={68} alt={card.name} />
                                <div className="text-[22px] text-white">{card.name}</div>
                            </div>
                            <div className="text-white text-[16px] leading-[18px] mb-4 mt-[20px]">{card.short}</div>
                            <div>
                                {/* <p className="text-[#0079F2] text-[16px]">{card.participants} Participants</p> */}

                                <div
                                    onClick={() => (isConnected ? isDIDExistState && joinProject ? joinProject(index) : alert("Please create did first!") : openConnectModal ? openConnectModal() : alert("Can not connect to chain"))}
                                    className={`mt-3 mt-[40px] py-2 px-4 rounded-full text-[17.5px] font-bold transition-colors duration-300  cursor-pointer ${buttonClasses}`}
                                >
                                    {isJoined ? (
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="text-center text-white text-[16px]">Joined</div>
                                            <div className='text-[#038C54] w-[20px] h-[20px] rounded-full bg-white text-center'>{count}</div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-white text-[16px]">Join</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
}
