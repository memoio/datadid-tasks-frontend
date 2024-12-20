'use client';

import { paytoneOne } from '@/app/ui/fonts';
import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { useUser } from "@/app/lib/context/AuthContext";
import { useAction } from '../../lib/context/ActionContext';
import { cards } from "./CyclePage";

export default function Activity() {
    const [popupData, setPopupData] = useState<{ label: string; reward: number } | null>(null);

    const { joinId, leaveProject, cycleAction, setCycle } = useAction();
    // const router = useRouter();
    const { userInfo } = useUser();

    const tasks = [
        { id: "task1", label: "Follow Twitter", reward: 50 },
        { id: "task2", label: "Join Telegram", reward: 50 },
        { id: "task3", label: "Visit Website", reward: 50 },
    ];

    const urls = [
        { id: 1, links: [{ url: "https://x.com/MetisL2" }, { url: "https://t.me/MetisL" }, { url: "https://www.metis.io/" },] },
        { id: 2, links: [{ url: "https://x.com/arkreen_network" }, { url: "https://t.me/arkreen_network" }, { url: "https://www.arkreen.com/" },] },
        { id: 3, links: [{ url: "https://x.com/zCloakNetwork" }, { url: "https://discord.com/invite/wcKt6MDRJz" }, { url: "https://zcloak.network/" },] },
        { id: 4, links: [{ url: "https://x.com/Adot_web3" }, { url: "https://t.me/AdotWeb3_Official" }, { url: "https://www.a.xyz/" },] },
        { id: 5, links: [{ url: "https://x.com/Infinitar_MOBA" }, { url: "https://t.me/infinitar_MOBA" }, { url: "https://www.infinitar.com/#/" },] },
        { id: 6, links: [{ url: "https://x.com/Odyssey_ODS" }, { url: "https://t.me/odyssey_global" }, { url: "https://odysseyglobal.io/#/" },] },
        { id: 7, links: [{ url: "https://x.com/ULTILAND" }, { url: "https://t.me/ULTILAND_RWA" }, { url: "https://www.ultiland.io/" },] },
        { id: 8, links: [{ url: "https://x.com/Donetwork_club" }, { url: "https://t.me/DoNetworkclub" }, { url: "https://www.donetwork.io/#/pc/Index" },] },
        { id: 9, links: [{ url: "https://x.com/flock_io" }, { url: "https://t.me/flock_io_community" }, { url: "https://www.flock.io/" },] },
        { id: 10, links: [{ url: "https://x.com/DIDbased" }, { url: "https://discord.com/invite/did" }, { url: "https://d.id/" },] },
    ];

    const handleTaskClick = async (task: { id: string; label: string; reward: number }, taskId: number) => {
        // const data = TaskData{}
        if (joinId !== -1 && !cycleAction.some((t) => t.projectId === joinId && t.taskId === taskId)) {
            try {
                const actionId = 1011 + 10 * joinId + taskId;
                console.log(actionId, joinId, taskId);
                const respond = await axios.post("https://airdrop.7nc.top/api/record/add", {
                    "action": actionId
                }, {
                    headers: {
                        "accept": "application/hal+json",
                        "Content-Type": "application/json",
                        "uid": userInfo.uid,
                        "token": userInfo.token
                    }
                });

                if (respond.status === 200) {
                    setCycle(joinId, taskId);
                    setPopupData(task);
                }
            } catch (error) {
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

    return (
        <div
            style={{
                backgroundImage: 'url(/activity_bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="min-h-screen px-4 flex justify-center items-center"
        >
            <div className="border-2 rounded-lg border-white px-6 py-8 bg-gradient-to-r from-[#064E33] to-[#214177] max-w-[90%] lg:max-w-[60%] relative animate-fade-in">
                <div className="flex justify-between items-center">
                    <div className={`${paytoneOne.className} text-white text-xl sm:text-2xl`}>
                        {cards[joinId].name || "No Activity"}
                    </div>
                    <Image
                        src="/Close.png"
                        alt="Close"
                        width={24}
                        height={24}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => cards[joinId].id && leaveProject()}
                    />
                </div>

                {joinId !== -1 ? (
                    <div className="flex flex-col sm:flex-row items-center border-2 border-white rounded-lg mt-6 px-4 py-6 animate-slide-in">
                        <Image
                            src={cards[joinId].imgSrc}
                            alt={cards[joinId].name}
                            width={120}
                            height={120}
                            className="mb-4 sm:mb-0 sm:mr-6"
                        />
                        <div className="text-center sm:text-left">
                            <div className="flex justify-center sm:justify-start gap-4 mb-2">
                                {/* {["/globe.png", "/telegram.png", "/twitter.png"].map((src, i) => (
                                    <Image key={i} src={src} alt="icon" width={32} height={32} className='cursor-pointer' />
                                ))} */}
                            </div>
                            <div className="text-white text-sm sm:text-base">{cards[joinId].text}</div>
                        </div>
                    </div>
                ) : (
                    <div className="text-white text-sm sm:text-base mt-6 text-center">
                        No joined cards available.
                    </div>
                )}

                <div className={`${paytoneOne.className} text-white text-lg sm:text-xl mt-6`}>Tasks</div>
                <div className="border-2 border-white rounded-lg mt-4 px-4 py-6 space-y-4 animate-fade-in">
                    {tasks.map((task, index) => (
                        <div
                            key={task.id}
                            className="bg-gradient-to-r from-[#082B5A] to-[#064D33] px-6 py-4 flex justify-between items-center rounded-lg transition-transform hover:scale-105"
                        >
                            <div className="text-white text-base sm:text-lg">{task.label}</div>
                            {cycleAction.some((t) => t.projectId === joinId && t.taskId === index) ? (
                                <Image src="/checked.png" alt="Checked" width={28} height={28} className='cursor-pointer' />
                            ) : (
                                <div
                                    className="bg-[#62EDB5] text-black text-sm sm:text-base font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-[#4AC18A] transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTaskClick(task, index);
                                        navigateToLink(joinId, index);
                                    }}
                                >
                                    +{task.reward}
                                </div>
                            )}
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
                            className="bg-gradient-to-b from-[#214177] to-[#064E33] text-white rounded-lg shadow-lg p-6 w-[70%] sm:w-[300px]"
                        >
                            <h3 className="text-lg font-bold text-center">{popupData.label}</h3>
                            <p className="text-base mt-4 text-center">+{popupData.reward} Points</p>
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
        </div>
    );
}
