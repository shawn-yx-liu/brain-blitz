import React from 'react';
import Start from './pages/Start';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Host from './pages/Host';
import Join from './pages/Join';
import io from 'socket.io-client';

const socket = io('https://brain-blitz-server.onrender.com/');

export default function App() {
    const [screen, setScreen] = React.useState("start");

    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [currentGameId, setCurrentGameId] = React.useState(null);
    const [playerScore, setPlayerScore] = React.useState(null);
    const [opponentScore, setOpponentScore] = React.useState(null);
    const [result, setResult] = React.useState(null);
    
    const gameIdRef = React.useRef();

    React.useEffect(() => {
        gameIdRef.current = currentGameId;
    }, [currentGameId])

    React.useEffect(() => {
        if (screen === "host" || screen === "join") {
            socket.connect();
        } else {
            socket.disconnect();
        }
    }, [screen])

    React.useEffect(() => {
        socket.on('scores', (scores) => {
            let player1Score = scores[0].score;
            let player2Score = scores[1].score;
            if (scores[0].playerId === socket.id) {
                setPlayerScore(player1Score);
                setOpponentScore(player2Score);
            } else {
                setOpponentScore(player1Score);
                setPlayerScore(player2Score);
            }
        })

        socket.on('newGame', ({playerId, gameId}) => {
            if (playerId === socket.id) {
                setCurrentGameId(gameId);
            }
        })

        socket.on('questions', ({gameId, questions}) => {
            if (gameIdRef.current === gameId) {
                setQuizQuestions(questions);
                setScreen("coop");
            }
        })

        socket.on("error", (err) => {
            alert(err);
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

    function emitScore(gameId, score) {
        socket.emit('updateScore', {gameId, score});
    }

    function emitHost() {
        socket.emit('host');
    }

    function emitJoin(gameId) {
        socket.emit('join', gameId);
    }

    function startGame() {
        socket.emit('startGame', currentGameId);
    }

    if (screen === "start") {
        return <Start 
                    setSolo={() => setScreen("solo")} 
                    setHost={() => setScreen("host")}
                    setJoin={() => setScreen("join")}
                    emitHost={emitHost}
                /> 
    } else if (screen === "solo" || screen === "coop") {
        return <Quiz 
                    questions={quizQuestions}
                    setQuestions={setQuizQuestions}
                    type={screen} 
                    resetGame={() => setScreen("start")}
                    gameId={currentGameId}
                    emitScore={emitScore} 
                />
    } else if (screen === "host") {
        return <Host 
                    gameId={currentGameId}
                    resetGame={() => setScreen("start")}
                    startGame={() => startGame()}
                />
    } else if (screen === "join")  {
        return <Join
                    setGameId={setCurrentGameId}
                    resetGame={() => setScreen("start")}
                    emitJoin={emitJoin}
                />
    } else {
        return <Results setScreen={() => setScreen("start")} playerScore={playerScore} opponentScore={opponentScore} result={result} />
    }
}
