'use client'

import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useAccount } from 'wagmi';

export default function CreateDID() {
    const { isConnected, address } = useAccount();
    const currentAddress = isConnected ? address.slice(0,6) + '...' + address.slice(-4) : '0x0000...0000'
    return (
        <div className='mt-[97px] flex justify-center bg-dark' >
            <div className="border-[3px] rounded-[11px] border-white px-[38px] py-[26px] bg-gradient-to-r from-[#064E33] to-[#214177]">
                <div className={`${paytoneOne.className} text-white text-[20px] leading-[30px]`}>Data DID</div>
                <div className='rounded-[10px] mt-[25px] px-[5px]'>
                    <Image src="/NFT_bg.png" alt="alt" width={483} height={233} />
                </div>
                <div className='flex justify-between mt-[16px]'>
                    <div className='text-[16px] text-white leading-[30px]'>Create For</div>
                    <div className='text-[16px] text-white leading-[30px]'>{currentAddress}</div>
                </div>
                <div className='flex justify-between mt-[16px]'>
                    <div className='text-[16px] text-white leading-[30px]'>Gas Fee</div>
                    <div className='text-[16px] text-white leading-[30px]'>0.00 MEMO</div>
                </div>
                <div className='w-full py-[9px] text-center text-[16px] rounded-full font-bold bg-[#05F292]  mt-[10px]'>Create DID</div>
                <div className='text-[10px] leading-[30px] te3xt-white mt-[16px] text-white text-center'>Gas fee represents the transaction fee for creating a DID, which is free at this stage.</div>
            </div>
        </div>
    )
}