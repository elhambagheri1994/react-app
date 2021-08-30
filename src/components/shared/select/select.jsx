import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import styles from "./select.module.scss";
import SelectSkeletonLoading from "./selectSkeleton";

const SelectBox = ({
  name,
  type,
  label,
  error,
  classes,
  icon,
  options,
  selectValue,
  ...rest
}) => {
  return (
    <Grid item xs={12} className={`${styles.fieldSet}  ${classes} `}>
      <FormControl>
        {icon && <span className={`${icon}`} />}
        <InputLabel
          classes={{
            root: `${styles.muiInputLabel} ${styles.muiInputLabelRoot}`,
            focused: styles.muiInputLabel,
            formControl: styles.muiInputLabel,
            shrink: styles.labelShrink,
          }}
          id={`${name}-label`}
        >
          {label}
        </InputLabel>
        <Select
          labelId={`${name}-label`}
          inputProps={{ "aria-label": "Without label" }}
          name={name}
          id={name}
          {...rest}
        >
          {!options ||
            (options.length === 0 && (
              <MenuItem value="" classes={{ root: styles.itemRoot }}>
                <SelectSkeletonLoading />
              </MenuItem>
            ))}
          {!options ||
            (options.length === 0 && (
              <MenuItem value="" classes={{ root: styles.itemRoot }}>
                <SelectSkeletonLoading />
              </MenuItem>
            ))}
          {options && options.length !== 0 && (
            <MenuItem value="" classes={{ root: styles.itemRoot }}>
              هیچکدام
            </MenuItem>
          )}
          {options &&
            options.length !== 0 &&
            options.map(item => {
              return (
                <MenuItem
                  classes={{ root: styles.itemRoot }}
                  key={item.id}
                  value={selectValue ? item[selectValue] : item.id}
                >
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
        {error && <div className={styles.errorText}>{error}</div>}
      </FormControl>
    </Grid>
  );
};

export default SelectBox;
