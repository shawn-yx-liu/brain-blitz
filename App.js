import React from 'react'
import Start from "./components/Start"

export default function App() {
    const [screen, setScreen] = React.useState("start")

    return (
        screen === "start" ? <Start /> : <Quiz />
    )
}