import React, {useEffect, useState} from "react";
import {CircularProgress, Dialog, DialogActions, DialogContent, Grid, Typography} from "@material-ui/core";
import {Form, Formik} from "formik";
import TextField from "../../../../CommonCustomComponents/TextField";

import * as Yup from "yup";
import {useStyles} from "../DispatchForm/mstyles";

import Axios from "axios";
import * as properties from "../../../../properties";

import "./style.css";
import {Note} from "./Note";


const validation = Yup.object().shape({
    name: Yup.string()
        .required("This field is required"),
    note: Yup.string()
        .required("This field is required")
})

export const AddNotesForm = (props) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const {handleCloseNoteBlock, openNote, handleOpenSnackBar, id, notes} = props;

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [newNote, setNewNote] = useState(null);
    const [noteList, setNoteList] = useState(notes);
    const [toggle, setToggle] = useState(false);

    const [submit, setSubmit] = useState({
        submit: false,
        message: "",
    });
    const [error, setError] = useState({
        error: false,
        message: ""
    });

    const onClose = () => {
        handleCloseNoteBlock();
        setToggle(false);
    }

    useEffect(() => {

        newNote && noteList.push(newNote);
        setToggle(false);

    }, [newNote]);


    useEffect(() => {
        if (submit.submit) {
            handleOpenSnackBar(submit.submit, submit.message);
        }

        if (error.error) {
            handleOpenSnackBar(error.error, error.message);
        }

    }, [submit.submit, submit.message, error.error, error.message])

    return (
        <Dialog open={openNote} onClose={handleCloseNoteBlock} aria-labelledby="form-dialog-title">
            <Typography
                style={{fontSize: "24px", padding: "10px 0", color: "#008ecc", margin: "0 auto"}}>
                View notes
            </Typography>
            <DialogContent className="content">
                {noteList.length !== 0 ?
                    <div className="wrap-notes">
                        {
                            noteList.map((note, index) => {
                                return (
                                    <Note key={index} note={note}/>
                                )
                            })
                        }
                    </div> : <div className="helper-block">No notes</div>
                }

                <Grid container className={classes.wrapper}>
                    <Formik
                        initialValues={{
                            name: "",
                            note: ""
                        }}
                        validationSchema={validation}
                        onSubmit={(values, actions) => {
                            setLoading(true);
                            const config = {
                                headers: {Authorization: `Bearer ${token}`}
                            };

                            Axios.post(
                                `${properties.apiUrl}/orders/note/${id}`, values, config)
                                .then((res) => {
                                    const statusCode = res.status.toString();
                                    if (statusCode.match(/^[23]\d{2}$/)) {
                                        setSubmit({
                                            submit: true,
                                            message: "You have successfully saved your note!"
                                        });
                                        setNewNote({
                                            name: values.name,
                                            note: values.note,
                                            date: new Date().toLocaleString().split(",")[0] + new Date().toUTCString().slice(16, 22),
                                        });
                                        handleCloseNoteBlock();
                                        setLoading(false);
                                    } else {
                                        setError({
                                            error: true,
                                            message: "Something went wrong, try again!",
                                        })
                                        setLoading(false);
                                    }
                                    }
                                ).catch((error) => {
                                setLoading(false);
                            });
                        }}>
                        <Form style={{width: "100%"}}>
                            {
                                toggle &&
                                <Grid container className="add-new-note">
                                    <h6 className="title-new-note">New note</h6>
                                    <Grid item xs={12}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.input}
                                            name="name"
                                            label='Your name'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.input}
                                            InputLabelProps={{shrink: true}}
                                            name="note"
                                            label="Note"
                                            multiline={true}
                                            rows={4}
                                        />
                                    </Grid>

                                </Grid>
                            }
                            <DialogActions className={classes.wrapButton}>
                                {
                                    toggle ?
                                        <button type="button" className={classes.button} onClick={() => {
                                            setToggle(false)
                                        }}>
                                            Cancel
                                        </button> :
                                        <button type="button" className={classes.button} onClick={handleCloseNoteBlock}>
                                            Cancel
                                        </button>

                                }

                                {
                                    !toggle ?
                                        <a
                                            onClick={() => {
                                                setToggle(!toggle)
                                            }}
                                            className="link-button"
                                            type="button">
                                            Add note
                                        </a>
                                        :
                                        <button
                                            className={classes.button}
                                            type="submit">
                                            Add
                                            {
                                                loading &&
                                                <span className={classes.wrapLoader}>
                                          <CircularProgress size={15} className={classes.loader}/>
                                        </span>
                                            }
                                        </button>
                                }

                            </DialogActions>
                        </Form>
                    </Formik>
                </Grid>

            </DialogContent>
        </Dialog>
    )
}
