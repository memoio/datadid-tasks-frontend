'use client';
import { useState } from 'react';
import Image from 'next/image';

import { useUser } from "../../lib/context/AuthContext";
import { useQuestAction } from "../../lib/context/FlagContext";
import axios from 'axios';

interface Item {
    src: string;
    alt: string;
    reward: string;
}

const items: Item[] = [
    { src: "/x.png", alt: "SBT1", reward: "+500 Points" },
    { src: "/tg.png", alt: "SBT2", reward: "+300 Points" },
    { src: "/discord.png", alt: "SBT3", reward: "+100 Points" },
    { src: "/retweet.png", alt: "SBT4", reward: "+400 Points" },
];

export default function BindingPage() {
    const { questAction } = useQuestAction();
    const [disabledIndices, setDisabledIndices] = useState(new Set());
    const { userInfo } = useUser();

    const handleClick = async (index: number) => {
        try {
            const actionId = 50 + index;
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
                // setSelectedIndex(index);
                setDisabledIndices((prev) => new Set(prev).add(index));
                console.log("hello")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-[80px] mb-[50px]">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                <div>
                    <div className="text-[34px] text-center sm:text-left font-bold bg-gradient-to-r from-[#05F292] to-[#214177] text-transparent bg-clip-text">
                        MEMO Community Quests
                    </div>
                    <div className="text-[14px] md:text-[24px] text-white bg-gradient-to-r from-[#FFFFFF] to-[#999999] text-transparent bg-clip-text">
                        The More Accounts You Bind, The More SBT You Get Daily
                    </div>
                </div>
            </div>
            <div className="mt-[55px] flex flex-wrap justify-around gap-5">
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
                        onClick={() => handleClick(index)}
                        className={`w-full sm:w-[40%] lg:w-[30%] xl:w-[20%] transform transition-transform duration-300 ${questAction.has(index) || disabledIndices.has(index)
                            ? 'bg-gradient-to-r from-[#214177] to-[#064E33] scale-105 shadow-lg'
                            : 'bg-[#0663412B] hover:scale-105'
                            } pt-[35px] pb-[25px] px-[10px] flex items-center justify-around rounded-[10px] cursor-pointer`}
                        style={{ pointerEvents: questAction.has(index) || disabledIndices.has(index) ? 'none' : 'auto' }}
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
                                className={`${questAction.has(index) || disabledIndices.has(index) ? 'bg-gray-500' : 'bg-[#05F292]'} flex justify-center items-center rounded-full px-[10px] py-[5px] mt-[5px] shadow-md transform hover:scale-110 transition-transform duration-300`}
                                onClick={(e) => {
                                    e.stopPropagation(); // 阻止事件冒泡，避免触发外层div的onClick
                                    handleClick(index);
                                }}
                                style={{ pointerEvents: questAction.has(index) || disabledIndices.has(index) ? 'none' : 'auto' }}
                            >
                                <p className={`font-bold text-[16px] text-white ${questAction.has(index) || disabledIndices.has(index) ? 'cursor-not-allowed' : ''}`}>
                                    {questAction.has(index) || disabledIndices.has(index) ? 'Claimed' : 'Claim'}
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
