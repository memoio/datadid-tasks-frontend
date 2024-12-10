import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Mint() {
    return (
        <div className='mt-[97px] flex justify-center bg-dark' >
            <div className="border-[3px] rounded-[11px] border-white px-[38px] py-[26px] bg-gradient-to-r from-[#064E33] to-[#214177]">
                <div className={`${paytoneOne.className} text-white text-[20px] leading-[30px]`}>MEMO DID</div>
                <div className='rounded-[10px] mt-[25px] px-[5px]'>
                    <Image src="/NFT_bg.png" alt="alt" width={483} height={233} />
                </div>
                <div className='flex justify-between mt-[16px]'>
                    <div className='text-[16px] text-white leading-[30px]'>Mint To</div>
                    <div className='text-[16px] text-white leading-[30px]'>0xb189...nh79</div>
                </div>
                <div className='flex justify-between mt-[16px]'>
                    <div className='text-[16px] text-white leading-[30px]'>Play With</div>
                    <div className='text-[16px] text-white leading-[30px]'>0.00 MEMO</div>
                </div>
                <div className='flex justify-between mt-[16px]'>
                    <div className='text-[16px] text-white leading-[30px]'>Total</div>
                    <div className='text-[16px] text-white leading-[30px]'>0.00 MEMO + GAS FEE</div>
                </div>
                <div className='w-full py-[9px] text-center text-[16px] rounded-full font-bold bg-[#05F292]  mt-[10px]'>Mint</div>
                <div className='text-[10px] leading-[30px] te3xt-white mt-[16px] text-white text-center'>Total cost includes gas fees for Smart Account deployment, NFT mining and future profile upgrades.</div>
            </div>
        </div>
    )
}