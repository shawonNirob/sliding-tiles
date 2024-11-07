import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../styles/Board.css';

const Board = ({ startGame, onGameWon, isGameOver }) => {
    const [tiles, setTiles] = useState([]);
    const [emptyIndex, setEmptyIndex] = useState(8); // Initially, the last tile is empty

    useEffect(() => {
        if (startGame) {
            // Shuffle the tiles when the game starts
            const shuffledTiles = generateSolvableTiles();
            setTiles(shuffledTiles);
            setEmptyIndex(shuffledTiles.indexOf(0));
        } else {
            // Initialize to solved state
            const solvedTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
            setTiles(solvedTiles);
            setEmptyIndex(8);
        }
    }, [startGame]);

    const generateSolvableTiles = () => {
        let tiles = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]);
        
        while (!isSolvable(tiles)) {
            tiles = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]);
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

    const handleTileClick = (index) => {
        if (!startGame) return; // Prevent tile moves before game starts

        const adjacentIndices = [
            emptyIndex - 1, // Left
            emptyIndex + 1, // Right
            emptyIndex - 3, // Up
            emptyIndex + 3  // Down
        ];

        if (adjacentIndices.includes(index) && isValidMove(index)) {
            const newTiles = [...tiles];
            [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
            setTiles(newTiles);
            setEmptyIndex(index);

            if (isSolved(newTiles) && startGame) {
                onGameWon();
            }
        }
    };

    const isValidMove = (index) => {
        const row = Math.floor(index / 3);
        const emptyRow = Math.floor(emptyIndex / 3);
        return Math.abs(row - emptyRow) <= 1;
    };

    const isSolved = (tiles) => {
        const solvedState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        return tiles.every((tile, index) => tile === solvedState[index]);
    };

    return (
        <div className="board">
            {tiles.map((number, index) => (
                <Tile
                    key={index}
                    number={number ? number : ''}
                    onClick={() => handleTileClick(index)}
                    isEmpty={number === 0}
                    isClickable={startGame} // Pass down the status
                />
            ))}
        </div>
    );
};

export default Board;
