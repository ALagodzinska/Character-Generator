import { Button, Stack } from "@mui/material";
import SelectInput from "../select-input/select-input.component";

import * as options from "../../constant/select-options.jsx";

import "./form.styles.scss";

const Form = ({ onChange, onSubmit, isBtnDisabled }) => {
  return (
    <form className="generate-form">
      <Stack direction="row" spacing={6} className="form-boxes">
        <SelectInput
          options={options.sexOptions}
          selectProps={{
            name: "sex",
            onChange: onChange,
            label: "Sex",
          }}
        />
        <SelectInput
          options={options.ageOptions}
          selectProps={{
            name: "age",
            onChange: onChange,
            label: "Age",
          }}
        />
        <SelectInput
          options={options.raceOptions}
          selectProps={{
            name: "race",
            onChange: onChange,
            label: "Race",
          }}
        />
        <Button variant="outlined" onClick={onSubmit} disabled={isBtnDisabled}>
          <span>Generate</span>
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
