import { paytoneOne } from '@/app/ui/fonts';
import React, { useState } from "react";
import Image from 'next/image';

export default function Mint() {
    const [clicked, setClicked] = useState({
        sbt1: false,
        sbt2: false,
        sbt3: false,
      });
    
      const handleClick = (id: string) => {
        setClicked((prev) => ({ ...prev, [id]: true }));
      };

    return(
        <div style={{
            backgroundImage: 'url(/activity_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className='mt-[97px] flex justify-center bg-gradient-to-br from-[#064E33] to-[#214177] w-[60%] mx-[20%]' >
                <div className="border-[3px] rounded-[11px] border-white px-[38px] py-[26px] bg-gradient-to-r from-[#064E33] to-[#214177]">
                    <div className='flex justify-between items-center'>
                        <div className={`${paytoneOne.className} text-white text-[31px] leading-[29px]`}>Harmony</div>
                        <Image src="/Close.png" alt="alt" width={24} height={24} />
                    </div>
                    <div className='px-[18px] py-[22px] flex items-center border-[1px] border-white r   ounded-[8px] mt-[25px]'>
                        <Image src="/Harmony.png" alt="Harmony" width={131} height={131} className='mr-[30px]' />
                        <div>
                        <div className="flex justify-between">
                            <div className={`${paytoneOne.className} text-white text-[24px]`}>Harmony</div>
                            <div
                                className="bg-[#62EDB5] text-black font-bold text-[14px] rounded-full text-center px-[10px] py-[8px]"
                            >
                                +1000 SBT
                            </div>
                        </div>

                            <div className='flex mt-[10px]'>
                                <Image src="/globe.png" alt="globe" width={36} height={36} className='mr-[20px]' />
                                <Image src="/telegram.png" alt="telegram" width={36} height={36} className='mr-[20px]' />
                                <Image src="/twitter.png" alt="twitter" width={36} height={36} className='mr-[20px]' />
                            </div>
                            <div className='text-white text-[14px] leading-[22px] mt-[5px]'>
                                Harmony is an open and fast blockchain. Our mainnet runs Ethereum applications with 2-second transaction finality and 100 times lower fees
                            </div>
                        </div>
                    </div>
                    <div className={`${paytoneOne.className} text-white text-[25px] leading-[29px] mt-[10px]`}>Task</div>
                    <div className='px-[18px] py-[22px] border-[1px] border-white rounded-[8px] mt-[25px]'>
                        <div className='bg-gradient-to-r from-[#082B5A] to-[#064D33] px-[26px] py-[14px] mb-[15px] flex justify-between items-center' onClick={() => handleClick("sbt1")}>
                            <div className='text-white text-[18px] leading-[22px]'>Follow Harmony On Twitter</div>
                            {clicked.sbt1 ? (
                                <Image
                                    src="/checked.png"
                                    alt="alt"
                                    width={28}
                                    height={28}
                                    className="w-[28px] h-[28px]"
                                />
                                ) : (
                                <div
                                    className="bg-[#62EDB5] text-black text-[14px] font-bold leading-[32.6px] px-[19px] py-[5px] rounded-full"
                                    id="sbt1"
                                >
                                    +400 SBT
                                </div>
                            )}
                        </div>
                        <div className='bg-gradient-to-r from-[#082B5A] to-[#064D33] px-[26px] py-[14px] mb-[15px] flex justify-between items-center' onClick={() => handleClick("sbt2")}>
                            <div className='text-white text-[18px] leading-[22px]'>Retweet The Tweet</div>
                            {clicked.sbt2 ? (
                                <Image
                                    src="/checked.png"
                                    alt="alt"
                                    width={28}
                                    height={28}
                                    className="w-[28px] h-[28px]"
                                />
                                ) : (
                                <div
                                    className="bg-[#62EDB5] text-black text-[14px] font-bold leading-[32.6px] px-[19px] py-[5px] rounded-full"
                                    id="sbt2"
                                >
                                    +300 SBT
                                </div>
                            )}
                        </div>
                        <div className='bg-gradient-to-r from-[#082B5A] to-[#064D33] px-[26px] py-[14px] flex justify-between items-center' onClick={() => handleClick("sbt3")}>
                            <div className='text-white text-[18px] leading-[22px]'>Visit The Harmony Website</div>
                            {clicked.sbt3 ? (
                                <Image
                                    src="/checked.png"
                                    alt="alt"
                                    width={28}
                                    height={28}
                                    className="w-[28px] h-[28px]"
                                />
                                ) : (
                                <div
                                    className="bg-[#62EDB5] text-black text-[14px] font-bold leading-[32.6px] px-[19px] py-[5px] rounded-full"
                                    id="sbt3"
                                >
                                    +400 SBT
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}