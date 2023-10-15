import React, { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./Header.css";
import logo from "../../img/bear.png";
import { Divider } from "@mui/material";

function Header() {
  return (
    <div className='px-4 pt-5 custom-form-title'>
      <img src={logo} alt='logo' className='h-12' />
      <div className='pt-8 '>
        <TextareaAutosize
          className='w-full focus-visible:outline-0 custom-placeholder text-ryzhBlack'
          placeholder='Questionairie Title'
        />
      </div>
      <Divider />
    </div>
  );
}

export default Header;
