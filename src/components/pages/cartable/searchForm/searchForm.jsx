import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DynamicForm from "../../../shared/dynamicForm/dynamicForm";
import Modal from "../../../shared/modal/modal";
import http from "../../../../services/httpServices";

const requestTypeUrl = "/rest/general/getPropertyValueByEngName/MhaPayOrderType";

const SearchForm = ({ openSearch, handleClose, handleSubmit, loading }) => {
  const { t } = useTranslation();
  const [requestTypes, setRequestType] = useState([]);

  const fields = [
    {
      id: "code",
      label: t("requestCode"),
      type: "number",
    },
    {
      id: "date1",
      label: t("fromDateRequest"),
      type: "date",
      icon: "icon-date",
      width: 6,
    },
    {
      id: "date2",
      label: t("toDateRequest"),
      type: "date",
      icon: "icon-date",
      width: 6,
    },
    {
      id: "payType",
      label: t("requestType"),
      type: "select",
      selectValue: "value",
      options: requestTypes || [],
    },
    {
      id: "payAmount",
      label: t("requestAmount"),
      type: "amount",
    },
  ];
  const getComboData = async () => {
    const { data } = await http.getRequest(requestTypeUrl);
    if (data) {
      setRequestType(data);
      fields.map(item => {
        if (item.id === "deposit") {
          item.options = data;
        }
        return item;
      });
    }
  };
  useEffect(() => {
    getComboData();
  }, []);
  return (
    <Modal
      open={openSearch}
      title={t("search")}
      actionLabel={t("search")}
      handleClose={handleClose}
    >
      <DynamicForm
        fields={fields}
        buttonType="search"
        buttonText={t("search")}
        submit={handleSubmit}
        loading={loading}
        saveIcon="icon-search"
      />
    </Modal>
  );
};

export default SearchForm;
