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

    const joinCard = (card: CardData) => {
        if (!joinedCards.some((joinedCard) => joinedCard.id === card.id)) {
            setJoinedCards((prev) => [...prev, card]);
        }
    };

    const leaveCard = (cardId: number) => {
        setJoinedCards((prev) => prev.filter((card) => card.id !== cardId));
    };

    const completeTask = (taskId: string, cardId: number, reward: number) => {
        if (!completedTasks.some((task) => task.taskId === taskId && task.cardId === cardId)) {
            setCompletedTasks((prev) => [...prev, { taskId, cardId, reward }]);
        }
        console.log("completedTasks:", completedTasks);
    };

    return (
        <ActivityContext.Provider
            value={{
                joinedCards,
                completedTasks,
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
