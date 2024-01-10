import React from 'react';

export default function Host({gameId, numPlayers, resetGame, startGame}) {
    return (
        <div className="host">
            <h1>Your game code is: {gameId}</h1>
            <p>Number of players in lobby: {numPlayers}</p>
            <div className="menu-btn-row">
                <button onClick={resetGame} className="menu-btn">Go Back</button>
                <button disabled={numPlayers < 2} className="menu-btn" onClick={startGame}>Start Game</button>
            </div>
        </div>
    )
}