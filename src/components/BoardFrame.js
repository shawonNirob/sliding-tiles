import React from 'react';
import '../styles/BoardFrame.css'; // Ensure the correct path to the CSS file

const BoardFrame = ({ children }) => {
    return (
        <div className="board-frame">
            {children}
        </div>
    );
};

export default BoardFrame; 