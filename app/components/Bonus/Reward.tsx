'use client';

import Image from 'next/image';
import { paytoneOne } from '@/app/ui/fonts';
import { useAccount } from 'wagmi';
import { useAuth } from '@/app/lib/context/AuthContext';
import axios from 'axios';
import { API_URL } from '../config/config';

export default function Reward() {
    const { isConnected, address } = useAccount();
    const { uidInfo, isExist } = useAuth();

    const handVerifyOAT = async () => {
        if (isConnected) {
            const actionId = 85;
            console.log(isExist);
            // const respond = await axios.post(API_URL.AIRDROP_RECORD_ADD, {
            //     "action": actionId
            // }, {
            //     headers: {
            //         "accept": "application/hal+json",
            //         "Content-Type": "application/json",
            //         "uid": userInfo?.uid,
            //         "token": userInfo?.token
            //     }
            // });

            // if (respond.status === 200) {

            // }
            return;
        }
    }
    return (
        <div
            id="reward-section"
            className="transition-transform duration-700 ease-out translate-x-0 opacity-100 animate-slide-in"
        >
            <h1
                className={`${paytoneOne.className} text-transparent bg-clip-text text-white text-[34px] md:text-[48px] font-bold mt-[50px]`}
            >
                Redeem Past Reward
            </h1>
            <div className="w-full rounded-[10px] bg-gradient-to-br from-[#064E33] to-[#214177] mt-[25px] px-[25px] py-[30px]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-7 group">
                    {/* Left Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 cursor-pointer w-[75%]">
                        <Image
                            src="/Redeem.png"
                            alt="Redeem"
                            width={126}
                            height={112}
                            className="group-hover:scale-105 transition-transform duration-300"
                        />
                        <div>
                            <div className="text-[23px] text-white font-bold">
                                Verify OAT
                            </div>
                            <div className="text-[16px] text-white text-center sm:text-left">
                                Verify past OAT and redeem corresponding points
                                rewards. Please make sure that the current wallet address is
                                consistent with the address for receiving OAT.
                            </div>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div
                        className="bg-[#0079F2] text-white text-[18px] font-bold text-center px-[25px] py-[20px] hover:bg-[#04D582] hover:scale-105 transition-transform duration-300 rounded-[10px]"
                        style={{ pointerEvents: 'none', opacity: '0.5' }}
                        onClick={() => handVerifyOAT()}
                    >
                        Comming Soon
                    </div>
                </div>
            </div>
        </div>
    );
}
