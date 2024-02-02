import React from 'react';
import Start from './pages/Start';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Host from './pages/Host';
import Join from './pages/Join';
import io from 'socket.io-client';

const socket = io('https://brain-blitz-server-a80708a0eab7.herokuapp.com/');

export default function App() {
    const [screen, setScreen] = React.useState("start");

    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [currentGameId, setCurrentGameId] = React.useState(null);
    const [numPlayers, setNumPlayers] = React.useState(0);
    const [playerScore, setPlayerScore] = React.useState(null);
    const [opponentScore, setOpponentScore] = React.useState(null);
    const [result, setResult] = React.useState(null);
    
    const gameIdRef = React.useRef();

    React.useEffect(() => {
        gameIdRef.current = currentGameId;
    }, [currentGameId])

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
                setNumPlayers(1);
            }
        })

        socket.on('joinedGame', (gameId) => {
            if (gameId === gameIdRef.current) {
                setNumPlayers(2);
            }
        })

        socket.on('questions', ({gameId, questions}) => {
            if (gameIdRef.current && gameId === gameIdRef.current) {
                setQuizQuestions(questions);
                setScreen("quiz");
            }
        })

        socket.on("error", ({playerId, message}) => {
            if (socket.id === playerId) {
                console.dir(message);
                alert(message);
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

    function startSoloGame() {
        socket.emit('startSoloGame');
    }

    function resetGame() {
        setCurrentGameId(null);
        setNumPlayers(0);
        setScreen("start");
    }

    if (screen === "start") {
        return <Start 
                    startSoloGame={() => startSoloGame()} 
                    setHost={() => setScreen("host")}
                    setJoin={() => setScreen("join")}
                    emitHost={emitHost}
                /> 
    } else if (screen === "quiz") {
        return <Quiz 
                    questions={quizQuestions}
                    setQuestions={setQuizQuestions}
                    numPlayers={numPlayers}
                    resetGame={resetGame}
                    gameId={currentGameId}
                    emitScore={emitScore} 
                />
    } else if (screen === "host") {
        return <Host 
                    gameId={currentGameId}
                    numPlayers={numPlayers}
                    resetGame={resetGame}
                    startGame={() => startGame()}
                />
    } else if (screen === "join")  {
        return <Join
                    setGameId={setCurrentGameId}
                    numPlayers={numPlayers}
                    resetGame={resetGame}
                    emitJoin={emitJoin}
                />
    } else {
        return <Results setScreen={resetGame} playerScore={playerScore} opponentScore={opponentScore} result={result} />
    }
}
