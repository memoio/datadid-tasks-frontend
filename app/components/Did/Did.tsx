import CreateDid from "./CreateDid";
import DidCreating from "./DidCreating";
import DidCreated from "./DidCreated";
import { useDid } from "@/app/lib/context/DidContext";

export default function Did() {
    const { isOpenDid, isCreatingDidState, isCreatedState } = useDid(); // Destructure properties from the context

    console.log("isOpenDid:", isOpenDid);
    console.log("isCreatingDidState:", isCreatingDidState);
    console.log("isCreatedState:", isCreatedState);

    return (
        <div>
            {isOpenDid ? (
                isCreatedState ? (
                    <DidCreated />
                ) : isCreatingDidState ? (
                    <DidCreating />
                ) : (
                    <CreateDid />
                )
            ) : (
                <div>No component to display</div>
            )}
        </div>
    );
}
