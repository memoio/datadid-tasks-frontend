
import React, { useEffect, useRef } from 'react'; // Import React
import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import Profile from '../Navbar/profile';
import { useWallet } from '@/app/lib/context/WalletContext';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useDIDInfo } from '@/app/lib/context/DIDContext';



export default function Home() {
    const { isShown, setIsShown } = useWallet();
    const { address, isConnected, isDisconnected } = useAccount();
    const { setToggleDid, isDIDExistState } = useDIDInfo();
    const { openConnectModal } = useConnectModal();
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                windowRef.current &&
                !windowRef.current.contains(event.target as Node)
            ) {
                setIsShown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsShown]);

    const openDid = () => {
        if (!isConnected) {
            openConnectModal?.();
            return;
        }

        setToggleDid(); // Toggle the DID state
    };

    return (
        <div>
            {/* Main Content */}
            <div className="flex flex-col w-full items-center mb-[30px] sm:mt-[16px] sm:mb-[80px] px-4"
                style={{
                    backgroundImage: 'url(/bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {isShown && (
                    <div className="fixed top-[100px]" ref={windowRef}>
                        <Profile />
                    </div>
                )}

                {/* Title */}
                <div
                    className={`${paytoneOne.className} text-white text-[28px] sm:text-[40px] md:text-[45px] lg:text-[60px] xl:text-[80px] leading-tight mt-[30px] text-center sm:text-left`}
                >
                    MEMO Data Ecosystem
                </div>

                {/* Subtitle */}
                <div className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[23px] leading-7 mt-[15px] text-center sm:text-center">
                    With data did as the core, it stimulates innovation and extensive participation, builds a complete DePIN infrastructure, ensures convenient ecological development, and helps users obtain more value and high-quality experience in the data ecosystem.
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row items-center gap-3 mt-[30px]">
                    <div
                        className={`bg-[#0079F2] text-white flex justify-center items-center rounded-full px-8 py-4  shadow-md transform hover:scale-110 transition-transform duration-300 cursor-pointer ${isDIDExistState ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => {
                            if (!isDIDExistState) {
                                openDid();
                            }
                        }}
                    >
                        <span className="font-bold text-[14px] sm:text-[16px] text-white">
                            Create DID Free
                        </span>
                    </div>
                </div>

            </div>
        </div>

    )
}

