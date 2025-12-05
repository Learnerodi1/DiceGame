import React,{useState,Component} from "react"
import { Dice } from "./Dice"

const CoverDice = (props) =>{
    return(
        <article className = {`diceHolder`} onClick={() => props.RemovingFunction === false && props.IsClassActive === false ? props.GettingDiceNumber(props.uniqueId) : null }>
            <Dice name = {`${props.name}`} id = {props.id} />
            <span className={`${props.IsClassActive ? "active" : undefined}`} id={props.RemovingFunction ? "disabled" : undefined}></span>
        </article>
    )
}
export {CoverDice}