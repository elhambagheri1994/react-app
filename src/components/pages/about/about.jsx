import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./about.module.scss";
import mahyaLogo from "../../../assets/images/mahyaDashboard.svg";
import ansarLogo from "../../../assets/images/ansar.svg";
import hafizLogo from "../../../assets/images/hafiz.svg";
import Header from "../../shared/header/header";

const { version } = require("../../../../package.json");

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t("aboutMahya")} />
      <div className={styles.about}>
        <div className={styles.content}>
          <img alt="mahya" src={mahyaLogo} />
          <p>
            <span>اپ پیشرو &ldquo;محیا | مدیریت یکپارچه حساب‌های انصار&ldquo;</span>
            برنامه سازمانی جهت دسترسی به سامانه محیا می‌باشد. این وب اپلیکیشن توسط
            <span className={styles.name}> شرکت فناوران اطلاعات بانک انصار </span>
            طراحی و پیاده‌سازی شده است.
          </p>
          <div className={styles.details}>
            <span>{t("version")} : </span>
            <span>{version}</span>
          </div>
          <div className={styles.details}>
            <span>{t("publishDate")} : </span>
            <span>دی 1399</span>
          </div>
          <a href="https://mahya.ansarbank.ir" target="_blank">
            mahya.ansarbank.ir
          </a>
          <a href="mailto:mahya@ansarbank.ir">mahya@ansarbank.ir</a>
        </div>

        <div className={styles.logo}>
          <img alt="ansarLogo" src={ansarLogo} />
          <span />
          <img alt="hafiz" src={hafizLogo} />
        </div>
      </div>
    </>
  );
};

export default About;
