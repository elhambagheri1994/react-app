import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import styles from "./accordin.module.scss";

const CustomAccordin = ({ title, children }) => {
  return (
    <Accordion classes={{ root: styles.mainroot, expanded: styles.expanded }}>
      <AccordionSummary
        expandIcon={<span className="icon-down-chevron" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        classes={{ root: styles.sumeryroot }}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails classes={{ root: styles.detailroot }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
export default CustomAccordin;
