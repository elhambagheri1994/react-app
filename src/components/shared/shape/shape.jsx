import React from "react";
import styles from "./shape.module.scss";

const Shape = ({ color, children }) => {
  const setColor = () => {
    switch (color) {
      case "#FFBB2F":
        return "yellow";
      case "#0A65AB":
        return "blue";

      case "#D43315":
        return "red";

      case "#03A95F":
        return "green";
      default:
        return "yellow";
    }
  };
  return (
    <div className={`${styles.pointer} ${setColor()}`}>
      <span>{children}</span>
    </div>
  );
};

export default Shape;
