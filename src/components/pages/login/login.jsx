import React, { useContext, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DynamicForm from "../../shared/dynamicForm/dynamicForm";
import { login } from "../../../services/authService";
import styles from "./login.module.scss";
import header from "../../../assets/images/login_header.png";
import mahyaLogo from "../../../assets/images/mahyalogin.svg";
import hafizLogo from "../../../assets/images/hafiz.svg";
import { store } from "../../../context/alert/AlerProvider";
import { loginstore } from "../../../context/authProvider";
import AddToHomescreen from "../addToHomescreen/addToHomescreen";

const { version } = require("../../../../package.json");

const Login = (props) => {
  const { dispatch } = useContext(store);
  const { dispatch: loginDispatch } = useContext(loginstore);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    loginDispatch({ type: "LOGOUT" });

    if (
      !window.matchMedia("(display-mode: standalone)").matches &&
      !window.navigator.standalone
    ) {
      if (/iPad|iPhone/.test(navigator.userAgent)) {
        setOpen(true);
      }
    }
  }, []);
  const fields = [
    {
      id: "userName",
      label: t("userName"),
      type: "text",
      classes: styles.login_input,
      labelclass: styles.label_root,
      icon: "icon-user",
    },
    {
      icon: "icon-lock",
      id: "password",
      label: t("password"),
      type: "password",
      classes: styles.login_input,
      labelclass: styles.label_root,
    },
  ];
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (values, { resetForm }) => {
    const { userName, password } = values;
    if (userName && password) {
      try {
        setLoading(true);
        const { data, headers } = await login(userName, password);
        loginDispatch({
          type: "LOGIN",
          payload: { token: headers["x-auth-token"], data },
        });
        setLoading(false);
        const { state } = props.location;
        const url = state ? state.from.pathname : "/selectOrg";
        history.replace(url);
      } catch (err) {
        setLoading(false);
        dispatch({ type: "OPEN_ERROR", payload: t("loginError") });
        resetForm();
      }
    }
  };

  return (
    <ReactCSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <div className={styles.login_container}>
        <div className={styles.login_header}>
          <img className={styles.header} alt="header" src={header} />
        </div>
        <div className={styles.inputs}>
          <img alt="mahya" src={mahyaLogo} />
          <DynamicForm
            fields={fields}
            buttonType="login"
            buttonText={t("login")}
            submit={handleSubmit}
            loading={loading}
            saveIcon="icon-login"
          />
        </div>
        <img className={styles.hafizLogo} alt="hafiz" src={hafizLogo} />
        <div className={styles.version}>
          <span>{t("version")} </span>
          <span>{version}</span>
        </div>
        <AddToHomescreen open={open} handleClose={handleClose} />
      </div>
    </ReactCSSTransitionGroup>
  );
};

export default Login;
