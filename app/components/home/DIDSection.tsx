'use client';

import React from 'react';
import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useDIDInfo } from "@/app/lib/context/DIDContext";
import axios from 'axios';
import { useAccount } from "wagmi";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { API_URL } from '../config/config';
import { useAuth } from '@/app/lib/context/AuthContext';
import { useAction } from '@/app/lib/context/ActionContext';
interface PopupData {
    invitee: string;
    time: string;
    points: number;
}

export default function DidSection() {
    const { userInfos } = useAction();
    const { userInfo } = useAuth();
    const { address, isConnected, isDisconnected } = useAccount();
    const { setToggleDid, didInfo, setDID, isDIDInfoState, isDIDExistState, setIsDIDExist, setDIDInfoExist } = useDIDInfo();
    const { openConnectModal } = useConnectModal();
    const [popupData, setPopupData] = useState<PopupData[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const handlePopup = () => {
        // Mock invitation details
        // const mockData: PopupData[] = [
        //     { invitee: "0x06B45...EBFEe", time: "2024-12-01 14:30:32", points: 100 },
        //     { invitee: "0x06B45...EBFE1", time: "2024-12-03 10:45:32", points: 50 },
        //     { invitee: "0x06B45...EBFE2", time: "2024-12-03 10:45:32", points: 50 },
        //     { invitee: "0x06B45...EBFE3", time: "2024-12-03 10:45:32", points: 50 },
        //     { invitee: "0x06B45...EBFE4", time: "2024-12-03 10:45:32", points: 50 },
        // ];
        // setPopupData(mockData);
        // setShowPopup(true);
    };

    const inviteDatas = [
        {
            title: { full: "My Rank", short: "Rank" },
            value: isConnected ? userInfos.PointsRank : "-",
        },
        {
            title: { full: "My Smart Wallet Address", short: "Wallet" },
            value: address ? address.slice(0, 6) + "..." + address.slice(-4) : "-",
        },
        {
            title: { full: "Friends Invited", short: "Friends" },
            value: isConnected ? userInfos.inviteCount : "-",
            onClick: handlePopup, // Add onClick to this item
        },
        {
            title: { full: "Leaderboard Reward", short: "Reward" },
            value: isConnected ? userInfos.points : "-",
        },
    ];


    const openDid = () => {
        if (!isConnected) {
            openConnectModal?.();
            return;
        }
        setToggleDid(); // Toggle the DID state

    };

    useEffect(() => {
        const getDIDExist = async () => {
            if (address && isConnected) {
                try {
                    const response = await axios.get(
                        API_URL.DID_EXIST,
                        {
                            params: {
                                address,
                            },
                        }
                    );

                    if (response.status === 200) {
                        if (response.data.exist === 1) {
                            console.log("did eixst:", response.data);
                            setIsDIDExist(true);
                        } else {
                            setIsDIDExist(false)
                            setDIDInfoExist(false)
                        }
                    }

                    if (response.status === 506) {
                        console.log("ddd")
                    }
                } catch (error: any) {
                    if (error.response && error.response.status === 506) {

                    }

                    return
                }
            } else {
                setIsDIDExist(false)
                setDIDInfoExist(false)
            }
        };

        getDIDExist();

    }, [isConnected])

    useEffect(() => {
        console.log("didstate", isDIDExistState)
        if (isConnected && isDIDExistState && !isDIDInfoState) {
            const getDIDInfo = async () => {
                try {
                    const response = await axios.get(
                        API_URL.DID_INFO,
                        {
                            params: {
                                address,
                            },
                        }
                    );

                    if (response.status === 200) {
                        console.log("didinfo:", response.data);
                        setDID({
                            did: response.data.did,
                            number: response.data.number.toString().padStart(6, '0'),
                        })
                        setDIDInfoExist(true)
                    }

                    if (response.status === 506) {
                        console.log("ddd")
                    }
                } catch (error: any) {
                    if (error.response && error.response.status === 506) {

                    }

                    return
                }
            };

            getDIDInfo();
        }
    }, [isDIDExistState, isConnected])

    useEffect(() => {

    })

    const closePopup = () => setShowPopup(false);

    return (
        <div className="relative">
            {/* Main content */}
            <div className="flex flex-col md:flex-row justify-center items-center w-full h-auto mb-[80px]">
                {/* Left Section */}
                <div className="flex flex-col w-full  px-[20px] md:px-[0px]">
                    <div
                        className={`${paytoneOne.className} text-white text-[28px] sm:text-[28px] md:text-[32px] lg:text-[40px] xl:text-[48px] leading-tight text-center sm:text-left`}
                    >
                        <span className="text-white">Data</span> <span>DID</span>
                    </div>
                    <div className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[23px] leading-7 mt-[15px] text-left sm:text-left">
                        Your all-in-one, privacy-preserving self-sovereign identity.Own, manage, and monetize your data!
                    </div>
                    <div className="text-white text-[12px] sm:text-[14px] text-left sm:text-left">
                        <p className='mt-[15px]'>Check DID, you need to click the <a className="text-[#13E292]" onClick={() => window.open(`http://faucet.metamemo.one?address=${address}`, '_blank')}>faucet button</a> to get the gas fee.</p>
                        <p className='mt-[15px]'>Note 1: Users need to create did before participating in earning points. </p>
                        <p className='mt-[15px]'>Note 2: Create DID +1000, Check DID +1500.</p>
                    </div>
                    <div className="text-center flex justify-center sm:justify-start">
                        {isDIDExistState && isDIDInfoState && isConnected ? (
                            <div className="rounded-[10px] mt-[5px] px-[5px] bg-[#121212] ">
                                <div className="text-[18px] text-[#13E292] mt-[16px] text-left">
                                    No.{didInfo.number}
                                </div>
                                <div className="text-[12px] text-[#13E292]">
                                    {didInfo.did.slice(0, 18) + "..." + didInfo.did.slice(-18)}
                                </div>
                                <div className='flex flex-row gap-5'>
                                    <div
                                        onClick={() => openDid()}
                                        className="bg-[#13E292] flex justify-center items-center rounded-full px-4 py-2 mt-5 shadow-md transform hover:scale-110 transition-transform duration-300 cursor-pointer"
                                    >
                                        <span className="font-bold text-[14px] sm:text-[16px] text-white">
                                            Check DID
                                        </span>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <div></div>
                        )}

                    </div>
                </div>

                {/* Right Section (Images) */}
                <div className="flex w-full flex-col mt-[50px] xl:mt-[0px] px-[20px] md:px-[0px]">
                    <Image
                        src="/NFT_bg.png"
                        width={777}
                        height={449}
                        className="w-full h-auto object-contain mb-[20px] "
                        alt="NFT"
                    />
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-[#064E33] to-[#214177] w-full mt-[20px] sm:mt-[33px] py-[30px] sm:py-[24px] px-[10px] sm:px-[20px] border-[1px] border-[#0079F2] rounded-[10px]  flex flex-col items-center shadow-md glow-effect">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full fade-in">
                    {inviteDatas.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center text-center gap-5 transition hover:scale-105"
                            onClick={item.onClick} // Trigger onClick if provided
                        >
                            <div className="text-white text-[16px] sm:leading-[20px] lg:leading-[30px] h-[12px] sm:h-[16px] lg:h-[20px]">
                                <span className="hidden lg:block">{item.title.full}</span>
                                <span className="lg:hidden">{item.title.short}</span>
                            </div>
                            <div className="text-white font-bold text-[20px] sm:leading-[12px] lg:leading-[16px]  px-[10px] lg:px-[25px] sm:py-[12px] lg:py-[17px] rounded-[10px] mt-2 w-full sm:w-auto cursor-pointer">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup */}
            {
                showPopup && (
                    <div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#196144] bg-opacity-50 z-50"
                        onClick={closePopup} // This will trigger the `closePopup` function when clicking outside the popup
                    >
                        <div
                            className="bg-[#01180E] p-6 rounded-lg shadow-lg w-[90%] sm:w-[50%] border-x-[3px] border-[#05F292]"
                            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the popup
                        >
                            <h2 className="text-xl font-bold mb-4 text-white text-[24px]">Invitation Details</h2>
                            <ul>
                                <li className="mb-3 border-b pb-3 last:border-none last:mb-0">
                                    <div className="flex justify-between w-full">
                                        <div className="w-[40%] text-center text-[20px] font-bold text-white">Invitee</div>
                                        <div className="w-[40%] text-center text-[20px] font-bold text-white">Time</div>
                                        <div className="w-[20%] text-center text-[20px] font-bold text-white">Rewards</div>
                                    </div>
                                </li>
                                {popupData.map((data, i) => (
                                    <li
                                        key={i}
                                        className="mb-3 border-b pb-3 last:border-none last:mb-0"
                                    >
                                        <div className="flex justify-between w-full">
                                            <div className="w-[40%] text-center text-white">{data.invitee}</div>
                                            <div className="w-[40%] text-center text-white">{data.time}</div>
                                            <div className="w-[20%] text-center text-white">{data.points}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                )
            }
            <div className="rounded-full px-[20px] py-[10px]"></div>
        </div >
    );
}