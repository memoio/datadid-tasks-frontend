import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useDIDInfo } from "@/app/lib/context/DIDContext";
import { useAuth } from '@/app/lib/context/AuthContext';
import axios, { AxiosError } from 'axios';
import { useAccount, useSignMessage } from 'wagmi';
import React, { useState, useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { API_URL } from '../config/config';
import { useAction } from '@/app/lib/context/ActionContext';

export default function CreateDID() {
    const { setIsCreatingDid, setToggleDid } = useDIDInfo();
    const { isConnected, address, chain } = useAccount();
    const { openConnectModal } = useConnectModal();
    const { setPointUpdate } = useAction();
    const { isExist, setBindWallet } = useAuth();


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
                const response1 = await axios.post(API_URL.BACKEND_DID_CREATEADMIN, {
                    address,
                });

                if (response1.data.result === 1) {
                    setPointUpdate(true);
                } else {
                    alert("Error: " + response1.data.error);
                }
            } catch (err: unknown) {
                let errorMessage = 'An unknown error occurred';
                if (err instanceof AxiosError) {
                    const { status, data } = err.response || {};
                    if (status && data) {
                        errorMessage = `Error: ${status}-${data}`;
                    }
                }
                alert(errorMessage);
                return
            }
        } else {
            if (openConnectModal) {
                openConnectModal();
            }
        }

    };

    const shortenedAddress = address?.slice(0, 6) + '...' + address?.slice(-4);
    return (
        <div className="mt-[20px] flex justify-center bg-dark animate-fade-in w-full">
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


                <div className="rounded-[10px] mt-[25px] px-[15px]">
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
                    <div className="text-[16px] text-white leading-[30px] sm:block hidden">
                        {address}
                    </div>
                    <div className="text-[16px] text-white leading-[30px] sm:hidden block">
                        {shortenedAddress}
                    </div>
                </div>
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Play With</div>
                    <div className="text-[16px] text-white leading-[30px]">{"0.00 MEMO"}</div>
                </div>
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Total</div>
                    <div className="text-[16px] text-white leading-[30px]">{"0.00 MEMO"} + GAS FEE</div>
                </div>
                <div
                    onClick={handleCreateDid}
                    className="w-full py-[9px] text-center text-[16px] rounded-full font-bold bg-[#05F292] mt-[10px] cursor-pointer transform hover:scale-110 transition-transform duration-300 shadow-md"
                >
                    Create
                </div>
                <div
                    className=" text-[10px] text-white mt-[10px] text-center animate-fade-in"
                >
                    {"At this stage, the cost of creating DID is borne by MEMO."}
                </div>
            </div>
        </div>
    );
}