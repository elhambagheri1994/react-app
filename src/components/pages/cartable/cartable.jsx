import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CustomTabs from "../../shared/tabs/tabs";
import Header from "../../shared/header/header";
import styles from "./cartable.module.scss";
import Tab2 from "./tab2";
import SearchForm from "./searchForm/searchForm";
import WaintingForSign from "./waintingForSign";
import http from "../../../services/httpServices";
import { setCartableUserStatus } from "../../../services/passDataService";
import SuccessPayment from "./successPayment";
import FailedPayment from "./failedPayment";
import Expired from "./expired";
import DiscardSigning from "./discardSigning";
import ImperfectProcess from "./imperfectProcess";
import Canceled from "./canceled";
import WaitingForSubmition from "./waitingForSubmition";
import AllCategories from "./allCategories";
import cartableSearchFields from "./seacrhFieldModel";
import {
  convertToSearchFormat,
  mapFieldsToSearchFields,
} from "../../shared/utils/utilFunctions";

const userStatusUrl = "/rest/mha/general/mhageneral/isCurrentUserFinancial";

const Cartable = () => {
  const { t } = useTranslation();
  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState({});
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    getUserStatus();
  }, []);

  const getUserStatus = async () => {
    const { data } = await http.getRequest(userStatusUrl);
    if (data) {
      setCartableUserStatus(data);
    }
  };
  const handleTabChange = (event, newValue) => {
    setSearchValue({ searchFilter: "" });
    setTabValue(newValue);
  };
  const handleOpenSearch = () => {
    setOpenSearch(true);
  };
  const handleClose = () => {
    setOpenSearch(false);
  };
  const tabData = [
    { label: "در انتظار امضا", component: WaintingForSign },
    { label: "امضا شده", component: Tab2 },
    { label: "پرداخت موفق", component: SuccessPayment },
    { label: "پرداخت ناموفق", component: FailedPayment },
    { label: "منقضی‌ شده", component: Expired },
    { label: "لغو شده", component: Canceled },
    { label: "رد امضا شده", component: DiscardSigning },
    { label: "پردازش ناقص", component: ImperfectProcess },
    { label: "درانتظار تایید", component: WaitingForSubmition },
    { label: "همه موارد", component: AllCategories },
  ];

  const handleSubmit = values => {
    const searchModel = mapFieldsToSearchFields(cartableSearchFields, values);
    setSearchValue({ searchFilter: convertToSearchFormat(searchModel).toString() });
    handleClose();
  };

  return (
    <>
      <Header title={t("cartable")} search={handleOpenSearch} />
      <div className={styles.tabs}>
        <CustomTabs
          onChange={handleTabChange}
          value={tabValue}
          tabData={tabData}
          searchdata={searchValue}
        />
      </div>
      <SearchForm
        openSearch={openSearch}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Cartable;
