import { useState, useEffect } from 'react';

const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const useTimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const timerId = setInterval(() => {
            setTime((prevTime) => {
                const newTime = prevTime + 1;

                if (newTime >= 300) { // 5 minutes = 300 seconds
                    setIsGameOver(true);
                    setIsRunning(false);
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [isRunning]);

    const resetTimer = () => {
        setTime(0);
        setIsRunning(true);
        setIsGameOver(false);
    };

    return {
        time: formatTime(time),
        isGameOver,
        resetTimer,
    };
};

export default useTimer;
