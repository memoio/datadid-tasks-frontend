
import Invite from './Invite';
import Connect from './Connect';
import { useWallet } from '@/app/lib/context/WalletContext';

export default function MemoWallet() {
    const { isInvited } = useWallet();
    return (
        <div>
            {isInvited ? (
                <Invite />
            ) : (
                <Connect />
            )}
        </div>
    );
}
