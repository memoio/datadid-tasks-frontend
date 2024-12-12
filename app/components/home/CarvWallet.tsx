'use client'

import { paytoneOne } from "@/app/ui/fonts";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CarvWallet() {
    return (
        <div className="w-full sm:w-[320px] h-[200px] mt-[20px]">
            <div className="border-2 rounded-[15px] px-[24px] py-[24px] border-white bg-gradient-to-b from-[#23895E] to-[#092318] flex flex-col justify-between shadow-lg">

                {/* Wallet Section */}
                <div className="flex justify-between items-center mb-4">
                    <div className={`${paytoneOne.className} text-white font-semibold text-[16px] leading-[36px]`}>
                        Wallet
                    </div>
                    <div className="flex items-center">
                       <ConnectButton />
                    </div>
                </div>

                {/* Disconnect Button */}
                <div className={`${paytoneOne.className} bg-[#05F292] text-white text-[14px] font-semibold rounded-full text-center py-[10px] cursor-pointer transition-all duration-300 hover:bg-[#04C27C]`}>
                    Disconnect
                </div>
            </div>
        </div>
    );
}
