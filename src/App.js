import React from 'react';
import Game from './components/Game'; // Import Game component
import './App.css';  // Import global styles for App

const App = () => {
    return (
        <div className="app">
            <h1>Sliding Tiles Game</h1>
            <Game /> {/* Game component handles the game logic, including the timer */}
        </div>
    );
};

export default App;
