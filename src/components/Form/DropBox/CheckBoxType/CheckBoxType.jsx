import { Box } from "@mui/material";
import React, { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./CheckBoxType.css";
import FormLabel from "@mui/joy/FormLabel";
import Sheet from "@mui/joy/Sheet";

import cross from "../icons/cross.svg";
import checkButton from "../icons/check-button.svg";

function CheckType() {
  const [checkOptions, setCheckOptions] = useState(["Variant1"]);

  const handleAddNewVariant = () => {
    setCheckOptions([...checkOptions, `Variant ${checkOptions.length + 1}`]);
  };

  const handleDeleteOption = (index) => {
    const updatedCheckOptions = [...checkOptions];
    updatedCheckOptions.splice(index, 1);
    setCheckOptions(updatedCheckOptions);
  };

  return (
    <Box className='w-full pt-6'>
      <FormLabel>Answer preview:</FormLabel>
      {checkOptions.map((option, index) => (
        <div key={index} className='w-full pt-4 flex justify-between gap-3 '>
          <div className='flex items-center'>
            <div className='checkIcon pb-2'>
              <img src={checkButton} alt='check ' />
            </div>
          </div>

          <div className='check-text-value flex flex-1 justify-between border-b border-ryzhGray-light pb-2'>
            <div className='flex flex-1 justify-items-start custom-check-input '>
              <TextareaAutosize
                placeholder={option}
                className='w-full custom-resize '
              />
            </div>
            {checkOptions.length > 1 && (
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
          <div className='checkIcon  items-center'>
            <img src={checkButton} alt='check' />
          </div>
        </div>

        <Sheet className='w-full custom-check-input '>
          <span className=' text-ryzhGray-strong font-semibold'>
            Add new variant
          </span>
        </Sheet>
      </div>
    </Box>
  );
}

export default CheckType;
