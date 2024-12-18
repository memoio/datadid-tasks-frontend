'use client';

import { paytoneOne } from '@/app/ui/fonts';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { useUser } from "@/app/lib/context/AuthContext"


interface PopupData {
    invitee: string;
    time: string;
    points: number;
}



export default function LeaderboardPage() {
    const [isWeekly, setIsWeekly] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState<PopupData[]>([]);
    interface ElementData {
        id: number;
        address: string;
        score: number;
        soul: number;
        isCrown: boolean;
    }

    const [elements, setElements] = useState<ElementData[]>([])
    const { userInfo } = useUser();

    useEffect(() => {
        if (userInfo) {
            const getRank = async () => {

                try {
                    const response = await axios.get("https://airdrop.7nc.top/api/points/rank",
                        {
                            headers: {
                                'accept': '*/*',
                                uid: userInfo.uid,
                                token: userInfo.token,
                            },
                        }
                    )
                    const ranklist = response.data.data.slice(0, 10).map((item: {
                        walletAddress: any; inviteCount: any; points: any;
                    }, index: number) => ({
                        id: index + 1,
                        address: (item.walletAddress ? item.walletAddress < 8 ? item.walletAddress : `${item.walletAddress.substring(0, 4)}...${item.walletAddress.substring(item.walletAddress.length - 4)}` : ''),
                        score: (item.inviteCount ? item.inviteCount : 0),
                        soul: item.points,
                        isCrown: index < 3
                    }))
                    setElements(ranklist)
                    console.log(response.data)
                } catch (error) {
                    alert(`Error: ${error}`);
                    return
                }
            }

            getRank()
        }
    }, [userInfo])

    const handlePopup = () => {
        // Mock invitation details
        const mockData: PopupData[] = [
            { invitee: "0x06B45...EBFEe", time: "2024-12-01 14:30:32", points: 100 },
            { invitee: "0x06B45...EBFE1", time: "2024-12-03 10:45:32", points: 50 },
            { invitee: "0x06B45...EBFE2", time: "2024-12-03 10:45:32", points: 50 },
            { invitee: "0x06B45...EBFE3", time: "2024-12-03 10:45:32", points: 50 },
            { invitee: "0x06B45...EBFE4", time: "2024-12-03 10:45:32", points: 50 },
        ];
        setPopupData(mockData);
        setShowPopup(true);
    };

    const closePopup = () => setShowPopup(false);

    const inviteDatas = [
        {
            title: { full: "My Rank", short: "Rank" },
            value: "1K+",
        },
        {
            title: { full: "My Smart Wallet Address", short: "Wallet" },
            value: "0x49e65cd..4c",
        },
        {
            title: { full: "Friends Invited", short: "Friends" },
            value: "2K+",
            onClick: handlePopup, // Add onClick to this item
        },
        {
            title: { full: "Leaderboard Reward", short: "Reward" },
            value: "100",
        },
    ];

    return (
        <div className="mt-[68px] px-4 sm:px-6 lg:px-12 flex flex-col items-center">
            {/* Title Section */}
            <div
                className={`${paytoneOne.className} text-transparent text-center bg-clip-text bg-gradient-to-b from-[#214177] to-[#05F292] text-[34px] leading-[40px] md:leading-[40px] fade-in`}
            >
                Leaderboard
            </div>
            <div className="w-full sm:w-[60%] text-[16px] sm:text-[20px] text-center leading-[28px] sm:leading-[38px] text-white mt-[20px] sm:mt-[33px]">
                The top 100 inviters Weekly and top 500 inviters All-time will be shown on the leaderboards.
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 justify-center mt-[10px]">
                <div
                    onClick={() => setIsWeekly(true)}
                    className={`cursor-pointer transition-all ${isWeekly ? 'text-[#05F292]' : 'text-[#FFFFFF80]'
                        } font-bold text-[18px] sm:text-[25px] leading-[25px] sm:leading-[30px] hover:scale-105`}
                >
                    Weekly
                </div>
                <div
                    onClick={() => setIsWeekly(false)}
                    className={`cursor-pointer transition-all ${!isWeekly ? 'text-[#05F292]' : 'text-[#FFFFFF80]'
                        } font-bold text-[18px] sm:text-[25px] leading-[25px] sm:leading-[30px] hover:scale-105`}
                >
                    All Time
                </div>
            </div>

            {/* Stats Section */}
            <div className="w-full mt-[20px] sm:mt-[33px] py-[30px] sm:py-[61px] px-[10px] sm:px-[20px] border-x-[3px] border-[#05F292] rounded-[10px] bg-[#05F2920D] flex flex-col items-center shadow-md glow-effect">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full fade-in">
                    {inviteDatas.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center text-center gap-5 transition hover:scale-105"
                            onClick={item.onClick} // Trigger onClick if provided
                        >
                            <div className="text-white font-bold text-[20px] sm:leading-[20px] lg:leading-[30px] h-[10px] sm:h-[20px] lg:h-[40px]">
                                <span className="hidden lg:block">{item.title.full}</span>
                                <span className="lg:hidden">{item.title.short}</span>
                            </div>
                            <div className="text-white font-bold text-[16px] sm:leading-[20px] lg:leading-[30px] bg-[#1E4874] px-[10px] lg:px-[25px] sm:py-[12px] lg:py-[17px] rounded-[10px] mt-2 w-full sm:w-auto cursor-pointer">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Popup */}
            {showPopup && (
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
                                    <div className="w-[20%] text-center text-[20px] font-bold text-white">Points</div>
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

            )}


            {/* Leaderboard */}
            <div className="bg-[#01180E] rounded-[11px] py-[40px] sm:py-[59px] px-[20px] sm:px-[51px] mt-[30px] sm:mt-[45px] w-full border-x-[3px] border-[#05F292]">
                <div className="flex justify-between items-center text-center mb-[30px] sm:mb-[43px] fade-in">
                    <div className="text-white text-[16px] sm:text-[20px] font-bold leading-[24px] sm:leading-[30px] w-[5%]">
                        Rank
                    </div>
                    <div className="text-white text-[16px] sm:text-[20px] font-bold leading-[24px] sm:leading-[30px] w-[40%]">
                        <span className="block md:hidden">Wallet</span>
                        <span className="hidden md:block">Smart Wallet Address</span>
                    </div>
                    <div className="text-white text-[16px] sm:text-[20px] font-bold leading-[24px] sm:leading-[30px] w-[20%]">
                        <span className="block md:hidden">Friends</span>
                        <span className="hidden md:block">Friends Invited</span>
                    </div>
                    <div className="text-white text-[16px] sm:text-[20px] font-bold leading-[24px] sm:leading-[30px] w-[30%]">
                        <span className="block md:hidden">Reward</span>
                        <span className="hidden md:block">Leaderboard Reward</span>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-[#FFFFFF4D]"></div>

                {elements.map((item, index) => (
                    <div
                        key={index}
                        className="fade-in transition hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex justify-between items-center my-[15px] sm:my-[25px] px-[10px] sm:px-[5px]">
                            <div className="w-[5%] text-center">
                                {item.isCrown ? (
                                    <Image src="/crown.png" alt="crown" width={30} height={20} className="sm:w-[43.4px] sm:h-[27px]" />
                                ) : (
                                    <div className="text-[16px] sm:text-[20px] leading-[24px] sm:leading-[38px] text-white">
                                        {String(item.id).padStart(2, "0")}
                                    </div>
                                )}
                            </div>
                            <div className="text-white text-[16px] sm:text-[20px] leading-[24px] sm:leading-[38px] text-center w-[40%]">
                                {item.address}
                            </div>
                            <div className="text-[#FFC917] text-[16px] sm:text-[20px] leading-[24px] sm:leading-[38px] text-center w-[20%]">
                                {item.score}
                            </div>
                            <div className="flex justify-end items-center w-[30%]">
                                <Image
                                    src="/coin.png"
                                    alt="coin"
                                    width={14}
                                    height={14}
                                    className="sm:w-[18px] sm:h-[18px] mr-[5px] hidden md:block"
                                />
                                <div className="text-[16px] sm:text-[20px] text-white leading-[24px] sm:leading-[38px] text-right">
                                    {item.soul}
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-[#FFFFFF4D]"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
