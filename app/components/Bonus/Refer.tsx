'use client';

import Image from 'next/image';
import { paytoneOne } from '@/app/ui/fonts';
import { useAccount } from 'wagmi';
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { useUser } from "../../lib/context/AuthContext";
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Refer() {
    const { isConnected, address } = useAccount();
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();

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
                                When your friend signs up on the app, you will receive Grass points.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-[#0A5C67] rounded-[10px] p-4 flex flex-col gap-4 items-center">
                    <div
                        className="rounded-[10px] bg-[#096A62] px-4 py-3 sm:px-[40px] sm:py-[25px] text-white text-center cursor-pointer hover:bg-[#05F292] transition-colors duration-300 text-[14px] sm:text-[16px] md:text-[18px]"
                    >
                        {inviteCode}
                    </div>
                    <div className="text-[12px] sm:text-[14px] text-white text-center cursor-pointer hover:underline break-all">
                        https://memolabs/?referralCode={inviteCode}
                    </div>
                    <div
                        className="bg-[#05F292] text-dark text-[14px] sm:text-[16px] md:text-[18px] font-bold px-6 py-3 text-center rounded-md cursor-pointer hover:bg-[#04D582] transition-colors duration-300"
                    >
                        {address ? (
                            <div>
                                <button onClick={openAccountModal} type="button">
                                    <span>Address: {address}</span>
                                </button>
                            </div>
                        ) : (
                            <button onClick={openConnectModal} type="button">
                                Connect Wallet
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
