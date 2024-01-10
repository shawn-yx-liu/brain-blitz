import React from 'react';

export default function Join({resetGame, numPlayers, setGameId, emitJoin}) {
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

    function handleReset(event) {
        event.preventDefault();
        resetGame();
    }

    return (
        <div className="join">
            <h1>Enter host's game code here: </h1>
            <form onSubmit={handleSubmit}>
                <div className="join-row">
                    <input type="text" onChange={handleChange}/>
                    {numPlayers > 0 && <p>Connected!</p>}
                </div>
                {numPlayers > 0 && <p>Number of players in lobby: {numPlayers}</p>}
                <div className="menu-btn-row">
                    <button onClick={handleReset} className="menu-btn">Go Back</button>
                    <button disabled={numPlayers > 0} className="menu-btn">Connect</button>
                </div>
            </form>
        </div>
    )
}