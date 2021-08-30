import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../shared/header/header";
import { loginstore } from "../../../context/authProvider";
import depositList from "../../../services/depositListCombo";
import DynamicForm from "../../shared/dynamicForm/dynamicForm";
import styles from "../../shared/utils/commonList.module.scss";
import RecievedChequesList from "./recievedChequesList";
import Loading from "../../shared/loading/loading";
import http from "../../../services/httpServices";
import { store } from "../../../context/alert/AlerProvider";

const chequereciveUrl = "/rest/mha/entity/chequerecive/list/";

const RecievedChequesReport = () => {
  const [depositListData, setDepositListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [listData, setData] = useState([]);

  const { t } = useTranslation();
  const { state } = useContext(loginstore);
  const { dispatch } = useContext(store);

  const fields = [
    {
      id: "deposit",
      label: t("deposit"),
      type: "select",
      options: depositListData || [],
    },
  ];
  const getData = async deposit => {
    const url = `${chequereciveUrl}${deposit}`;
    setListLoading(true);
    try {
      const { data } = await http.getRequest(url, {
        pageNumber: 0,
        pageSize: 0,
      });
      if (data) {
        setData(data);
      }
      setListLoading(false);
    } catch (err) {
      setListLoading(false);
      if (err.customMsg) {
        dispatch({ type: "OPEN_ERROR", payload: err.customMsg });
      } else {
        dispatch({ type: "OPEN_ERROR", payload: t("error") });
      }
    }
  };
  const getDepositData = async () => {
    const { orgId } = state.data || {};
    setLoading(true);
    try {
      const { data } = await depositList(orgId);
      if (data) {
        setDepositListData(data.entityList);
        fields.map(item => {
          if (item.id === "deposit") {
            item.options = data.entityList;
          }
          return item;
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepositData();
  }, [state]);
  const handleSubmit = values => {
    if (values.deposit) {
      getData(values.deposit);
    } else {
      setData([]);
    }
  };

  return (
    <>
      <Header title={t("recievedChequesReport")} />
      {loading && <Loading />}
      {!loading && (
        <>
          <div className={styles.listForm}>
            <div className={styles.title}>{t("filDepositNumber")}</div>

            <DynamicForm
              fields={fields}
              buttonType="search"
              buttonText={t("search")}
              submit={handleSubmit}
              saveIcon="icon-search"
            />
          </div>

          <RecievedChequesList loading={listLoading} list={listData} />
        </>
      )}
    </>
  );
};

export default RecievedChequesReport;
