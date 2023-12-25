import React from 'react'

export default function Question(props) {
    const data = props.data
    const answerHtml = data.answers.map(answer => {
        let style = (props.finished && answer === data.correctAnswer) ? "correct" :
                    (props.finished && answer === data.selectedAnswer) ? "wrong" :
                    (answer === data.selectedAnswer) ? "selected" : 
                    ""

        return <button 
                    key={answer} 
                    className={`answer ${style}`} 
                    onClick={() => props.selectAnswer(data.id, answer)}
                >
                    {answer}
                </button>
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