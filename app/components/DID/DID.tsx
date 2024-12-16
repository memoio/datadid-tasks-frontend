
import CreateDID from "./CreateDID";
import DIDCreating from "./DIDCreating";
import DIDCreated from "./DIDCreated";
import { useDIDInfo } from "@/app/lib/context/DIDContext";

export default function DID() {
    const { isOpenDid, isCreatingDidState, isCreatedState } = useDIDInfo(); // Destructure properties from the context

    console.log("isOpenDid:", isOpenDid);
    console.log("isCreatingDidState:", isCreatingDidState);
    console.log("isCreatedState:", isCreatedState);

    return (
        <div>
            {isOpenDid ? (
                isCreatedState ? (
                    <DIDCreated />
                ) : isCreatingDidState ? (
                    <DIDCreating />
                ) : (
                    <CreateDID />
                )
            ) : (
                <div>No component to display</div>
            )}
            {/* <CreateDID /> */}
        </div>
    );
}
