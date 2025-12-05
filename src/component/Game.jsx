import React,{Component, useEffect, useState} from "react"
import { Dice } from "./Dice"
import { CoverDice } from "./coverDice"
import { Info } from "./DiceInfo"
import mainLogo from "../images/dice.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

function arraYOfRandomNumber(number){
    let randomArr = []
    for(let i = 0; i <= number; i++ ){
        randomArr.push(Math.floor(Math.random() * 6)+1)
    }
    return randomArr
}

const arrOfEmoji =[
    "🔥",
    "🔥🔥",
    "🔥🔥🔥"
]
// UpdateMainInfo
const DiceInfo2MainUpdate = ()=>{
    const randomArr = arraYOfRandomNumber(5)
    const newARR = randomArr.map((number)=>{
        return {
            name : ["One", "Two", "Three", "Four","Five", "Six"][number-1],
            number : number,
            IsClassActive : false,
            RemovingFunction : false,
            uniqueId : crypto.randomUUID()
        }
    })
    return newARR
}
let count = 5
const Game = ()=>{
    // activeState
    const [active, updateActive] = useState("")
    // Mode 
    const [gameMode, updateGameMode] = useState([
        {mode : "Easy", number:5, IsClassActive : false}, 
        {mode : "Intermediate", number: 3, IsClassActive : false}, 
        {mode :"Hard", number : 2, IsClassActive : false}
    ])
    // NumberForMode
    const [numberForMode, updateNumberForMode] = useState(count)
    // First DiceInfo
    const[DiceInfo1, updateDiceInfo1] = React.useState(()=>Info)
    const[DiceInfo2, updateDiceInfo2] = React.useState(()=>DiceInfo2MainUpdate())
    // Array of numbers for player
    const [numberForPlayer, updateNumberForPlayer] = useState([])
    const [totalNumberForPlayer, updateToatalNumberForPlayer] = useState(0) 
    // Winner
    const [gameWinner, updateGameWinner] = useState("OLooo")
    // This controlss the numbers on the computer's dice
    const [computer, updateComputer] = React.useState(arraYOfRandomNumber(numberForMode - 1))
    const [totalNumberForComputer, updateTotalNumberForComputer] = useState(0)
    // ScoreBoard
    const [score, updateScore] = useState(0)
    // 
    const newPlay = () =>{
        updateScore(prev => totalNumberForPlayer > totalNumberForComputer && prev + 1 || prev)
        updateComputer(arraYOfRandomNumber(numberForMode - 1))
        updateDiceInfo2(()=> DiceInfo2MainUpdate())
        updateNumberForPlayer([])
        updateGameWinner("")
        updateActive("")
        updateToatalNumberForPlayer(0)
        updateTotalNumberForComputer(0)
    }

    const GettingDiceNumber = (id) =>{
        if(numberForPlayer.length === numberForMode ){   
            return
        };
        const identityNum = DiceInfo2.filter((information)=>id === information.uniqueId)
        const identity = [...numberForPlayer, identityNum[0].number]
        updateNumberForPlayer(identity)
        if(identity.length == numberForMode){
            updateActive("active")    
            let PlayerTotal = identity.reduce((a,b)=> a + b)
            let ComputerTotal = computer.reduce((a,b)=>a + b)
            updateToatalNumberForPlayer(PlayerTotal)
            updateTotalNumberForComputer(ComputerTotal)
            updateGameWinner(() =>{
                if(PlayerTotal > ComputerTotal ){
                    return "Player wins"
                }
                else if(ComputerTotal >PlayerTotal){
                    return "Computer wins"
                }
                else{
                    return "Draw .. Nobody won"
                }
            })
        }
        updateDiceInfo2(prevInfo => prevInfo.map((information)=>{
                return (
                    id === information.uniqueId ? {...information, IsClassActive : !information.IsClassActive} : information
                )
        }))
    }
    const SettingMode = (id) =>{
        updateNumberForMode(id)
        newPlay()
        updateGameMode(prev =>{
            return (
            prev.map((modes)=>{
                return (
                    id === modes.number ? {...modes, IsClassActive : true} : {...modes, IsClassActive : false}
                )
            })
        )})
    }

    return(
        <>
        {/* Header */}

        <header>
            {}
            <div>
                <img src={mainLogo} alt="" style={{height : "50px", width : "60px" }} />
                <h1>Paranomal <code>Dice</code></h1>
            </div>
        </header>
        {/* Main */}
        <main>
            {/* Computer */}
            <section className="Computer">
                <p>Computer</p>
                <article className="ComputerDice">
                    {
                        computer.map((information, index)=>{
                            return <Dice name = {DiceInfo1[information - 1].name} id= {information} key={index}/>
                        })
                    }
                </article>
            </section>
            {/* Player Dice Section */}
            <section className="PlayerDice">
                <p>Player</p>
                <div>
                    {
                        DiceInfo2.map(((information, index) =>{
                            return(
                                <CoverDice id = {information.number} name ={information.name} IsClassActive={information.IsClassActive} key={index} GettingDiceNumber= {GettingDiceNumber} uniqueId ={information.uniqueId} RemovingFunction={numberForPlayer.length == numberForMode && !information.IsClassActive ? true : false}/>
                            )
                        }))    
                    }
                    <section>
                        <span></span>
                        <code></code>
                    </section>
                </div>
            </section>
            {/* Controls */}
            <section className="Controls">
                <button onClick = {()=>newPlay()}> <img style={{width: "100%", height:"100%"}} src={mainLogo} alt="" /></button>
                {/* <button onClick = {()=>startPlay()}> - </button> */}
                <div className={`Mode`} onClick={(e)=>{
                    e.target.classList.toggle("active")
                }}>
                    Mode
                    <article>
                        {
                            gameMode.map((gamemode, index)=>{
                                return (
                                    <span key={index} className = {gamemode.IsClassActive ? "active" : undefined} onClick={()=>SettingMode(gamemode.number)}>
                                        {gamemode.mode} {arrOfEmoji[index]}
                                    </span>
                                )
                            })
                        }
                    </article>
                </div>
            </section>
            {/* Results */}
            <section className={`Results ${active}`}>
                <code>
                    {/* borderRadius */}
                    {numberForPlayer.length == numberForMode && gameWinner}
                 </code>
            </section>
            {/* ScoreBoard */}
            <section className="ScoreBoard">
                Score : <code>{score}</code>
            </section>
        </main>
        </>
    )
}
export{Game}