import React, { useEffect, useState } from "react";
import deleteIcon from "../../img/bin.svg";
import {
  Tooltip,
  IconButton,
  Box,
  Input,
  Popover,
  Divider,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DropBox from "./DropBox/DropBox";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@mui/joy/Button";
import DividerModal from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
// import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import "./Form.css";
// import ConfirmDelete from "./DropBox/ConfirmDelete/ConfirmDelete";

function Form() {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: generateUniqueId() },
    ]);
  };

  const handleDeleteConfirm = (id) => {
    // Remove the question with the given ID
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
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
      {questions.map((question, index) => (
        <div key={question.id}>
          <Box className='flex justify-between align-middle	 pt-6'>
            <Tooltip
              title='Add'
              placement='left-start'
              className='flex align-middle text-ryzhGray'
            >
              #{index + 1} Question
            </Tooltip>
            <div>
              <div className='ConfirmDelete'>
                <React.Fragment>
                  <Button
                    variant='outlined'
                    color='danger'
                    endDecorator={
                      <IconButton>
                        <img src={deleteIcon} alt='delete' />
                      </IconButton>
                    }
                    onClick={() => setOpen(true)}
                  ></Button>
                  <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog variant='outlined' role='alertdialog'>
                      <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                      </DialogTitle>
                      <DividerModal />
                      <DialogContent>
                        Are you sure you want to discard all of your notes?
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant='solid'
                          color='danger'
                          onClick={() => {
                            setOpen(false);
                            handleDeleteConfirm(question.id);
                          }}
                        >
                          Discard notes
                        </Button>
                        <Button
                          variant='plain'
                          color='neutral'
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </ModalDialog>
                  </Modal>
                </React.Fragment>
              </div>
            </div>
          </Box>
          <FormControl required className='pt-6 '>
            <Label className='text-ryzhBlack custom-QuestionTitle'>
              Question title
            </Label>
            <TextField
              id='outlined-multiline-flexible'
              multiline
              maxRows={4}
              InputProps={{ sx: { borderRadius: 2 } }}
              className='w-full'
            />
            <HelperText />
          </FormControl>
          <DropBox />
          {questions.length !== 0 && <Divider className='pt-8' />}
        </div>
      ))}

      <Box
        className='flex justify-between pt-4 px-4 pb-[88px] '
        onClick={handleAddQuestion}
      >
        <Tooltip
          title='Add new question'
          placement='left-start'
          className='flex gap-3'
        >
          <AddIcon sx={{ fontSize: 20 }} className='text-ryzhBlue ' />

          <Typography className='text-ryzhBlue custom-AddNewStyle'>
            Add new question
          </Typography>
        </Tooltip>
      </Box>
    </div>
  );
}

export default Form;
