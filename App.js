import React from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Results from './components/Results';
import io from 'socket.io-client';

const socket = io('https://brain-blitz-server.onrender.com/');

export default function App() {
    const [screen, setScreen] = React.useState("start")
    const [playerScore, setPlayerScore] = React.useState(null);
    const [opponentScore, setOpponentScore] = React.useState(null);
    const [result, setResult] = React.useState(null);

    React.useEffect(() => {
        if (screen === "coop") {
            socket.connect();
        } else {
            socket.disconnect();
        }
    }, [screen])

    React.useEffect(() => {
        socket.on('scores', (scores) => {
            let player1Score = scores[0].score;
            let player2Score = scores[1].score;
            if (scores[0].player === socket.id) {
                setPlayerScore(player1Score);
                setOpponentScore(player2Score);
            } else {
                setOpponentScore(player1Score);
                setPlayerScore(player2Score);
            }
        })

        return () => {
            socket.disconnect();
        }
    }, [])

    React.useEffect(() => {
        if (playerScore !== null && opponentScore !== null) {
            if (playerScore === opponentScore) {
                setResult("It's a tie!");
            } else if (playerScore < opponentScore) {
                setResult("Your opponent wins...");
            } else {
                setResult("You win!");
            }
    
            setScreen("results");
        }
    }, [playerScore, opponentScore])

    function emitScore(score) {
        socket.emit('updateScore', score);
    }

    if (screen === "start") {
        return <Start setSolo={() => setScreen("solo")} setCoop={() => setScreen("coop")} /> 
    } else if (screen === "solo" || screen === "coop") {
        return <Quiz type={screen} resetGame={() => setScreen("start")} emitScore={emitScore} />
    } else {
        return <Results setScreen={() => setScreen("start")} playerScore={playerScore} opponentScore={opponentScore} result={result} />
    }
}
