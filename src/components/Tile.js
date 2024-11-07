import React from 'react';
import '../styles/Tile.css';

const Tile = ({ number, onClick }) => {
    return (
        <div className={`tile ${number === '' ? 'empty' : ''}`} onClick={onClick}>
            {number}
        </div>
    );
};

export default Tile;
