import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import {useHistory} from "react-router-dom";

import {Button, CircularProgress, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import "./style.css";

import TextField from "../../../CommonCustomComponents/TextField";
import * as Yup from 'yup';
import * as properties from "../../../properties";
import {ErrorMessageComponent} from "../../../CommonCustomComponents/ErrorMessageComponent";
import {SuccessMessageComponent} from "../../../CommonCustomComponents/SuccessMessageComponent";
import ForgetPassword from "../ForgetPassword";
import {useLogin} from "../../../services/useLogin";


export const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#ffffff",
    },

    mainTitle: {
        marginBottom: "20px",
        marginLeft: "10px",
    },
    input: {
        borderColor: "#D7D7D7",
        color: "#3A3A3A",
        borderRadius: "0.1rem",
        padding: ".5rem .75rem",
        fontSize: ".8rem",
        transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",

        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#008ecc"
            },
            '&:hover fieldset': {
                borderColor: "#008ecc",
            },
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: "translate(27px, 3px) scale(0.75)!important",
            "&.Mui-focused fieldset": {
                color: "#008ecc"
            },
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink.Mui-focused': {
            color: "#008ecc",
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink.Mui-error': {
            color: "#008ecc",
        },
        "& .MuiFormHelperText-root.Mui-error": {
            border: " 1px solid #008ecc",
            color: "black",
            padding: "0.5rem 1rem",
            textAlign: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "1.5rem",
            zIndex: "2",
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%)",
            width: "50%"
        },
        "& .MuiOutlinedInput-root.Mui-error": {
            "& fieldset": {
                borderColor: "#D7D7D7",
            }
        }
    },
    linkResetPassword: {
        paddingTop: "20px",
        fontSize: ".8rem",
    },
    wrapSubmit: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
    },
    button: {
        color: "#FFFFFF",
        backgroundColor: "#008ecc",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,.15),0 1px 3px 1px rgba(0,0,0,.15)",
        borderRadius: "50px",
        lineHeight: "1.5",
        fontWeight: "700",
        letterSpacing: ".05rem",
        marginTop: "20px",
        padding: ".3rem 2rem",
        height: "35px",

        "&:hover": {
            backgroundColor: "#008ecc",
            borderColor: "#008ecc",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,.15),0 4px 6px 2px rgba(0,0,0,.15)",
        },
        "&.Mui-disabled": {
            color: "#fff",
            opacity: ".6"
        },
    },
    wrapLoader: {
        marginLeft: "10px",
        paddingTop: "3px"
    },
    loader: {
        "&.MuiCircularProgress-colorPrimary": {
            color: "#fff",
        }
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
}))

const initialValues = {
    email: "",
    password: "",
};

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please, enter a valid email")
        .required("This field is required"),
    password: Yup.string()
        .matches(
            /^[A-Za-z0-9.^$*+-?()[\]{}—#@!%&]{6,15}$/,
            "The password must contain different character types"
        )
        .required("This field is required"),
});

const url = `${properties.apiUrl}/user/login`;

export default function LoginForm(props) {
    const useAuth = useLogin(url);
    const {handleChange, message} = props;
    const [hasSuccessMessage, setSuccessMessage] = useState({
            success: false,
            successMessage: "",
        }
    );
    const [loading, setLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        if (typeof message === 'string') {
            message && setSuccessMessage({success: true, successMessage: message,});

            setTimeout(() => {
                setSuccessMessage({success: false, successMessage: "",})
            }, 5000);
        }

        if (useAuth.submitted.submitted || useAuth.error.hasError) {
            setLoading(false);
        }
        if (useAuth.isToken || useAuth.submitted.submitted) {
            history.push("/admin");
        }

    }, [
        useAuth.submitted.submitted,
        useAuth.error.hasError,
        useAuth.isToken,
        message,
        history
    ]);

    const handleForgotPassword = (type) => {
        setForgotPassword(true);
        handleChange(true);
        if (!type) {
            setForgotPassword(type);
            handleChange(type);
        }
    }

    return (
        <>
            {
                !forgotPassword ?

                    (<Grid container className={classes.container}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={LoginSchema}
                            onSubmit={(values, actions) => {
                                useAuth.handleSubmit(values);
                                setLoading(true);
                                if (useAuth.submitted.submitted) {
                                    actions.resetForm({
                                        values: {...initialValues}
                                    });
                                }
                            }}>
                            <Form>
                                {
                                    hasSuccessMessage.success &&
                                    <Grid item xs={12}>
                                        <SuccessMessageComponent
                                            successMessage={hasSuccessMessage.successMessage}/>
                                    </Grid>
                                }
                                {
                                    useAuth.error.hasError &&
                                    <Grid item xs={12}>
                                        <ErrorMessageComponent
                                            errorMessage={useAuth.error.errorMessage}
                                            color={"#cf1173"}
                                            bgColor={"#ffffff"}
                                        />
                                    </Grid>
                                }
                                <Grid container>
                                    <Typography component="h1" variant="h5" className={classes.mainTitle}>
                                        Login
                                    </Typography>

                                    <Grid item xs={12}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            label="E-mail"
                                            className={classes.input}
                                            name="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            type="password"
                                            label="Password"
                                            className={classes.input}
                                            name="password"
                                        />
                                    </Grid>
                                    <div className="wrap-submit">
                                        <div className={classes.linkResetPassword} onClick={handleForgotPassword}>Forget
                                            password?
                                        </div>
                                        <Button type="submit" className={classes.button}>
                                            Login
                                            {loading &&
                                            <div className={classes.wrapLoader}>
                                                <CircularProgress size={15} className={classes.loader}/>
                                            </div>}
                                        </Button>
                                    </div>
                                </Grid>
                            </Form>
                        </Formik>
                    </Grid>) :
                    (<ForgetPassword handleChangeForm={handleForgotPassword}/>)
            }
        </>
    )
}
