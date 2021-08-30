import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import styles from "./datePicker.module.scss";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const CustomDatePicker = ({ onChange, error, icon, classes, width, label }) => {
  const [selectedDate, handleDateChange] = React.useState(null);
  const handleChange = (event) => {
    if (event !== null) {
      const formattedDAte = jMoment(event).format("jYYYY/jMM/jDD");
      onChange(formattedDAte);
      handleDateChange(event);
    } else {
      onChange(null);
      handleDateChange(null);
    }
  };
  return (
    <Grid item sm={width} xs={12} className={`${styles.fieldSet}  ${classes} `}>
      {icon && <span className={`${icon}`} />}
      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
        <DatePicker
          clearable
          autoOk
          // disableToolbar
          okLabel="تأیید"
          cancelLabel="لغو"
          clearLabel="پاک کردن"
          label={label}
          InputLabelProps={{
            classes: {
              root: styles.root,
              focused: styles.root,
              formControl: styles.muiInputLabel,
              shrink: styles.shrinkLabel,
            },
          }}
          labelFunc={(date) => (date ? date.format("jYYYY/jMM/jDD") : "")}
          value={selectedDate}
          onChange={handleChange}
          helperText={null}
          classes={{ root: styles.datepickerRoot }}
        />
      </MuiPickersUtilsProvider>
      {error && <div className={styles.errorText}>{error}</div>}
    </Grid>
  );
};
CustomDatePicker.propTypes = {
  error: PropTypes.string,
  width: PropTypes.number,
};
CustomDatePicker.defaultProps = {
  error: "",
  width: 12,
};
export default CustomDatePicker;
