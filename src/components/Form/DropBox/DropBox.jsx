import React, {useEffect, useState} from "react";
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
import TextField from "@mui/material/TextField";

function DropBox({questionId, updateFormData}) {
    const [selectedOption, setSelectedOption] = useState("option1");
    const [questionTitle, setQuestionTitle] = useState("")
    const [answerType, setAnswerType] = useState("Text")


    const handleQuestionOnChange = (event) => {
        setQuestionTitle(event.target.value)
    }

    const handleSelectedOption = (event) => {
        setSelectedOption(event.target.value)
    }
    const handleAnswerType = () => {
        return selectedOption === "option1"
            ? setAnswerType("Text")
            : selectedOption === "option2"
                ? setAnswerType("RadioType")
                : setAnswerType("CheckBox")
    }


    const updateAnswerType = () => {
        const newData = {answerType: answerType};
        updateFormData(questionId, newData); // Вызов функции для обновления данных в formData
    }
    const updateBodyObj = () => {
        const newData = {questionTitle: questionTitle};
        updateFormData(questionId, newData); // Вызов функции для обновления данных в formData
    }
    useEffect(() => {
        updateBodyObj()
        updateAnswerType()
        handleAnswerType()
    }, [questionTitle, answerType, selectedOption]);

    // const handleAnswerDataChange = () => {
    //     const newData = { textAnswer: questionTitle };
    //     setAnswerData(newData);
    //     updateFormData(questionId, newData); // Вызов функции для обновления данных в formData
    //     console.log(bodyObj)
    // };

    return (
        <div className='pt-6'>
            <TextField
                id='outlined-multiline-flexible'
                multiline
                maxRows={4}
                InputProps={{sx: {borderRadius: 2}}}
                className='w-full'
                value={questionTitle}
                placeholder={"Question title"}
                onChange={handleQuestionOnChange}
            />
            <Typography variant='subtitle1'>Answer type:</Typography>
            <Select
                value={selectedOption}
                onChange={handleSelectedOption}
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
            {selectedOption === "option1" && <TextField
                style={
                    {
                        marginTop: "10px",
                        width: "100%"
                    }}
                label="Answer preview"
                id="outlined-size-small"
                disabled
                size="small"
            />}
            {selectedOption === "option2" && <RadioType/>}
            {selectedOption === "option3" && <CheckboxType/>}
        </div>
    );
}

export default DropBox;
