import React, { useContext, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./selectOrg.module.scss";
import mahyaLogo from "../../../assets/images/org_select.svg";
import { loginstore } from "../../../context/authProvider";
import { selectOrgRequest } from "../../../services/authService";
import { store } from "../../../context/alert/AlerProvider";
import Loading from "../../shared/loading/loading";

const SelectOrg = () => {
  const { state } = useContext(loginstore);
  const { dispatch } = useContext(store);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const history = useHistory();

  const select = async code => {
    setLoading(true);
    try {
      await selectOrgRequest(code);
      setLoading(false);
      history.push("/dashboard");
      return null;
    } catch (err) {
      setLoading(false);
      if (err.customMsg) {
        dispatch({ type: "OPEN_ERROR", payload: err.customMsg });
      } else {
        dispatch({ type: "OPEN_ERROR", payload: t("error") });
      }
      return null;
    }
  };
  useEffect(() => {
    if (!state || !state.data) {
      history.push("/login");
    }
  }, [state]);
  return (
    <ReactCSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <div className={styles.selectOrgContainer}>
        <img alt="mahya" src={mahyaLogo} className={styles.logo} />
        <h5>{t("selectOrg")}</h5>
        <div className={styles.orgs}>
          {state.data &&
            state.data.organizationCharts.map(org => (
              <div key={org.id} onClick={() => select(org.id)}>
                <span className={`icon-diagram ${styles.orgLogo}`} />
                <span>{org.name}</span>
              </div>
            ))}
        </div>
      </div>
      {loading && <Loading />}
    </ReactCSSTransitionGroup>
  );
};

export default SelectOrg;
