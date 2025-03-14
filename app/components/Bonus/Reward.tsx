'use client';

import Image from 'next/image';
import { paytoneOne } from '@/app/ui/fonts';
import { useAccount } from 'wagmi';
import { useAuth } from '@/app/lib/context/AuthContext';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/config';
import { useAction } from '@/app/lib/context/ActionContext';

export default function Reward() {
    const { isConnected } = useAccount();
    const { address } = useAccount();
    const { uidInfo } = useAuth();
    const { setPointUpdate } = useAction();

    const [verify, setVerify] = useState(false)

    const [OATCount, setOATCount] = useState(0);

    const handVerifyOAT = async () => {
        if (isConnected && !verify) {
            const actionId = 87;
            // 根据OATCount次数，多次调用API_URL.AIRDROP_RECORD_ADD
            for (let i = 0; i < OATCount; i++) {
                const respond = await axios.post(API_URL.AIRDROP_RECORD_ADD, {
                    "action": actionId
                }, {
                    headers: {
                        "accept": "application/hal+json",
                        "Content-Type": "application/json",
                        "uid": uidInfo?.uid,
                        "token": uidInfo?.token
                    }
                });
                console.log("OAT:", respond.data);
            }
            setVerify(true)


            if (address) {
                await fetch(`/api/${encodeURIComponent(address)}`, {
                    method: 'POST',
                });
            } else {
                console.error('Address is undefined');
            }

            setPointUpdate(true)
            return;
        }
    }

    useEffect(() => {
        if (isConnected) {
            if (address) {
                fetch(`/api/${encodeURIComponent(address)}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(`Address exists ${data.count} times in the database.`);
                        setOATCount(data.count);
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
            } else {
                console.error('Address is undefined');
            }
        }
    }, [isConnected, setVerify])

    const { isExist } = useAuth();


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
                            <div className="text-[16px] text-[#13E292] text-center sm:text-left">
                                OAT Count: {OATCount}
                            </div>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div
                        className="bg-[#0079F2] text-white text-[18px] font-bold text-center px-[25px] py-[20px] hover:bg-[#04D582] hover:scale-105 transition-transform duration-300 rounded-[10px] cursor-pointer"
                        style={{ pointerEvents: (OATCount > 0) ? 'auto' : 'none', opacity: (OATCount > 0) ? 1 : 0.5 }} // 
                        onClick={() => handVerifyOAT()}
                    >
                        {
                            (OATCount > 0) ?
                                "Verify OAT" :
                                "No OAT"
                        }

                    </div>
                </div>
            </div>
        </div >
    );
}
