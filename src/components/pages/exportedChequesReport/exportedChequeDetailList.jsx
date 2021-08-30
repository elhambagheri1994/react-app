import React from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./exportedCheque.module.scss";
import SkeletonLoading from "../../shared/skeletonLoaing/skeletonLoading";

const ExportedChequesDetailList = ({ listItem, loading }) => {
  const { t } = useTranslation();

  return (
    <>
      {!loading && (
        <div className={styles.list}>
          <div className={styles.listHeader}>
            <span>
              <span className={styles.title}>{t("chequeSerialNumber")}:</span>
              <span>{listItem.number}</span>
            </span>
            <Tooltip enterDelay={1} leaveDelay={200} title={listItem.statusName}>
              <span className={styles.status}>{listItem.statusName}</span>
            </Tooltip>
          </div>
          <div className={styles.content}>
            <div>
              <span className={styles.titles}>{t("chequeIssueAmount")} :</span>
              <span className={styles.data}>
                {listItem.mhaRegisterAmount || "---"}
              </span>
            </div>
            <div>
              <span className={styles.titles}>{t("finalAmount")} :</span>
              <span className={styles.data}>
                {listItem.balance || listItem.balance === 0
                  ? listItem.balance
                  : "---"}
              </span>
            </div>
            <div>
              <span className={styles.titles}>{t("changeStatusDate")} :</span>
              <span className={styles.data}>
                {listItem.changeStatusDate || "---"}
              </span>
            </div>
            <div>
              <span className={styles.titles}>{t("descriptionBabat")} :</span>
              <span className={styles.data}>
                {listItem.mhaPaymentReasonDesc || "---"}
              </span>
            </div>
          </div>
        </div>
      )}
      {loading && <SkeletonLoading />}
    </>
  );
};

export default ExportedChequesDetailList;
