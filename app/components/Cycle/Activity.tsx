'use client';

import { paytoneOne } from '@/app/ui/fonts';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { useAuth } from "@/app/lib/context/AuthContext";
import { useAction } from '@/app/lib/context/ActionContext';
import { cards } from "./CyclePage";
import { API_URL } from '../config/config';

export default function Activity({ joinId }: { joinId: number }) {

    const [dailyLoading, setDailyLoading] = useState(false);
    const [dailyOpIndex, setDailyOpIndex] = useState(-1);
    const [onetimeLoading, setOnetimeLoading] = useState(false);
    const [onetimeOpIndex, setOnetimeOpIndex] = useState(-1);
    const [popupData, setPopupData] = useState<{ label: string; reward: number } | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for the alert
    const { leaveProject, cycleAction, setCycle, setDaily, userInfos, setPointUpdate, dailyAction } = useAction();
    const router = useRouter();
    const { uidInfo, isExist, setBindWallet } = useAuth();

    const dailyTasks = [
        { id: 'task4', label: 'Share task links on Twitter', reward: 20 },
        { id: 'task5', label: 'Share the  task link to the TG group', reward: 20 },
    ];

    const onetimeTasks = [
        { id: "task1", label: "Follow Twitter", reward: 50 },
        { id: "task2", label: "Join Telegram", reward: 50 },
        { id: "task3", label: "Visit Website", reward: 50 },
    ];

    const urls = [
        { id: 1, links: [{ url: "https://x.com/MetisL2" }, { url: "https://t.me/MetisL" }, { url: "https://www.metis.io/" },] },
        { id: 2, links: [{ url: "https://x.com/arkreen_network" }, { url: "https://t.me/arkreen_network" }, { url: "https://www.arkreen.com/" },] },
        { id: 3, links: [{ url: "https://x.com/zCloakNetwork" }, { url: "https://t.me/memolabsio" }, { url: "https://zcloak.network/" },] },
        { id: 4, links: [{ url: "https://x.com/Adot_web3" }, { url: "https://t.me/AdotWeb3_Official" }, { url: "https://www.a.xyz/" },] },
        { id: 5, links: [{ url: "https://x.com/Infinitar_MOBA" }, { url: "https://t.me/infinitar_MOBA" }, { url: "https://www.infinitar.com/#/" },] },
        { id: 6, links: [{ url: "https://x.com/Odyssey_ODS" }, { url: "https://t.me/odyssey_global" }, { url: "https://odysseyglobal.io/#/" },] },
        { id: 7, links: [{ url: "https://x.com/ULTILAND" }, { url: "https://t.me/ULTILAND_RWA" }, { url: "https://www.ultiland.io/" },] },
        { id: 8, links: [{ url: "https://x.com/Donetwork_club" }, { url: "https://t.me/DoNetworkclub" }, { url: "https://www.donetwork.io/#/pc/Index" },] },
        { id: 9, links: [{ url: "https://x.com/flock_io" }, { url: "https://t.me/flock_io_community" }, { url: "https://www.flock.io/" },] },
        { id: 10, links: [{ url: "https://x.com/DIDbased" }, { url: "https://t.me/memolabsio" }, { url: "https://d.id/" },] },
        { id: 11, links: [{ url: "https://x.com/Meter_IO" }, { url: "https://t.me/Meter_IO" }, { url: "https://meter.io/" },] },
        { id: 12, links: [{ url: "https://x.com/flapdotsh" }, { url: "https://t.me/FlapOfficial" }, { url: "https://flap.sh/" },] },
        { id: 13, links: [{ url: "https://x.com/ccarbonWorld" }, { url: "https://ccarbon.world/" }, { url: "https://ccarbon.world/" },] },
        { id: 14, links: [{ url: "https://x.com/onlylayer" }, { url: "https://t.me/onlylayer" }, { url: "https://onlylayer.com/" },] },
        { id: 15, links: [{ url: "https://x.com/ClusterProtocol" }, { url: "https://t.me/clusterprotocolchat" }, { url: "https://www.clusterprotocol.ai/" },] },
        { id: 16, links: [{ url: "https://x.com/swan_chain" }, { url: "https://t.me/swan_chain/1" }, { url: "https://swanchain.io/" },] },
        { id: 17, links: [{ url: "https://x.com/4everland_org" }, { url: "https://t.me/org_4everland" }, { url: "https://www.4everland.org/" },] },
        { id: 18, links: [{ url: "https://x.com/aidappcom" }, { url: "https://t.me/aidappcom" }, { url: "https://www.aidapp.com/" },] },
        { id: 19, links: [{ url: "https://x.com/SugreNetwork" }, { url: "https://t.me/SugreNetwork" }, { url: "https://www.sugre.xyz/" },] },
        { id: 20, links: [{ url: "https://x.com/ESCC_io" }, { url: "https://t.me/ESCCIO" }, { url: "https://www.escc.io/" },] },
    ];

    const handleTaskClick = async (task: { id: string; label: string; reward: number }, taskId: number) => {
        // const data = TaskData{}
        if (!isExist) {
            setBindWallet();
        }
        if (isExist && joinId > -1 && !cycleAction.some((t) => t.projectId === joinId && t.taskId === taskId)) {
            try {
                console.log("ID", joinId, taskId);
                const actionId = 1011 + 10 * joinId + taskId;
                console.log(actionId, joinId, taskId);
                const respond = await axios.post(API_URL.AIRDROP_RECORD_ADD, {
                    "action": actionId
                }, {
                    headers: {
                        "accept": "application/hal+json",
                        "Content-Type": "application/json",
                        "uid": uidInfo?.uid,
                        "token": uidInfo?.token
                    }
                });

                if (respond.status === 200) {
                    setCycle(joinId, taskId);
                    setDaily(actionId);
                    setPopupData(task);
                    setPointUpdate(true)
                }
            } catch (error) {
                setOnetimeLoading(false);
                setOnetimeOpIndex(-1);
                setDailyLoading(false);
                setDailyOpIndex(-1);

                alert(error);
            }
        }
    };

    const navigateToLink = (projectId: number, taskId: number) => {
        // router.push(tasks[index].url);
        console.log(projectId);
        window.open(urls[projectId].links[taskId].url, '_blank');
    };

    const closePopup = () => setPopupData(null);

    const copyToClipboard = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const textToCopy = element.textContent || '';
            navigator.clipboard.writeText(textToCopy).then(() => {
                setAlertMessage(`Referral Code Copied! ${textToCopy}`,); // Show the alert
                setTimeout(() => setAlertMessage(null), 3000); // Hide after 3 seconds
            }).catch((err) => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy text.');
            });
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div
                style={{
                    backgroundImage: 'url(/activity_bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="min-h-screen px-4 flex justify-center items-center"
            >
                <div className="rounded-lg  max-w-[100%] lg:max-w-[80%] relative animate-fade-in">
                    <div className="flex mt-[20px] justify-between items-center">
                        <Image
                            src="/Arrow_left.png"
                            alt="arrow"
                            width={24}
                            height={24}
                            className="cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => {
                                router.push('/');
                                leaveProject();
                            }}
                        />
                    </div>

                    {joinId > -1 ? (
                        <div className="flex flex-col sm:flex-row items-center rounded-lg mt-6 px-4 py-6 animate-slide-in">
                            <Image
                                src={cards[joinId].imgSrc}
                                alt={cards[joinId].name}
                                width={120}
                                height={120}
                                className="mb-4 sm:mb-0 sm:mr-6"
                            />
                            <div>
                                <div className={`${paytoneOne.className} text-white text-xl sm:text-2xl`}>
                                    {cards[joinId].name || "No Activity"}
                                </div>
                                <div className="text-white text-[15px] sm:text-lg">
                                    {cards[joinId].text}
                                </div>
                                <div className="flex flex-row sm:flex-row justify-between items-center mt-[20px] gap-2">
                                    <div className="text-white text-[10px] sm:text-[15px] break-all sm:break-normal text-center" id="copy">
                                        https://data.memolabs.org/projects/{joinId || 0}?referralCode={userInfos.invideCode}
                                    </div>
                                    <Image
                                        src="/copy_symbol.png"
                                        width={18}
                                        height={18}
                                        className="w-[18px] h-[18px] cursor-pointer"
                                        alt="copy symbol"
                                        onClick={() => copyToClipboard('copy')}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-white text-sm sm:text-base mt-6 text-center">
                            No joined cards available.
                        </div>
                    )}
                    <div className={`${paytoneOne.className} text-white text-lg sm:text-xl mt-6`}>Daily Tasks</div>
                    <div className=" rounded-lg mt-4 px-4 py-6 space-y-4 animate-fade-in">
                        {dailyTasks.map((task, index) => (
                            <div
                                key={task.id}
                                className="bg-gradient-to-r from-[#082B5A] to-[#064D33] px-6 py-4 flex justify-between items-center rounded-lg transition-transform hover:scale-105"
                            >
                                <div className="text-white text-[15px] sm:text-lg">{task.label}</div>
                                <div className=' flex justify-between items-center'>
                                    {dailyLoading && dailyOpIndex == index + 3 &&
                                        <svg className="mr-2 w-10 h-10 p-0 m-0 animate-spin text-white" viewBox="0 0 50 50">
                                            <circle className="opacity-25" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <circle className="opacity-75" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.415, 31.415" strokeLinecap="round" />
                                        </svg>
                                    }
                                    {cycleAction.some((t) => t.projectId === joinId && t.taskId === index + 3 && dailyAction.has(1011 + joinId * 10 + index + 3)) ? (
                                        <Image src="/checked.png" alt="Checked" width={28} height={28} className='cursor-pointer' />
                                    ) : (
                                        <div
                                            className="bg-[#62EDB5] text-black text-sm sm:text-base font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-[#4AC18A] transition-colors"
                                            onClick={async (e) => {
                                                e.preventDefault();

                                                setDailyOpIndex(-1);
                                                setDailyLoading(true);
                                                setDailyOpIndex(index + 3);
                                                navigateToLink(joinId, index);
                                                await handleTaskClick(task, index + 3);
                                                setDailyLoading(false);
                                                setDailyOpIndex(-1);
                                            }}

                                        >

                                            +{task.reward}
                                        </div>
                                    )} </div>
                            </div>
                        ))}
                    </div>
                    <div className={`${paytoneOne.className} text-white text-lg sm:text-xl mt-6`}>One-time Tasks</div>
                    <div className="rounded-lg mt-4 px-4 py-6 space-y-4 animate-fade-in">
                        {onetimeTasks.map((task, index) => (
                            <div
                                key={task.id}
                                className="bg-gradient-to-r from-[#082B5A] to-[#064D33] px-6 py-4 flex justify-between items-center rounded-lg transition-transform hover:scale-105"
                            >
                                <div className="text-white text-base sm:text-lg">{task.label}</div>
                                <div className=' flex justify-between items-center'>
                                    {onetimeLoading && onetimeOpIndex == index &&
                                        <svg className="mr-2 w-10 h-10 p-0 m-0 animate-spin text-white" viewBox="0 0 50 50">
                                            <circle className="opacity-25" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <circle className="opacity-75" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.415, 31.415" strokeLinecap="round" />
                                        </svg>
                                    }
                                    {cycleAction.some((t) => t.projectId === joinId && t.taskId === index) ? (
                                        <Image src="/checked.png" alt="Checked" width={28} height={28} className='cursor-pointer' />
                                    ) : (
                                        <div
                                            className="bg-[#62EDB5] text-black text-sm sm:text-base font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-[#4AC18A] transition-colors"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                setOnetimeOpIndex(-1);
                                                setOnetimeLoading(true);
                                                setOnetimeOpIndex(index);
                                                navigateToLink(joinId, index);
                                                await handleTaskClick(task, index);
                                                setOnetimeLoading(false);
                                                setOnetimeOpIndex(-1);

                                            }}
                                        >

                                            +{task.reward}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {popupData && (
                        <div
                            onClick={closePopup}
                            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-gradient-to-b from-[#214177] to-[#064E33] text-white rounded-lg shadow-lg px-2 sm:px-6 py-6 w-[70%] sm:w-[300px]"
                            >
                                <h3 className="text-lg font-bold text-center">{popupData.label}</h3>
                                <p className="text-base mt-4 text-center">+{popupData.reward} Rewards</p>
                                <button
                                    onClick={closePopup}
                                    className="bg-[#05F292] text-black text-sm sm:text-base font-bold px-6 py-2 mt-4 rounded-full w-full hover:bg-[#04C27C] transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {/* Alert message container */}
                {
                    alertMessage && (
                        <div
                            className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-300"
                            style={{ opacity: alertMessage ? 1 : 0 }}
                        >
                            {alertMessage}
                        </div>
                    )
                }
            </div >
        </div >
    );
}
