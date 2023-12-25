import React from 'react'

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="start-title">Brain Blitz</h1>
            <p className="start-description">From history and science to pop culture, test your speed and well-rounded knowledge. Good luck!</p>
            <button className="start-btn" onClick={props.setScreen}>Start quiz</button>
        </div>
    )
}