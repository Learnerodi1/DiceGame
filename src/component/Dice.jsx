import React, {Component, useState, useEffect} from "react"
import Circle from "./circle"

function CircleGenerator(num,Arr, ArrUpp, id){
    let TempArr = []
    for(let number = 0; number < num; number++){
        TempArr.push(<Circle key ={number}/>)            
    }
    
    useEffect(()=>{
        ArrUpp(TempArr)
    },[id])

    return (Arr.map((item)=>{
        return item
    }))
}

const Dice = (props) =>{
    const [arr, updateArr] = useState([])
    return(
        <div className={`dice ${props.name}`} id={props.id} >
            {CircleGenerator(props.id, arr, updateArr, props.id)}
        </div>
    )
} 


export {Dice} 