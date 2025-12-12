import React,{ useState } from 'react'
import './App.css'
import { Game } from './component/Game'
import newAudio from "./assets/audio/start.wav"

function App() {
  const [Playername, setCount] = useState()
  const startGame = (e)=>{
    const audio = new Audio(newAudio)
    audio.currentTime = 0
    audio.play()
    e.target.closest("section").classList.toggle("active")
  }

  return (
    <>
    <div className="gameContainer">
          <Game playerName ={Playername} />
    </div>
          <section className="gameTips active" >
             <p>We have three game modes hard Intermediate and Easy. Each game mode has the number of dice to be choosen. The player has to choose the dice covered in black to reveal the main dice. The highest total number of dice is the winner. Click on the dice icon below to roll dice</p>
             <input type="text" value={Playername} placeholder='Type in Your name' onChange={(e)=>{
              setCount(e.target.value)
             }}/>
             <button onClick={(e)=>startGame(e)}> Start</button>
          </section>
    </>
  )
}

export default App
