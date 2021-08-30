import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../shared/header/header";
import mahyaLogo from "../../../assets/images/dashboard_navbar_logo.png";
import styles from "./dashboard.module.scss";
import DashboardLoading from "./dashboardLoading";
import http from "../../../services/httpServices";
import { store } from "../../../context/alert/AlerProvider";
import addSeprator from "../../shared/utils/utilFunctions";

const dashBoardUrl = "/rest/mha/entity/mhapayorder/getDashboard";

const Dashboard = () => {
  const { dispatch } = useContext(store);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dashBoardData, setDashBoardData] = useState({});

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await http.getRequest(dashBoardUrl);
      if (data) {
        setDashBoardData(data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      dispatch({ type: "OPEN_ERROR", payload: t("customError") });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header imgTitle={mahyaLogo} reload={getData} />
      {loading && <DashboardLoading />}
      {!loading && (
        <>
          <div className={styles.header}>
            <div>
              <span className="icon-requests" />
              <div>
                <div className={styles.title}>{t("requestRadyForPay")}</div>
                <div className={styles.info}>
                  <div>
                    <span>
                      {dashBoardData.countReadyForSignOther ||
                      dashBoardData.countReadyForSignOther === 0
                        ? dashBoardData.countReadyForSignOther
                        : "-"}
                    </span>
                    <span className={styles.line} />
                    <span className={styles.gray}>
                      {t("countReadyForSignOther")}
                    </span>
                  </div>
                  <div>
                    <span>
                      {dashBoardData.countReadyForSignOwner ||
                      dashBoardData.countReadyForSignOwner === 0
                        ? dashBoardData.countReadyForSignOwner
                        : "-"}
                    </span>
                    <span className={styles.line} />
                    <span className={styles.gray}>
                      {t("countReadyForSignOwner")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className={`icon-payed ${styles.greenIcon}`} />
              <div>
                <div className={styles.title}>{t("lastMonthPayed")} </div>
                <div className={styles.info}>
                  <div>
                    <span>
                      {dashBoardData.countPaymentLastMonth ||
                      dashBoardData.countPaymentLastMonth === 0
                        ? dashBoardData.countPaymentLastMonth
                        : "-"}
                    </span>
                    <span className={styles.line} />
                    <span className={styles.gray}> {t("count")}</span>
                  </div>
                  <div>
                    <span>
                      {dashBoardData.amountPaymentLastMonth ||
                      dashBoardData.amountPaymentLastMonth === 0
                        ? addSeprator(dashBoardData.amountPaymentLastMonth)
                        : "-"}
                    </span>
                    <span className={styles.line} />
                    <span className={styles.gray}> {t("amount")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.listTitle}>
              <span className="icon-payment" />
              {t("requestReadyToPay")}
            </div>
            <section>
              <div>
                <span className={styles.gray}>{t("waintingForPayReq")}</span>
                <span className={styles.dottedLine} />

                <span>
                  {dashBoardData.countWaitingPayOrder ||
                  dashBoardData.countWaitingPayOrder === 0
                    ? dashBoardData.countWaitingPayOrder
                    : "-"}{" "}
                  {t("number")}
                </span>
              </div>
              <div>
                <span className={styles.gray}> {t("payableAmount")}</span>
                <span className={styles.dottedLine} />

                <span>
                  {dashBoardData.amountPayable || dashBoardData.amountPayable === 0
                    ? addSeprator(dashBoardData.amountPayable)
                    : "-"}{" "}
                  {t("rial")}
                </span>
              </div>
              <div>
                <span className={styles.gray}>{t("deficitBalance")}</span>
                <span className={styles.dottedLine} />

                <span>
                  {dashBoardData.deficitBalance || dashBoardData.deficitBalance === 0
                    ? dashBoardData.deficitBalance
                    : "-"}{" "}
                  {t("number")}
                </span>
              </div>
            </section>
          </div>
          <div className={styles.list}>
            <div className={styles.listTitle}>
              <span className="icon-cheque" />
              {t("issuedCheque")}
            </div>
            <section className={styles.yellwoBorder}>
              <div>
                <span className={styles.gray}> {t("countChequeIssued")}</span>
                <span className={styles.dottedLine} />

                <span>
                  {dashBoardData.countChequeIssued ||
                  dashBoardData.countChequeIssued === 0
                    ? dashBoardData.countChequeIssued
                    : "-"}{" "}
                  {t("number")}
                </span>
              </div>
              <div>
                <span className={styles.gray}>{t("amountChequeIssued")}</span>
                <span className={styles.dottedLine} />

                <span>
                  {dashBoardData.amountChequeIssued ||
                  dashBoardData.amountChequeIssued === 0
                    ? addSeprator(dashBoardData.amountChequeIssued)
                    : "-"}{" "}
                  {t("rial")}
                </span>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
