import React from 'react';
import Game from './components/Game'; // Import Game component
import Header from './components/Header'; // Import Header component
import './App.css';  // Import global styles for App

const App = () => {
    return (
        <div className="app">
            <Header /> {/* Header contains title and timer */}
            <Game />  {/* Game component handles the game logic */}
        </div>
    );
};

export default App;
