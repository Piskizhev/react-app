import React, {useState} from "react";
import deleteIcon from "../../img/bin.svg";
import {Tooltip, IconButton, Box, Divider, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import DropBox from "./DropBox/DropBox";
import {FormControl, useFormControlContext} from "@mui/base/FormControl";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@mui/joy/Button";
import DividerModal from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import "./Form.css";
import {v1} from "uuid";

function Form() {
    const [open, setOpen] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});
    const [questionTitle, setQuestionTitle] = useState("")

    const handleAddQuestion = () => {
        const newQuestion = {id: v1(), data: {}};
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        setFormData((prevFormData) => ({...prevFormData, [newQuestion.id]: newQuestion.data}));
    };

    const updateFormData = (questionId, newData) => {
        setFormData((prevFormData) => ({...prevFormData, [questionId]: {...prevFormData[questionId], ...newData}}));
    };
    console.log(questions)

    const handleQuestionOnChange = (event, questionId) => {
        setQuestionTitle(event.target.value)
        setFormData((el) => ({...el, [questionId]: {...el[questionId], questionTitle}}));
    }

    const handleDeleteConfirm = (questionId) => {
        console.log(questionId)
        // setQuestions([...questions, questions.filter((el) => el.id !== questionId)])
        delete formData[questionId]
    };

    const Label = React.forwardRef(
        ({className: classNameProp, children}, ref) => {
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

            const {error, required, filled} = formControlContext;
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
        const {className, ...other} = props;
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

        const {required, filled} = formControlContext;
        const showRequiredError = dirty && required && !filled;

        return showRequiredError ? (
            <p ref={ref} className={clsx("text-sm", className)} {...other}>
                <span className='text-red-500'>Error text</span>
            </p>
        ) : null;
    });

    const handleSave = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    // Данные успешно отправлены
                    console.log('Data successfully sent to the server');
                } else {
                    // Ошибка при отправке данных
                    console.error('Failed to send data to the server');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    HelperText.propTypes = {
        className: PropTypes.string,
    };



    return (
        <div>
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
                                        <div variant='outlined' onClick={() => setOpen(true)}>
                                            <IconButton>
                                                <img src={deleteIcon} alt='delete'/>
                                            </IconButton>
                                        </div>
                                        <Modal open={open} onClose={() => setOpen(false)}>
                                            <ModalDialog variant='outlined' role='alertdialog'>
                                                <DialogTitle>
                          <span className='modal-title'>
                            Are you sure you want to delete this question?
                          </span>
                                                </DialogTitle>
                                                <DividerModal/>
                                                <DialogContent>
                          <span className='modal-text'>
                            You won't be able to restore this data anymore.
                          </span>
                                                </DialogContent>
                                                <DialogActions className='custom-modal-buttons flex   justify-stretch '>
                                                    <Button
                                                        className='custom-modal-delete flex-1'
                                                        variant='solid'
                                                        onClick={() => {
                                                            setOpen(false);
                                                            handleDeleteConfirm(question.id);
                                                        }}
                                                    >
                                                        Discard notes
                                                    </Button>
                                                    <Button
                                                        className='custom-modal-cancel flex-1'
                                                        variant='outlined'
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
                                InputProps={{sx: {borderRadius: 2}}}
                                className='w-full'
                                value={questionTitle}
                                onChange={() => handleQuestionOnChange(questionTitle, question.id)}
                            />
                            <HelperText/>
                        </FormControl>
                        <DropBox updateFormData={updateFormData} questionId={question.id}/>
                        {questions.length !== 0 && <Divider className='pt-8'/>}
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
                        <AddIcon sx={{fontSize: 20}} className='text-ryzhBlue '/>

                        <Typography className='text-ryzhBlue custom-AddNewStyle'>
                            Add new question
                        </Typography>
                    </Tooltip>
                </Box>
            </div>
            <div className='flex items-center justify-center px-4 pb-4'>
                {questions.length !== 0 && (
                    <Button className='w-full custom-save-button' onClick={handleSave}>
                        <span className='save-text'>Save</span>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Form;
