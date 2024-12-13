'use client'

import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useAccount, useSignMessage } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';
import axios from 'axios';

export default function CreateDID() {
    const { isConnected, address } = useAccount();
    const currentAddress = isConnected ? address.slice(0, 6) + '...' + address.slice(-4) : '0x0000...0000'

    // const { signMessage, data, isPending, isError, isSuccess } = useSignMessage()
    // const message = "hello world"
    const { openConnectModal } = useConnectModal();
    // const url = 'http://119.147.213.61:38082/did'
    // const [did, setDID] = useState<string | null>(null);



    const createDID = async () => {
        //     console.log("create")
        //     try {
        //         const response = await axios.get(url + `/createsigmsg`, {
        //             params: {
        //                 address,  // 通过 params 将 address 传递给后端
        //             },
        //         })

        //         const data = response.data
        //         console.log(data)
        //     } catch (err) {
        //         console.error('Error creating DID:', err);
        //     }

        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify({address, sig}),
        // })
        // .then(response => {
        //     const data = response.json()
        //     return data.did
        // })
        // .then(e => {
        //     console.log(e)
        // })
        // .catch(err => {
        //     console.error(err)
        // })
        // try {
        //     const response = await fetch(url, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json;charset=utf-8',
        //         },
        //         body: JSON.stringify({ address, sig }),
        //     });

        //     const data = await response.json();
        //     console.log(data.did);
        // } catch (err) {
        //     console.error('Error creating DID:', err);
        // }
    }

    return (
        <div className='mt-[97px] flex justify-center bg-dark' >
            <div className="border-[3px] rounded-[11px] border-white px-[38px] py-[26px] bg-gradient-to-r from-[#064E33] to-[#214177]">
                <div className={`${paytoneOne.className} text-white text-[20px] leading-[30px]`}>Data DID</div>
                <div className='rounded-[10px] mt-[25px] px-[5px]'>
                    <Image src="/NFT_bg.png" alt="alt" width={483} height={366} />
                </div>
                <div className='flex justify-between mt-[16px]'>
                    <div className='text-[16px] text-white leading-[30px]'>Create For</div>
                    <div className='text-[16px] text-white leading-[30px]'>{currentAddress}</div>
                </div>
                <div className='flex justify-between mt-[16px]'>
                    <div className='text-[16px] text-white leading-[30px]'>Gas Fee</div>
                    <div className='text-[16px] text-white leading-[30px]'>0.00 MEMO</div>
                </div>
                {/*  Create DID button */}
                <div className='w-full py-[9px] text-center text-[16px] rounded-full font-bold bg-[#05F292]  mt-[10px]'>
                    {isConnected ? (
                        <div>
                            <button onClick={() => createDID()} >
                                Create DID
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={openConnectModal}>
                                Create DID
                            </button>
                        </div>
                    )}
                </div>
                <div className='text-[10px] leading-[30px] te3xt-white mt-[16px] text-white text-center'>Gas fee represents the transaction fee for creating a DID, which is free at this stage.</div>
            </div>
        </div>
    )
}