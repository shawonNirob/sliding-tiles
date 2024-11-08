import React from 'react';
import Game from './components/Game'; // Import Game component
import './App.css';  // Import global styles for App

const App = () => {
    return (
        <div className="app">
            <Game />  {/* Game component handles the game logic and includes Header */}
        </div>
    );
};

export default App;
