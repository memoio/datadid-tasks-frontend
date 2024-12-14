'use client'

import { paytoneOne } from "@/app/ui/fonts";
import Image from 'next/image';
import { useWallet } from '@/app/lib/context/WalletContext';
import { useAuth } from '@/app/lib/context/AuthContext';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function ConnectedWallet() {
    const { toggleWallet, showWallet } = useWallet();
    const { disconnected } = useAuth();
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

    const disConnect = () => {
        toggleWallet();
        disconnected();
        showWallet();
    };

    const copyToClipboard = () => {
        const textElement = document.getElementById('copy_txt');
        if (textElement) {
            const textToCopy = textElement.textContent || '';
            navigator.clipboard.writeText(textToCopy).then(() => {
                setShowPopup(true); // Show popup
                setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
            }).catch(() => {
                alert('Failed to copy text.');
            });
        }
    };

    return (
        <div className="w-full sm:w-[320px] h-[200px] mt-[20px]">
            <div className="border-2 rounded-[15px] px-[24px] py-[24px] border-white bg-gradient-to-b from-[#23895E] to-[#092318] flex flex-col justify-between shadow-lg">
                {/* Wallet Section */}
                <div className="flex justify-between items-center mb-4">
                    <div className={`${paytoneOne.className} text-white font-semibold text-[16px] leading-[36px]`}>
                        Wallet
                    </div>
                    <div className="flex items-center">
                        <div className={`${paytoneOne.className} text-white font-medium text-[14px] leading-[36px] mr-[12px]`} id="copy_txt">
                            0x06B45...1Bb10
                        </div>
                        <Image
                            src="/copy_symbol.png"
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px] cursor-pointer"
                            alt="copy symbol"
                            id="copy_icon"
                            onClick={copyToClipboard}
                        />
                    </div>
                </div>

                {/* Disconnect Button */}
                <div onClick={disConnect} className={`${paytoneOne.className} bg-[#05F292] text-white text-[14px] font-semibold rounded-full text-center py-[10px] cursor-pointer transition-all duration-300 hover:bg-[#04C27C]`}>
                    Disconnect
                </div>
            </div>

            {/* Popup Box */}
            {showPopup && (
                <div className="fixed bottom-4 right-4 bg-[#04D582] text-white text-[14px] sm:text-[16px] md:text-[18px] px-6 py-4 rounded-md shadow-lg flex items-center gap-3 animate-slide-in-up z-[50]">
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "white" }} />
                    <p>Address copied to clipboard!</p>
                </div>
            )}
        </div>
    );
}
