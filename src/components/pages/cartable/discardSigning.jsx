import React from "react";
import LazyList from "../../shared/lazyLoad/list";
import ListChildren from "./listChildren/listChildren";

const apiEndpoint = "/rest/mha/entity/mhaworkflow/list";

const DiscardSigning = ({ searchdata }) => {
  const params = {
    searchFilter: searchdata.searchFilter || "",
    status: 7,
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

export default DiscardSigning;
