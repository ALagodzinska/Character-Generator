import { MenuItem, TextField } from "@mui/material";
import "./select-input.styles.scss";

const SelectInput = ({ options, selectProps }) => {
  console.log(selectProps);
  return (
    <TextField
      id="outlined-select-currency"
      select
      defaultValue={options[0]}
      size="small"
      {...selectProps}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectInput;
