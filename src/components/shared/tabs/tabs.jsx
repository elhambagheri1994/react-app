import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styles from "./tabs.module.scss";
import TabPanel from "./tabPanel";

export default function CustomTabs({ tabData, value, onChange, ...rest }) {
  return (
    <div>
      <AppBar classes={{ root: styles.appBarRoot }} position="fixed">
        <Tabs
          classes={{ root: styles.tabsRoot }}
          value={value}
          onChange={onChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {tabData &&
            tabData.map((tab, index) => (
              <Tab
                classes={{ root: styles.buttonRoot }}
                key={tab.label}
                label={tab.label}
                id={`scrollable-auto-tab-${index}`}
                aria-controls={`scrollable-auto-tabpanel-${index}`}
              />
            ))}
        </Tabs>
      </AppBar>
      {tabData &&
        tabData.map((tab, index) => (
          <TabPanel
            key={tab.label}
            component={tab.component}
            index={index}
            value={value}
            {...rest}
          />
        ))}
    </div>
  );
}
