'use client';

import Image from 'next/image';
import { paytoneOne } from '@/app/ui/fonts';

export default function Refer() {
    return (
        <div className="mt-[90px] animate-fade-in">
            {/* Heading */}
            <h1
                className={`${paytoneOne.className} text-transparent bg-clip-text bg-gradient-to-b from-[#214177] to-[#05F292] text-[34px] md:text-[48px] font-bold animate-slide-in`}>
                Referral Bonus
            </h1>
            <div className="text-[20px] text-white mt-[20px]">
                Invite friends to earn more $MEMO
            </div>
            
            {/* Content Section */}
            <div className="w-full rounded-[10px] bg-gradient-to-b from-[#064E33] to-[#214177] mt-[20px] px-[25px] py-[30px] flex  gap-10 animate-card-load">
                {/* Left Section */}
                <div>
                    <div className="text-[34px] text-white font-bold">
                        Invite Friends
                    </div>
                    {/* Card 1 */}
                    <div className="flex items-center gap-5 mt-[15px] group hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <Image
                            src="/refer.png"
                            alt="Refer Friends"
                            width={69}
                            height={87}
                            className="group-hover:rotate-[10deg] transition-transform duration-300"
                        />
                        <div>
                            <div className="text-[25px] text-white font-bold text-left">
                                Refer Your Friends
                            </div>
                            <div className="text-[18px] text-white text-left">
                                Share the link with your friends over Twitter or any other social platform.
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex items-center gap-5 mt-[15px] group hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <Image
                            src="/SBT.png"
                            alt="Get SBT"
                            width={69}
                            height={87}
                            className="group-hover:rotate-[10deg] transition-transform duration-300"
                        />
                        <div>
                            <div className="text-[25px] text-white font-bold text-left">
                                GET SBT When Users Sign Up
                            </div>
                            <div className="text-[18px] text-white text-left">
                                When your friend signs up on the app, you will receive Grass points.
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right Section */}
                <div className="bg-[#0A5C67] rounded-[10px] py-[20px] flex flex-col gap-6">
                    <div
                        className="self-center rounded-[10px] bg-[#096A62] px-[40px] py-[25px] text-white text-center cursor-pointer hover:bg-[#05F292] transition-colors duration-300">
                        133Pue10Vdyi16a
                    </div>
                    <div className="self-center text-[14px] text-white text-center cursor-pointer hover:underline">
                        https://memolabs/?referralCode=133Pue1OVdyi16a
                    </div>
                    <div
                        className="self-center bg-[#05F292] text-dark text-[18px] font-bold px-[25px] py-[15px] text-center rounded-md cursor-pointer hover:bg-[#04D582] transition-colors duration-300">
                        Copy Referral Link
                    </div>
                </div>
            </div>
        </div>
    );
}
