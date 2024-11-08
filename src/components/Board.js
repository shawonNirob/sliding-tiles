import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import BoardFrame from './BoardFrame'; // Import the BoardFrame component
import '../styles/Board.css';
import PropTypes from 'prop-types';

const Board = ({ startGame, isGameOver, isGameWon, onGameWon }) => {
    const [tiles, setTiles] = useState([]);
    const [emptyIndex, setEmptyIndex] = useState(8); // Initially, the last tile is empty

    useEffect(() => {
        if (startGame) {
            // Shuffle the tiles when the game starts or restarts
            const shuffledTiles = generateSolvableTiles();
            setTiles(shuffledTiles);
            setEmptyIndex(shuffledTiles.indexOf(0));
        } else {
            // Set tiles to a solved state when the game hasn't started
            setTiles([1, 2, 3, 4, 5, 6, 7, 8, 0]);
            setEmptyIndex(8);
        }
    }, [startGame]);

    const generateSolvableTiles = () => {
        let shuffled = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]);
        
        while (!isSolvable(shuffled)) {
            shuffled = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]);
        }

        return shuffled;
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const isSolvable = (tiles) => {
        const inversions = countInversions(tiles);
        return inversions % 2 === 0;
    };

    const countInversions = (tiles) => {
        let inversions = 0;
        for (let i = 0; i < tiles.length; i++) {
            for (let j = i + 1; j < tiles.length; j++) {
                if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
                    inversions++;
                }
            }
        }
        return inversions;
    };

    const getAdjacentIndices = (emptyIdx) => {
        const adjacent = [];
        const rows = 3;
        const cols = 3;
        const row = Math.floor(emptyIdx / cols);
        const col = emptyIdx % cols;

        // Up
        if (row > 0) adjacent.push(emptyIdx - cols);
        // Down
        if (row < rows - 1) adjacent.push(emptyIdx + cols);
        // Left
        if (col > 0) adjacent.push(emptyIdx - 1);
        // Right
        if (col < cols - 1) adjacent.push(emptyIdx + 1);

        return adjacent;
    };

    const handleTileClick = (index) => {
        if (isGameOver || isGameWon) return; // Prevent movement when the game is over or won

        const adjacentIndices = getAdjacentIndices(emptyIndex);

        if (!adjacentIndices.includes(index)) {
            return; // Not adjacent; do nothing
        }

        // Swap the clicked tile with the empty tile
        const newTiles = [...tiles];
        [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
        setTiles(newTiles);
        setEmptyIndex(index);

        // Check if the game is solved
        if (isSolved(newTiles) && startGame) {
            onGameWon();
        }
    };

    const isSolved = (tiles) => {
        const solvedState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        return tiles.every((tile, index) => tile === solvedState[index]);
    };

    return (
        <BoardFrame>
            <div className="board">
                {tiles.map((number, index) => (
                    <Tile
                        key={index}
                        number={number ? number : ''}
                        onClick={() => handleTileClick(index)}
                        isEmpty={number === 0}
                        isClickable={startGame && !isGameOver && !isGameWon} // Disable when game is over or won
                    />
                ))}
            </div>
        </BoardFrame>
    );
};

Board.propTypes = {
    startGame: PropTypes.bool.isRequired,
    isGameOver: PropTypes.bool.isRequired,
    isGameWon: PropTypes.bool.isRequired,
    onGameWon: PropTypes.func.isRequired,
};

export default Board;
