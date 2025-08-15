import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";

import {CircularProgress, Grid, Typography} from "@material-ui/core";
import {useStyles} from './mstyles';

import {validationAddNewOrder} from "../validation";
import TextField from "../../../../CommonCustomComponents/TextField";
import {useAddNewOrder} from "../../../../services/useAddNewOrder";
import * as properties from "../../../../properties";
import "./style.css";
import FormikTextField from "../../../../CommonCustomComponents/PhoneNumberMask";
import CurrencyTextField from "../../../../CommonCustomComponents/CurrencyInputMask";
import {CustomAutocompleteFormik} from "../../../../CommonCustomComponents/CustomAutocompleteFormik";


const initialValues = {
    name: "",
    email: "",
    phone: "",
    firstFrom: "",
    lastFrom: "",
    phoneFrom: "",
    companyNameFrom: "",
    addressFrom: "",
    cityFrom: "",
    stateFrom: "",
    zipCodeFrom: "",
    firstTo: "",
    lastTo: "",
    phoneTo: "",
    companyNameTo: "",
    streetTo: "",
    cityTo: "",
    stateTo: "",
    zipCodeTo: "",
    date: "",
    comments: "",
    detail: "",
    price: "",
};

const url = `${properties.apiUrl}/orders`;

export const AddNewOrderForm = (props) => {
    const {close, handleOpenSnackBar, addNew} = props;
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const useAddNew = useAddNewOrder(url);

    const closeForm = () => {
        close("add");
    }

    useEffect(() => {
        if (useAddNew.success.success) {
            setLoading(false);
            closeForm();
            handleOpenSnackBar(useAddNew.success.success, useAddNew.success.successMessage);
            addNew(true);
        }
        if (useAddNew.error.hasError) {
            setLoading(false);
            closeForm();
            handleOpenSnackBar(useAddNew.error.hasError, useAddNew.error.errorMessage);
        }

    }, [useAddNew.success.success, useAddNew.success.successMessage, useAddNew.error.hasError, useAddNew.error.errorMessage]);


    return (
        <Grid container className={classes.wrapper}>
            <Typography
                style={{fontSize: "24px", color: "#008ecc", margin: "0 auto"}}>Create new order</Typography>
            <Grid>
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={validationAddNewOrder}
                    onSubmit={(values, actions) => {
                        setLoading(true);
                        useAddNew.handleSubmit(values);
                    }}>
                    <Form>
                        <div>
                            <div className="block-main-content">

                                <div className="block-info">
                                    <div className={classes.fieldGroup}>
                                        <Typography
                                            variant={'body1'}
                                            className={classes.title}>
                                            Customer info
                                        </Typography>
                                        <div>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    label="Name"
                                                    name="name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormikTextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="phone"
                                                    label="Phone"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="email"
                                                    label='Email'
                                                />
                                            </Grid>
                                        </div>
                                    </div>
                                </div>

                                <div className="block-info">
                                    <div className={classes.fieldGroup}>
                                        <Typography
                                            variant={'body1'}
                                            className={classes.title}>
                                            Pickup info
                                        </Typography>
                                        <div>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="firstFrom"
                                                    label='First'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="lastFrom"
                                                    label='Last'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormikTextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="phoneFrom"
                                                    label="Phone"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="companyNameFrom"
                                                    label='Company name'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="addressFrom"
                                                    label='Street address'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="cityFrom"
                                                    label='City'
                                                />
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <CustomAutocompleteFormik
                                                        name="stateFrom"
                                                        label='State'
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className={classes.input}
                                                        name="zipCodeFrom"
                                                        label='Zip code'
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                                <div className="block-info">
                                    <div className={classes.fieldGroup}>
                                        <div>
                                            <Typography
                                                variant={'body1'}
                                                className={classes.title}>
                                                Delivery info
                                            </Typography>
                                            <div>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className={classes.input}
                                                        name="firstTo"
                                                        label='First'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className={classes.input}
                                                        name="lastTo"
                                                        label='Last'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormikTextField
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className={classes.input}
                                                        name="phoneTo"
                                                        label="Phone"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className={classes.input}
                                                        name="companyNameTo"
                                                        label='Company name'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className={classes.input}
                                                        name="streetTo"
                                                        label='Street address'
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className={classes.input}
                                                        name="cityTo"
                                                        label='City'
                                                    />
                                                </Grid>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <CustomAutocompleteFormik
                                                            name="stateTo"
                                                            label='State'
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            className={classes.input}
                                                            name="zipCodeTo"
                                                            label='Zip code'
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="block-other-info">
                                    <Grid item xs={12}>
                                        <CurrencyTextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.input}
                                            name="price"
                                            label="Price Info"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.input}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="comments"
                                            label="Comments, special request, ets"
                                            multiline={true}
                                            rows={3}
                                        />
                                    </Grid>

                                    <Grid container spacing={4}
                                          className={classes.wrapDatePicker}>
                                        <div className={classes.datePicker}>
                                            <TextField
                                                name="date"
                                                className={classes.input}
                                                label="First available ship date"
                                                type="date"
                                                format="mm/dd/yyyy"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.input}
                                            InputLabelProps={{shrink: true}}
                                            name="detail"
                                            label="Vehicle information"
                                            multiline={true}
                                            rows={4}
                                        />
                                    </Grid>
                                </div>
                            </div>

                            <Grid>
                                <div className={classes.wrapButton}>
                                    <button
                                        type="button"
                                        className={classes.button}
                                        onClick={closeForm}>
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={classes.button}>
                                        Add
                                        {loading &&
                                        <span className={classes.wrapLoader}>
                                            <CircularProgress size={15} className={classes.loader}/>
                                        </span>}
                                    </button>
                                </div>
                            </Grid>
                        </div>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    )
}
