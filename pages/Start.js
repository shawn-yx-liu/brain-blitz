import React from 'react'

export default function Start({setSolo, setHost, setJoin}) {
    return (
        <div className="start">
            <h1 className="start-title">Brain Blitz</h1>
            <p className="start-description">From history and science to pop culture, test your speed and well-rounded knowledge. Good luck!</p>
            <div className="start-btn-row">
                <button className="start-btn" onClick={setHost}>Host Game</button>
                <button className="start-btn" onClick={setJoin}>Join Game</button>
                <button className="start-btn" onClick={setSolo}>1 Player</button>
            </div>
        </div>
    )
}