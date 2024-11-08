// src/components/Header.js
import React from 'react';
import { FaRegPlayCircle } from 'react-icons/fa'; // Start icon
import { VscDebugRestartFrame } from 'react-icons/vsc'; // Restart icon
import '../styles/Header.css'; // Ensure the correct path to the CSS file

const Header = ({
    time,
    isGameStarted,
    isGameOver,
    isGameWon,
    onStartGame,
    onRestartGame
}) => {
    return (
        <div className="header-container">
            <h1 className="header-title">Sliding Tiles Game</h1>
            
            {/* Central Buttons */}
            <div className="header-buttons">
                {/* Show Start button only if the game hasn't started and isn't over */}
                {!isGameStarted && !isGameOver && (
                    <button onClick={onStartGame} className="header-button">
                        <FaRegPlayCircle className="button-icon" /> Play
                    </button>
                )}
                {/* Show Restart button if the game has started */}
                {isGameStarted && (
                    <button 
                        onClick={onRestartGame} 
                        className="header-button"
                        disabled={!(isGameOver || isGameWon)} // Enable only if game is over or won
                        title={!(isGameOver || isGameWon) ? "Finish the game to restart" : "Restart the game"}
                        aria-disabled={!(isGameOver || isGameWon)}
                    >
                        <VscDebugRestartFrame className="button-icon" /> Restart
                    </button>
                )}
            </div>

            <div className="header-timer">{time}</div>
        </div>
    );
};

export default Header;
