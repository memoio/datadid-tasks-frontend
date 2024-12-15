'use client';

import { useActivity } from '@/app/lib/context/ActivityContext';
import { paytoneOne } from '@/app/ui/fonts';
import Image from 'next/image';

export default function CyclePage() {
  const { completedTasks, joinCard, totalRewards, totalCompletedTasks, countCompletedMission  } = useActivity();
  let isJoined = false;

  const cards = [
    { id: 1, imgSrc: "/Cycle1.png", participants: 100, name: "Moso1", text: "Moso1 is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency." },
    { id: 2, imgSrc: "/Cycle2.png", participants: 200, name: "Moso2", text: "Moso2 is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency." },
    { id: 3, imgSrc: "/Cycle3.png", participants: 300, name: "Moso3", text: "Moso3 is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency." },
    { id: 4, imgSrc: "/Cycle4.png", participants: 400, name: "Moso4", text: "Moso4 is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency." },
    { id: 5, imgSrc: "/Cycle5.png", participants: 500, name: "Moso5", text: "Moso5 is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency." },
    { id: 6, imgSrc: "/Cycle6.png", participants: 600, name: "Moso6", text: "Moso6 is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency." },
    { id: 7, imgSrc: "/Cycle7.png", participants: 700, name: "Moso7", text: "Moso7 is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency." },
    { id: 8, imgSrc: "/Cycle8.png", participants: 800, name: "Moso8", text: "Moso8 is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency." },
    { id: 9, imgSrc: "/Cycle9.png", participants: 900, name: "Moso9", text: "Moso9 is an online shopping assistant that enables users to earn cashback in their preferred cryptocurrency." },
  ];

  return (
    <div className="mt-[55px]">
      <div className="text-center">
        <div className="text-center">
          <h1 className={`${paytoneOne.className} text-transparent bg-clip-text bg-gradient-to-b from-[#214177] to-[#05F292] text-[34px] md:text-[48px] font-bold animate-fade-in`}>
            Activity Cycle
          </h1>
          <p className="text-white text-[16px] md:text-[24px] mt-3 animate-fade-in-delay">
            Complete Cycle To Receive Points Rewards
          </p>
          <p className="text-[#05F292] text-[22px] mt-5 animate-pulse">
            This Cycle Ends In:
          </p>
          <div className="flex justify-center items-center gap-3 mt-4 animate-fade-in-delay">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center mr-[10px]">
                  <div className="w-[80px] h-[80px] bg-[#1E4874] rounded-sm flex justify-center items-center text-[28px] font-bold text-white">
                    0
                  </div>
                  <p className="text-[#05F292] text-[18px] mt-2">{unit}</p>
                </div>
                {i !== 3 && (
                  <div className="text-[#FFC917] text-[20px]">:</div>
                )}
              </div>
            ))}

          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row justify-around items-center mt-[65px] gap-8 px-6 animate-fade-in bg-[#05F2920D] border-x-[3px] border-[#05F292] rounded-[10px] py-[20px]">
          {[
            { label: 'Total Projects Completed', value: countCompletedMission  }, // Count distinct tasks
            { label: 'Total Tasks Accomplished', value: totalCompletedTasks },
            { label: 'Total Points Earned', value: totalRewards },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-center">
                <p className="text-white text-[16px] sm:text-[20px]">{stat.label}</p>
                <p className="text-[#05F292] text-[28px] font-bold mt-2">{stat.value}</p>
              </div>
            </div>

          ))}
        </div>
      </div>
      <div className="mt-[56px] flex justify-around flex-wrap gap-8">
        {cards.map((card) => {
          isJoined = false;
          let count = 0;
          completedTasks.map((completedTask) => {
            if (completedTask.cardId == card.id) {
              isJoined = true;
              count = count + 1;
            }
          });

          const cardBackground = isJoined
            ? 'bg-gradient-to-br from-[#1E4874] to-[#0EB476] border-b-[5px] border-[#05F292] scale-105'
            : 'bg-[#0663412B] hover:scale-105';

          const buttonClasses = isJoined
            ? 'bg-[#038C54] text-white cursor-default'
            : 'bg-[#05F292] text-black hover:bg-gradient-to-b hover:from-[#05F292] hover:to-[#038C54] cursor-pointer';

          return (
            <div
              key={card.id}
              className={`w-full sm:w-[46%] lg:w-[30%] p-4 rounded-[10px] transform transition-transform duration-300 ${cardBackground}`}
            >
              <div className="flex justify-between items-center">
                <Image src={card.imgSrc} width={100} height={100} alt={card.name} />
                <div className="text-[40px] text-white">{card.name}</div>
              </div>
              <div className="text-white text-[15px] leading-[18px] mb-4 mt-[20px]">{card.text}</div>
              <div>
                <p className="text-white text-[20px] font-bold">{card.participants} Participants</p>
                <div
                  onClick={() => joinCard(card)}
                  className={`mt-3 py-2 px-4 rounded-full text-[17.5px] font-bold transition-colors duration-300  cursor-pointer ${buttonClasses} `}
                >
                  {isJoined ? (
                    <div className="flex justify-center items-center gap-2">
                      <div className="text-center text-white text-[22px]">Joined</div>
                      <div className='text-[#038C54] w-[25px] h-[25px] rounded-full bg-white text-center'>{count}</div>
                    </div>
                  ) : (
                    <div className="text-center text-white text-[22px]">Join</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
