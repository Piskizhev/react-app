import React, { useState, useRef } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function RadioType() {
  const [radioOptions, setRadioOptions] = useState(["Radio Option 1"]);
  const [textValue, setTextValue] = useState("");

  const inputRef = useRef(null);

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleBlur = () => {
    if (textValue.trim() !== "" && !radioOptions.includes(textValue)) {
      setRadioOptions([...radioOptions, textValue]);
      setTextValue("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedRadioOptions = [...radioOptions];
    updatedRadioOptions.splice(index, 1);
    setRadioOptions(updatedRadioOptions);
  };

  return (
    <div>
      <RadioGroup>
        {radioOptions.map((option, index) => (
          <div key={index} className='flex space-between'>
            <FormControlLabel
              value={option}
              control={<Radio />}
              label={option}
            />
            {radioOptions.length > 1 && (
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

        {/* Display the "Add New Option" field like a disabled radio option */}
        <FormControlLabel
          value='add-new-option'
          control={<Radio disabled />}
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

export default RadioType;
