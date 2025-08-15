import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import PropTypes from 'prop-types';

import {Button, CircularProgress, Grid} from "@material-ui/core";
import {useStyles} from "./mstyles";
import Typography from "@material-ui/core/Typography";

import TextField from "../../../CommonCustomComponents/TextField";
import {validation} from "../validators";
import {ImageUpload} from "../../../CommonCustomComponents/UploaderLogo";
import {useRegistration} from "../../../services/useAuth";
import {ErrorMessageComponent} from "../../../CommonCustomComponents/ErrorMessageComponent";
import * as properties from "../../../properties";
import FormikTextField from "../../../CommonCustomComponents/PhoneNumberMask";

RegistrationForm.propTypes = {
    onLogin: PropTypes.func.isRequired
};

const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    domain: "",
    phoneNumber: "",
    companyName: "",
    streetAddress: "",
    secondStreetAddress: "",
    cityAddress: "",
    stateAddress: "",
    zipCode: ""
};

const url = `${properties.apiUrl}/user/register`;

export default function RegistrationForm(props) {
    const useAuth = useRegistration(url);
    const classes = useStyles();
    const [nextPage, setNextPage] = useState(false);
    const [loading, setLoading] = useState(false);
    let touchedForm = false;

    useEffect(() => {
        if (useAuth.submitted) props.onLogin(useAuth.success.successMessage);
        useAuth.error.hasError && setNextPage(!nextPage);

        if (useAuth.submitted || useAuth.error.hasError) {
            setLoading(false);
        }

    }, [useAuth.submitted, useAuth.error.hasError, useAuth.success.successMessage]);

    return (
        <Grid container className={classes.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={(values, actions) => {
                    useAuth.handleSubmit(values);
                    setLoading(true);
                    if (useAuth.submitted.submitted) {
                        actions.resetForm({
                            values: {...initialValues}
                        });
                    }
                }}>
                {({
                      errors,
                      values,
                      touched,
                  }) => (
                    <Form>
                        <Grid container className={classes.wrapForm}>
                            {!nextPage &&
                            <Grid item xs={12} className={classes.wrapForm}>
                                <Typography component="h1" variant="h5" className={classes.mainTitle}>
                                    Register
                                </Typography>

                                {useAuth.error.hasError &&
                                <Grid item xs={12}>
                                    <ErrorMessageComponent
                                        errorMessage={useAuth.error.errorMessage}
                                        color={"#cf1173"}
                                        bgColor={"#ffffff"}
                                    />
                                </Grid>
                                }
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
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type="password"
                                        label="Confirm password"
                                        className={classes.input}
                                        name="confirmPassword"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        label="Your domain"
                                        className={classes.input}
                                        name="domain"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormikTextField
                                        className={classes.input}
                                        name="phoneNumber"
                                        label="Phone"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        label="Company name"
                                        className={classes.input}
                                        name="companyName"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.wrapButton}>
                                    <Button type="button"
                                            className={classes.button}
                                            disabled={
                                                !values.email ||
                                                !!errors.email && !touched.email
                                                || !!errors.password && !touched.password
                                                || !!errors.confirmPassword && !touched.confirmPassword
                                                || !!errors.phone && !touched.phone
                                                || !!errors.domain && !touched.domain
                                                || !!errors.companyName && !touched.companyName
                                            }
                                            onClick={() => {
                                                setNextPage(!nextPage)
                                            }}>
                                        Continue
                                    </Button>
                                </Grid>
                            </Grid>
                            }
                            {nextPage &&
                            <Grid item xs={12} className={classes.wrapForm}>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className={classes.input}
                                        name="streetAddress"
                                        label="Street address"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className={classes.input}
                                        name="secondStreetAddress"
                                        label="Street address 2"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className={classes.input}
                                        name="cityAddress"
                                        label="City"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className={classes.input}
                                        name="stateAddress"
                                        label="State"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className={classes.input}
                                        name="zipCode"
                                        label="Zip code"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.containerUpload}>
                                    <div className={classes.upload}><ImageUpload/></div>
                                    <div className={classes.wrapSubmit}>
                                        <Button type="submit" className={classes.button}>
                                            Register
                                            {
                                                loading &&
                                                <div className={classes.wrapLoader}>
                                                    <CircularProgress size={15} className={classes.loader}/>
                                                </div>
                                            }
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                            }
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Grid>
    )
}
