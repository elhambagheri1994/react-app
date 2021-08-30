import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../shared/header/header";
import { loginstore } from "../../../context/authProvider";
import depositList from "../../../services/depositListCombo";
import DynamicForm from "../../shared/dynamicForm/dynamicForm";
import styles from "../../shared/utils/commonList.module.scss";
import LazyList from "../../shared/lazyLoad/list";
import ExportedChequesList from "./exportedChequesList";
import Loading from "../../shared/loading/loading";

const url = "/rest/mha/entity/mhachequepaystatus/list/";

const ExportedChequesReport = () => {
  const [depositListData, setDepositListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doSearch, setDoSearch] = useState(false);
  const [formValue, setFormValue] = useState({});

  const { t } = useTranslation();
  const { state } = useContext(loginstore);
  const fields = [
    {
      id: "deposit",
      label: t("deposit"),
      type: "select",
      options: depositListData || [],
    },
  ];
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
    setFormValue(values);
    setDoSearch(values.deposit);
  };

  return (
    <>
      <Header title={t("ExportedChequesReport")} />
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
          <LazyList
            url={`${url}${formValue.deposit}/`}
            component={props => (
              <ExportedChequesList {...props} deposit={formValue.deposit} />
            )}
            notLoadOnInit
            isSearching={doSearch}
            params={{
              searchFilter: "",
              pageNumber: 0,
              pageSize: 5,
            }}
          />
        </>
      )}
    </>
  );
};

export default ExportedChequesReport;
