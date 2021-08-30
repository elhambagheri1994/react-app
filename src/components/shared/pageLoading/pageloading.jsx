import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./pageLoading.module.scss";
import hafizLogo from "../../../assets/images/hafiz.svg";
import mahyaLogo from "../../../assets/images/mahya.svg";
import ansarLogo from "../../../assets/images/ansar.svg";

const PageLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.logo}>
        <img alt="mahya" src={ansarLogo} />
        <div />
        <img alt="mahya" src={mahyaLogo} />
      </div>
      <CircularProgress size={50} className={styles.buttonProgress} />
      <img className={styles.hafizLogo} alt="hafiz" src={hafizLogo} />
    </div>
  );
};

export default PageLoading;
