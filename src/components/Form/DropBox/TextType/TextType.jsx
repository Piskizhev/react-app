import * as React from "react";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import "./TextType.css";
import Box from "@mui/material/Box";

export default function TextType() {
  return (
    <Box className='pt-6 '>
      <FormLabel className='pb-1'>Answer preview:</FormLabel>
      <Input
        placeholder='Short answer'
        size='lg'
        disabled
        variant='outlined'
        className='custom-placeholder-text'
        type="text"
      />
    </Box>
  );
}
