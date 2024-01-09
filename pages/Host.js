import React from 'react';

export default function Host({resetGame, startGame}) {
    return (
        <div className="host">
            <h1>Host screen here!</h1>
            <button onClick={resetGame} className="start-btn">Go Back</button>
        </div>
    )
}