import React from 'react';

export default function Host({gameId, resetGame, startGame}) {
    return (
        <div className="host">
            <h1>Your game code is: {gameId}</h1>
            <div className="menu-btn-row">
                <button onClick={resetGame} className="menu-btn">Go Back</button>
                <button className="menu-btn" onClick={startGame}>Start Game</button>
            </div>
        </div>
    )
}