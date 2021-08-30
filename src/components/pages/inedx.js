import { lazy } from "react";

const login = lazy(() => import("./login/login"));
const dashboard = lazy(() => import("./dashboard/dashboard"));
const cartable = lazy(() => import("./cartable/cartable"));
const cartableDetail = lazy(() => import("./cartable/details/details"));
const about = lazy(() => import("./about/about"));
const SelectOrg = lazy(() => import("./selectOrg/selectOrg"));
const notfound = lazy(() => import("./notfound/notFound"));
const depositList = lazy(() => import("./depositList/depositList"));
const exportedChequesReport = lazy(() =>
  import("./exportedChequesReport/exportedChequesReport")
);
const exportedChequesDetail = lazy(() =>
  import("./exportedChequesReport/exportedChequeDetail")
);
const bankBillReport = lazy(() => import("./bankBillReport/bankBillReport"));
const recievedChequesReport = lazy(() =>
  import("./recievedChequesReport/recievedChequesReport")
);

export default {
  login,
  dashboard,
  cartable,
  cartableDetail,
  about,
  depositList,
  exportedChequesReport,
  exportedChequesDetail,
  bankBillReport,
  recievedChequesReport,
  SelectOrg,
  notfound,
};
