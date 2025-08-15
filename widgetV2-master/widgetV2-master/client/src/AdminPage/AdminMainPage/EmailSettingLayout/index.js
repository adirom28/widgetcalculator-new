import React, {useEffect, useRef, useState} from "react";
import {Form, Formik} from "formik";

import EmailEditor from 'react-email-editor';

import Checkbox from "../../../CommonCustomComponents/CheckBox";
import Select from "../../../CommonCustomComponents/CustomeSelect";
import {makeStyles} from "@material-ui/core/styles";
import {Button, CircularProgress, Grid, Snackbar} from "@material-ui/core";

import * as Yup from "yup";
import Axios from "axios";
import * as properties from "../../../properties";

import "./style.css";

export const useStyles = makeStyles((theme) => ({
    mainWrap: {
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
        width: "100%"
    },
    container: {
        backgroundColor: "#ffffff",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(0,0,0,.125)",
        borderRadius: ".75rem",
        boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
        marginBottom: "20px",
    },
    wrapForm: {
        display: "flex",
        flexDirection: "column",
    },
    checkbox: {
        flexGrow: "1",
        "& .MuiFormControl-root": {
            flexDirection: "row!important",
        },
        "& .MuiFormLabel-root": {
            paddingTop: "13px",
            paddingRight: "15px",
            "&.Mui-focused": {
                color: "#008ecc"
            },
        },
        '& .MuiFormLabel-root.Mui-error': {
            color: "#008ecc",
        },
        "& .MuiCheckbox-colorSecondary.Mui-checked": {
            color: "#008ecc",
        },

    },
    editButton: {
        color: "#008ecc",
        backgroundColor: "#fff",
        border: "1px solid #008ecc",
        padding: ".3rem 1rem",
        borderRadius: "50px",
        fontSize: "12px",
        marginBottom: "5px",
        "&:hover": {
            backgroundColor: "#008ecc",
            borderColor: "#008ecc",
            color: "#fff",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,.15),0 4px 6px 2px rgba(0,0,0,.15)",
        }
    },
    button: {
        color: "#FFFFFF",
        backgroundColor: "#008ecc",
        border: "1px solid #008ecc",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,.15),0 1px 3px 1px rgba(0,0,0,.15)",
        borderRadius: "50px",
        lineHeight: "1.2",
        letterSpacing: ".05rem",
        padding: ".3rem 1.5rem",
        margin: "20px 0",
        marginRight: "1rem",
        "&:hover": {
            backgroundColor: "#008ecc",
            borderColor: "#008ecc",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,.15),0 4px 6px 2px rgba(0,0,0,.15)",
        }
    },
    select: {
        width: "30%!important",
        "& .MuiFormControl-fullWidth": {
            width: "30%!important",
        },
        "& .MuiOutlinedInput-input": {
            padding: "10px",
        },
        "& .MuiFormControl-root [class*='MuiInputLabel-outlined']": {
            transform: "translate(14px, 11px) scale(1)",
        },
        '& .MuiFormControl-root [class*="MuiInputLabel-outlined"][class*="MuiInputLabel-shrink"] ': {
            transform: "translate(14px, -6px) scale(0.75)"
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#008ecc"
            },
            '&:hover fieldset': {
                borderColor: "#008ecc",
            },
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink.Mui-focused': {
            color: "#3A3A3A",
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink.Mui-error': {
            color: "#008ecc",
        },
        "& .MuiOutlinedInput-root.Mui-disabled": {
            "&.Mui-focused fieldset": {
                borderColor: "rgba(0,0,0,.28)",
            },
            '&:hover fieldset': {
                borderColor: "rgba(0,0,0,.28)",
            },
        },
    },
    labelSelect: {
        color: "rgba(0, 0, 0, 0.54);",
        fontSize: "14px",
        paddingRight: "20px",
    },
    snackBar: {
        backgroundColor: "#008ecc",
        border: "2px solid #008ecc",
        padding: "1.5rem 1rem",
        borderRadius: "0.5rem",
        color: "white",
        opacity: ".9",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 15%), 0 1px 3px 1px rgb(0 0 0 / 15%)",
    },
    bigLoader: {
        "&.MuiCircularProgress-colorPrimary": {
            color: "#008ecc",
        }
    },
    instructionDetails: {
        display: "flex",
        width: "100%",
        marginBottom: "1.2rem",
    },
    heading: {
        fontSize: "1rem",
        fontWeight: theme.typography.fontWeightRegular,
    }
}))

const EmailSettingsSchema = Yup.object().shape({
    quoteEnabled: Yup.boolean(),
    bookingEnabled: Yup.boolean(),
    reminderEnabled: Yup.boolean(),
    reminderPeriod: Yup.string(),
});

const options = [
    {name: "6h", value: "6h"},
    {name: "24h", value: "24h"},
    {name: "48h", value: "48h",},
]


const EmailSettingLayout = () => {

    const token = JSON.parse(localStorage.getItem("token"));

    const classes = useStyles();

    const emailEditorRef = useRef(null);
    const [template, setTemplate] = useState(null);
    const [currentEditTemplate, setCurrentEditTemplate] = useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const [refreshForm, setRefreshForm] = useState(false);

    const [configData, setConfigData] = useState(
        {
            quoteEnabled: false,
            bookingEnabled: false,
            reminderEnabled: false,
            reminderPeriod: "24h",
        }
    );

    const [quoteTemplate, setQuoteTemplate] = useState({
        quoteTemplateJSON: "",
        quoteTemplateHTML: "",
    });
    const [bookingTemplate, setBookingTemplate] = useState({
        bookingTemplateJSON: "",
        bookingTemplateHTML: "",
    });
    const [reminderTemplate, setReminderTemplate] = useState({
        reminderTemplateJSON: "",
        reminderTemplateHTML: "",
    });

    const handleGetConfig = () => {
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        Axios.get(`${properties.apiUrl}/user/notification/config`, config)
            .then((res) => {
                    setConfigData({
                        quoteEnabled: res.data.quoteEnabled,
                        bookingEnabled: res.data.bookingEnabled,
                        reminderEnabled: res.data.reminderEnabled,
                        reminderPeriod: res.data.reminderPeriod,
                    });

                    setQuoteTemplate({
                        quoteTemplateJSON: JSON.parse(res.data.quoteTemplateJSON),
                        quoteTemplateHTML: res.data.quoteTemplateHTML,
                    });
                    setBookingTemplate({
                        bookingTemplateJSON: JSON.parse(res.data.bookingTemplateJSON),
                        bookingTemplateHTML: res.data.bookingTemplateHTML,
                    });
                    setReminderTemplate({
                        reminderTemplateJSON: JSON.parse(res.data.reminderTemplateJSON),
                        reminderTemplateHTML: res.data.reminderTemplateHTML,
                    });
                    setLoading(false);
                }
            ).catch((error) => {
            console.log(error)
        });
    }


    useEffect(() => {
        setLoading(true);
        handleGetConfig();
    }, []);

    useEffect(() => {
        handleGetConfig();
    }, [refreshForm]);

    /* Email editor */
    const saveDesign = () => {
        emailEditorRef.current.editor.saveDesign((design) => {
        });
        exportHtml();

    };

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const {design, html} = data;

            if (currentEditTemplate === "quote") {
                setQuoteTemplate({
                    quoteTemplateJSON: design,
                    quoteTemplateHTML: html,
                });

            } else if (currentEditTemplate === "booking") {
                setBookingTemplate({
                    bookingTemplateJSON: design,
                    bookingTemplateHTML: html,
                });
            } else {
                setReminderTemplate({
                    reminderTemplateJSON: design,
                    reminderTemplateHTML: html,
                });

            }
        });

        setTimeout(() => {
            setOpen(false);
        }, 2000)
    };

    const onDesignLoad = (data) => {
        console.log('designLoad');
    };

    const onLoad = () => {
        if (emailEditorRef.current != null) {
            emailEditorRef.current.editor.addEventListener(
                'design:loaded',
                onDesignLoad
            );
        }

        setTimeout(() => {
            emailEditorRef.current.editor.loadDesign(template);
        }, 500)

    }

    const onReady = () => {
        console.log('onReady');
    };

    /*function that opens the email editor*/
    const handleEditTemplate = (type) => {
        setOpen(true);
        setCurrentEditTemplate(type);

        if (type === "quote") {
            setTemplate(quoteTemplate.quoteTemplateJSON);

        } else if (type === "booking") {
            setTemplate(bookingTemplate.bookingTemplateJSON);

        } else {
            setTemplate(reminderTemplate.reminderTemplateJSON);

        }
    }

    /*SnackBar*/
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    return (

        <section className={classes.mainWrap}>
            {
                loading ? (
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="flex-start"
                        style={{minHeight: '100vh'}}
                    >
                        <CircularProgress className={classes.bigLoader} size={80}/>
                    </Grid>
                ) : (
                    <>
                        {
                            !open &&
                            <div className={classes.container}>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        quoteEnabled: configData.quoteEnabled,
                                        bookingEnabled: configData.bookingEnabled,
                                        reminderEnabled: configData.reminderEnabled,
                                        reminderPeriod: configData.reminderPeriod,
                                    }}
                                    validationSchema={EmailSettingsSchema}
                                    onSubmit={(values, actions) => {

                                        let newValues = {
                                            ...values,
                                            quoteTemplateJSON: JSON.stringify(quoteTemplate.quoteTemplateJSON),
                                            quoteTemplateHTML: quoteTemplate.quoteTemplateHTML,
                                            bookingTemplateJSON: JSON.stringify(bookingTemplate.bookingTemplateJSON),
                                            bookingTemplateHTML: bookingTemplate.bookingTemplateHTML,
                                            reminderTemplateJSON: JSON.stringify(reminderTemplate.reminderTemplateJSON),
                                            reminderTemplateHTML: reminderTemplate.reminderTemplateHTML
                                        }

                                        const config = {
                                            headers: {Authorization: `Bearer ${token}`}
                                        };

                                        Axios.post(
                                            `${properties.apiUrl}/user/notification/config`,
                                            newValues,
                                            config
                                        ).then((res) => {
                                                const statusCode = res.status.toString();
                                                if (statusCode.match(/^[23]\d{2}$/)) {
                                                    setOpenSnackBar(true);
                                                    setMessage("You have successfully saved your changes.")
                                                    setRefreshForm(true);
                                                } else {
                                                    setOpenSnackBar(true);
                                                    setMessage("Something went wrong, try again!")
                                                }
                                            }
                                        ).catch((error) => {
                                            setLoading(false);
                                        });
                                    }}>
                                    {({
                                          values,

                                      }) => (
                                        <Form>
                                            <Grid container className={classes.wrapForm}>
                                                <div className="groupField">
                                                    <div className={classes.checkbox}>
                                                        <Checkbox
                                                            name="quoteEnabled"
                                                            legend="Send quote e-mail"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            handleEditTemplate("quote")
                                                        }}
                                                        className={classes.editButton}>Edit template
                                                    </button>
                                                </div>
                                                <div className="groupField">
                                                    <div className={classes.checkbox}>
                                                        <Checkbox
                                                            name="bookingEnabled"
                                                            legend="Send booking e-mail"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            handleEditTemplate("booking")
                                                        }}
                                                        className={classes.editButton}>Edit template
                                                    </button>
                                                </div>
                                                <div className="groupField">
                                                    <div className={classes.checkbox}>
                                                        <Checkbox
                                                            name="reminderEnabled"
                                                            legend="Send reminder to book e-mail"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            handleEditTemplate("reminder")
                                                        }}
                                                        className={classes.editButton}>Edit template
                                                    </button>
                                                </div>
                                                <div className="wrap-select">
                                                    <div className={classes.labelSelect}>Send reminder in</div>
                                                    <Select
                                                        className={classes.select}
                                                        disabled={!values.reminderEnabled}
                                                        name="reminderPeriod"
                                                        label="Hour"
                                                        options={options}
                                                    />
                                                </div>
                                                <div>
                                                    <Button type="submit" className={classes.button}>
                                                        Save
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        }
                    </>
                )
            }

            {
                open &&
                <Grid>
                    <div className={classes.container}>
                        <React.StrictMode>
                            <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady}/>
                        </React.StrictMode>

                        <div>
                            <Button type="button"
                                    className={classes.button}
                                    onClick={() => {
                                        setOpen(false)
                                    }}>Cancel</Button>
                            <Button type="button" className={classes.button} onClick={saveDesign}>Save Design</Button>
                        </div>
                    </div>

                </Grid>
            }

            <Snackbar
                className={classes.snackBar}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                autoHideDuration={3000}
                open={openSnackBar}
                onClose={handleCloseSnackBar}>
                <div>{message}</div>
            </Snackbar>

        </section>
    )
}

export default EmailSettingLayout;
