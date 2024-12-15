'use client';

import { paytoneOne } from '@/app/ui/fonts';
import React, { useState } from 'react';
import Image from 'next/image';
import { useActivity } from '@/app/lib/context/ActivityContext';

export default function Activity() {
  const [popupData, setPopupData] = useState<{ label: string; reward: number } | null>(null);

  const { joinedCards, leaveCard, completeTask, completedTasks, cardCompletion } = useActivity();

  const tasks = [
    { id: 'sbt1', label: 'Follow Harmony On Twitter', reward: 400 },
    { id: 'sbt2', label: 'Join Telegram', reward: 300 },
    { id: 'sbt3', label: 'Visit The Website', reward: 400 },
  ];

  const handleTaskClick = (task: { id: string; label: string; reward: number }) => {
    const activeCard = joinedCards[0];
    if (activeCard && !completedTasks.some((t) => t.taskId === task.id && t.cardId === activeCard.id)) {
      completeTask(task.id, activeCard.id, task.reward);
      setPopupData(task);

      // Log the task completion data to console
      console.log(`Task Clicked: Task ID: ${task.id}, Card ID: ${activeCard.id}, Reward: ${task.reward}`);

      // Check if all tasks are completed
      const totalTasks = tasks.length;
      const completedCount = (cardCompletion[activeCard.id] || 0) + 1;

      if (completedCount === totalTasks) {
        console.log(`All tasks for card ${activeCard.id} are completed!`);
      }
    }
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
            {joinedCards[0]?.name || 'No Activity'}
          </div>
          <Image
            src="/Close.png"
            alt="Close"
            width={24}
            height={24}
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => joinedCards[0]?.id && leaveCard(joinedCards[0].id)}
          />
        </div>

        {joinedCards.length > 0 ? (
          <div className="flex flex-col sm:flex-row items-center border-2 border-white rounded-lg mt-6 px-4 py-6 animate-slide-in">
            <Image
              src={joinedCards[0].imgSrc}
              alt={joinedCards[0].name}
              width={120}
              height={120}
              className="mb-4 sm:mb-0 sm:mr-6"
            />
            <div className="text-center sm:text-left">
              <div className="flex justify-center sm:justify-start gap-4 mb-2">
                {['/globe.png', '/telegram.png', '/twitter.png'].map((src, i) => (
                  <Image key={i} src={src} alt="icon" width={32} height={32} className="cursor-pointer" />
                ))}
              </div>
              <div className="text-white text-sm sm:text-base">{joinedCards[0].text}</div>
            </div>
          </div>
        ) : (
          <div className="text-white text-sm sm:text-base mt-6 text-center">
            No joined cards available.
          </div>
        )}

        <div className={`${paytoneOne.className} text-white text-lg sm:text-xl mt-6`}>Tasks</div>
        <div className="border-2 border-white rounded-lg mt-4 px-4 py-6 space-y-4 animate-fade-in">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gradient-to-r from-[#082B5A] to-[#064D33] px-6 py-4 flex justify-between items-center rounded-lg transition-transform hover:scale-105"
            >
              <div className="text-white text-base sm:text-lg">{task.label}</div>
              {completedTasks.some((t) => t.taskId === task.id && t.cardId === joinedCards[0]?.id) ? (
                <Image src="/checked.png" alt="Checked" width={28} height={28} className="cursor-pointer" />
              ) : (
                <div
                  className="bg-[#62EDB5] text-black text-sm sm:text-base font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-[#4AC18A] transition-colors"
                  onClick={() => handleTaskClick(task)}
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
              <p className="text-base mt-4 text-center">+{popupData.reward} SBT</p>
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
