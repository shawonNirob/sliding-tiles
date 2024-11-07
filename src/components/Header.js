// src/components/Header.js
import React from 'react';
import { FaRegPlayCircle } from 'react-icons/fa'; // Importing start icon
import { VscDebugRestartFrame } from 'react-icons/vsc'; // Importing restart icon
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
                {!isGameStarted && !isGameOver && (
                    <button onClick={onStartGame} className="header-button">
                        <FaRegPlayCircle className="button-icon" /> Play
                    </button>
                )}
                {(isGameStarted || isGameWon || isGameOver) && (
                    <button onClick={onRestartGame} className="header-button">
                        <VscDebugRestartFrame className="button-icon" /> Restart
                    </button>
                )}
            </div>

            <div className="header-timer">{time}</div>
        </div>
    );
};

export default Header;
