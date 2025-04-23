'use client';
import { useDIDInfo } from "@/app/lib/context/DIDContext";
import { useWallet } from "@/app/lib/context/WalletContext";
import { paytoneOne } from "@/app/ui/fonts";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image'; // Import Image from Next.js
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Profile() {
    const { didInfo, isDIDExistState } = useDIDInfo();
    const [showPopup, setShowPopup] = useState(false); // Popup visibility state
    const { address } = useAccount();
    const { invite } = useWallet();

    const [image1Src, setImage1Src] = useState("/copy_symbol.png");
    const [image2Src, setImage2Src] = useState("/copy_symbol.png");

    const copyToClipboard = (text: string, setImageSrc: (src: string) => void) => {
        navigator.clipboard.writeText(text).then(() => {
            setImageSrc("/checked.png");
            setShowPopup(true);

            setTimeout(() => {
                setImageSrc("/copy_symbol.png");
                setShowPopup(false);
            }, 2000);
        }).catch(() => {
            alert('Failed to copy text.');
        });
    };

    function toggleWallet() {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="w-[400px]  px-4">
            <div className="border-2 rounded-[15px] px-6 py-6 border-white bg-gradient-to-b from-[#23895E] to-[#092318] flex flex-col justify-between shadow-lg">
                {/* DID Section */}
                <div className="flex justify-between items-center mb-4">
                    <div className={`${paytoneOne.className} text-white font-semibold text-[16px] leading-[36px]`}>
                        DID
                    </div>
                    <div className="flex items-center">
                        <div className={`${paytoneOne.className} text-white font-medium text-[14px] leading-[36px] mr-3`}>
                            {(isDIDExistState) ? didInfo.did.slice(0, 6) + "..." + didInfo.did.slice(-6) : "-"}
                        </div>
                        <Image
                            src={image1Src}
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px] cursor-pointer"
                            alt="copy symbol"
                            onClick={() => copyToClipboard(didInfo.did, setImage1Src)}
                        />
                    </div>
                </div>

                {/* DID Number Section */}
                <div className="flex justify-between items-center mb-4">
                    <div className={`${paytoneOne.className} text-white font-semibold text-[16px] leading-[36px]`}>
                        DID Number
                    </div>
                    <div className={`${paytoneOne.className} text-white font-medium text-[14px] leading-[36px]`}>
                        {didInfo.number}
                    </div>
                </div>

                {/* Wallet Section */}
                <div className="flex justify-between items-center mb-4">
                    <div className={`${paytoneOne.className} text-white font-semibold text-[16px] leading-[36px]`}>
                        Wallet
                    </div>
                    <div className="flex items-center">
                        <div className={`${paytoneOne.className} text-white font-medium text-[14px] leading-[36px] mr-3`}>
                            {(address) ? (address.slice(0, 6) + "..." + address.slice(-4)) : ("")}
                        </div>
                        <Image
                            src={image2Src}
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px] cursor-pointer"
                            alt="copy symbol"
                            onClick={() => copyToClipboard(address || '', setImage2Src)}
                        />
                    </div>
                </div>

                {/* Invite Code Section */}
                <div className="flex justify-between items-center mb-4">
                    <div className={`${paytoneOne.className} text-white font-semibold text-[16px] leading-[36px]`}>
                        Invite Code
                    </div>
                    <FontAwesomeIcon icon={faPenToSquare} className="text-white cursor-pointer" onClick={() => { invite(); }} />
                </div>

                {showPopup && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                        Copied to clipboard!
                    </div>
                )}
            </div>
        </div >
    )
}