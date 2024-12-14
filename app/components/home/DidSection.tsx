'use client';

import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useDid } from "@/app/lib/context/DidContext";

export default function DidSection() {
    const { setToggleDid } = useDid();

    const openDid = () => {
        setToggleDid(); // Toggle the DID state
    };

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
                        <span className="text-[#05F292] animate-pulse">Data</span> <span>DID</span>
                    </div>
                    <div className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[23px] leading-7 mt-[15px] text-center sm:text-left">
                        Your all-in-one, privacy-preserving self-sovereign identity. Own, manage, and monetize your data!
                    </div>
                    <div className="text-white text-[12px] sm:text-[14px] mt-[15px] text-center sm:text-left">
                        Note: Users need to log in to MEMO and successfully mint DID before they can participate in earning points.
                    </div>
                    <div className="text-center flex justify-center sm:justify-start">
                        <div
                            onClick={openDid}
                            className="w-[150px] bg-[#05F292] flex justify-center items-center rounded-full px-4 py-2 mt-5 shadow-md transform hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                            <span className="font-bold text-[14px] sm:text-[16px] text-white">
                                Create DID
                            </span>
                        </div>
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
            <div className="rounded-full px-[20px] py-[10px]"></div>
        </div>
    );
}
