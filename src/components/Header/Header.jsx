import React, { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./Header.css";
import logo from "../../img/bear.png";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";

function Header() {
  const [value, setValue] = useState("");

  return (
    <div className='px-4 pt-5'>
      <img src={logo} alt='logo' />
      <TextareaAutosize
        className='w-full min-h-8 pt-8 focus:shadow-lg bg-white focus-visible:outline-0 custom-placeholder'
        placeholder='Questionairie Title'
      />
      <Divider />
    </div>
  );
}

export default Header;
