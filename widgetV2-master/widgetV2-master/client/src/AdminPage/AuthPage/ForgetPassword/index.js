import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";

import {Button, CircularProgress, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "../LoginForm/style.css";

import TextField from "../../../CommonCustomComponents/TextField";
import * as Yup from 'yup';
import * as properties from "../../../properties";
import {useStyles} from "../LoginForm";
import {SuccessMessageComponent} from "../../../CommonCustomComponents/SuccessMessageComponent";
import {ErrorMessageComponent} from "../../../CommonCustomComponents/ErrorMessageComponent";
import {useForgotPassword} from "../../../services/useForgotPassword";
import {useHistory} from "react-router-dom";

const initialValues = {
    email: "",
};

const ResetSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please, enter a valid email")
        .required("This field is required"),
});

const url = `${properties.apiUrl}/user/forgot/password`;

export default function ForgetPassword({handleChangeForm}) {

    const useChangePassword = useForgotPassword(url);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {

        if (useChangePassword.success.success || useChangePassword.error.hasError) {
            setLoading(false);
        }

    }, [useChangePassword.success.success, useChangePassword.error.hasError]);


    return (
        <>
            <Grid container className={classes.container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ResetSchema}
                    onSubmit={(values, actions) => {
                        setLoading(true);
                        useChangePassword.handleSubmit(values)
                    }}>
                    {({
                          isValid,
                          dirty,
                      }) => (
                        <Form>
                            {
                                useChangePassword.success.success &&
                                <Grid item xs={12}>
                                    <SuccessMessageComponent
                                        successMessage={useChangePassword.success.successMessage}/>
                                </Grid>
                            }
                            {
                                useChangePassword.error.hasError &&
                                <Grid item xs={12}>
                                    <ErrorMessageComponent
                                        errorMessage={useChangePassword.error.errorMessage}
                                        color={"#cf1173"}
                                        bgColor={"#ffffff"}
                                    />
                                </Grid>
                            }
                            <Grid container>
                                <Typography component="h1" variant="h5" className={classes.mainTitle}>
                                    Forgot Password
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
                                <div className="wrap-submit">
                                    <div className={classes.linkResetPassword}
                                         onClick={() => {
                                             history.push("/resetPassword/:token")
                                         }}>
                                        Reset password
                                    </div>
                                    <Button
                                        disabled={!(dirty && isValid)}
                                        type="submit"
                                        className={classes.button}>
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
        </>
    )
}
