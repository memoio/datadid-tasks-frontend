import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useWallet } from "@/app/lib/context/WalletContext";

export default function Connect() {
    const { chooseWallet, walletId, toggleWallet, invite } = useWallet(); // Access walletId from the context
    const [selectedWallet, setSelectedWallet] = useState(walletId || ""); // Initialize with the context value

    const wallets = [
        { id: "metamask", name: "MetaMask", icon: "/metamask.png" },
        { id: "unisat", name: "UniSat Wallet", icon: "/sol-wallet.png" },
        { id: "solana", name: "Solana", icon: "/unisat.png" },
    ];

    const handleSelect = (id: string) => {
        setSelectedWallet(id);
        chooseWallet(id);// Update the wallet ID in the context
        invite();
    };

    return (
        <div className="w-[80%] lg:w-[40%] mt-[100px] px-[30px] pt-[20px] pb-[10px] mx-auto bg-gradient-to-bl from-[#061B13] to-[#064E33] rounded-lg">
            <div className="flex justify-between pb-[20px]">
                <div></div>
                <div className="text-[25px] text-white pt-[15px]">Connect Wallet</div>
                <FontAwesomeIcon
                    icon={faXmark}
                    size="2xl"
                    onClick={toggleWallet}
                    style={{ color: "white", cursor: "pointer" }}
                />
            </div>
            <div className="text-white">Secure connection to digital assets and enjoy a convenient trading experience.</div>
            <div className="mt-[20px]">
                {wallets.map((wallet) => (
                    <div
                        key={wallet.id}
                        onClick={() => handleSelect(wallet.id)}
                        className={`rounded-[10px] flex justify-between gap-[15px] items-center mb-[15px] p-[10px] cursor-pointer ${
                            selectedWallet === wallet.id ? "bg-[#01110A]" : "bg-transparent"
                        }`}
                    >
                        <div className="flex items-center gap-[15px]">
                            <Image src={wallet.icon} alt={wallet.name} width={40} height={40} />
                            <div className="text-[26px] text-white font-bold">{wallet.name}</div>
                        </div>
                        {selectedWallet === wallet.id && (
                            <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: "white" }} />
                        )}
                    </div>
                ))}
            </div>
            <div className="text-white text-[12px]">
                Connecting to the wallet signifies agreements to service terms.
            </div>
        </div>
    );
}
