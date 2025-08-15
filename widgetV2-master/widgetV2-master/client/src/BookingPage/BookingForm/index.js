import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";

import {CircularProgress, Grid} from "@material-ui/core";
import {useStyles} from './mstyles';
import Typography from "@material-ui/core/Typography";
import "./styles.css";

import {validationField} from "./validation";
import TextField from "../../CommonCustomComponents/TextField";
import DateTimePicker from "../../CommonCustomComponents/DataTimePicker";
import Button from "../../CommonCustomComponents/Button";
import {ErrorMessageComponent} from "../../CommonCustomComponents/ErrorMessageComponent";
import * as properties from "../../properties";
import {useBooking} from "../../services/useBooking";
import axios from "axios";
import FormikTextField from "../../CommonCustomComponents/PhoneNumberMask";
import {useParams} from "react-router-dom/cjs/react-router-dom";

const url = `${properties.apiUrl}/orders`;

export const getZipCode = (place) => {
    const arr = place.split(',')[1];
    const stringFromTo = arr.trim().split(' ');
    return stringFromTo.length > 1 ? stringFromTo[stringFromTo.length - 1] : "";
}

export default function BookingForm() {
    const classes = useStyles();
    const useBook = useBooking(url);
    const dispatch = useDispatch();

    const {id} = useParams();

    const data = useSelector(state => state.shipReducer);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const storageData = JSON.parse(localStorage.getItem("shipData"));
    const [orderData, setOrderData] = useState(null);

    const [userInfo, setUserInfo] = useState({
        logo: "",
        companyName: "",
    });

    let dataShip;
    if (data.data) {
        dataShip = data.data;
    } else if (!data.data && !storageData) {
        dataShip = orderData;
    } else {
        dataShip = storageData;
    }

    useEffect(() => {

        if (id === ":id") return;
        setLoading(true);

        axios.get(`${properties.apiUrl}/orders/${id}`)
            .then(res => {
                setOrderData(res.data);
                setLoading(false);
            }).catch((error) => console.log(error));

    }, [id]);


    useEffect(() => {
        setLoading(true);

        axios.get(`${properties.apiUrl}/user/info`)
            .then(res => {
                setUserInfo({
                    logo: res.data.logo,
                    companyName: res.data.companyName,
                });
                dispatch({
                        type: "SET_USER_INFO",
                        payload: {
                            logo: res.data.logo,
                            companyName: res.data.companyName,
                            redirectLink: res.data.redirectLink,
                        }
                    }
                );
                localStorage.setItem('userInfo', JSON.stringify({
                    logo: res.data.logo,
                    companyName: res.data.companyName,
                    redirectLink: res.data.redirectLink,
                }));
                setLoading(false);
            }).catch((error) => {
            setLoading(false);
        });

    }, []);

    useEffect(() => {

        if (useBook.submitted.submitted || useBook.error.hasError) {
            setButtonLoading(false);
        }
    }, [useBook.submitted.submitted, useBook.error.hasError])

    const getState = (place) => {
        const arr = place.split(',')[1];
        const stringFromTO = arr.trim().split(' ');
        return stringFromTO[0];
    }

    const shipDate = data.data ? dataShip.shipDate.toISOString().split('T')[0] : storageData.shipDate.split('T')[0];

    let transportType;

    if (dataShip) {
        transportType = dataShip.transportType.includes('open') ? "Open trailer transport" : "Closed trailer transport";
    }

    let detailField;

    if (dataShip && dataShip.cars.length === 1) {
        detailField = `Model: ${dataShip.vehicleModel.model}\nMaker: ${dataShip.vehicleModel.maker}\nYear: ${dataShip.vehicleYear}\nType: ${dataShip.vehicleModel.type}\nVehicle running: ${dataShip.running}\nDistance: ${dataShip.distanceText}\n${transportType}`;
    } else {
        let field;
        let fieldArr = ["Vehicles: "];

        if (dataShip) {
            dataShip.cars.forEach((car) => {
                field = `\n ${car.vehicleYear} ${car.vehicleModel.maker} ${car.vehicleModel.model}`;
                fieldArr.push(field);
            });
        }

        detailField = fieldArr.join(' ');
    }

    return (
        <section className="container">
            <Grid item xs={12}>
                <div className={classes.fullWidth}>
                    {
                        loading
                            ? (
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justify="flex-start"
                                    style={{minHeight: '100vh'}}
                                >
                                    <CircularProgress className={classes.mainLoader} size={60}/>
                                </Grid>
                            ) : (
                                <div className={classes.formWrapper}>
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={{
                                            name: "",
                                            email: dataShip.email,
                                            phone: dataShip.phone,
                                            firstFrom: "",
                                            lastFrom: "",
                                            phoneFrom: "",
                                            companyNameFrom: "",
                                            addressFrom: "",
                                            cityFrom: dataShip.placeFrom.split(',')[0],
                                            stateFrom: getState(dataShip.placeFrom),
                                            zipCodeFrom: getZipCode(dataShip.placeFrom),
                                            firstTo: "",
                                            lastTo: "",
                                            phoneTo: "",
                                            companyNameTo: "",
                                            streetTo: "",
                                            cityTo: dataShip.placeTo.split(',')[0],
                                            stateTo: getState(dataShip.placeTo),
                                            zipCodeTo: getZipCode(dataShip.placeTo),
                                            date: shipDate,
                                            comments: "",
                                            detail: detailField,
                                            price: `$ ${dataShip.cashDiscountPrice}.00`,
                                        }}
                                        validationSchema={validationField}
                                        onSubmit={(values, actions) => {
                                            let newValues = {...values, cars: dataShip.cars}
                                            useBook.handleSubmit(newValues);
                                            setButtonLoading(true);
                                        }}>
                                        <Form>
                                            <div>
                                                <Typography variant={'h4'}
                                                            className="mainTitle">
                                                    Booking Details
                                                </Typography>
                                                <div className="wrapPickUpForm">

                                                    <div className="fieldGroup">
                                                        <Grid container spacing={4}>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    className={classes.bookFormInput}
                                                                    label="Name"
                                                                    name="name"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={4}>
                                                            <Grid item xs={12}>
                                                                <FormikTextField
                                                                    className={classes.bookFormInput}
                                                                    name="phone"
                                                                    label="Phone"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={4}>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    className={classes.bookFormInput}
                                                                    name="email"
                                                                    label='Email'
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div className="wrapLogo">
                                                        {
                                                            userInfo.logo ?
                                                                (<div className={classes.logo}>
                                                                    <img className={classes.imgLogo} src={userInfo.logo}
                                                                         alt="logo"/>
                                                                </div>) : ""
                                                        }
                                                        {
                                                            userInfo.companyName ?
                                                                <Typography className={classes.titleLogo}
                                                                            variant="h6">{userInfo.companyName}</Typography> : ""
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <Typography
                                                    variant={'h5'}
                                                    className="title">
                                                    Pickup info
                                                </Typography>
                                                <div className={classes.wrapPickUpForm}>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.bookFormInput}
                                                                name="firstFrom"
                                                                label='First'
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.bookFormInput}
                                                                name="lastFrom"
                                                                label='Last'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}
                                                          className={classes.wrapBlockInput}>
                                                        <Grid item xs={12}>
                                                            <FormikTextField
                                                                className={classes.bookFormInput}
                                                                name="phoneFrom"
                                                                label="Phone"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                className={classes.bookFormInput}
                                                                name="companyNameFrom"
                                                                label='Company name'
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                className={classes.bookFormInput}
                                                                name="addressFrom"
                                                                label='Street address'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.inputDisabled}
                                                                disabled={true}
                                                                name="cityFrom"
                                                                label='City'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.inputDisabled}
                                                                disabled={true}
                                                                name="stateFrom"
                                                                label='State'
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.inputDisabled}
                                                                disabled={true}
                                                                name="zipCodeFrom"
                                                                label='Zip code'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                            <div>
                                                <Typography
                                                    variant={'h5'}
                                                    className="title">
                                                    Delivery info
                                                </Typography>
                                                <div>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.bookFormInput}
                                                                name="firstTo"
                                                                label='First'
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.bookFormInput}
                                                                name="lastTo"
                                                                label='Last'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}
                                                          className={classes.wrapBlockInput}>
                                                        <Grid item xs={12}>
                                                            <FormikTextField
                                                                className={classes.bookFormInput}
                                                                name="phoneTo"
                                                                label="Phone"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                className={classes.bookFormInput}
                                                                name="companyNameTo"
                                                                label='Company name'
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                className={classes.bookFormInput}
                                                                name="streetTo"
                                                                label='Street address'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.inputDisabled}
                                                                disabled={true}
                                                                name="cityTo"
                                                                label='City'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.inputDisabled}
                                                                disabled={true}
                                                                name="stateTo"
                                                                label='State'
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                className={classes.inputDisabled}
                                                                disabled={true}
                                                                name="zipCodeTo"
                                                                label='Zip code'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                <Grid item xs={12}
                                                      className={classes.wrapTextArea}>
                                                    <TextField
                                                        className={classes.commentsField}
                                                        name="comments"
                                                        label="Comments, special request, ets"
                                                        multiline={true}
                                                        rows={3}
                                                    />
                                                </Grid>
                                                <Grid container spacing={4}
                                                      className={classes.wrapDatePicker}>
                                                    <DateTimePicker
                                                        disabled={true}
                                                        className={classes.datePicker}
                                                        format="mm/dd/yyyy"
                                                        name="date"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}
                                                      className={classes.textArea}>
                                                    <TextField
                                                        className={classes.textArea}
                                                        inputProps={{readOnly: true}}
                                                        name="detail"
                                                        placeholder="Vehicle information"
                                                        multiline={true}
                                                        rows={7}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}
                                                      className={classes.wrapTextArea}>
                                                    <TextField
                                                        className={classes.textArea}
                                                        disabled={true}
                                                        name="price"
                                                        label="Price Info"
                                                    />
                                                </Grid>
                                                {
                                                    useBook.error.hasError &&
                                                    <Grid item xs={12}>
                                                        <ErrorMessageComponent
                                                            errorMessage={useBook.error.errorMessage}
                                                            color={"#dc3545"}
                                                            bgColor={"#fff"}
                                                        />
                                                    </Grid>
                                                }
                                                <Grid item xs={12}
                                                      className={classes.wrapButton}>
                                                    <Button>
                                                        Book
                                                        {buttonLoading &&
                                                        <div className={classes.wrapLoader}>
                                                            <CircularProgress size={15} className={classes.loader}/>
                                                        </div>}
                                                    </Button>
                                                </Grid>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            )
                    }
                </div>
            </Grid>
        </section>
    )
}

