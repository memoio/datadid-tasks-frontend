'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CardData {
  id: number;
  imgSrc: string;
  participants: number;
  name: string;
  text: string;
}

interface TaskData {
  taskId: string;
  cardId: number;
  reward: number;
}

interface ActivityContextType {
  joinedCards: CardData[];
  completedTasks: TaskData[];
  cardCompletion: Record<number, number>;
  totalRewards: number;
  totalCompletedTasks: number;
  countCompletedMission: number;
  joinCard: (card: CardData) => void;
  leaveCard: (cardId: number) => void;
  completeTask: (taskId: string, cardId: number, reward: number) => void;
}

const ActivityContext = createContext<ActivityContextType | null>(null);

interface ActivityContextProviderProps {
  children: ReactNode;
}

export const ActivityContextProvider = ({ children }: ActivityContextProviderProps) => {
  const [joinedCards, setJoinedCards] = useState<CardData[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskData[]>([]);
  const [cardCompletion, setCardCompletion] = useState<Record<number, number>>({});
  const [totalRewards, setTotalRewards] = useState<number>(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState<number>(0);
  const [countCompletedMission, setCountCompletedMission] = useState<number>(0);
  const [tempArray, setTempArray] = useState<number[]>(Array(9).fill(0));


  const joinCard = (card: CardData) => {
    if (!joinedCards.some((joinedCard) => joinedCard.id === card.id)) {
      setJoinedCards((prev) => [...prev, card]);
      setCardCompletion((prev) => ({ ...prev, [card.id]: 0 }));
    }
  };

  const leaveCard = (cardId: number) => {
    setJoinedCards((prev) => prev.filter((card) => card.id !== cardId));
    setCardCompletion((prev) => {
      const updatedCompletion = { ...prev };
      delete updatedCompletion[cardId];
      updateExactThreeTaskCards([...completedTasks.filter((task) => task.cardId !== cardId)]);
      return updatedCompletion;
    });
  };

  const updateExactThreeTaskCards = (updatedTasks: TaskData[]) => {
    // Count tasks grouped by `cardId`
    const taskCounts: Record<number, number> = {};
    updatedTasks.forEach((task) => {
      taskCounts[task.cardId] = (taskCounts[task.cardId] || 0) + 1;
    });

  };

  const completeTask = (taskId: string, cardId: number, reward: number) => {
    if (!completedTasks.some((task) => task.taskId === taskId && task.cardId === cardId)) {
      const newCompletedTasks = [...completedTasks, { taskId, cardId, reward }];
      setCompletedTasks(newCompletedTasks);

      // Update task completion count for the card
      setCardCompletion((prev) => {
        const updatedCardCompletion = { ...prev, [cardId]: (prev[cardId] || 0) + 1 };
        return updatedCardCompletion;
      });
      for (let i = 0; i < 9; i++) {
        if (cardId == i + 1) {
          const updatedArray = [...tempArray];
          updatedArray[i] = updatedArray[i] + 1;
          setTempArray(updatedArray);
          console.log("updatedArray", updatedArray[i]);
          if (updatedArray[i] === 3) {
            setCountCompletedMission((prev) => prev + 1);
          }
        }
      }
      console.log(countCompletedMission);
      // Update total rewards and completed tasks
      setTotalRewards((prev) => prev + reward);
      setTotalCompletedTasks((prev) => prev + 1);
    

      console.log(`Task Completed: Task ID: ${taskId}, Card ID: ${cardId}, Reward: ${reward}`);
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        joinedCards,
        completedTasks,
        cardCompletion,
        totalRewards,
        totalCompletedTasks,
        countCompletedMission,
        joinCard,
        leaveCard,
        completeTask,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = (): ActivityContextType => {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error('useActivity must be used within an ActivityContextProvider');
  }

  return context;
};
