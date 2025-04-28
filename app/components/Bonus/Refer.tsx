'use client';

import Image from 'next/image';
import { paytoneOne } from '@/app/ui/fonts';
import { useAccount } from 'wagmi';
import { useAuth } from "../../lib/context/AuthContext";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from '../config/config';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAction } from '@/app/lib/context/ActionContext';
import { useDIDInfo } from "@/app/lib/context/DIDContext";

export default function Refer() {
    const { isConnected } = useAccount();

    const [loading, setLoading] = useState(false);
    const [opIndex, setOpIndex] = useState(-1);
    const { isExist, setBindWallet } = useAuth();
    const { isDIDExistState } = useDIDInfo();
    const { userInfos, dailyAction, setDaily, setPointUpdate } = useAction();

    const { openConnectModal } = useConnectModal();
    //const { userInfos } = useAction();

    const [showPopup, setShowPopup] = useState<string | null>(null); // State to manage popup visibility with a message

    const copyToClipboard = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const textToCopy = element.textContent || '';
            navigator.clipboard.writeText(textToCopy).then(() => {
                setShowPopup(`Copied: ${textToCopy}`);
                setTimeout(() => setShowPopup(null), 2000); // Hide popup after 2 seconds
            }).catch(() => {
                alert('Failed to copy.');
            });
        }
    };

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

➡️Experience now https://data.memolabs.org/?referralCode=${userInfos.invideCode}
`
                    const tgText = `🎉 Welcome to the MEMO data ecosystem, a platform where you can own, manage and monetize your data! 💰

🌟 You can easily earn points by completing tasks within the platform, and you can also unlock exclusive tasks with multiple partners to get points!
·Create DID 📝
·Link Social Media Accounts🔗
·Daily Check-in📅
·Joint Activities🤝
·Invite friends👫

🚀 Click https://data.memolabs.org/?referralCode=${userInfos.invideCode} to start your data value-added journey!
`  
                    // url for each platform
                    const urls = [
                        { url: "https://x.com/MemoLabsOrg" },
                        { url: 'https://t.me/share/url?url=' + encodeURIComponent(currentUrl) + '&text=' + encodeURIComponent(tgText) },
                        { url: 'https://discord.com/invite/YG4Ydv2E7X' },
                        { url: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText) },
                    ];
                    window.open(urls[index].url, '_blank');
                    setOpIndex(index)
                    setLoading(true);
                    
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
        <div className="mt-[90px] animate-fade-in">
            {/* Heading */}
            <h1
                className={`${paytoneOne.className} text-transparent bg-clip-text text-white text-[28px] sm:text-[34px] md:text-[48px] font-bold animate-slide-in text-center md:text-left`}
            >
                Referral Bonus
            </h1>
            <div className="text-[16px] sm:text-[20px] text-white mt-[10px] md:mt-[20px] text-center md:text-left">
                Invite friends to earn more Points
            </div>

            {/* Content Section */}
            <div className="w-full rounded-[10px]  mt-[20px] p-5 flex flex-col lg:flex-row  gap-6 animate-card-load">
                {/* Left Section */}
                <div className="p-4 rounded-[10px] flex flex-col gap-6 bg-gradient-to-b from-[#064E33] to-[#214177] flex-grow">
                    {/* Card 1 */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 group hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <Image
                            src="/refer.png"
                            alt="Refer Friends"
                            width={69}
                            height={87}
                            className="group-hover:rotate-[10deg] transition-transform duration-300"
                        />
                        <div>
                            <div className="text-[18px] sm:text-[25px] text-white font-bold text-center sm:text-left">
                                Invite Friends
                            </div>
                            <div className="text-[14px] sm:text-[18px] text-white text-center sm:text-left">
                                Share your exclusive invitation link.
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 group hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <Image
                            src="/SBT.png"
                            alt="Get SBT"
                            width={69}
                            height={87}
                            className="group-hover:rotate-[10deg] transition-transform duration-300"
                        />
                        <div>
                            <div className="text-[18px] sm:text-[25px] text-white font-bold text-center sm:text-left">
                                Bind Invitation Code
                            </div>
                            <div className="text-[14px] sm:text-[18px] text-white text-center sm:text-left">
                                When your friend binds the invitation code, he or she will get 500 points, you will get 200 points.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-[#0A5C67] rounded-[10px] p-4 flex flex-col gap-4 items-center">
                    <div
                        className="flex justify-between items-center gap-[30px] rounded-[10px] bg-[#096A62] px-4 py-3 sm:px-[20px] sm:py-[25px] text-white text-center transition-colors duration-300 text-[14px] sm:text-[16px] md:text-[18px]"
                    >
                        <div id="icon_txt">{userInfos.invideCode}</div>
                        <Image
                            src="/copy_symbol.png"
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px] cursor-pointer"
                            id="icon"
                            alt="copy symbol"
                            onClick={() => copyToClipboard('icon_txt')}
                        />
                    </div>
                    <div className="text-[12px] sm:text-[14px] text-white text-center cursor-pointer hover:underline break-all"
                        id="link">
                        https://data.memolabs.org/?referralCode={userInfos.invideCode}
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* X (Twitter) */}
                        <div
                            className="bg-white p-1.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-300"
                            onClick={() => handleClick(3)}
                            title="share X"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" strokeLinecap="round"/>
                            </svg>
                        </div>

                        {/* Telegram  */}
                        <div
                            className="bg-white p-1.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-300"
                            onClick={() => handleClick(1)}
                            title="share Telegram"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#26A5E4">
                            <path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M9 13.5V19L12.5 15.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>

                        {/* Discord */}
                        <div
                            className="bg-white p-1.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-300"
                            onClick={() => handleClick(2)}
                            title="share Discord"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#5865F2">
                            <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup Box */}
            {showPopup && (
                <div className="fixed bottom-4 right-4 bg-[#04D582] text-white text-[14px] sm:text-[16px] md:text-[18px] px-6 py-4 rounded-md shadow-lg flex items-center gap-3 animate-slide-in-up z-[50]">
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "white" }} />
                    <p>{showPopup}</p>
                </div>
            )}
        </div>
    );
}
