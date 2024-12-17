'use client';

import Image from 'next/image';
import { paytoneOne } from '@/app/ui/fonts';
import { useAccount } from 'wagmi';
import { useUser } from "../../lib/context/AuthContext";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function Refer() {
    const { isConnected, address } = useAccount();


    const [inviteCode, setInviteCode] = useState("")
    const { userInfo, setUserInfo } = useUser();

    useEffect(() => {
        if (isConnected) {
            const getUserInviteCode = async () => {
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
                                        uid: "11735283",
                                        token: "37595d3a6e43876682b37cdcf941938e",
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
                try {
                    if (userInfo) {
                        const response = await axios.get('https://airdrop.7nc.top/api/user/info', {
                            headers: {
                                'accept': '*/*',
                                'uid': userInfo.uid,
                                'token': userInfo.token,
                            },
                        });
                        setInviteCode(response.data.data.inviteCode);
                        console.log(response.data.data.inviteCode);
                    }

                } catch (error) {
                    console.error(error);
                }
            };
            getUserInviteCode();
        } else {
            setInviteCode('******');
        }
    }, [address, isConnected, setUserInfo, userInfo]);

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

    return (
        <div className="mt-[90px] px-4 animate-fade-in">
            {/* Heading */}
            <h1
                className={`${paytoneOne.className} text-transparent bg-clip-text bg-gradient-to-b from-[#214177] to-[#05F292] text-[28px] sm:text-[34px] md:text-[48px] font-bold animate-slide-in text-center md:text-left`}
            >
                Referral Bonus
            </h1>
            <div className="text-[16px] sm:text-[20px] text-white mt-[10px] md:mt-[20px] text-center md:text-left">
                Invite friends to earn more $MEMO
            </div>

            {/* Content Section */}
            <div className="w-full rounded-[10px] bg-gradient-to-b from-[#064E33] to-[#214177] mt-[20px] p-5 flex flex-col lg:flex-row gap-6 animate-card-load">
                {/* Left Section */}
                <div className="flex flex-col gap-6">
                    <div className="text-[24px] sm:text-[34px] text-white font-bold text-center md:text-left">
                        Invite Friends
                    </div>
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
                                Refer Your Friends
                            </div>
                            <div className="text-[14px] sm:text-[18px] text-white text-center sm:text-left">
                                Share the link with your friends over Twitter or any other social platform.
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
                                GET Points When Users Sign Up
                            </div>
                            <div className="text-[14px] sm:text-[18px] text-white text-center sm:text-left">
                                When your friend signs up on the app, you will receive points.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-[#0A5C67] rounded-[10px] p-4 flex flex-col gap-4 items-center">
                    <div
                        className="flex justify-between items-center gap-[30px] rounded-[10px] bg-[#096A62] px-4 py-3 sm:px-[20px] sm:py-[25px] text-white text-center transition-colors duration-300 text-[14px] sm:text-[16px] md:text-[18px]"
                    >
                        <div id="icon_txt">{inviteCode}</div>
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
                        https://airdrop.memolabs.org/?referralCode={inviteCode}
                    </div>
                    <div
                        className="bg-[#05F292] text-dark text-[14px] sm:text-[16px] md:text-[18px] font-bold px-6 py-3 text-center rounded-full cursor-pointer hover:bg-[#04D582] transition-colors duration-300"
                        onClick={() => copyToClipboard('link')}
                        id="copy_link"
                    >
                        Copy Referral Link
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
