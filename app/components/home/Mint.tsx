'use client';

import React from 'react';
import { useSignMessage } from 'wagmi';

export default function Sign() {
    const { signMessage, data, isPending, isError, isSuccess } = useSignMessage();
    const message = 'Hello, World!';
    return (
        <div>
            <button onClick={() => signMessage({ message })} disabled={isPending} >
                Sign Message
            </button>
            {isSuccess && <div>Signature: {data}</div>}
            {isError && <div>Error signing message</div>}
        </div>
    )
}

