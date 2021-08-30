import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./exportedCheque.module.scss";
import SkeletonLoading from "../../shared/skeletonLoaing/skeletonLoading";
import ExportedChequeDetail from "./exportedChequeDetail";

const ExportedChequesList = ({ listItem, loading, deposit }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const openDetail = (clicked) => {
    if (clicked) {
      setOpen(true);
    }
  };
  return (
    <>
      {!loading && (
        <div className={styles.list} onClick={() => openDetail("clicked")}>
          <div className={styles.listHeader}>
            <span>
              <span className={styles.title}>{t("issueDate")}:</span>
              <span>{listItem.issueDate}</span>
            </span>
            <span className={styles.status}>{listItem.number}</span>
          </div>
          <div className={styles.content}>
            <div>
              <span className={styles.titles}>{t("chequePageCount")} :</span>
              <span className={styles.data}>{listItem.pageCount}</span>
            </div>
            <div>
              <span className={styles.titles}>{t("blockedCount")} :</span>
              <span className={styles.data}>{listItem.pageCountBlock}</span>
            </div>
          </div>
        </div>
      )}
      <ExportedChequeDetail
        open={open}
        handleClose={handleClose}
        deposit={deposit}
        data={listItem}
      />
      {loading && <SkeletonLoading />}
    </>
  );
};

export default ExportedChequesList;
