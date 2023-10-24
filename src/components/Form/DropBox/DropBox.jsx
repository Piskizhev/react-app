import React, {useState} from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import list from "./icons/list.svg";
import oneA from "./icons/oneA.svg";
import severalA from "./icons/severalA.svg";
import TextType from "./TextType/TextType";
import RadioType from "./RadioType/RadioType";
import CheckboxType from "./CheckBoxType/CheckBoxType";
import "./DropBox.css";

function DropBox({ questionId, updateFormData }) {
    const [selectedOption, setSelectedOption] = useState("option1");
    const [answerData, setAnswerData] = useState({ textAnswer: "" });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleAnswerDataChange = (event) => {
        const newData = { textAnswer: event.target.value };
        setAnswerData(newData);
        updateFormData(questionId, newData); // Вызов функции для обновления данных в formData
    };

    return (
        <div className='pt-6'>
            <Typography variant='subtitle1'>Answer type:</Typography>
            <Select
                value={selectedOption}
                onChange={handleOptionChange}
                className='w-full customSelect h-11'
            >
                <MenuItem value='option1'>
                    <div className='flex flex-row gap-3'>
                        <div className='w-fit flex align-middle'>
                            <img src={list} alt='list'/>
                        </div>
                        <span>Text</span>
                    </div>
                </MenuItem>
                <MenuItem value='option2'>
                    <div className='flex flex-row gap-3'>
                        <div className='w-fit flex align-middle'>
                            <img src={oneA} alt='list'/>
                        </div>
                        <span>One from the list</span>
                    </div>
                </MenuItem>
                <MenuItem value='option3'>
                    <div className='flex flex-row gap-3'>
                        <div className='w-fit flex align-middle'>
                            <img src={severalA} alt='list'/>
                        </div>
                        <span>Several from the list</span>
                    </div>
                </MenuItem>
            </Select>
            {selectedOption === "option1" && (
                <input
                    type="text"
                    value={answerData.textAnswer}
                    onChange={handleAnswerDataChange}
                />
            )}
            {selectedOption === "option2" && <RadioType/>}
            {selectedOption === "option3" && <CheckboxType/>}
        </div>
    );
}

export default DropBox;
