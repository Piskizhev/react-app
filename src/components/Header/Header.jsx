import React, { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./Header.css";
import logo from "../../img/bear.png";
import TextField from "@mui/material/TextField";

function Header() {
  const [value, setValue] = useState("");

  return (
    <div className='px-4 pt-5 space-y-8'>
      <img src={logo} alt='logo' />
      <TextField
        id='outlined-basic'
        placeholder='Outlined'
        variant='outlined'
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <TextareaAutosize
        className='w-full min-h-8 border-b-[1px] focus:shadow-outline-purple focus:shadow-lg bg-white focus-visible:outline-0 custom-placeholder'
        placeholder='Questionairie Title'
      />
    </div>
  );
}

export default Header;
