import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { getCartableUserStatus } from "../../../../services/passDataService";
import Header from "../../../shared/header/header";
import http from "../../../../services/httpServices";
import Shape from "../../../shared/shape/shape";
import styles from "./details.module.scss";
import addSeprator from "../../../shared/utils/utilFunctions";
import Loading from "../../../shared/loading/loading";
import CustomAccordin from "../../../shared/accordin/accordin";
import SuccessButton from "../../../shared/buttons/successButton";
import { store } from "../../../../context/alert/AlerProvider";
import FullScreenModal from "../../../shared/fullscreenModal/fullScreenModal";

const getLogUrl = "/rest/mha/entity/mhapayorderlog/getAllLog";
const detailsUrl = "/rest/mha/entity/mhaworkflow/";
const attachListUrl = "/rest/mha/entity/mhaworkflow/listPayPerson/";
const compareDateUrl = "/rest/mha/general/mhageneral/compareDateWithToday/";
const signUrl = "/rest/mha/entity/mhaworkflow/sign";

const CartableDetail = ({ listItem, open, handleClose }) => {
  const { dispatch } = useContext(store);
  const [loading, setLoading] = useState(true);
  const [logData, setLogData] = useState([]);
  const [details, setDetails] = useState({});
  const [attachList, setAttachList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [expDate, setExpDate] = useState(0);
  const [userStatus, setUserStatus] = useState({
    isConfirmer: false,
    isFinnancial: false,
  });

  const { t } = useTranslation();
  const compareDate = async input => {
    const date = input && input.date ? input.date.replace(/\//g, "") : "";
    const { data } = await http.getRequest(`${compareDateUrl}${date}`);
    if (data) {
      setExpDate(data);
    }
  };
  const getAttachList = async input => {
    try {
      const { data } = await http.getRequest(
        `${attachListUrl}${input.payId},${input.payType}`,
        {
          searchFilter: "",
          pageNumber: 0,
          pageSize: 5,
          order: "",
        }
      );
      if (data) {
        if (input.payGrouptype === 2) {
          setAttachList(data.entityList);
        }
        if (hasRequestList(input.babat)) {
          setRequestList(data.entityList);
        }
        getLog(input.payId);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  const hasRequestList = babat => {
    return babat.includes(";");
  };
  const getDetails = async () => {
    setLoading(true);
    try {
      const { data } = await http.getRequest(
        `${detailsUrl}${listItem.id},${listItem.status}`
      );
      if (data) {
        setDetails(data);
        if (userStatus.isFinnancial) {
          compareDate(data);
        }
        if (data.payGrouptype === 2 || hasRequestList(data.babat)) {
          getAttachList(data);
        } else {
          getLog(data.payId);
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };
  const getLog = async payId => {
    setLoading(true);
    try {
      const { data } = await http.getRequest(getLogUrl, {
        payOrderId: payId,
      });
      if (data) {
        setLogData(data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const showSign = () => {
    const { payStatus, status } = details;
    if (
      !userStatus.isFinnancial &&
      payStatus !== 11 &&
      !(status === 2 || status === 3)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const showPay = () => {
    const { status } = details;
    if (status === 4 || status === 8 || status === 10 || expDate === 1) {
      return true;
    } else {
      return false;
    }
  };
  const showDefeasance = () => {
    const { status } = details;
    if (!(status === 5 || status === 9 || status === 7 || status === 10)) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (open) {
      if (getCartableUserStatus()) {
        setUserStatus(getCartableUserStatus());
      }
      getDetails();
    }
  }, [userStatus, open]);

  const sign = async type => {
    const {
      id,
      payId,
      payMhaBankAccId,
      withdMemberId,
      withdProfileId,
      payOrderVerify,
    } = details;
    try {
      const { data } = await http.postRequest(signUrl, {
        id,
        status: type,
        payId,
        payMhaBankAccId: payMhaBankAccId || "",
        withdMemberId: withdMemberId || "",
        withdProfileId: withdProfileId || "",
        payOrderVerify: payOrderVerify || "",
      });
      if (data) {
        dispatch({ type: "OPEN_SUCCESS", payload: t("successMessage") });
        handleClose();
      }
    } catch (err) {
      if (err.customMsg) {
        dispatch({ type: "OPEN_ERROR", payload: err.customMsg });
      } else {
        dispatch({ type: "OPEN_ERROR", payload: t("error") });
      }
    }
  };

  return (
    <FullScreenModal open={open} onClose={handleClose}>
      <Header title={t("cartable")} close={handleClose} />
      {!loading && (
        <>
          <div className={styles.details}>
            <div className={styles.listHeader}>
              <span>
                <span className={styles.title}> {t("reqCode")}:</span>
                <span>{details.code}</span>
              </span>
              <span className={styles.status}>{details.statusName}</span>
            </div>
            <div className={styles.content}>
              <div>
                <span className={styles.titles}>{t("date")} :</span>
                <span className={styles.data}>{details.date}</span>
              </div>
              <div>
                <span className={styles.titles}>{t("requestType")} :</span>
                <span className={styles.data}>{details.payTypeName || "ندارد"}</span>
              </div>
              <div>
                <span className={styles.titles}>{t("amount(rial)")} :</span>
                <span className={styles.data}>{addSeprator(details.payAmount)}</span>
              </div>
              <div>
                <span className={styles.titles}>{t("reciever")} :</span>
                <span className={styles.data}>
                  {details.personUacName || "لیست پیوست"}
                </span>
              </div>
              <div>
                <span className={styles.titles}>{t("expireDate")} :</span>
                <span className={styles.data}>{details.payDate || "ندارد"}</span>
              </div>
              <div>
                <span className={styles.titles}>{t("requester")} :</span>
                <span className={styles.data}>
                  {details.generatedName || "ندارد"}
                </span>
              </div>
              <div>
                <span className={styles.titles}>{t("sourceDeposit")} :</span>
                <span className={styles.data}>
                  {details.payMhaBankAccCode || "ندارد"}
                </span>
              </div>
              <div>
                <span className={styles.titles}>{t("destDeposit")} :</span>
                <span className={styles.data}>
                  {details.personUacBankAcc || "ندارد"}
                </span>
              </div>
              <div>
                <span className={styles.titles}>{t("trackingCode")} :</span>
                <span className={styles.data}>{details.traceNumber || "ندارد"}</span>
              </div>
              <div>
                <span className={styles.titles}>{t("PaymentCode")} :</span>
                <span className={styles.data}>
                  {details.mhaPaymentCodeS || "ندارد"}
                </span>
              </div>
              <div>
                <span className={styles.titles}>{t("note")} :</span>
                <span className={styles.data}>{details.payDesc || "ندارد"}</span>
              </div>
            </div>
          </div>
          {showSign() && (
            <div className={styles.signButtons}>
              <SuccessButton label={t("sign")} onClick={() => sign(2)} />
              <SuccessButton
                label={t("disCardSign")}
                onClick={() => sign(3)}
                classes={styles.danger}
              />
            </div>
          )}
          {userStatus.isFinnancial && details.payStatus !== 11 && (
            <div className={styles.signButtons}>
              {showPay() && (
                <SuccessButton label={t("pay")} onClick={() => sign(4)} />
              )}
              {showDefeasance() && (
                <SuccessButton
                  label={t("Defeasance")}
                  onClick={() => sign(5)}
                  classes={styles.danger}
                />
              )}
            </div>
          )}
          {userStatus.isConfirmer && details.payStatus === 11 && (
            <div className={styles.signButtons}>
              <SuccessButton label={t("confirm")} onClick={() => sign(7)} />
              <SuccessButton
                label={t("rejectConfitm")}
                onClick={() => sign(3)}
                classes={styles.danger}
              />
            </div>
          )}
          <div>
            {attachList && attachList.length !== 0 && (
              <div className={styles.accordin}>
                <CustomAccordin title={t("recievers")}>
                  {attachList.map(item => {
                    return (
                      <div className={styles.accordinDetail}>
                        <div className={styles.listHeader}>
                          <span>
                            <span className={styles.title}>{t("amount")} :</span>
                            <span>{addSeprator(item.amount)}</span>
                          </span>
                          {item.uacPersonName && (
                            <span className={styles.status}>
                              {item.uacPersonName}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className={styles.title}>
                            {t("accountNumber")} :
                          </span>
                          <span className={styles.title}>
                            {item.uacPersonAccCode}
                          </span>
                        </div>
                        <div>
                          <span className={styles.title}>{t("babat")} :</span>
                          <span className={styles.title}>
                            {item.mhaPaymentReasonName}
                          </span>
                        </div>
                        <div>
                          <span className={styles.title}>{t("note")} :</span>
                          <span className={styles.title}>{item.description}</span>
                        </div>
                      </div>
                    );
                  })}
                </CustomAccordin>
              </div>
            )}
          </div>
          <div>
            {requestList && requestList.length !== 0 && (
              <div className={styles.accordin}>
                <CustomAccordin title={t("reguest")}>
                  {requestList.map(item => {
                    return (
                      <div className={styles.accordinDetail}>
                        <div className={styles.listHeader}>
                          <span>
                            <span className={styles.title}>{t("amount")} :</span>
                            <span>{addSeprator(item.amount)}</span>
                          </span>
                          {item.uacPersonName && (
                            <span className={styles.status}>
                              {item.uacPersonName}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className={styles.title}>{t("babat")} :</span>
                          <span className={styles.title}>
                            {item.mhaPaymentReasonName}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </CustomAccordin>
              </div>
            )}
          </div>
          <div className={styles.shapes}>
            {logData &&
              logData.length !== 0 &&
              logData.map(item => {
                return (
                  <div>
                    <Shape key={item.status} color={item.statusColor}>
                      {item.statusName}
                    </Shape>
                    <span>{item.workedOn}</span>
                    <span>{item.dateConvert}</span>
                  </div>
                );
              })}
          </div>
        </>
      )}
      {loading && <Loading />}
    </FullScreenModal>
  );
};

export default CartableDetail;
