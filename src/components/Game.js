import React, { useState } from 'react';
import Board from './Board';
import useTimer from '../hooks/useTimer';
import '../styles/Game.css';

const Game = () => {
    const { time, isGameOver, resetTimer } = useTimer();
    const [isGameStarted, setIsGameStarted] = useState(false);

    const handleStartOver = () => {
        resetTimer();
        setIsGameStarted(false);
    };

    const handleStartGame = () => {
        setIsGameStarted(true);
    };

    return (
        <div className="game">
            <div className="header">
                <div className="timer">{time}</div>
                <div className="buttons">
                    {!isGameStarted && !isGameOver && (
                        <button onClick={handleStartGame}>Start Game</button>
                    )}
                    {(isGameOver || !isGameStarted) && (
                        <button onClick={handleStartOver}>Start Over</button>
                    )}
                </div>
            </div>

            <div className="game-board">
                {isGameStarted && !isGameOver && <Board />}
                {isGameOver && <div className="game-over-message">Game Over! Time's up!</div>}
            </div>
        </div>
    );
};

export default Game;
