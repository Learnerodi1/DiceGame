import React,{ useState } from 'react'
import './App.css'
import { Game } from './component/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="gameContainer">
          <Game/>
    </div>
    </>
  )
}

export default App
