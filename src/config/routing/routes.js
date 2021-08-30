import views from "../../components/pages/inedx";

const DEFAULT_VIEW = {
  component: views.login,
  path: "/",
  isPrivate: false,
  exact: true,
};
const LOGIN_VIEW = {
  component: views.login,
  path: "/login",
  isPrivate: false,
};
const DASHBOARD_VIEW = {
  component: views.dashboard,
  path: "/dashboard",
  isPrivate: true,
};
const CARTABLE_VIEW = {
  component: views.cartable,
  path: "/cartable",
  isPrivate: true,
};
const CARTABLE_DETAILVIEW = {
  component: views.cartableDetail,
  path: "/cartableDetail",
  isPrivate: true,
};
const ABOUT_VIEW = {
  component: views.about,
  path: "/about",
  isPrivate: false,
};
const SELECTORG_VIEW = {
  component: views.SelectOrg,
  path: "/SelectOrg",
  isPrivate: true,
};
const DEPOSITLIST_VIEW = {
  component: views.depositList,
  path: "/depositList",
  isPrivate: true,
};
const EXPORTEDCHEQUE_VIEW = {
  component: views.exportedChequesReport,
  path: "/ExportedChequesReport",
  isPrivate: true,
};
const EXPORTEDCHEQUEDETAIL_VIEW = {
  component: views.exportedChequesDetail,
  path: "/exportedChequeDetail",
  isPrivate: true,
};
const BANKBILLREPORT_VIEW = {
  component: views.bankBillReport,
  path: "/bankBillReport",
  isPrivate: true,
};
const RECIEVEDCHEQUEREPORT_VIEW = {
  component: views.recievedChequesReport,
  path: "/recievedChequesReport",
  isPrivate: true,
};
const NOTFOUND_VIEW = {
  component: views.notfound,
  path: "*",
  isPrivate: false,
  exact: true,
};

//  NOTICE : 'NOTFOUND_VIEW' MUST ALWAYS BE THE LAST ONE!!

export default [
  LOGIN_VIEW,
  DASHBOARD_VIEW,
  DEFAULT_VIEW,
  CARTABLE_VIEW,
  CARTABLE_DETAILVIEW,
  ABOUT_VIEW,
  SELECTORG_VIEW,
  DEPOSITLIST_VIEW,
  BANKBILLREPORT_VIEW,
  EXPORTEDCHEQUE_VIEW,
  EXPORTEDCHEQUEDETAIL_VIEW,
  RECIEVEDCHEQUEREPORT_VIEW,
  NOTFOUND_VIEW,
];
