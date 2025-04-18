'use client';

import { paytoneOne } from '@/app/ui/fonts';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { useAuth } from "@/app/lib/context/AuthContext"
import { API_URL } from '../config/config';
import { useAccount } from 'wagmi';


export default function LeaderboardPage() {
    const { isConnected } = useAccount();
    const [isWeekly, setIsWeekly] = useState(true);
    const { isExist, setBindWallet } = useAuth();
    const [loading, setLoading] = useState(false);

    const [list, setList] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    interface ElementData {
        id: number;
        address: string;
        score: number;
        soul: number;
        isFirst: boolean;
        isSecond: boolean;
        isThird: boolean;
    }

    const [elements, setElements] = useState<ElementData[]>([])

    useEffect(() => {
        console.log("weekly")
        if (isConnected && isExist) {
            setBindWallet()
        }
        if (isExist) {
            const getRank = async () => {
                try {
                    setLoading(true)
                    const response = await axios.get(API_URL.BACKEND_AIRDROP_RANK,
                        {
                            params: {
                                type: isWeekly ? 1 : 0,
                            }
                        },
                    )
                    if (response.data.result === 1) {
                        const ranklist = response.data.data.slice(0, 10).map((item: {
                            address: any; inviteCount: any; points: any;
                        }, index: number) => ({
                            id: index + 1,
                            address: (item.address ? item.address < 8 ? item.address : `${item.address.substring(0, 4)}...${item.address.substring(item.address.length - 4)}` : ''),
                            score: (item.inviteCount ? item.inviteCount : 0),
                            soul: item.points,
                            isFirst: index === 0,
                            isSecond: index === 1,
                            isThird: index === 2,
                        }))
                        setElements(ranklist)
                        console.log(response.data)
                    } else {
                        alert(response.data.error)
                    }
                } catch (error) {
                    alert(`Error: ${error}`);
                    setLoading(false)
                    return
                }
                setLoading(false)
            }

            getRank()
        }
    }, [isConnected, isWeekly, isExist])

    // handle click on invite count
    const handleClick = async (parent: string) => {
        if (!parent) {
          alert("Parent address is required");
          return;
        }
    
        setLoading(true);
        try {
            // test data
            // const mockData = {
            //     list: [
            //       "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            //       "0x5fB3024FbB9Fd8B7A5c48dD3fE0a5fE87ED0B035",
            //       "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
            //     ],
            // };
            // const data = mockData

            // make url to request
            const url = new URL(API_URL.BACKEND_AIRDROP_INVITE_LIST);
            url.searchParams.append('parent', parent);
            
            // fetch data
            const res = await fetch(url.toString());
            const data = await res.json();
          
            // show info
            console.log("API Response:", {
            status: res.status,
            url: res.url,
            data: data
          });

          setList(data.list || []);
          
          if (data.list && data.list.length > 0) {
            alert(`Invited Addresses:\n${data.list.join("\n")}`);
          } else {
            alert("No invites found for this address.");
          }

          
        } catch (err) {
          console.error(err);
          alert("Failed to load invites");
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="mt-[120px] px-4 sm:px-6 lg:px-12 flex flex-col items-center">
            {/* Title Section */}
            <div
                className={`${paytoneOne.className} text-transparent text-center bg-clip-text text-white text-[34px] leading-[40px] md:leading-[40px] fade-in`}
            >
                Leaderboard
            </div>
            <div className="w-full sm:w-[60%] text-[16px] sm:text-[20px] text-center leading-[28px] sm:leading-[38px] text-white mt-[20px] sm:mt-[33px]">
                The top 10 inviters Weekly and top 10 inviters All-time will be shown on the leaderboards.
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 justify-center mt-[10px]">
                <div
                    onClick={() => setIsWeekly(true)}
                    className={`cursor-pointer transition-all ${isWeekly ? 'text-[#0079F2]' : 'text-white'
                        } font-bold text-[18px] sm:text-[25px] leading-[25px] sm:leading-[30px] hover:scale-105`}
                >
                    Weekly
                </div>
                <div
                    onClick={() => setIsWeekly(false)}
                    className={`cursor-pointer transition-all ${!isWeekly ? 'text-[#0079F2]' : 'text-white'
                        } font-bold text-[18px] sm:text-[25px] leading-[25px] sm:leading-[30px] hover:scale-105`}
                >
                    All Time
                </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-gradient-to-br from-[#064E33] to-[#214177] rounded-[11px] py-[40px] sm:py-[59px] px-[20px] sm:px-[51px] mt-[30px] sm:mt-[45px] w-full border border-[#FFFFFF4D]">
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
                        <span className="hidden md:block">Total Points</span>
                    </div>
                </div>
                <div className="w-full m-auto h-[1px] bg-[#FFFFFF4D]"></div>
                {loading && <div className='m-5 flex  items-center flex-rows'>
                    <svg className="w-12 h-12 animate-spin text-blue-500" viewBox="0 0 50 50">
                        <circle className="opacity-25" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" />
                        <circle className="opacity-75" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.415, 31.415" strokeLinecap="round" />
                    </svg>
                    <div className='text-white  text-[16px] sm:text-[20px] font-bold'>Loading Data ...</div>
                </div>}
                {(!loading) && elements.map((item, index) => (
                    <div
                        key={index}
                        className="fade-in transition hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex justify-between  items-center my-[15px] sm:my-[25px] px-[10px] sm:px-[5px]">
                            <div className="w-[5%] text-center">
                                {item.isFirst ? (
                                    <Image
                                        src="/first_winner.png"
                                        alt="First Winner"
                                        width={30}
                                        height={20}
                                        className="sm:w-[27px] sm:h-[27px] mx-[10px]"
                                    />
                                ) : item.isSecond ? (
                                    <Image
                                        src="/second_winner.png"
                                        alt="Second Winner"
                                        width={30}
                                        height={20}
                                        className="sm:w-[27px] sm:h-[27px] mx-[10px]"
                                    />
                                ) : item.isThird ? (
                                    <Image
                                        src="/third_winner.png"
                                        alt="Third Winner"
                                        width={30}
                                        height={20}
                                        className="sm:w-[27px] sm:h-[27px] mx-[10px]"
                                    />
                                ) : (
                                    <div className="text-[16px] sm:text-[20px] leading-[24px] sm:leading-[38px] text-white">
                                        {String(item.id).padStart(2, "0")}
                                    </div>
                                )}
                            </div>
                            <div className="text-white text-[16px] sm:text-[20px] leading-[24px] sm:leading-[38px] text-center w-[40%]">
                                {item.address}
                            </div>
                            <div className="text-[#FFC917] text-[16px] sm:text-[20px] leading-[24px] sm:leading-[38px] text-center w-[20%]"
                                onClick={() => {
                                    console.log(`${item.address}`)
                                    console.log(`${item.score}`)
                                    handleClick(`${item.address}`)
                                    } 
                                }
                            >
                                {item.score}
                            </div>
                            <div className="flex justify-center items-center w-[30%]">
                                <Image
                                    src="/coin.png"
                                    alt="coin"
                                    width={14}
                                    height={14}
                                    className="sm:w-[18px] sm:h-[18px] mr-[5px] hidden md:block"
                                />
                                <div className="text-[16px] sm:text-[20px] text-white leading-[24px] sm:leading-[38px] text-center">
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
