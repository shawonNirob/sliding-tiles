import React, { useState, useEffect } from 'react';
import useTimer from '../hooks/useTimer';
import Board from './Board';
import Header from './Header';  // Import the Header component
import '../styles/Game.css';

const Game = () => {
    const { time, isGameOver, resetTimer, startTimer, stopTimer } = useTimer();
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);

    const handleStartOver = () => {
        resetTimer();
        setIsGameStarted(false);
        setIsGameWon(false);
    };

    const handleStartGame = () => {
        setIsGameStarted(true);
        setIsGameWon(false);
        startTimer();
    };

    const handleGameWon = () => {
        setIsGameWon(true);
        stopTimer();
    };

    useEffect(() => {
        if (isGameOver) {
            stopTimer();
            setIsGameStarted(false);
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
                onStartOver={handleStartOver}
            />

            <div className="game-board">
                {/* Display the board in a solved state or shuffled based on isGameStarted */}
                <Board startGame={isGameStarted} onGameWon={handleGameWon} />
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
