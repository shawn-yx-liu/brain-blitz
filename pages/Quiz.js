import React from 'react'
import Question from '../components/Question'

export default function Quiz({questions, setQuestions, numPlayers, resetGame, gameId, emitScore}) {
    const [finished, setFinished] = React.useState(false)
    const [timerRunning, setTimerRunning] = React.useState(true)
    const [timeElapsed, setTimeElapsed] = React.useState(0)

    React.useEffect(() => {
        let stopwatchInterval;

        if (timerRunning) {
            stopwatchInterval = setInterval(() => {
                setTimeElapsed(prevTimeElapsed => prevTimeElapsed + 1)
            }, 1000);
        }

        return () => clearInterval(stopwatchInterval);
    }, [timerRunning, timeElapsed]);

    function selectAnswer(id, answer) {
        setQuestions(prevQuestions => prevQuestions.map(question => {
            return question.id === id ?
                { ...question, selectedAnswer: answer } :
                question
        }))
    }

    function numCorrectAnswers() {
        return questions.filter(question => question.selectedAnswer === question.correctAnswer).length
    }

    function convertTimeElapsed() {
        const timeObject = {
            hours: Math.floor(timeElapsed / (60 * 60)),
            minutes: Math.floor(timeElapsed / 60),
            seconds: Math.floor(timeElapsed % 60)
        }

        return `${String(timeObject.hours).padStart(2, '0')}:${String(timeObject.minutes).padStart(2, '0')}:${String(timeObject.seconds).padStart(2, '0')}`
    }

    function displayTimeElapsed() {
        const timeObject = {
            hours: Math.floor(timeElapsed / (60 * 60)),
            minutes: Math.floor(timeElapsed / 60),
            seconds: Math.floor(timeElapsed % 60)
        }
        const hourText = timeObject.hours ? `${timeObject.hours} hours, ` : ""
        const minuteText = timeObject.minutes ? `${timeObject.minutes} minutes and ` : ""
        const secondText = `${timeObject.seconds} seconds.`

        return `${hourText}${minuteText}${secondText}`
    }

    function handleClick() {
        if (finished) {
            setTimeElapsed(0)
            resetGame()
        } else {
            setTimerRunning(false)
            if (numPlayers > 1) {
                emitScore(gameId, numCorrectAnswers())
            }
        }

        setFinished(prevFinished => !prevFinished)
    }

    const questionsHtml = questions.length > 0 ? (
        questions.map((data) => {
            return (
                <Question
                    key={data.id}
                    data={data}
                    finished={finished}
                    selectAnswer={selectAnswer}
                />
            )
        })
    ) : (
        <h2 className="loading">Loading questions...</h2>
    )

    const footerHtml = (
        <div className="footer">
            {finished ? 
                (
                    <div className="scoreText">
                        <h2>You scored {numCorrectAnswers()}/10 correct answers</h2>
                        <h2>in {displayTimeElapsed()}</h2>
                    </div>
                ) 
                : <h2>{convertTimeElapsed()}</h2>
            }
            {finished ? (
                numPlayers === 1 && <button className="footer-btn" onClick={handleClick}>Play Again</button>
            ) : (
                <button className="footer-btn" onClick={handleClick}>Check answers</button>
            )}
        </div>
    )

    return (
        <div className="question-container">
            {questionsHtml}
            {footerHtml}
        </div>
    )
}