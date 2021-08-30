import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./skeleton.module.scss";

const SkeletonLoading = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <Skeleton width="30%" variant="text" className={styles.text} />
          <Skeleton
            classes={{ root: styles.status }}
            animation="wave"
            variant="rect"
            width="20%"
            height={20}
          />
        </div>
        <Skeleton width="50%" variant="text" className={styles.text} />
        <Skeleton width="60%" variant="text" className={styles.text} />
        <Skeleton width="40%" variant="text" className={styles.text} />
        <Skeleton width="50%" variant="text" className={styles.text} />
      </div>
      <div className={styles.card}>
        <div className={styles.header}>
          <Skeleton width="30%" variant="text" className={styles.text} />
          <Skeleton
            classes={{ root: styles.status }}
            animation="wave"
            variant="rect"
            width="20%"
            height={20}
          />
        </div>
        <Skeleton width="50%" variant="text" className={styles.text} />
        <Skeleton width="60%" variant="text" className={styles.text} />
        <Skeleton width="40%" variant="text" className={styles.text} />
        <Skeleton width="50%" variant="text" className={styles.text} />
      </div>
      <div className={styles.card}>
        <div className={styles.header}>
          <Skeleton width="30%" variant="text" className={styles.text} />
          <Skeleton
            classes={{ root: styles.status }}
            animation="wave"
            variant="rect"
            width="20%"
            height={20}
          />
        </div>
        <Skeleton width="50%" variant="text" className={styles.text} />
        <Skeleton width="60%" variant="text" className={styles.text} />
        <Skeleton width="40%" variant="text" className={styles.text} />
        <Skeleton width="50%" variant="text" className={styles.text} />
      </div>
      <div className={styles.card}>
        <div className={styles.header}>
          <Skeleton width="30%" variant="text" className={styles.text} />
          <Skeleton
            classes={{ root: styles.status }}
            animation="wave"
            variant="rect"
            width="20%"
            height={20}
          />
        </div>
        <Skeleton width="50%" variant="text" className={styles.text} />
        <Skeleton width="60%" variant="text" className={styles.text} />
        <Skeleton width="40%" variant="text" className={styles.text} />
        <Skeleton width="50%" variant="text" className={styles.text} />
      </div>
      <div className={styles.card}>
        <div className={styles.header}>
          <Skeleton width="30%" variant="text" className={styles.text} />
          <Skeleton
            classes={{ root: styles.status }}
            animation="wave"
            variant="rect"
            width="20%"
            height={20}
          />
        </div>
        <Skeleton width="50%" variant="text" className={styles.text} />
        <Skeleton width="60%" variant="text" className={styles.text} />
        <Skeleton width="40%" variant="text" className={styles.text} />
        <Skeleton width="50%" variant="text" className={styles.text} />
      </div>
    </>
  );
};

export default SkeletonLoading;
