import React from "react";
import LazyList from "../../shared/lazyLoad/list";
import ListChildren from "./listChildren/listChildren";

const apiEndpoint = "/rest/mha/entity/mhaworkflow/list";

const ImperfectProcess = ({ searchdata }) => {
  const params = {
    searchFilter: searchdata.searchFilter || "",
    status: 10,
    pageSize: 10,
    order: "",
    fromPaymentDate: searchdata.fromPaymentDate || "",
    toPaymentDate: searchdata.toPaymentDate || "",
  };

  return (
    <>
      <LazyList
        url={apiEndpoint}
        searchdata={searchdata}
        component={ListChildren}
        params={params}
      />
    </>
  );
};

export default ImperfectProcess;
