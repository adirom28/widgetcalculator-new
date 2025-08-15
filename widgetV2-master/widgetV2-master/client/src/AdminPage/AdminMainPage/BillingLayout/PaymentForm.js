import React, {useState} from "react";
import {useStyles} from "./mstyles";
import {Form, Formik} from "formik";
import {CircularProgress, Grid} from "@material-ui/core";
import TextField from "../../../CommonCustomComponents/TextField";
import * as Yup from "yup";

import "./style.css";
import {useBilling} from "../../../services/useBilling";


const validSchema = Yup.object().shape({
    number: Yup.string().matches(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/, "Please check your card number")
        .required("This field is required"),
    expiryDate: Yup.string()
        .matches(/^(?:0?[1-9]|1[0-2]) *\/ *[2-9][2-9]$/, 'Please check your card expiration date')
        .required("This field is required"),
    cvc: Yup.string().matches(/^[0-9]{3,4}$/, "Please enter a valid CVV code")
        .required("This field is required"),
});

export const PaymentForm = (props) => {
    const {refreshSubscription} = props;
    const {setSubscriptionCards} = useBilling();

    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    return (
        <div className="wrapper-form">
            <h6 className="text-title">Enter your card details.</h6>

            <Formik
                initialValues={{
                    number: "",
                    expiryDate: "",
                    cvc: "",
                }}
                validationSchema={validSchema}
                onSubmit={(values, actions) => {
                    setLoading(true);
                    let month = values.expiryDate.trim().split('/')[0];
                    let year = "20" + values.expiryDate.trim().split('/')[1];
                    delete values.expiryDate;
                    let newValues = {...values, year: year, month: month}
                    setSubscriptionCards(newValues).then((res) => {
                        const statusCode = res.status.toString();
                        if (statusCode.match(/^[23]\d{2}$/)) {
                            setLoading(false);
                            refreshSubscription("confirm");
                        } else {
                            props.handleOpenSnackbar("An error occurred while subscribing");
                        }
                    }).catch(() => props.handleOpenSnackbar("An error occurred while subscribing"));
                }}>
                {({
                      isValid,
                      dirty,
                  }) => (
                    <Form className={classes.form}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Card number"
                                    placeholder="Card number"
                                    className={classes.input}
                                    name="number"
                                />
                            </Grid>
                            <div className="group-input">
                                <div className="group-input-item">
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        label="Expiration date"
                                        placeholder="MM/YY"
                                        className={classes.input}
                                        name="expiryDate"
                                    />
                                </div>
                                <div className="group-input-item">
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        label="CVC code"
                                        placeholder="CVC"
                                        className={classes.input}
                                        name="cvc"
                                    />
                                </div>
                            </div>
                            <div className={classes.wrapSubmit}>
                                <button
                                    style={{width: "100%", height: "42px"}}
                                    disabled={!(dirty && isValid)}
                                    type="submit"
                                    className={classes.payBtn}>
                                    Submit
                                    {loading &&
                                    <span className={classes.wrapLoader}>
                                        <CircularProgress size={15} className={classes.loader}/>
                                    </span>}
                                </button>
                            </div>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
