import React, {useEffect, useState} from "react";
import {CircularProgress, Dialog, DialogActions, DialogContent, FormLabel, Grid, Typography} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import {validationDispatchForm} from "./validationFields";
import TextField from "../../../../CommonCustomComponents/TextField";
import FormikRadioGroup from "../../../../CommonCustomComponents/RadioButton";
import {useStyles} from "./mstyles";
import {useDispatchForm} from "../../../../services/useDispatchForm";
import * as properties from "../../../../properties";

import "./style.css";
import Axios from "axios";
import {Autocomplete} from "@material-ui/lab";
import {createFilterOptions} from "@material-ui/lab/Autocomplete";
import FormikTextField from "../../../../CommonCustomComponents/PhoneNumberMask";


export const DispatchForm = (props) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const filter = createFilterOptions();


    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [personDetail, setPersonDetail] = useState({
        nameCarrier: "",
        contactPerson: "",
        contactEmail: "",
        contactPhoneNumber: "",
    });
    console.log(personDetail)

    const {handleCloseForm, openForm, id, handleOpenSnackBar, handleSetDispatchStatus} = props;

    const options = [
        {id: 1, value: "true", label: "open"},
        {id: 2, value: "false", label: "enclosed"}
    ];

    const useDispatch = useDispatchForm(`${properties.apiUrl}/orders/dispatch/${id}`);

    const getDrivers = (value) => {
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        if (value.length > 1) {
            Axios.get(`${properties.apiUrl}/orders/drivers?name=${value}`, config).then((res) => {
                setData(res.data);
            })
                .catch((e) => console.log(e));
        }
    }

    const handleOpen = (value) => {
        getDrivers(value);
    };

    useEffect(() => {
        if (useDispatch.success.success) {
            setLoading(false);
            handleSetDispatchStatus();
            handleCloseForm();
            handleOpenSnackBar(useDispatch.success.success, useDispatch.success.successMessage);
        }
        if (useDispatch.error.hasError) {
            setLoading(false);
            handleOpenSnackBar(useDispatch.error.hasError, useDispatch.error.errorMessage);
        }

    }, [useDispatch.success.success, useDispatch.success.successMessage, useDispatch.error.hasError, useDispatch.error.errorMessage]);

    return (
        <Dialog open={openForm} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
            <Typography
                style={{fontSize: "24px", padding: "10px 0", color: "#008ecc", margin: "0 auto"}}>
                Dispatch details
            </Typography>
            <DialogContent>
                <Grid container className={classes.wrapper}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            nameCarrier: personDetail.nameCarrier ? personDetail.nameCarrier : "",
                            contactPerson: personDetail.contactPerson ? personDetail.contactPerson : "",
                            contactEmail: personDetail.contactEmail ? personDetail.contactEmail : "",
                            contactPhoneNumber: personDetail.contactPhoneNumber ? personDetail.contactPhoneNumber : "",
                            driverName: "",
                            driverNumber: "",
                            isCarEnclosed: "true",
                            pickUpDate: "",
                            deliveryDate: "",
                        }}
                        validationSchema={validationDispatchForm}
                        onSubmit={(values, actions) => {
                            setLoading(true);
                            if (personDetail.id) {
                                const newValues = {...values, id: personDetail.id};
                                useDispatch.handleSubmit(newValues);
                            } else {
                                useDispatch.handleSubmit(values);
                            }
                        }}>
                        {({setFieldValue}) => (
                            <Form>
                                <div className="wrap-dispatch-form">
                                    <div className={classes.blockContactInfo}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    onChange={(event, newValue) => {

                                                        if (typeof newValue === 'string') {
                                                            setFieldValue("nameCarrier", newValue)

                                                        } else if (newValue && newValue.inputValue) {
                                                            setFieldValue("nameCarrier", newValue.inputValue)
                                                        } else {
                                                            newValue && setPersonDetail(newValue);
                                                            setFieldValue("nameCarrier", newValue)
                                                        }
                                                    }}
                                                    className={classes.autocompleteField}
                                                    name="nameCarrier"
                                                    filterOptions={(options, params) => {
                                                        const filtered = filter(options, params);
                                                        if (params.inputValue !== '') {
                                                            filtered.push({
                                                                inputValue: params.inputValue,
                                                                nameCarrier: `Add "${params.inputValue}"`,
                                                            });
                                                        }

                                                        return filtered;
                                                    }}
                                                    selectOnFocus
                                                    clearOnBlur
                                                    handleHomeEndKeys
                                                    options={data}
                                                    getOptionLabel={(option) => {
                                                        if (typeof option === 'string') {
                                                            return option;
                                                        }
                                                        if (option.inputValue) {
                                                            return option.inputValue;
                                                        }
                                                        return option.nameCarrier;
                                                    }}
                                                    renderOption={(option) => option.nameCarrier}

                                                    renderInput={params => (
                                                        <TextField
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            onChange={(e) => {
                                                                handleOpen(e.target.value);
                                                            }}
                                                            className={classes.input}
                                                            label="Name of the carrier"
                                                            name="nameCarrier"
                                                            {...params}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="contactPerson"
                                                    label='Contact Person'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="contactEmail"
                                                    label='Contact Email'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormikTextField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.input}
                                                    name="contactPhoneNumber"
                                                    label='Contact Phone'
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <div className={classes.blockDriverInfo}>
                                        <Grid item xs={12}>
                                            <TextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.input}
                                                name="driverName"
                                                label='Driver name'
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.input}
                                                name="driverNumber"
                                                label='Driver phone number'
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item xs={12} className={classes.datePicker}>
                                                <TextField
                                                    name="pickUpDate"
                                                    className={classes.input}
                                                    label="Pick up date"
                                                    type="date"
                                                    format="mm/dd/yyyy"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.datePicker}>
                                                <TextField
                                                    name="deliveryDate"
                                                    className={classes.input}
                                                    label="Delivery date"
                                                    type="date"
                                                    format="mm/dd/yyyy"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className={classes.wrapRadio}>
                                            <FormLabel className={classes.labelRadio} component="legend">Truck
                                                type</FormLabel>
                                            <Field
                                                className={classes.radioBtn}
                                                name="isCarEnclosed"
                                                component={FormikRadioGroup}
                                                options={options}
                                            />

                                        </Grid>
                                    </div>
                                </div>
                                <DialogActions className={classes.wrapButton}>
                                    <button
                                        type="button"
                                        className={classes.button} onClick={handleCloseForm}>
                                        Cancel
                                    </button>
                                    <button
                                        className={classes.button}
                                        type="submit">
                                        Submit
                                        {
                                            loading &&
                                            <span className={classes.wrapLoader}>
                                          <CircularProgress size={15} className={classes.loader}/>
                                        </span>
                                        }
                                    </button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}
