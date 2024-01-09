import React from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Results from './components/Results';
import io from 'socket.io-client';

const socket = io('http://brain-blitz-shawnliu.netlify.app:4000');

export default function App() {
    const [screen, setScreen] = React.useState("start")
    const [playerScore, setPlayerScore] = React.useState(null);
    const [opponentScore, setOpponentScore] = React.useState(null);
    const [result, setResult] = React.useState(null);

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

    const emitScore = (score) => {
        socket.emit('updateScore', score);
    }

    if (screen === "start") {
        return <Start setScreen={() => setScreen("quiz")} /> 
    } else if (screen === "quiz") {
        return <Quiz emitScore={emitScore} />
    } else {
        return <Results setScreen={() => setScreen("start")} playerScore={playerScore} opponentScore={opponentScore} result={result} />
    }
}
