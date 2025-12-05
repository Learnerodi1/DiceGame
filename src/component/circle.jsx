import React from "react";

export default function Circle  (){
    let Styles = {
        width : "30px",
        height:"30px",
        backgroundColor:"black",
        borderRadius: "50%",
        display:"inline-block",
        boxShadow: "10px 10px 5px rgba(255, 255, 255, 0.6) inset, -10px -10px 5px rgba(255, 255, 255, 0.6) inset "
    }
    return(
        <span style={Styles} ></span>
    )
}