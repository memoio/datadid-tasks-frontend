'use client';

import { useEffect } from "react";
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

// device model list
const deviceModelMap: Record<string, string> = {
  // 苹果
  "iPhone13,2": "iPhone 12",
  "iPhone14,2": "iPhone 13 Pro",
  "iPhone15,2": "iPhone 14 Pro",
  "iPhone16,1": "iPhone 15",
  "iPhone17,1": "iPhone 16",
  // 三星
  "SM-G991B": "Galaxy S21",
  "SM-G998B": "Galaxy S21 Ultra",
  "SM-A515F": "Galaxy A51",
  "SM-G973F": "Galaxy S10",
  // 华为
  "ABR-AL00": "华为 P50",
  "ANA-AN00": "华为 P40",
  "ELS-AN00": "华为 P40 Pro",
  // 小米
  "M2011K2C": "小米 11 Pro",
  "M2102K1C": "小米 11 Ultra",
  // OPPO
  "CPH2025": "OPPO Find X2 Pro",
  "CPH2173": "OPPO Find X3 Pro",
  // vivo
  "V2050": "vivo X60 Pro",
  "V2102": "vivo X70 Pro",
  // 荣耀
  "NTH-AN00": "荣耀 70 Pro",
  "BMH-AN20": "荣耀 30 Pro+"
};

// get device model from map
function getDeviceModelCode(): string {
  const ua = navigator.userAgent;
  const match = ua.match(/Build\/([^\s;]+)/i);
  if (match && match[1]) return match[1];
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPad";
  return "Unknown";
}

// send device model to ga
function sendDeviceModelToGA() {
  const code = getDeviceModelCode();
  const modelName = deviceModelMap[code] || code;

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", {
      user_properties: {
        device_model: modelName
      }
    });
    console.log("send property to GA:", modelName);
  }
}

export default function Home() {
  const { isOpenDid } = useDIDInfo();
  const { isInvited } = useWallet();
  const { joinId } = useAction();

  // 👇 add useEffect, send model to ga when first triggered
    useEffect(() => {
    sendDeviceModelToGA();
  }, []);

  return (
    <div>
      <main className="bg-[#051610] px-[16px] sm:px-[100px] md:px-[120px] lg:px-[160px] xl:px-[224px] py-[20px] sm:py-[25px] md:py-[30px] lg:py-[35px] xl:py -[40px] min-h-[100vh]">
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


