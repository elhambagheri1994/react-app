import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../exportedChequesReport/exportedCheque.module.scss";
import addSeprator from "../../shared/utils/utilFunctions";
import SkeletonLoading from "../../shared/skeletonLoaing/skeletonLoading";
import EmptyPage from "../../shared/emptyPage/emptyPage";

const RecievedChequesList = ({ list, loading }) => {
  const { t } = useTranslation();

  return (
    <>
      {!loading &&
        list &&
        list.map(listItem => (
          <div key={listItem.number} className={styles.list}>
            <div className={styles.listHeader}>
              <span>
                <span className={styles.title}>{t("amount(rial)")}:</span>
                <span>{addSeprator(listItem.amount)}</span>
              </span>
              <span className={styles.status}>{listItem.registerDate}</span>
            </div>
            <div className={styles.content}>
              <div>
                <span className={styles.titles}>{t("chequeNumber")} :</span>
                <span className={styles.data}>{listItem.number || "---"}</span>
              </div>
              <div>
                <span className={styles.titles}>{t("issuedBank")} :</span>
                <span className={styles.data}>{listItem.deviseeBank || "---"}</span>
              </div>
              <div>
                <span className={styles.titles}>{t("settleId")} :</span>
                <span className={styles.data}>{listItem.shenase || "---"}</span>
              </div>
              <div>
                <span className={styles.titles}>{t("registerDate")} :</span>
                <span className={styles.data}>{listItem.registerDate || "---"}</span>
              </div>
              <div>
                <span className={styles.titles}>{t("passDate")} :</span>
                <span className={styles.data}>{listItem.passDate || "---"}</span>
              </div>
            </div>
          </div>
        ))}
      {loading && <SkeletonLoading />}
      {!loading && list && list.length === 0 && <EmptyPage />}
    </>
  );
};

export default RecievedChequesList;
