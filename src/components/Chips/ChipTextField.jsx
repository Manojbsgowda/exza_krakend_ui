import React, { useState } from "react";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";

const ChipTextField = (props) => {
  const [chipValue, setchipValue] = useState();
  console.log(chipValue);
  return (
    <div className="App">
      <Autocomplete
        multiple
        value={chipValue}
        id="tags-filled"
        options={[]}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        onChange={(event, value) => {
          setchipValue(value);
          props.setHostNames(value);
          console.log(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={props.label}
            placeholder={props.placeholder}
          />
        )}
      />
    </div>
  );
};
export default ChipTextField;
