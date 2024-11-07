import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../styles/Board.css';

const Board = () => {
    const [tiles, setTiles] = useState([]);
    const [emptyIndex, setEmptyIndex] = useState(0);

    useEffect(() => {
        // Initialize the tiles in a random solvable state
        const initialTiles = generateSolvableTiles();
        setTiles(initialTiles);
        setEmptyIndex(initialTiles.indexOf(0)); // Empty space is represented by '0'
    }, []);

    const generateSolvableTiles = () => {
        let tiles = Array.from({ length: 9 }, (_, i) => (i + 1) % 9); // Creates an array [1, 2, 3, 4, 5, 6, 7, 8, 0]
        
        // Shuffle tiles randomly
        tiles = shuffle(tiles);
        
        // Ensure the shuffled tiles are solvable
        if (!isSolvable(tiles)) {
            return generateSolvableTiles(); // Retry if not solvable
        }

        return tiles;
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const isSolvable = (tiles) => {
        // Check if the shuffled tiles are solvable (this is a basic solvability check for a 3x3 puzzle)
        const inversions = countInversions(tiles);
        return inversions % 2 === 0; // Puzzle is solvable if inversions are even
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

    const handleTileClick = (index) => {
        // Check if the clicked tile is adjacent to the empty space
        const adjacentIndices = [
            emptyIndex - 1, // Left
            emptyIndex + 1, // Right
            emptyIndex - 3, // Up
            emptyIndex + 3  // Down
        ];

        if (adjacentIndices.includes(index) && isValidMove(index)) {
            // Swap tiles
            const newTiles = [...tiles];
            [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
            setTiles(newTiles);
            setEmptyIndex(index);
        }
    };

    const isValidMove = (index) => {
        // Ensure tile stays within bounds of the board
        const row = Math.floor(index / 3);
        const emptyRow = Math.floor(emptyIndex / 3);

        // Check if the tile is in the same row or adjacent row
        return Math.abs(row - emptyRow) <= 1;
    };

    return (
        <div className="board">
            {tiles.map((number, index) => (
                <Tile key={index} number={number ? number : ''} onClick={() => handleTileClick(index)} />
            ))}
        </div>
    );
};

export default Board;
