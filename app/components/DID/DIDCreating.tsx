import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useDIDInfo } from "@/app/lib/context/DIDContext";

export default function DidCreating() {
    const { setIsCreatedDid } = useDIDInfo(); // Assuming setIsCreatedDid exists in DidContext

    useEffect(() => {
        // Set a timeout to call setIsCreatedDid after 3 seconds
        const timer = setTimeout(() => {
            setIsCreatedDid();
        }, 3000);
        console.log("SSSS")

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timer);
    }, [setIsCreatedDid]);

    return (
        <div className="flex justify-center items-center h-max-screen bg-dark animate-fade-in mt-[100px]">
            <div className="bg-gradient-to-r from-[#064E33] to-[#214177] px-[100px] py-[50px] rounded-md" id="box">
                <div className="flex justify-center mb-4">
                    <FontAwesomeIcon
                        icon={faClock}
                        style={{ fontSize: "50px", color: "#05F292", cursor: "pointer" }}
                    />
                </div>
                <div className="text-white text-[25px] text-center">DID is being created...</div>
            </div>
        </div>
    );
}