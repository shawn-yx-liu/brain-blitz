import React from 'react'
import Question from './Question'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'

export default function Quiz(props) {
    const [questions, setQuestions] = React.useState([])
    const [finished, setFinished] = React.useState(false)

    function selectAnswer(id, answer) {
        setQuestions(prevQuestions => prevQuestions.map(question => {
            return question.id === id ? 
                   {...question, selectedAnswer: answer} :
                   question
        }))
    }

    function numCorrectAnswers() {
        return questions.filter(question => question.selectedAnswer === question.correctAnswer).length
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

    const footerHtml =(
        <div className="footer">
            {finished && <h2>You scored {numCorrectAnswers()}/5 correct answers</h2>}
            <button
                className="footer-btn"
                onClick={() => setFinished(prevFinished => !prevFinished)}
            >
                {finished ? "Play Again" : "Check answers"}
            </button>
        </div>
    )

    React.useEffect(() => {
        if (!finished) {
            setQuestions([])
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
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
            })
        }
    }, [finished])

    return (
        <div className="question-container">
            {questionsHtml}
            {footerHtml}
        </div>
    )
}