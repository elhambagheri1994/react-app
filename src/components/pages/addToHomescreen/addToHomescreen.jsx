import React from "react";
import { useTranslation } from "react-i18next";
import FullScreenModal from "../../shared/fullscreenModal/fullScreenModal";
import mahyaLogo from "../../../assets/images/mahyaDashboard.svg";
import styles from "./addToHomescreen.module.scss";
import SuccessButton from "../../shared/buttons/successButton";

const addToHomescreen = ({ open, handleClose }) => {
  const { t } = useTranslation();

  return (
    <FullScreenModal open={open} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img alt="mahya logo" src={mahyaLogo} />
          <p className={styles.title}> {t("mahyaPwaTitle")}</p>
          <p className={styles.explanation}>{t("mahyaPwaExplanation")}</p>
          <ul>
            <li>
              <span>{t("mahyaPwaStep1")}</span>
              <i className="icon-share" />
            </li>
            <li>
              <span>{t("mahyaPwaStep2")}</span>
              <i className="icon-plus" />
            </li>
            <li>
              <span>{t("mahyaPwaStep3")}</span>
              <span>Add</span>
            </li>
          </ul>
          <SuccessButton
            label="متوجه شدم"
            onClick={handleClose}
            classes={styles.buttonRoot}
          />
        </div>
      </div>
    </FullScreenModal>
  );
};
export default addToHomescreen;
