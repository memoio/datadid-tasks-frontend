
import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Home() {
    return (
        <div>

    {/* Main Content */}
    <div className="flex flex-col w-full items-center mb-[30px] sm:mb-[100px] px-4">
        {/* Title */}
        <div
            className={`${paytoneOne.className} text-white text-[28px] sm:text-[40px] md:text-[45px] lg:text-[60px] xl:text-[80px] leading-tight mt-[30px] text-center sm:text-left`}
        >
            Task to earn AirDrop
        </div>

        {/* Subtitle */}
        <div className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[23px] leading-7 mt-[15px] text-center sm:text-left">
            Claim your Points, which unlocks future airdrop rewards.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-3 mt-[30px]">
            {['Complete Tasks', 'Earn Points', 'Receive Airdrop'].map((text, index) => (
                <div key={index} className="flex items-center w-full sm:w-auto">
                    <div
                        className="bg-gradient-to-b from-[#092318] to-[#23895E] rounded-full px-[22px] py-[10px] text-center w-full sm:w-auto transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer mr-[10px] text-[12px]"
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
</div>

    )
} 
 
                    