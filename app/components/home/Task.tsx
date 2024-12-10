'use client';

import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Task() {
    return (
        <div className="relative">
            {/* Background container with image and opacity */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[50vw] h-[50vh] md:w-[60vw] md:h-[100vh] lg:w-[60vw] opacity-10 animate-pulse"></div>
            </div>

            {/* Main content */}
            <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full h-auto relative z-10">
                {/* Left Section */}
                <div className="flex flex-col w-full relative z-10">
                    <div
                        className={`${paytoneOne.className} text-white text-[40px] sm:text-[40px] md:text-[45px] lg:text-[60px] xl:text-[80px] leading-tight mt-[30px] text-center sm:text-left`}
                    >
                        Task To Earn
                        <span className="text-[#05F292] animate-pulse"> $Memo </span>
                        <span>AirDrop</span>
                    </div>
                    <div className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[23px] leading-7 mt-[15px] text-center sm:text-left">
                        Claim your SBT, which unlocks future airdrop rewards.
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-3 mt-[30px]">
                        {['Complete Tasks', 'Earn SBT', 'Receive Airdrop'].map((text, index) => (
                            <div key={index} className="flex items-center">
                                <div
                                    className="bg-gradient-to-b from-[#092318] to-[#23895E] rounded-full px-[22px] py-[10px] text-center w-[80%] md:w-auto transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer mr-[10px]"
                                >
                                    {text}
                                </div>
                                {index !== 2 && (
                                    <Image
                                        src="/arrow.png"
                                        width={40}
                                        height={1}
                                        alt="arrow"
                                        className="h-[7px] hidden md:block animate-bounce"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                </div>

                {/* Right Section (Images) */}
                <div className="flex w-full mt-[50px] xl:mt-[0px] px-[20px] md:px-[0px] relative z-10">
                    <Image
                        src="/airdrop_1.png"
                        width={171}
                        height={248}
                        className="w-[20%] h-auto object-contain cursor-pointer mb-[120px] transform hover:scale-110 transition-transform duration-300 ease-in-out"
                        alt="airdrop"
                    />
                    <Image
                        src="/memo_logo.png"
                        width={287}
                        height={287}
                        className="w-[60%] h-auto object-contain cursor-pointer transform hover:rotate-6 transition-transform duration-300 ease-in-out"
                        alt="memo logo"
                    />
                    <Image
                        src="/airdrop_2.png"
                        width={116}
                        height={164}
                        className="w-[20%] h-auto object-contain cursor-pointer mb-[50px] transform hover:scale-110 transition-transform duration-300 ease-in-out"
                        alt="airdrop"
                    />
                </div>
            </div>

        </div>
    );
}
