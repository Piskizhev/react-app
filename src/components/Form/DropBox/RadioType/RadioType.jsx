import Radio from "@mui/material/Radio";
import { Box } from "@mui/material";
import React, { useState } from "react";

function RadioType() {
  const [radioOptions, setRadioOptions] = useState(["Variant 1"]);
  const [radioInputValue, setRadioInputValue] = useState("");
  const handleRadioInputChange = (event) => {
    radioInputValue(event.target.value);
  };
  const handleBlur = () => {
    if (
      radioInputValue.trim() !== "" &&
      !radioOptions.includes(radioInputValue)
    ) {
      setRadioOptions([...radioOptions, radioInputValue]);
      setRadioInputValue("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedRadioOptions = [...radioOptions];
    updatedRadioOptions.splice(index, 1);
    setRadioOptions(updatedRadioOptions);
  };

  return (
    <Box className='flex'>
      {radioOptions.map((option, index) => (
        <div className='w-full flex-row'>
          <div className='radioIcon flex-1'>
            <Radio disabled cheked={false} />
          </div>
          <div className='contents'>
            <div className='flex-1'>eto 1</div>
            <div className='radio-text-value flex-1'>eto2 crest</div>
          </div>
        </div>
      ))}
    </Box>
  );
}

export default RadioType;
