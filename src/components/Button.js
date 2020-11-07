import React from "react";
import "./Button.css";

export default function Button(props){
  let classes = "button ";
  classes+=props.double ? "double" : "";
  classes+=props.triple ? "triple" : "";
  classes+=props.operation ? "operation" : "";

  return <button className={classes} onClick={() => props.click && props.click(props.label)}>
    {props.label}
  </button>
}