import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useDIDInfo } from "@/app/lib/context/DIDContext";
import { useAuth } from '@/app/lib/context/AuthContext';
import axios from 'axios';
import { useAccount, useSignMessage } from 'wagmi';
import React, { useState, useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { API_URL } from '../config/config';

export default function CreateDID() {
    const { setIsCreatingDid, setToggleDid } = useDIDInfo();
    const { isConnected, address, chain } = useAccount();
    const { openConnectModal } = useConnectModal();
    const { uidInfo, isExist, setBindWallet } = useAuth();


    // const currentAddress = isConnected && address ? address.slice(0, 6) + '...' + address.slice(-4) : '0x0000...0000'
    const { signMessageAsync } = useSignMessage()


    const handleCreateDid = async () => {
        if (isConnected) {
            console.log("create")
            if (!isExist) {
                setBindWallet();
            }
            try {
                // if (isFreeDid) {
                const response1 = await axios.post(API_URL.DID_CREATE_ADMIN, {
                    address,
                });

                if (response1.status === 200) {
                    setIsCreatingDid();

                    const actionId = 1;
                    console.log(actionId);
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

                    if (respond.status === 200) {

                    }

                } else if (response1.status === 501) {
                    alert(`Error: ${response1.status} - ${response1.data.preview}`);
                } else {
                    alert(`Error: ${response1.status} - ${response1.data.Message}`);
                }
            } catch (err: any) {
                alert(`Error: ${err.status}-${err.data}`);
                return
            }
        } else {
            if (openConnectModal) {
                openConnectModal();
            }
        }

    };

    return (
        <div className="mt-[40px] flex justify-center bg-dark animate-fade-in w-full">
            <div className="border-[3px] rounded-[11px] px-4 py-2 bg-gradient-to-r from-[#064E33] to-[#214177] shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className='flex justify-between items-center'>
                    <div
                        className={`${paytoneOne.className} text-white text-[20px] leading-[30px] animate-slide-down`}
                    >
                        Data DID
                    </div>
                    <Image
                        src="/Close.png"
                        alt="Close"
                        width={24}
                        height={24}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => { setToggleDid() }}
                    />
                </div>


                <div className="rounded-[10px] mt-[25px] px-[5px]">
                    <Image
                        src="/NFT_bg.png"
                        alt="NFT Background"
                        width={483}
                        height={233}
                        className="rounded-md transform hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Network</div>
                    <div className="text-[16px] text-white leading-[30px]">{chain ? (chain.name) : ("none")}</div>
                </div>
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Mint To</div>
                    <div className="whitespace-normal break-words text-[11px] md:text-[16px] text-white leading-[30px]">{address}</div>
                </div>
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Play With</div>
                    <div className="text-[16px] text-white leading-[30px]">{"1.00 MEMO"}</div>
                </div>
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Total</div>
                    <div className="text-[16px] text-white leading-[30px]">{"1.00 MEMO"} + GAS FEE</div>
                </div>
                <div
                    onClick={handleCreateDid}
                    className="w-full py-[9px] text-center text-[16px] rounded-full font-bold bg-[#05F292] mt-[10px] cursor-pointer transform hover:scale-110 transition-transform duration-300 shadow-md"
                >
                    Create
                </div>
                <div
                    className="text-[10px] leading-[30px] text-white mt-[16px] text-center animate-fade-in"
                >
                    Total cost includes gas fee for DID creation, and future profile updates. Currently, users can participate for free.
                </div>
            </div>
        </div>
    );
}