import { Box } from "@mui/material";
import React, { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./RadioType.css";
import FormLabel from "@mui/joy/FormLabel";
import Sheet from "@mui/joy/Sheet";

import cross from "../icons/cross.svg";
import radioButton from "../icons/radio-button.svg";

function RadioType() {
  const [radioOptions, setRadioOptions] = useState(["Variant 1"]);

  const handleAddNewVariant = () => {
    setRadioOptions([...radioOptions, `Variant ${radioOptions.length + 1}`]);
  };

  const handleDeleteOption = (index) => {
    const updatedRadioOptions = [...radioOptions];
    updatedRadioOptions.splice(index, 1);
    setRadioOptions(updatedRadioOptions);
  };

  return (
    <Box className='w-full pt-6'>
      <FormLabel>Answer preview:</FormLabel>
      {radioOptions.map((option, index) => (
        <div key={index} className='w-full pt-4 flex justify-between gap-3 '>
          <div className='flex items-center'>
            <div className='radioIcon pb-2'>
              <img src={radioButton} alt='radio ' />
            </div>
          </div>

          <div className='radio-text-value flex flex-1 justify-between border-b border-ryzhGray-light pb-2'>
            <div className='flex flex-1 justify-items-start custom-radio-input'>
              <TextareaAutosize
                placeholder={option}
                className='w-full custom-resize'
              />
            </div>
            {radioOptions.length > 1 && (
              <div className='flex align-middle'>
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
      <div className='w-full py-4 flex gap-3 ' onClick={handleAddNewVariant}>
        <div className='flex items-center'>
          <div className='radioIcon  items-center'>
            <img src={radioButton} alt='radio' />
          </div>
        </div>

        <Sheet className='w-full custom-radio-input '>
          <span className=' text-ryzhGray-strong font-semibold '>
            Add new variant
          </span>
        </Sheet>
      </div>
    </Box>
  );
}

export default RadioType;
