import React, { useState, useEffect } from 'react';
import useTimer from '../hooks/useTimer';
import Board from './Board';
import Header from './Header';  // Import the Header component
import '../styles/Game.css';

const Game = () => {
    const { time, isGameOver, resetTimer, startTimer, stopTimer } = useTimer();
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [gameKey, setGameKey] = useState(0); // State for remounting Board
    const [shouldStartTimer, setShouldStartTimer] = useState(false); // New state variable

    const handleStartGame = () => {
        setIsGameStarted(true);
        setIsGameWon(false);
        resetTimer(); // Ensure timer is reset before starting
        setShouldStartTimer(true); // Indicate that the timer should start
        setGameKey(prevKey => prevKey + 1); // Remount Board
    };

    const handleRestartGame = () => {
        if (!isGameOver && !isGameWon) return; // Prevent restart if game isn't over or won
        setIsGameWon(false);
        resetTimer();
        setShouldStartTimer(true); // Indicate that the timer should start after restart
        setGameKey(prevKey => prevKey + 1); // Remount Board
    };

    const handleGameWon = () => {
        setIsGameWon(true);
        stopTimer();
    };

    // useEffect to start the timer after state updates
    useEffect(() => {
        if (shouldStartTimer && !isGameOver && !isGameWon) {
            startTimer();
            setShouldStartTimer(false); // Reset the flag
        }
    }, [shouldStartTimer, isGameOver, isGameWon, startTimer]);

    useEffect(() => {
        if (isGameOver) {
            stopTimer();
        }
    }, [isGameOver, stopTimer]);

    return (
        <div className="game">
            {/* Display header with the timer and buttons */}
            <Header
                time={time}
                isGameStarted={isGameStarted}
                isGameOver={isGameOver}
                isGameWon={isGameWon}
                onStartGame={handleStartGame}
                onRestartGame={handleRestartGame} // Pass the restart handler
            />

            <div className="game-board">
                {/* Display the board, force remount with key */}
                <Board 
                    key={gameKey}
                    startGame={isGameStarted} 
                    isGameOver={isGameOver}
                    isGameWon={isGameWon} // Ensure isGameWon is passed
                    onGameWon={handleGameWon} 
                />
            </div>

            {/* Show congratulations message if the game is won */}
            {isGameWon && (
                <div className="congratulations-message">
                    <h2>Congratulations! You've won!</h2>
                </div>
            )}

            {/* Show game over message if time is up */}
            {isGameOver && !isGameWon && (
                <div className="game-over-message">Game Over! Time's up!</div>
            )}
        </div>
    );
};

export default Game;
