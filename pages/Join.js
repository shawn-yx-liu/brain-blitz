import React from 'react';

export default function Join({resetGame, setGameId, emitJoin}) {
    const [input, setInput] = React.useState("");

    function handleChange(event) {
        event.preventDefault();
        setInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setGameId(input);
        emitJoin(input);
    }

    return (
        <div className="join">
            <h1>Enter host's game code here: </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange}/>
                <button>Connect</button>
            </form>
            <div className="menu-btn-row">
                <button onClick={resetGame} className="menu-btn">Go Back</button>
            </div>
        </div>
    )
}