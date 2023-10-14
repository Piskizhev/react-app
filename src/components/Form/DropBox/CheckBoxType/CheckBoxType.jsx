import React, { useState, useRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function CheckBoxType() {
  const [checkboxOptions, setCheckboxOptions] = useState(["Checkbox Option 1"]);
  const [textValue, setTextValue] = useState("");
  const [checkBoxValue, setCheckBoxValue] = useState(null);

  const inputRef = useRef(null);

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleBlur = () => {
    if (textValue.trim() !== "" && !checkboxOptions.includes(textValue)) {
      setCheckboxOptions([...checkboxOptions, textValue]);
      setTextValue("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedCheckboxOptions = [...checkboxOptions];
    updatedCheckboxOptions.splice(index, 1);
    setCheckboxOptions(updatedCheckboxOptions);
  };

  return (
    <div>
      <RadioGroup>
        {checkboxOptions.map((option, index) => (
          <div key={index} className='flex space-between'>
            <FormControlLabel control={<Checkbox />} label={option} />
            {checkboxOptions.length > 1 && (
              <IconButton
                onClick={() => handleDeleteOption(index)}
                color='secondary'
                size='small'
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}

        <FormControlLabel
          control={<Checkbox disabled />}
          label={
            <TextField
              label='Add New Option'
              value={textValue}
              onChange={handleTextChange}
              onBlur={handleBlur}
              inputRef={inputRef}
              fullWidth
            />
          }
        />
      </RadioGroup>
    </div>
  );
}

export default CheckBoxType;
