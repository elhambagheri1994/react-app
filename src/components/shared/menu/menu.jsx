import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import menuList from "./menuList";
import styles from "./menu.module.scss";
import mahyaLogo from "../../../assets/images/mahyaDashboard.svg";
import { loginstore } from "../../../context/authProvider";
import { logout } from "../../../services/authService";

const Menu = ({ toggleDrawer }) => {
  const { state } = useContext(loginstore);
  const history = useHistory();
  const { firstName, lastName, orgName } = state.data || {};

  const handleLogout = () => {
    history.replace("/login");
    logout();
  };
  return (
    <div className={styles.menuBox}>
      <img alt="mahya" src={mahyaLogo} />
      <div className={styles.company}>{orgName}</div>
      <div className={styles.user}>
        {firstName} {lastName}
      </div>
      <div
        role="presentation"
        className={styles.menu}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List classes={{ root: styles.navLinkRoot }}>
          {menuList.map(item => (
            <NavLink to={item.route} key={item.name}>
              <ListItem button>
                <ListItemText primary={item.name} />
              </ListItem>
            </NavLink>
          ))}
          <span onClick={handleLogout}>
            <ListItem button>
              <ListItemText primary="خروج" />
            </ListItem>
          </span>
        </List>
      </div>
    </div>
  );
};

export default Menu;
