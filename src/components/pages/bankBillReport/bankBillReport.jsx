import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loginstore } from "../../../context/authProvider";
import depositList from "../../../services/depositListCombo";
import DynamicForm from "../../shared/dynamicForm/dynamicForm";
import Header from "../../shared/header/header";
import LazyList from "../../shared/lazyLoad/list";
import Loading from "../../shared/loading/loading";
import BankBillList from "./bankBillList";
import styles from "../../shared/utils/commonList.module.scss";
import {
  convertToSearchFormat,
  mapFieldsToSearchFields,
} from "../../shared/utils/utilFunctions";

const url = "/rest/mha/entity/mhayaghutstatement/getReportBillFirst";

const BankBillReport = () => {
  const [depositListData, setDepositListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doSearch, setDoSearch] = useState(false);
  const [searchValue, setSearchValue] = React.useState({});
  const { t } = useTranslation();
  const { state } = useContext(loginstore);
  const fields = [
    {
      id: "depositNumber",
      label: t("deposit"),
      type: "select",
      options: depositListData || [],
      validationType: "string",
      validations: [
        {
          type: "required",
          params: [t("required")],
        },
      ],
    },
    {
      id: "fromDate",
      label: t("fromDate"),
      type: "date",
      icon: "icon-date",
      width: 6,
      validationType: "string",
      validations: [
        {
          type: "required",
          params: [t("required")],
        },
      ],
    },
    {
      id: "toDate",
      label: t("toDate"),
      type: "date",
      icon: "icon-date",
      width: 6,
      validationType: "string",
      validations: [
        {
          type: "required",
          params: [t("required")],
        },
      ],
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

  const cartableSearchFields = [
    {
      id: "depositNumber",
      opr: 1,
    },
    {
      id: "fromDate",
      opr: 5,
      type: "date",
    },
    {
      id: "toDate",
      opr: 6,
      type: "date",
    },
    {
      id: "company",
      opr: 1,
    },
    {
      id: "actionType",
      opr: 1,
    },
  ];
  const handleSubmit = values => {
    Object.assign(values, { company: state.data.orgId, actionType: "0" });
    const searchModel = mapFieldsToSearchFields(cartableSearchFields, values);
    setSearchValue({
      searchFilter: convertToSearchFormat(searchModel).toString(),
    });
    setDoSearch(searchModel);
  };
  return (
    <>
      <Header title={t("BankBillReport")} />
      {loading && <Loading />}
      {!loading && (
        <>
          <div className={styles.listForm}>
            <div className={styles.title}>{t("fillAllFields")}</div>
            <DynamicForm
              fields={fields}
              buttonType="search"
              buttonText={t("search")}
              submit={handleSubmit}
              saveIcon="icon-search"
            />
          </div>
          <LazyList
            url={url}
            component={props => <BankBillList {...props} />}
            notLoadOnInit
            isSearching={doSearch}
            params={{
              searchFilter: searchValue.searchFilter,
              pageNumber: 0,
              pageSize: 5,
            }}
          />
        </>
      )}
    </>
  );
};

export default BankBillReport;
