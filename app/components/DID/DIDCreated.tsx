
import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useDIDInfo } from "@/app/lib/context/DIDContext";

export default function DIDCreated() {
    const { setToggleDid, didInfo } = useDIDInfo();

    // Correctly define the closeDid function
    const closeDid = () => {
        setToggleDid(); // Toggle the DID state when "OK" is clicked
    };

    return (
        <div className="mt-[40px] flex justify-center bg-dark animate-fade-in">
            <div className="border-[3px] rounded-[11px] border-white px-[38px] py-[26px] bg-gradient-to-r from-[#064E33] to-[#214177] shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div
                    className={`${paytoneOne.className} text-white text-[20px] leading-[30px] animate-slide-down`}
                >
                    Data DID
                </div>
                <div className="rounded-[10px] mt-[25px] px-[5px]">
                    <Image
                        src="/NFT_bg.png"
                        alt="NFT Background"
                        width={483}
                        height={233}
                        className="rounded-md transform hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="text-[15px] text-white mt-[16px] text-left animate-fade-in">
                    {didInfo.number}
                </div>
                <div
                    className="text-[13px] leading-[30px] text-white mt-[5px] text-left animate-fade-in"
                >
                    {didInfo.did}
                </div>
                <div
                    onClick={closeDid}
                    className="w-full py-[9px] text-center text-[16px] rounded-full font-bold bg-[#05F292] mt-[10px] cursor-pointer transform hover:scale-110 transition-transform duration-300 shadow-md"
                >
                    OK
                </div>
            </div>
        </div>
    );
}
