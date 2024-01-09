import React from 'react'

export default function Results({playerScore, opponentScore, result, setScreen}) {
    return (
        <div className="results-page">
            <h2>You scored: {playerScore}/10</h2>
            <h2>Your opponent scored: {opponentScore}/10</h2>
            <h1>{result}</h1>
            <button className="footer-btn" onClick={setScreen}>Play Again</button>
        </div>
    )
}