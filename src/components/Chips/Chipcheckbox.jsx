import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete } from "@mui/material";
import { getServiceFormData } from "../../redux/formSubmit/formSubmitSlice";
import { useSelector } from "react-redux";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {
  const { hostName } = useSelector(getServiceFormData);
  console.log(hostName);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={hostName}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      onChange={(event, value) => {
        props.checkedHostNames(value);
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
  );
}
