import React from 'react'

export default function Start({setSolo, setCoop}) {
    return (
        <div className="start">
            <h1 className="start-title">Brain Blitz</h1>
            <p className="start-description">From history and science to pop culture, test your speed and well-rounded knowledge. Good luck!</p>
            <div className="start-btn-row">
                <button className="start-btn" onClick={setSolo}>1 Player</button>
                <button className="start-btn" onClick={setCoop}>2 Players</button>
            </div>
        </div>
    )
}