import React from 'react';
import '../styles/Tile.css';

const Tile = ({ number, onClick, isEmpty, isClickable }) => {
    return (
        <div
            className={`tile ${isEmpty ? 'empty' : ''} ${!isClickable ? 'disabled' : ''}`}
            onClick={isEmpty || !isClickable ? null : onClick}
        >
            {number}
        </div>
    );
};

export default Tile;
