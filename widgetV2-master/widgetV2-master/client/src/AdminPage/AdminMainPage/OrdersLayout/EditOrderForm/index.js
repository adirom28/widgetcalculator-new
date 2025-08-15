import React, {useEffect, useState} from "react";

import {CircularProgress, Grid, Typography} from "@material-ui/core";
import {Form, Formik} from "formik";
import {validationAddNewOrder} from "../validation";
import TextField from "../../../../CommonCustomComponents/TextField";
import {useStyles} from "../AddNewOrderForm/mstyles";
import {useEditOrder} from "../../../../services/useEditForm";
import * as properties from "../../../../properties";

import "../AddNewOrderForm/style.css";
import FormikTextField from "../../../../CommonCustomComponents/PhoneNumberMask";
import CurrencyTextField from "../../../../CommonCustomComponents/CurrencyInputMask";
import {changeDateFormat} from "../Order";
import {CustomAutocompleteFormik} from "../../../../CommonCustomComponents/CustomAutocompleteFormik";


export const EditOrderForm = (props) => {
    const classes = useStyles();
    const {orderData, close, handleOpenSnackBar, editOrderRow} = props;
    const [loading, setLoading] = useState(false);

    const useEdit = useEditOrder(`${properties.apiUrl}/orders/${orderData.id}`);

    const closeForm = () => {
        close("edit");
    }

    useEffect(() => {

        if (useEdit.success.success) {
            setLoading(false);
            closeForm();
            handleOpenSnackBar(useEdit.success.success, useEdit.success.successMessage)
        }
        if (useEdit.error.hasError) {
            setLoading(false);
            closeForm();
            handleOpenSnackBar(useEdit.error.hasError, useEdit.error.errorMessage)
        }

    }, [useEdit.success.success, useEdit.error.hasError, useEdit.error.errorMessage, useEdit.success.successMessage]);

    return (
        <Grid container className={classes.wrapper}>
            <Typography
                style={{fontSize: "24px", color: "#008ecc", margin: "0 auto"}}>Edit order</Typography>
            <Grid>
                <Formik
                    initialValues={{
                        name: orderData.name,
                        email: orderData.email,
                        phone: orderData.phone,
                        firstFrom: orderData.firstFrom,
                        lastFrom: orderData.lastFrom,
                        phoneFrom: orderData.phoneFrom,
                        companyNameFrom: orderData.companyNameFrom,
                        addressFrom: orderData.addressFrom,
                        cityFrom: orderData.cityFrom,
                        stateFrom: orderData.stateFrom,
                        zipCodeFrom: orderData.zipCodeFrom,
                        firstTo: orderData.firstTo,
                        lastTo: orderData.lastTo,
                        phoneTo: orderData.phoneTo,
                        companyNameTo: orderData.companyNameTo,
                        streetTo: orderData.streetTo,
                        cityTo: orderData.cityTo,
                        stateTo: orderData.stateTo,
                        zipCodeTo: orderData.zipCodeTo,
                        date: changeDateFormat(orderData.date, "revert"),
                        comments: orderData.comments,
                        detail: orderData.detail,
                        price: orderData.price
                    }}
                    validationSchema={validationAddNewOrder}
                    onSubmit={(values, actions) => {
                        setLoading(true);
                        useEdit.handleSubmit(values);
                        editOrderRow(orderData.id, values, orderData.status);
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
                                                        style={{fontSize: "12px"}}
                                                        defaultValue={orderData.stateFrom}
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
                                                            style={{fontSize: "12px"}}
                                                            defaultValue={orderData.stateTo}
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
                                            InputLabelProps={{shrink: true}}
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
                                                label="Ship date"
                                                type="date"
                                                format="mm/dd/yyyy"
                                                InputLabelProps={{shrink: true}}
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
                                        Edit
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
