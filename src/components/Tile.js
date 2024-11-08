import React from 'react';
import '../styles/Tile.css';

const Tile = ({ number, onClick, isEmpty, isClickable }) => {
    return (
        <div
            className={`tile ${isEmpty ? 'empty' : ''} ${!isClickable ? 'disabled' : ''}`}
            onClick={isEmpty || !isClickable ? null : onClick}
            aria-disabled={!isClickable}
            role="button"
            tabIndex={isClickable ? 0 : -1} // Make focusable only if clickable
            onKeyPress={(e) => {
                if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    onClick();
                }
            }}
        >
            {number}
        </div>
    );
};

export default Tile;
