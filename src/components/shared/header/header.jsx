import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import styles from "./header.module.scss";
import Menu from "../menu/menu";
import { getProfileData } from "../../../services/httpServices";
import { getSavedData } from "../../../services/storeService";
import { loginstore } from "../../../context/authProvider";

const Header = ({
  title,
  hasBack,
  search,
  reload,
  imgTitle,
  history,
  close,
}) => {
  const [state, setState] = useState({ open: false });
  const { dispatch } = useContext(loginstore);
  const getProfile = async () => {
    if (getSavedData("token")) {
      try {
        const { data } = await getProfileData();
        dispatch({
          type: "USERDATA",
          payload: { data },
        });
      } catch (err) {
        return err;
      }
    }
    return null;
  };
  useEffect(() => {
    getProfile();
  }, []);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ open });
  };
  return (
    <>
      <div className={styles.header}>
        <span>
          {hasBack && (
            <span
              className="icon-left-arrow"
              onClick={() => history.goBack()}
            />
          )}
          {close && <span className="icon-left-arrow" onClick={close} />}
          {!hasBack && !close && (
            <span className="icon-menu" onClick={toggleDrawer(true)} />
          )}
          {!imgTitle ? title : <img alt="headerTitle" src={imgTitle} />}
        </span>
        {search && (
          <span className={`icon-search ${styles.search}`} onClick={search} />
        )}
        {reload && (
          <span className={`icon-reload ${styles.reload}`} onClick={reload} />
        )}
      </div>
      <Drawer anchor="right" open={state.open} onClose={toggleDrawer(false)}>
        <Menu toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};
export default withRouter(Header);
