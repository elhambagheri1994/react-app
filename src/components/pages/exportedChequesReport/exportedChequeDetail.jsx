import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LazyList from "../../shared/lazyLoad/list";
import ExportedChequesDetailList from "./exportedChequeDetailList";
import styles from "./exportedCheque.module.scss";
import FullScreenModal from "../../shared/fullscreenModal/fullScreenModal";
import headerStyles from "../../shared/header/header.module.scss";

const ExportedChequeDetail = ({ open, handleClose, data, deposit }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (open) {
      setUrl(
        `/rest/mha/entity/mhachequepaystatus/getcheckPageList/${deposit},${data.number}`
      );
    }
  }, [open]);

  const params = {
    searchFilter: "",
    pageSize: 10,
  };

  return (
    <FullScreenModal open={open} onClose={handleClose}>
      {data && data.number && (
        <>
          <div className={headerStyles.header}>
            <span>
              <span className="icon-left-arrow" onClick={handleClose} />
              {`${t("chequeStatusDetail")}`} {data.number}
            </span>
          </div>
          <div className={styles.detailList}>
            <LazyList
              url={url}
              component={ExportedChequesDetailList}
              params={params}
            />
          </div>
        </>
      )}
    </FullScreenModal>
  );
};

export default ExportedChequeDetail;
