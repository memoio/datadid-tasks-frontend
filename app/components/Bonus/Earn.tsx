'use client';

import Image from 'next/image';
import { paytoneOne } from '@/app/ui/fonts';

export default function Earn() {
    return (
        <div className="animate-fade-in">
            {/* Heading */}
            <h1
                className={`${paytoneOne.className} text-transparent bg-clip-text text-white text-[34px] md:text-[48px] font-bold animate-slide-in mt-[50px]`}>
                Play to Earn
            </h1>
            <div className="text-[20px] text-white mt-[20px]">
                Experience the mini-games in TG and get more rewards!
            </div>

            {/* Content Section */}
            <div className="w-full rounded-[10px] bg-gradient-to-br from-[#064E33] to-[#214177] mt-[25px] px-[25px] py-[30px] animate-card-load">
                <div className="flex flex-col md:flex-row items-center justify-between gap-1">
                    {/* Left Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-7 group cursor-pointer">
                        <Image
                            src="/Earn.png"
                            alt="Earn"
                            width={126}
                            height={112}
                            className="group-hover:scale-105 group-hover:rotate-[3deg] transition-transform duration-300"
                        />
                        <div className='mr-[10px]'>
                            <div className="text-[23px] text-white font-bold group-hover:scale-105 transition-transform duration-300
                             text-center sm:text-left">
                                ${"MEMOGAME is Telegram's smartest AI algorithm protocol!"}
                            </div>
                            <div className="text-[20px] text-white text-center sm:text-left">
                                Click to earn points!
                            </div>
                            <div className="text-[15px] text-white group-hover:opacity-75 transition-opacity duration-300 text-center sm:text-left">
                                @MemoGame hot
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div
                        className="bg-[#0079F2] text-white text-[18px] font-bold text-center px-[25px] py-[20px] hover:bg-[#04D582] hover:scale-105 transition-transform duration-300 rounded-[10px]"
                        style={{ pointerEvents: 'none', opacity: '0.5' }}
                    >
                        Comming Soon
                    </div>
                </div>
            </div>
        </div>
    );
}
