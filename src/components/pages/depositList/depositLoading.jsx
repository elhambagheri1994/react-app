import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./deposit.module.scss";

const DepositLoading = () => {
  return (
    <>
      <div className={styles.depositItem}>
        <div className={styles.header}>
          <Skeleton
            width="36%"
            variant="text"
            height={40}
            classes={{ root: styles.depositNumberSkeleton }}
          />
          <Skeleton
            className={styles.depositTypeSkeleton}
            animation="wave"
            variant="rect"
            width="20%"
            height={20}
          />
        </div>
        <Skeleton width="70%" variant="text" className={styles.text} />
        <Skeleton width="30%" variant="text" className={styles.text} />
        <Skeleton width="40%" variant="text" className={styles.text} />
        <Skeleton width="30%" variant="text" className={styles.text} />
        <div className={styles.amounts}>
          <div style={{ width: "40%" }}>
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="30%"
              height={10}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
          </div>
          <div style={{ width: "40%" }}>
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="30%"
              height={10}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
          </div>
        </div>
      </div>
      <div className={styles.depositItem}>
        <div className={styles.header}>
          <Skeleton
            width="36%"
            variant="text"
            height={40}
            classes={{ root: styles.depositNumberSkeleton }}
          />
          <Skeleton
            className={styles.depositTypeSkeleton}
            animation="wave"
            variant="rect"
            width="20%"
            height={20}
          />
        </div>
        <Skeleton width="70%" variant="text" className={styles.text} />
        <Skeleton width="30%" variant="text" className={styles.text} />
        <Skeleton width="40%" variant="text" className={styles.text} />
        <Skeleton width="30%" variant="text" className={styles.text} />
        <div className={styles.amounts}>
          <div style={{ width: "40%" }}>
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="30%"
              height={10}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
          </div>
          <div style={{ width: "40%" }}>
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="30%"
              height={10}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
          </div>
        </div>
      </div>
      <div className={styles.depositItem}>
        <div className={styles.header}>
          <Skeleton
            width="36%"
            variant="text"
            height={40}
            classes={{ root: styles.depositNumberSkeleton }}
          />
          <Skeleton
            className={styles.depositTypeSkeleton}
            animation="wave"
            variant="rect"
            width="20%"
            height={20}
          />
        </div>
        <Skeleton width="70%" variant="text" className={styles.text} />
        <Skeleton width="30%" variant="text" className={styles.text} />
        <Skeleton width="40%" variant="text" className={styles.text} />
        <Skeleton width="30%" variant="text" className={styles.text} />
        <div className={styles.amounts}>
          <div style={{ width: "40%" }}>
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="30%"
              height={10}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
          </div>
          <div style={{ width: "40%" }}>
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="30%"
              height={10}
              variant="text"
              className={styles.text}
            />
            <Skeleton
              width="50%"
              height={15}
              variant="text"
              className={styles.text}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositLoading;
