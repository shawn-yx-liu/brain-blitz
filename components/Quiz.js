import React from 'react'
import Question from './Question'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'

export default function Quiz(props) {
    const [questions, setQuestions] = React.useState([])
    const questionsHtml = questions.map(data => {
        return <Question key={data.id} data={data}/>
    })

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(response => response.json())
            .then(data => {
                const mappedData = data.results.map(item => {
                    // Condense the answers into one array and add an ID
                    const mappedItem = {
                        id: nanoid(),
                        question: decode(item.question),
                        answers: item.incorrect_answers.map(answer => decode(answer)),
                        correctAnswer: decode(item.correct_answer)
                    }

                    const randomIndex = Math.floor(Math.random() * 4); // index to insert the correct answer
                    mappedItem.answers.splice(randomIndex, 0, mappedItem.correctAnswer)
                    return mappedItem
                })

                setQuestions(mappedData)
            })
    }, [])

    return (
        <div className="question-container">
            {questionsHtml}
            <button className="question-check-btn">Check answers</button>
        </div>
    )
}