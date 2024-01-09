import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

export default function Quiz({type, resetGame, emitScore}) {
    const [questions, setQuestions] = React.useState([])
    const [finished, setFinished] = React.useState(false)
    const [timerRunning, setTimerRunning] = React.useState(false)
    const [timeElapsed, setTimeElapsed] = React.useState(0)

    React.useEffect(() => {
        if (!finished) {
            setQuestions([])
            fetch("https://opentdb.com/api.php?amount=10&type=multiple")
                .then(response => response.json())
                .then(data => {
                    const mappedData = data.results.map(item => {
                        // Condense the answers into one array and add an ID
                        const mappedItem = {
                            id: nanoid(),
                            question: decode(item.question),
                            answers: item.incorrect_answers.map(answer => decode(answer)),
                            correctAnswer: decode(item.correct_answer),
                            selectedAnswer: ""
                        }

                        const randomIndex = Math.floor(Math.random() * 4); // index to insert the correct answer
                        mappedItem.answers.splice(randomIndex, 0, mappedItem.correctAnswer)
                        return mappedItem
                    })
                    setQuestions(mappedData)
                    setTimerRunning(true)
                })
        }
    }, [finished])

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
            if (type === "coop") {
                emitScore(numCorrectAnswers())
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
            <button
                className="footer-btn"
                onClick={handleClick}
            >
                {finished ? "Play Again" : "Check answers"}
            </button>
        </div>
    )

    return (
        <div className="question-container">
            {questionsHtml}
            {footerHtml}
        </div>
    )
}