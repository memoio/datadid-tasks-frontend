import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';
import { useDid } from "@/app/lib/context/DidContext";

export default function CreateDid() {
    const { setIsCreatingDid } = useDid();

    const handleCreateDid = () => {
        setIsCreatingDid(); // Update the state to show DidCreating
    };

    return (
        <div className="mt-[40px] flex justify-center bg-dark animate-fade-in">
            <div className="border-[3px] rounded-[11px] px-[38px] py-[26px] bg-gradient-to-r from-[#064E33] to-[#214177] shadow-lg transform hover:scale-105 transition-transform duration-300">
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
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Network</div>
                    <div className="text-[16px] text-white leading-[30px]">Polygon</div>
                </div>
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Mint To</div>
                    <div className="text-[16px] text-white leading-[30px]">0xb189...nh79</div>
                </div>
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Play With</div>
                    <div className="text-[16px] text-white leading-[30px]">0.00 MEMO</div>
                </div>
                <div className="flex justify-between mt-[16px] animate-fade-in-delay">
                    <div className="text-[16px] text-white leading-[30px]">Total</div>
                    <div className="text-[16px] text-white leading-[30px]">0.00 MEMO + GAS FEE</div>
                </div>
                <div
                    onClick={handleCreateDid}
                    className="w-full py-[9px] text-center text-[16px] rounded-full font-bold bg-[#05F292] mt-[10px] cursor-pointer transform hover:scale-110 transition-transform duration-300 shadow-md"
                >
                    Create
                </div>
                <div
                    className="text-[10px] leading-[30px] text-white mt-[16px] text-center animate-fade-in"
                >
                    Total cost includes gas fees for Smart Account deployment, NFT minting, and future profile upgrades.
                </div>
            </div>
        </div>
    );
}
