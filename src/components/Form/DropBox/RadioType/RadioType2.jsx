import React, { useState, useRef } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function RadioType() {
  const [radioOptions, setRadioOptions] = useState([]);
  const [textValue, setTextValue] = useState();

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
    <Box className='py-4 	'>
      {radioOptions.map((option, index) => (
        <Box key={index} className='flex space-between'>
          <Radio disabled checked={false} />
          <div className='flex align-middle'>
            <span>{option}</span>
            <span>{radioOptions}</span>
          </div>
          <Box>
            {radioOptions.length > 1 && (
              <IconButton
                onClick={() => handleDeleteOption(index)}
                color='secondary'
                size='small'
              >
                <ClearIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      ))}

      {/* Display the "Add New Option" */}
      <FormControlLabel
        value='add-new-option'
        control={<Radio disabled />}
        label={
          <TextField
            placeholder='Add New Option'
            value={textValue}
            onChange={handleTextChange}
            onBlur={handleBlur}
            inputRef={inputRef}
            fullWidth
          />
        }
      />
    </Box>
  );
}

export default RadioType;
