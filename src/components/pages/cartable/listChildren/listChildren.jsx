import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./list.module.scss";
import addSeprator from "../../../shared/utils/utilFunctions";
import SkeletonLoading from "../../../shared/skeletonLoaing/skeletonLoading";
import CartableDetail from "../details/details";

const ListChildren = ({ listItem, loading }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const openDetail = clicked => {
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
              <span className={styles.title}>{t("reqCode")}:</span>
              <span>{listItem.code}</span>
            </span>
            <span className={styles.status}>{listItem.statusName}</span>
          </div>
          <div className={styles.content}>
            <div>
              <span className={styles.titles}>{t("date")} :</span>
              <span className={styles.data}>{listItem.date}</span>
            </div>
            <div>
              <span className={styles.titles}>{t("requestType")} :</span>
              <span className={styles.data}>{listItem.payTypeName}</span>
            </div>
            <div>
              <span className={styles.titles}>{t("amount")} :</span>
              <span className={styles.data}>{addSeprator(listItem.payAmount)}</span>
            </div>
            <div>
              <span className={styles.titles}>{t("reciever")} :</span>
              <span className={styles.data}>
                {listItem.personUacName
                  ? listItem.personUacName
                  : listItem.personUacBankAcc}
              </span>
            </div>
            <div>
              <span className={styles.titles}>{t("requester")} :</span>
              <span className={styles.data}>{listItem.generatedName || "---"}</span>
            </div>
          </div>
        </div>
      )}
      <CartableDetail open={open} handleClose={handleClose} listItem={listItem} />
      {loading && <SkeletonLoading />}
    </>
  );
};

export default ListChildren;
