import React from 'react'

export default function Start({setSolo, emitHost, setHost, setJoin}) {
    function handleHostClick() {
        emitHost();
        setHost();
    }

    return (
        <div className="start">
            <h1 className="start-title">Brain Blitz</h1>
            <p className="start-description">From history and science to pop culture, test your speed and well-rounded knowledge. Good luck!</p>
            <div className="menu-btn-row">
                <button className="menu-btn" onClick={() => handleHostClick()}>Host Game</button>
                <button className="menu-btn" onClick={setJoin}>Join Game</button>
                <button className="menu-btn" onClick={setSolo}>1 Player</button>
            </div>
        </div>
    )
}