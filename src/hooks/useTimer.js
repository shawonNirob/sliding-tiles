import { useState, useEffect } from 'react';

// Format the time to mm:ss format
const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};

const useTimer = () => {
    const initialTime = 180; // 3 minutes in seconds
    const [time, setTime] = useState(initialTime); // Track remaining time
    const [isRunning, setIsRunning] = useState(false); // Initialize to false
    const [isGameOver, setIsGameOver] = useState(false); // Track if the game is over

    useEffect(() => {
        if (!isRunning || isGameOver) return; // Don't start the timer if not running or game is over

        const timerId = setInterval(() => {
            setTime((prevTime) => {
                const newTime = prevTime - 1;

                // Check if the timer has reached 0
                if (newTime <= 0) {
                    setIsGameOver(true); // Trigger game over
                    setIsRunning(false); // Stop the timer
                    return 0; // Ensure time doesn't go negative
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerId); // Cleanup on unmount or when dependencies change
    }, [isRunning, isGameOver]);

    // Function to start the timer
    const startTimer = () => {
        if (!isGameOver && time > 0) {
            setIsRunning(true);
        }
    };

    // Function to stop the timer
    const stopTimer = () => {
        setIsRunning(false);
    };

    // Reset the timer
    const resetTimer = () => {
        setTime(initialTime);
        setIsRunning(false);
        setIsGameOver(false); // Reset game over flag
    };

    return {
        time: formatTime(time),
        rawTime: time, // Expose raw time if needed elsewhere
        isGameOver,
        resetTimer,
        startTimer,
        stopTimer,
        isRunning,
    };
};

export default useTimer;
