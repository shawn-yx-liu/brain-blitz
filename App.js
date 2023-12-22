import React from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'

export default function App() {
    const [screen, setScreen] = React.useState("start")

    return (
        screen === "start" 
            ? <Start setScreen={() => setScreen("quiz")} /> 
            : <Quiz />
    )
}