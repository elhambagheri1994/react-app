import React from "react";
import styles from "./tabs.module.scss";

export default function TabPanel(props) {
  const { component: Component, value, index, ...other } = props;

  return (
    <div
      className={styles.tab}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Component {...other} />}
    </div>
  );
}
