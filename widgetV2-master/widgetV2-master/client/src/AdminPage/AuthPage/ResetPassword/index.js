import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";

import {Button, CircularProgress, Grid, Snackbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useStyles} from "../LoginForm";
import "../../AuthPage/style.css";

import TextField from "../../../CommonCustomComponents/TextField";
import * as Yup from 'yup';
import * as properties from "../../../properties";
import {useHistory} from "react-router-dom";
import {useResetPassword} from "../../../services/useResetPassword";
import {ErrorMessageComponent} from "../../../CommonCustomComponents/ErrorMessageComponent";
import {SuccessMessageComponent} from "../../../CommonCustomComponents/SuccessMessageComponent";
import axios from "axios";
import Axios from "axios";

const initialValues = {
    oldPassword: "",
    newPassword: "",
};

const ResetSchema = Yup.object().shape({
    oldPassword: Yup.string(),
    newPassword: Yup.string()
        .required("This field is required"),
});

const url = `${properties.apiUrl}/user/reset/password`;

export default function ResetPassword(props) {

    const useReset = useResetPassword(url);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const authToken = JSON.parse(localStorage.getItem("token"));

    const tokenParams = props.match.params;
    const {token} = tokenParams;

    const changeForm = () => {
        history.push("/authPage");
    };

    useEffect(() => {

        if (token === ":token") return;

        axios({
            url: `${properties.apiUrl}/user/reset/password/check?token=${token}`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => {
                const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    console.log('success')
                } else {
                    history.push("/error");
                }
            })
            .catch(() => {
                history.push("/error");
            });
    }, []);

    useEffect(() => {
        if (useReset.success.success || useReset.error.hasError) {
            setLoading(false);
        }

        if (useReset.success.success) {
            setTimeout(() => {
                history.push("/authPage");
            }, 3000);

        }

    }, [useReset.success.success, useReset.error.hasError]);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <section className="fixed-background">
            <div className="wrap-card">
                <div className="card">
                    <div className="wrap-bg-content">
                        <h2 className="auth-title">MAGIC IS IN THE<br/>DETAILS</h2>
                        <p className="detail-text">
                            "Please use your e-mail to reset your password. If you are not a member, please
                            register.</p>
                        <div className="wrap-bg-content-btn">
                            <button className="auth-btn" onClick={changeForm}>Register</button>
                        </div>
                    </div>
                    <div className='wrap-form'>
                        <Grid container className={classes.container}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={ResetSchema}
                                onSubmit={(values, actions) => {
                                    setLoading(true);

                                    if (token === ":token") {
                                        const config = {
                                            headers: {Authorization: `Bearer ${authToken}`}
                                        };

                                        Axios.post(
                                            `${properties.apiUrl}/user/reset/password`,
                                            values,
                                            config
                                        ).then((res) => {
                                                const statusCode = res.status.toString();
                                                if (statusCode.match(/^[23]\d{2}$/)) {
                                                    setLoading(false);
                                                    setOpen(true);
                                                    setMessage("You have successfully changed your password!");
                                                    setTimeout(() => {
                                                        history.push("/authPage");
                                                    }, 3000);
                                                } else {
                                                    setLoading(false);
                                                    setOpen(true);
                                                    setMessage("Something went wrong, please try again.")
                                                }
                                            }
                                        ).catch((error) => {
                                            console.log(error)
                                            setOpen(true);
                                            if (authToken) {
                                                setMessage("Something went wrong, please try again.");
                                            } else {
                                                setMessage("You are not authorized, please log in and then reset your password.");
                                            }
                                            setLoading(false);
                                        });
                                    } else {
                                        delete values.oldPassword;
                                        let newValue = {...values, resetToken: token};
                                        useReset.handleSubmit(newValue);
                                    }
                                }}>
                                {({
                                      isValid,
                                      dirty,
                                  }) => (
                                    <Form>
                                        {
                                            useReset.success.success &&
                                            <Grid item xs={12}>
                                                <SuccessMessageComponent
                                                    successMessage={useReset.success.successMessage}/>
                                            </Grid>
                                        }
                                        {
                                            useReset.error.hasError &&
                                            <Grid item xs={12}>
                                                <ErrorMessageComponent
                                                    errorMessage={useReset.error.errorMessage}
                                                    color={"#cf1173"}
                                                    bgColor={"#ffffff"}
                                                />
                                            </Grid>
                                        }
                                        <Grid container>
                                            <Typography component="h1" variant="h5" className={classes.mainTitle}>
                                                Reset Password
                                            </Typography>
                                            {
                                                (token === ":token") && (<Grid item xs={12}>
                                                    <TextField
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        label="Old Password"
                                                        type="password"
                                                        className={classes.input}
                                                        name="oldPassword"
                                                    />
                                                </Grid>)
                                            }

                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    label="New Password"
                                                    type="password"
                                                    className={classes.input}
                                                    name="newPassword"
                                                />
                                            </Grid>
                                            <div className={classes.wrapSubmit}>
                                                <Button
                                                    disabled={!(dirty && isValid)}
                                                    type="submit" className={classes.button}>
                                                    Reset
                                                    {loading &&
                                                    <div className={classes.wrapLoader}>
                                                        <CircularProgress size={15} className={classes.loader}/>
                                                    </div>}
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </div>
                </div>
            </div>
            <Snackbar
                className={classes.snackBar}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                autoHideDuration={3000}
                open={open}
                onClose={handleCloseSnackBar}>
                <div>{message}</div>
            </Snackbar>
        </section>
    )
}
