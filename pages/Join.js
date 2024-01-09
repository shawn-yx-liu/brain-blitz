import React from 'react';

export default function Join({resetGame, startGame}) {
    return (
        <div className="join">
            <h1>Join screen here!</h1>
            <button onClick={resetGame} className="start-btn">Go Back</button>
        </div>
    )
}