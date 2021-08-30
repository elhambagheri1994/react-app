import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../shared/header/header";
import EmptyPage from "../../shared/emptyPage/emptyPage";
import http from "../../../services/httpServices";
import styles from "./deposit.module.scss";
import addSeprator from "../../shared/utils/utilFunctions";
import { loginstore } from "../../../context/authProvider";
import DepositLoading from "./depositLoading";
import { store } from "../../../context/alert/AlerProvider";

const DepositList = () => {
  const [listData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(loginstore);
  const { dispatch } = useContext(store);

  const { t } = useTranslation();
  const getData = async () => {
    const { orgId } = state.data || {};
    const url = `/rest/mha/report/mhadepositlist/list/${orgId}`;
    setLoading(true);
    try {
      const { data } = await http.getRequest(url, {
        depositNumber: "",
        currency: "",
        personality: "",
        depositStatus: "",
        pageNumber: 0,
        pageSize: 0,
      });
      if (data) {
        setData(data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.customMsg) {
        dispatch({ type: "OPEN_ERROR", payload: err.customMsg });
      } else {
        dispatch({ type: "OPEN_ERROR", payload: t("error") });
      }
    }
  };
  useEffect(() => {
    getData();
  }, [state]);
  return (
    <>
      <Header title={t("depositList")} reload={getData} />
      <div className={styles.deposits}>
        {loading && <DepositLoading />}
        {!loading && listData.length === 0 && <EmptyPage />}
        {!loading &&
          listData &&
          listData.map(listItem => (
            <div className={styles.depositItem} key={listItem.depositNumber}>
              <div className={styles.header}>
                <span className={styles.depositNumber}>
                  {listItem.depositNumber}
                </span>
                <span className={styles.depositType}>{listItem.groupName}</span>
              </div>
              <div className={styles.title}>{listItem.depositTitle}</div>
              <div className={styles.content}>
                <div className={styles.titles}>
                  <span>{t("status")}:</span>
                  <span> {t("currencyType")}:</span>
                  <span>{t("blocked")}: </span>
                </div>
                <div className={styles.data}>
                  <span>{listItem.depositStatusName}</span>
                  <span>{listItem.currencyName}</span>
                  <span>{addSeprator(listItem.blockedAmount)}</span>
                </div>
              </div>
              <div className={styles.amounts}>
                <div>
                  <span>{addSeprator(listItem.balance)}</span>
                  <span className={styles.line} />
                  <span className={styles.gray}>{t("balanceRial")}</span>
                </div>
                <div>
                  <span>{addSeprator(listItem.availableBalance)}</span>
                  <span className={styles.line} />
                  <span className={styles.gray}>{t("availableBalanceRial")}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default DepositList;
