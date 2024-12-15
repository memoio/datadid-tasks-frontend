'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Item {
  src: string;
  alt: string;
  reward: string;
}

const items: Item[] = [
    { src: "/x.png", alt: "SBT1", reward: "+500" },
    { src: "/tg.png", alt: "SBT2", reward: "+300" },
    { src: "/discord.png", alt: "SBT3", reward: "+100" },
    { src: "/retweet.png", alt: "SBT4", reward: "+400" },
];

export default function BindingPage() {
    const [claimedItems, setClaimedItems] = useState<boolean[]>(Array(items.length).fill(false)); // Track claimed status

    const handleClaim = (index: number) => {
        const updatedClaims = [...claimedItems];
        updatedClaims[index] = true; // Mark the clicked item as claimed
        setClaimedItems(updatedClaims);
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
                    <div
                        key={index}
                        onClick={() => handleClaim(index)}
                        className={`w-full sm:w-[40%] lg:w-[30%] xl:w-[20%] transform transition-transform duration-300 ${
                            claimedItems[index]
                                ? 'bg-gradient-to-r from-[#214177] to-[#064E33] scale-105 shadow-lg'
                                : 'bg-[#0663412B] hover:scale-105'
                        } pt-[15px] pb-[25px] px-[10px] flex flex-col items-center justify-around rounded-[10px] cursor-pointer gap-[10px]`}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={75}
                            height={75}
                            className="w-[75px] h-[75px] transform hover:rotate-3 transition-transform duration-300 mr-[5px]"
                        />
                        <div className="flex items-center justify-center gap-[12px]">
                            <div className="font-bold text-white text-[20px] leading-[30px] text-center">
                                {item.reward}
                            </div>
                        </div>
                        <div
                            className={`${
                                claimedItems[index] ? 'bg-[#038C54]' : 'bg-[#05F292]'
                            } w-[90%] rounded-full px-[10px] py-[5px] mt-[5px] shadow-md transform hover:scale-110 transition-transform duration-300`}
                        >
                            <p className="font-bold text-[16px] text-white text-center">
                                {claimedItems[index] ? 'Claimed' : 'Claim'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
