import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  console.log(props.vertMargin || props.horMargin
    ? (props.vertMargin ? props.vertMargin : "0px") + " " + props.horMargin
    : "auto")
  return (
    <div className={`${styles.btn} ${props.className}`}>
      <button
        style={{
          backgroundColor: `${props.btnColor ? props.btnColor : "#484B6A"}`,
          color: `${props.color ? props.color : "white"}`,
          width: `${props.width ? props.width : "100%"}`,
          height: `${props.height ? props.height : "50px"}`,
          margin: `${
            props.vertMargin || props.horMargin
              ? (props.vertMargin ? props.vertMargin : "0px") + " " + (props.horMargin ? props.horMargin : "0px")
              : "auto"
          }`,
          fontWeight: `${props.fontWeight ? props.fontWeight : "600"}`
        }}
        onClick={props.onClick}
        type = {props.type}
      >
        <div className={styles.container}>
        {props.iconComponent}
        {props.icon && <img src={props.icon} alt={props.alt} style={{marginRight: `${props.marginRight ? props.marginRight : "10px"}`}}/>}
        {props.label}
        </div>
      </button>
    </div>
  );
};

export default Button;
