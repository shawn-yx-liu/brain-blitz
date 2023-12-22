import React from 'react'

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-description">Some description if needed</p>
            <button className="start-btn" onClick={props.setScreen}>Start quiz</button>
        </div>
    )
}