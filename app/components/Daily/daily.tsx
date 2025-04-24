'use client';
import Image from 'next/image';

import { useAuth } from "../../lib/context/AuthContext";
import { useAction } from "../../lib/context/ActionContext";
import axios from 'axios';
import { useDIDInfo } from "@/app/lib/context/DIDContext";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import React from 'react';
import { useState } from 'react';
import { API_URL } from '../config/config';

interface Item {
    src: string;
    alt: string;
    reward: string;
    title: string;
}

const items: Item[] = [
    { src: "/x.png", alt: "SBT1", reward: "+20", title: "Check In" },
    { src: "/tg.png", alt: "SBT2", reward: "+20", title: "Share to chat group" },
    { src: "/discord.png", alt: "SBT3", reward: "+20", title: "Share to friends" },
    { src: "/retweet.png", alt: "SBT4", reward: "+20", title: "Share to Twitter" },
];

export default function Daily() {
    const { address } = useAccount();
    const [loading, setLoading] = useState(false);
    const [opIndex, setOpIndex] = useState(-1);
    const { userInfos, dailyAction, setDaily, setPointUpdate } = useAction();
    const { isExist, setBindWallet } = useAuth();
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const { isDIDExistState } = useDIDInfo();

    // const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = async (index: number) => {
        setOpIndex(-1)
        try {
            if (isConnected) {
                if (!isExist) {
                    setBindWallet();
                }
                if (isDIDExistState && isExist) {
                    const currentUrl = `https://data.memolabs.org/?referralCode=${userInfos.invideCode}`;
                    const tweetText = `📈I found a platform that can own, manage and monetize your data @MemoLabsOrg!

🚀Currently all users can participate, and you can easily get points rewards by completing tasks, and you can also redeem more value!

➡️Experience now https://data.memolabs.org/?referralCode=${userInfos.invideCode}&source=tw
`
                    const tgText = `🎉 Welcome to the MEMO data ecosystem, a platform where you can own, manage and monetize your data! 💰

🌟 You can easily earn points by completing tasks within the platform, and you can also unlock exclusive tasks with multiple partners to get points!
·Create DID 📝
·Link Social Media Accounts🔗
·Daily Check-in📅
·Joint Activities🤝
·Invite friends👫

🚀 Click https://data.memolabs.org/?referralCode=${userInfos.invideCode}&source=tg to start your data value-added journey!
`
                    const urls = [
                        { url: "https://x.com/MemoLabsOrg" },
                        { url: 'https://t.me/share/url?url=' + encodeURIComponent(currentUrl) + '&text=' + encodeURIComponent(tgText) },
                        { url: 'https://discord.com/invite/YG4Ydv2E7X' },
                        { url: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText) },
                    ];
                    window.open(urls[index].url, '_blank');
                    setOpIndex(index)
                    const actionId = 70 + index;
                    console.log(actionId);
                    setLoading(true);
                    const respond = await axios.post(API_URL.BACKEND_AIRDROP_RECORD_ADD, {
                        "actionid": actionId,
                        "address": address
                    });

                    if (respond.status === 200) {
                        if (respond.data.result === 1) {
                            setDaily(index);
                            setPointUpdate(true)
                        } else {
                            alert(respond.data.error)
                        }
                    }
                } else {
                    alert("Please create did first!")
                }

            } else {
                if (openConnectModal) {
                    openConnectModal();
                }
            }
            setLoading(false);
        } catch (error) {
            alert(error);
            setLoading(false);
            return
        }
    };

    return (
        <div className="mt-[10px] mb-[50px] px-4">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                <div>
                    <h1 className="text-[24px] sm:text-[34px] font-bold text-white  text-transparent bg-clip-text text-center sm:text-left">
                        Daily Reward
                    </h1>
                    <p className="text-[14px] sm:text-[16px] md:text-[20px] text-white bg-gradient-to-r from-[#FFFFFF] to-[#999999] text-transparent bg-clip-text text-center sm:text-left">
                        Complete tasks and earn points every day
                    </p>
                </div>
            </div>

            {/* Items Section */}
            <div className="mt-[55px] flex flex-wrap justify-between gap-5">
                {items.map((item: Item, index: number) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`w-full sm:w-[48%] md:w-[30%] xl:w-[23%] transform transition-transform duration-300 ${isConnected && dailyAction.has(index)
                            ? 'bg-[#0663412B] hover:scale-105'
                            : 'bg-gradient-to-r from-[#214177] to-[#064E33] scale-105 shadow-lg'
                            } p-6 rounded-[15px] cursor-pointer`}
                        style={{ pointerEvents: isConnected && dailyAction.has(index) ? 'none' : 'auto' }}
                    >
                        {/* Item Image */}
                        <div className="flex justify-center">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                width={75}
                                height={75}
                                className="w-[75px] h-[75px] transform hover:rotate-6 transition-transform duration-300 mb-5"
                            />
                        </div>

                        {/* Item Text */}
                        <div className="text-center">
                            <h2 className="text-white text-[16px] sm:text-[16px] mb-2">{item.title}</h2>
                            <p className="text-white text-[16px]  sm:text-[16px]">{item.reward}</p>
                            <div
                                className={`${isConnected && dailyAction.has(index) ? 'bg-gray-500' : 'bg-[#0079F2]'
                                    } flex justify-center items-center rounded-full px-[10px] py-[5px] mt-[5px] shadow-md transform hover:scale-110 transition-transform duration-300`}
                                onClick={(e) => {
                                    e.stopPropagation(); // 阻止事件冒泡，避免触发外层div的onClick
                                    handleClick(index);
                                }}
                            >
                                {loading && opIndex == index &&
                                    <svg className="w-6 h-6 p-0 m-0 animate-spin text-blue-900" viewBox="0 0 50 50">
                                        <circle className="opacity-25" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <circle className="opacity-75" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.415, 31.415" strokeLinecap="round" />
                                    </svg>
                                }
                                <span className={`font-bold text-[16px] text-white ${isConnected && dailyAction.has(index) ? 'cursor-not-allowed' : ''}`}>
                                    {isConnected && dailyAction.has(index) ? 'Claimed' : 'Claim'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
