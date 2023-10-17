import { Box } from "@mui/material";
import React, { useState, useRef } from "react";
import Textarea from "@mui/joy/Textarea";
import "./RadioType.css";
import FormLabel from "@mui/joy/FormLabel";

import cross from "../icons/cross.svg";
import radioButton from "../icons/radio-button.svg";

function RadioType() {
  const inputRef = useRef(null);
  const [radioOptions, setRadioOptions] = useState(["Variant1"]);
  const [radioInputValue, setRadioInputValue] = useState("");
  const handleRadioInputChange = (event) => {
    setRadioInputValue(event.target.value);
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
    <Box className='w-full pt-6'>
      <FormLabel className=''>Answer preview:</FormLabel>
      {radioOptions.map((option, index) => (
        <div key={index} className='w-full py-4 flex justify-between gap-3 '>
          <div className='flex items-center'>
            <div className='radioIcon pb-2'>
              <img src={radioButton} alt='radio ' />
            </div>
          </div>

          <div className='radio-text-value flex flex-1 justify-between border-b border-ryzhGray-light pb-2'>
            <div className='flex flex-1  justify-items-start'>
              <Textarea
                placeholder={option}
                variant='plain'
                className='w-full '
              />
            </div>
            {radioOptions.length > 1 && (
              <div className='flex  align-middle'>
                <img
                  src={cross}
                  alt='delete'
                  onClick={() => handleDeleteOption(index)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
      <div className='w-full py-4 flex justify-between gap-3 '>
        <div className='flex items-center'>
          <div className='radioIcon pb-2'>
            <img src={radioButton} alt='radio' />
          </div>
        </div>

        <div
          className='radio-text-value flex flex-1 justify-between focus::border-ryzhGray-light pb-2'
          value='add-new-option'
        >
          <div className='flex flex-1  justify-items-start'>
            <Textarea
              placeholder='Add New Option'
              value={radioInputValue}
              onChange={handleRadioInputChange}
              onBlur={handleBlur}
              inputRef={inputRef}
              className='w-full '
              variant='plain'
            />
          </div>
        </div>
      </div>
    </Box>
  );
}

export default RadioType;
