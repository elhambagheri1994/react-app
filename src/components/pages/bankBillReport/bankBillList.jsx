import React from "react";
import { useTranslation } from "react-i18next";
import SkeletonLoading from "../../shared/skeletonLoaing/skeletonLoading";
import styles from "./bankBill.module.scss";
import addSeprator from "../../shared/utils/utilFunctions";

const bankBillList = ({ listItem, loading }) => {
  const { t } = useTranslation();
  return (
    <>
      {!loading && (
        <div className={styles.list}>
          <div className={styles.listHeader}>
            <span className={styles.date}>
              <span>{listItem.sdateTime}</span>
            </span>
            <span className={styles.status}>{listItem.serial}</span>
          </div>
          <div className={styles.content}>
            <div>
              <span className={styles.titles}>{t("description")} :</span>
              <span className={styles.data}>{listItem.description}</span>
            </div>
            <div>
              <span className={styles.titles}>{t("agentBranch")} :</span>
              <span className={styles.data}>
                {listItem.agentBranchName || "---"}
              </span>
            </div>
            <div>
              <span className={styles.titles}>{t("settle")} :</span>
              <span className={styles.data}>
                {listItem.transferAmountPos || "---"}
              </span>
            </div>
            <div>
              <span className={styles.titles}>{t("balance")} :</span>
              <span className={styles.data}>{addSeprator(listItem.balance)}</span>
            </div>
            <div>
              <span className={styles.titles}>{t("paymentCode")} :</span>
              <span className={styles.data}>
                {listItem.registerNumber || listItem.registerNumber === 0
                  ? listItem.registerNumber
                  : "---"}
              </span>
            </div>
            <div>
              <span className={styles.titles}>{t("referenceCode")} :</span>
              <span className={styles.data}>
                {listItem.refrenceNo || listItem.refrenceNo === 0
                  ? listItem.refrenceNo
                  : "---"}
              </span>
            </div>
            <div>
              <span className={styles.titles}>{t("terminalCode")} :</span>
              <span className={styles.data}>
                {listItem.terminalNo || listItem.terminalNo === 0
                  ? listItem.terminalNo
                  : "---"}
              </span>
            </div>
          </div>
        </div>
      )}
      {loading && <SkeletonLoading />}
    </>
  );
};

export default bankBillList;
