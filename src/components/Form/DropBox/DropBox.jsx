import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import list from "./icons/list.svg";
import oneA from "./icons/oneA.svg";
import severalA from "./icons/severalA.svg";
import TextType from "./TextType/TextType";
import RadioType from "./RadioType/RadioType";
import CheckboxType from "./CheckBoxType/CheckBoxType";
import "./DropBox.css";
function DropBox() {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='pt-6'>
      <Typography variant='subtitle1'>Answer type:</Typography>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        className='w-full Select-menu-outer'
      >
        <MenuItem value='option1'>
          <ListItemIcon>
            <img src={list} alt='list' />
          </ListItemIcon>
          Text
        </MenuItem>
        <MenuItem value='option2'>
          <ListItemIcon>
            <img src={oneA} alt='one' />
          </ListItemIcon>
          One from the list
        </MenuItem>
        <MenuItem value='option3'>
          <ListItemIcon>
            <img src={severalA} alt='some' />
          </ListItemIcon>
          Several from the list
        </MenuItem>
      </Select>
      {selectedOption === "option1" && <TextType />}
      {selectedOption === "option2" && <RadioType />}
      {selectedOption === "option3" && <CheckboxType />}
    </div>
  );
}

export default DropBox;
