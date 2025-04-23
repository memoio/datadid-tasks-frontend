'use client';

import Image from 'next/image';
import { paytoneOne } from '@/app/ui/fonts';
import { useAccount } from 'wagmi';
import { useAuth } from '@/app/lib/context/AuthContext';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/config';
import { useAction } from '@/app/lib/context/ActionContext';
import { error } from 'console';

export default function Reward() {
    const { isConnected } = useAccount();
    const { address } = useAccount();
    const { setPointUpdate } = useAction();

    const [verify, setVerify] = useState(false)

    const [OATCount, setOATCount] = useState({
        vcount: 0,
        ucount: 0,
    });

    const handVerifyOAT = async () => {
        const verifyOAT = async () => {
            if (isConnected) {
                const respond = await axios.post(API_URL.BACKEND_OAT_VERIFY,
                    {
                        address: address
                    })
                console.log("oatverify", respond.data)
                if (respond.data.result === 1) {
                    setVerify(true)
                    alert("verify success!")
                }
            }
        }
        if (isConnected && !verify) {
            verifyOAT()
            setPointUpdate(true)
            return;
        }
    }

    useEffect(() => {
        const status = async () => {
            if (isConnected) {
                const respond = await axios.get(API_URL.BACKEND_OAT_STATUS,
                    {
                        params: {
                            address: address
                        }
                    })
                //console.log("oatstatus", respond.data.data)
                if (respond.data.result === 1) {
                    setOATCount({
                        vcount: respond.data.data.vcount,
                        ucount: respond.data.data.ucount
                    })
                } else {
                    alert(respond.data.error)
                }
            }
        }

        status();
    }, [isConnected, verify])



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
                                OAT UnVerify Count: {OATCount.ucount}
                            </div>
                            <div className="text-[16px] text-[#13E292] text-center sm:text-left">
                                OAT Verify Count: {OATCount.vcount}
                            </div>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div
                        className="bg-[#0079F2] text-white text-[18px] font-bold text-center px-[25px] py-[20px] hover:bg-[#04D582] hover:scale-105 transition-transform duration-300 rounded-[10px] cursor-pointer"
                        style={{ pointerEvents: (OATCount.ucount > 0) ? 'auto' : 'none', opacity: (OATCount.ucount > 0) ? 1 : 0.5 }} // 
                        onClick={() => handVerifyOAT()}
                    >
                        {
                            (OATCount.ucount > 0) ?
                                "Verify OAT" :
                                "No OAT"
                        }

                    </div>
                </div>
            </div>
        </div >
    );
}
