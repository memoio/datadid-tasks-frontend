'use client';
import Image from 'next/image';

import { useAuth } from "../../lib/context/AuthContext";
import { useAction } from "../../lib/context/ActionContext";
import axios from 'axios';
import { useDIDInfo } from "@/app/lib/context/DIDContext";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { API_URL } from '../config/config';
import { useState } from 'react';
interface Item {
    src: string;
    alt: string;
    reward: string;
    url: string;
}

const tweetText = "Come and participate in MEMO's points airdrop event!";
const tweetUrl = 'https://x.com/MemoLabsOrg/status/1862453981072826816';

const items: Item[] = [
    { src: "/x.png", alt: "SBT1", reward: "+50", url: 'https://x.com/MemoLabsOrg' },
    { src: "/tg.png", alt: "SBT2", reward: "+50", url: 'https://t.me/memolabsio' },
    { src: "/discord.png", alt: "SBT3", reward: "+50", url: 'https://discord.com/invite/YG4Ydv2E7X' },
    { src: "/retweet.png", alt: "SBT4", reward: "+50", url: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText) + '&url=' + encodeURIComponent(tweetUrl) },
];

export default function BindingPage() {
    const [loading, setLoading] = useState(false);
    const [opIndex, setOpIndex] = useState(-1);
    const { questAction, setQuest, setPointUpdate } = useAction();
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const { isDIDExistState } = useDIDInfo();
    const { address } = useAccount();

    const handleClick = async (index: number, url: string) => {
        setOpIndex(-1);
        try {
            if (isConnected) {
                if (isDIDExistState) {
                    window.open(url, '_blank');
                    setOpIndex(index);
                    const actionId = 50 + index;
                    console.log(actionId);
                    setLoading(true);
                    setOpIndex(index);
                    const respond = await axios.post(API_URL.BACKEND_AIRDROP_RECORD_ADD, {
                        "actionid": actionId,
                        "address": address
                    });

                    if (respond.status === 200) {
                        if (respond.data.result === 1) {
                            setQuest(index);
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
            alert(`binding page: ${error}`);
            setLoading(false);
            return
        }
    };

    return (
        <div className="mt-[80px] mb-[50px]">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                <div>
                    <div className="text-[28px] text-center sm:text-left font-bold text-white text-transparent bg-clip-text">
                        MEMO Community Quests
                    </div>
                    <div className="text-[14px] sm:text-[16px] md:text-[20px] text-white text-transparent bg-clip-text text-center sm:text-left">
                        Bind your social account & receive points rewards
                    </div>
                </div>
            </div>
            <div className="mt-[55px] flex flex-wrap justify-between gap-5">
                {items.map((item: Item, index: number) => (
                    // <div
                    //     key={index}
                    //     onClick={() => handleClick(index)}
                    //     className={`w-full sm:w-[40%] lg:w-[30%] xl:w-[20%] transform transition-transform duration-300 ${selectedIndex === index
                    //         ? 'bg-gradient-to-r from-[#214177] to-[#064E33] scale-105 shadow-lg'
                    //         : 'bg-[#0663412B] hover:scale-105'
                    //         } pt-[35px] pb-[25px] px-[10px] flex items-center justify-around rounded-[10px] cursor-pointer`}
                    // >
                    //     <Image
                    //         src={item.src}
                    //         alt={item.alt}
                    //         width={75}
                    //         height={75}
                    //         className="w-[75px] h-[75px] transform hover:rotate-3 transition-transform duration-300 mr-[5px]"
                    //     />
                    //     <div className="flex flex-col items-center justify-center">
                    //         <div className="font-bold text-white text-[20px] leading-[30px] text-center">
                    //             {item.reward}
                    //         </div>
                    //         <div
                    //             className={`${selectedIndex === index ? 'bg-gray-500' : 'bg-[#05F292]'
                    //                 } flex justify-center items-center rounded-full px-[10px] py-[5px] mt-[5px] shadow-md transform hover:scale-110 transition-transform duration-300`}
                    //         >
                    //             <p className="font-bold text-[16px] text-white">
                    //                 {selectedIndex === index ? 'Claimed' : 'Claim'}
                    //             </p>
                    //         </div>
                    //     </div>
                    // </div>

                    <div
                        key={index}
                        onClick={() => handleClick(index, item.url)}
                        className={`w-full sm:w-[40%] lg:w-[30%] xl:w-[20%] transform transition-transform duration-300 ${isConnected && questAction.has(index)
                            ? 'bg-[#0663412B] hover:scale-105'
                            : 'bg-gradient-to-r from-[#214177] to-[#064E33] scale-105 shadow-lg'
                            } pt-[35px] pb-[25px] px-[10px] flex items-center justify-around rounded-[10px] cursor-pointer`}
                        style={{ pointerEvents: isConnected && questAction.has(index) ? 'none' : 'auto' }}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={75}
                            height={75}
                            className="w-[75px] h-[75px] transform hover:rotate-3 transition-transform duration-300 mr-[5px]"
                        />
                        <div className="flex flex-col items-center justify-center">
                            <div className="font-bold text-white text-[20px] leading-[30px] text-center">
                                {item.reward}
                            </div>
                            <div
                                className={`${isConnected && questAction.has(index) ? 'bg-gray-500' : 'bg-[#0079F2]'}  flex justify-center items-center rounded-full px-[10px] py-[5px] mt-[5px] shadow-md transform hover:scale-110 transition-transform duration-300`}
                                onClick={(e) => {
                                    e.stopPropagation(); // 阻止事件冒泡，避免触发外层div的onClick
                                    handleClick(index, item.url);
                                }}
                                style={{ pointerEvents: isConnected && questAction.has(index) ? 'none' : 'auto' }}
                            >
                                {loading && opIndex == index &&
                                    <svg className="w-6 h-6 p-0 m-0 animate-spin text-blue-900" viewBox="0 0 50 50">
                                        <circle className="opacity-25" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <circle className="opacity-75" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.415, 31.415" strokeLinecap="round" />
                                    </svg>
                                }
                                <p className={`font-bold text-[16px] text-white ${isConnected && questAction.has(index) ? 'cursor-not-allowed' : ''}`}>
                                    {isConnected && questAction.has(index) ? 'Claimed' : 'Claim'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="flex justify-center items-center mt-[45px] cursor-pointer hover:scale-110 transition-transform duration-300">
                <Image
                    src="/arrow_bellow.png"
                    alt="arrow"
                    width={24}
                    height={24}
                    className="mr-[8px] animate-bounce"
                />
                <p className="text-white text-[14px] text-center">
                    Show More
                </p>
            </div> */}
        </div>
    );
}
