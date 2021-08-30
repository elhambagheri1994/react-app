import React from "react";
import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div>
        <div className={styles.loading}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default Loading;
