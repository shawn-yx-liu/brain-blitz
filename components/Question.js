import React from 'react'

export default function Question(props) {
    const data = props.data
    const answerHtml = data.answers.map(answer => {
        return <button key={answer} className="answer">{answer}</button>
    })

    return (
        <div className="question">
            <h2 className="question-text">{data.question}</h2>
            <div className="answer-row">
                {answerHtml}
            </div>
        </div>
    )
}