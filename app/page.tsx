'use client';
import Navbar from "./components/Navbar/navbar";
import HomePage from "@/app/components/home/HomePage";
import Daily from "./components/Daily/daily";
import DID from "./components/DID/DID";
import Quest from "@/app/components/Quests/page"
import CyclePage from "./components/Cycle/CyclePage";
import Activity from "./components/Cycle/Activity";
import Invite from "./components/Wallet/Invite";
import Bonus from "./components/Bonus/Bonus";
import LeaderboardPage from "./components/leaderboard/leaderboard";
import RatePage from "./components/Rate/RatePage";
// import { FlagProvider } from "@/app/lib/context/FlagContext";
import { useDIDInfo } from "@/app/lib/context/DIDContext";
import { useWallet } from "@/app/lib/context/WalletContext";
import { useAction } from "@/app/lib/context/ActionContext";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isOpenDid } = useDIDInfo();
  const { isInvited } = useWallet();
  const { joinId } = useAction();

  return (
    <div>
      <main className="bg-[#051610] px-[120px] sm:px-[100px] md:px-[120px] lg:px-[160px] xl:px-[224px] py-[20px] sm:py-[25px] md:py-[30px] lg:py-[35px] xl:py -[40px] min-h-[100vh]">
        {/* <FlagProvider> */}
        <Navbar />
        {
          isInvited ? (
            <Invite />
          ) : (isOpenDid ? (
            <DID />
          ) : (
            <div>
              <HomePage />
              <Daily />
              <Quest />
              <CyclePage />
              <Bonus />
              <LeaderboardPage />
              <RatePage />
            </div>
          )
          )
        }
        {/* </FlagProvider > */}
      </main >
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div >
  );
}
