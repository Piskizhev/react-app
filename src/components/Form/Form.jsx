import React, { useEffect, useState } from "react";
import {
  Tooltip,
  IconButton,
  Box,
  Input,
  Popover,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import DropBox from "./DropBox/DropBox";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import clsx from "clsx";
import TextField from "@mui/material/TextField";

function Form() {
  const [questions, setQuestions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [titleValue, setTitleValue] = useState("");
  const [a_preview, setA_preview] = useState("");

  // useEffect(() => {
  //   let body = {
  //     titleValie: titleValue,
  //   };
  //   return body;
  // }, [titleValue]);

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: generateUniqueId() },
    ]);
  };

  const handleDeleteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteConfirm = (id) => {
    // Remove the question with the given ID
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    setAnchorEl(null);
  };

  const handleDeleteCancel = () => {
    setAnchorEl(null);
  };

  const generateUniqueId = () => {
    return (
      new Date().getTime().toString(36) + Math.random().toString(36).substr(2)
    );
  };

  const Label = React.forwardRef(
    ({ className: classNameProp, children }, ref) => {
      const formControlContext = useFormControlContext();
      const [dirty, setDirty] = React.useState(false);

      React.useEffect(() => {
        if (formControlContext?.filled) {
          setDirty(true);
        }
      }, [formControlContext]);

      if (formControlContext === undefined) {
        return (
          <p className={clsx("text-sm mb-1", classNameProp)}>{children}</p>
        );
      }

      const { error, required, filled } = formControlContext;
      const showRequiredError = dirty && required && !filled;

      return (
        <p
          ref={ref}
          className={clsx(
            "text-sm mb-1",
            classNameProp,
            error || showRequiredError ? "invalid text-red-500" : ""
          )}
        >
          {children}
          {required}
        </p>
      );
    }
  );

  const HelperText = React.forwardRef((props, ref) => {
    const { className, ...other } = props;
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return showRequiredError ? (
      <p ref={ref} className={clsx("text-sm", className)} {...other}>
        <span className='text-red-500'>Error text</span>
      </p>
    ) : null;
  });

  HelperText.propTypes = {
    className: PropTypes.string,
  };

  return (
    <div className='px-4'>
      <TextField
        id='outlined-basic'
        placeholder='Outlined'
        variant='outlined'
        value={titleValue}
        onChange={(event) => setTitleValue(event.target.value)}
      />
      {questions.map((question, index) => (
        <div key={question.id}>
          <Box className='flex justify-between pt-[32px]'>
            <Tooltip title='Add' placement='left-start'>
              #Question{index + 1}
            </Tooltip>
            <div>
              <Tooltip title='Delete' placement='right-start'>
                <IconButton className='h-5 w-5' onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleDeleteCancel}
                anchorReference='anchorPosition'
                anchorPosition={{
                  top: window.innerHeight - 32, // Adjust as needed
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box p={2}>
                  <span>Are you sure you want to delete this question?</span>
                  <Button onClick={() => handleDeleteConfirm(question.id)}>
                    Confirm
                  </Button>
                  <Button onClick={handleDeleteCancel}>Cancel</Button>
                </Box>
              </Popover>
            </div>
          </Box>
          <FormControl required>
            <Input
              placeholder='Short answer'
              slotProps={{
                input: {
                  className: clsx(
                    "w-full text-sm font-normal font-sans leading-normal text-slate-900 bg-white border border-solid border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-100 hover:border-slate-400 focus:outline-0 focus:shadow-outline-purple"
                  ),
                },
              }}
              value={a_preview}
              onChange={(event) => setA_preview(event.target.value)}
            />
            <HelperText />
          </FormControl>
          <DropBox />
        </div>
      ))}

      <Box className='flex justify-between pt-[32px]'>
        <Tooltip title='Add new question' placement='left-start'>
          <span className='cursor-pointer' onClick={handleAddQuestion}>
            + Add new question
          </span>
        </Tooltip>
      </Box>
    </div>
  );
}

export default Form;
