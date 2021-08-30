import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./button.module.scss";

const SuccessButton = ({
  label,
  children,
  buttonType,
  icon,
  loading,
  classes,
  ...rest
}) => {
  return (
    <>
      <Button
        className={styles.button}
        classes={{ root: classes }}
        type="submit"
        variant="contained"
        {...rest}
      >
        {icon && buttonType === "login" && !loading && (
          <span className={`${icon} ${styles.loginIcon}`} />
        )}
        {icon && buttonType !== "login" && !loading && (
          <span className={`${icon} ${styles.normalIcon}`} />
        )}
        {label}
        {children}
        {loading && <CircularProgress size={25} className={styles.buttonProgress} />}
      </Button>
    </>
  );
};
export default SuccessButton;
