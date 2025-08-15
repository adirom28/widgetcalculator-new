import React from 'react';

import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';

import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import httpHelper from '../../../httpHelper';

import {SnackbarContentWrapper} from '../../../CommonCustomComponents/SnackBar';

import ProgressButton from './ProgressButtonComponent';


const sortedCategoryKeys = [
    'CAT_1',
    'CAT_2',
    'CAT_3',
    'CAT_4'
];


const categoryKeyLabels = {
    'CAT_1': 'Category 1',
    'CAT_2': 'Category 2',
    'CAT_3': 'Category 3',
    'CAT_4': 'Category 4'
};

const sortedDiscountKeys = [
    '2',
    '3',
    '4',
    '5'
];

const discountLabels = {
    '2': 'Vehicle 2',
    '3': 'Vehicle 3',
    '4': 'Vehicle 4',
    '5': 'Vehicle 5+'
};


const validationSchema = Yup.object().shape({
    minPrice: Yup.number()
        .min(0, 'Too small')
        .required('Required'),
    minPriceDistance: Yup.number()
        .min(0, 'Too small')
        .required('Required'),
    enclosed: Yup.number()
        .min(0, 'Too small')
        .max(100, 'Too big')
        .required('Required'),

    notRunning: Yup.number()
        .min(0, 'Too small')
        .max(100, 'Too big')
        .required('Required'),

    cashDiscount: Yup.number()
        .min(0, 'Too small')
        .max(100, 'Too big')
        .required('Required'),

    maxPriceByCategories: Yup.object().shape({
        'CAT_1': Yup.number()
            .min(0, 'Too small')
            .required('Required'),
        'CAT_2': Yup.number()
            .min(0, 'Too small')
            .required('Required'),
        'CAT_3': Yup.number()
            .min(0, 'Too small')
            .required('Required'),
        'CAT_4': Yup.number()
            .min(0, 'Too small')
            .required('Required'),
    }),

    pricePerMileByCategories: Yup.object().shape({
        'CAT_1': Yup.number()
            .min(0.1, 'Too small')
            .required('Required'),
        'CAT_2': Yup.number()
            .min(0.1, 'Too small')
            .required('Required'),
        'CAT_3': Yup.number()
            .min(0.1, 'Too small')
            .required('Required'),
        'CAT_4': Yup.number()
            .min(0.1, 'Too small')
            .required('Required'),
    }),
    countDiscounts: Yup.object().shape({
        '2': Yup.number()
            .min(0.1, 'Too small')
            .required('Required'),
        '3': Yup.number()
            .min(0.1, 'Too small')
            .required('Required'),
        '4': Yup.number()
            .min(0.1, 'Too small')
            .required('Required'),
        '5': Yup.number()
            .min(0.1, 'Too small')
            .required('Required'),
    }),
});


function PriceTextField(props) {
    const [field, meta] = useField(props);

    return (
        <TextField
            {...field}
            {...props}
            type="number"
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            variant="outlined"
            margin="normal"
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
        />
    )
}

function PercentageTextField(props) {
    const [field, meta] = useField(props);

    return (
        <TextField
            {...field}
            {...props}
            type="number"
            InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            variant="outlined"
            margin="normal"
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
        />
    )
}



export default class MultipliersConfigCommponent extends React.Component {
    state = {
        snackbar: {
            open: false
        },
        defaultConfig: null,
    };

    _request = null;

    updateButtonstate = (newState) => {
        const oldState = this.state.button;

        this.setState({ button: { ...oldState, ...newState } });
    }

    componentDidMount() {
        this._request = this.loadConfig();
        this._request.response.then(
            config => {
                this.setState({ defaultConfig: config });
                this._equest = null;
            }
        ).catch(e => {
            this.setState({
                snackbar: {
                    open: true, message: 'Can not load config', variant: 'error'
                }
            })
        })
    }

    componentWillUnmount() {
        if (this._request) {
            this._request.cancelTokenSource.cancel();
        }
    }

    loadConfig() {
        return httpHelper.get('calc/config');
    }

    handleCloseSnackbar = () => {
        const snackbar = this.state.snackbar;

        this.setState({ snackbar: { ...snackbar, open: false } });
    }


    render() {
        if (this.state.defaultConfig === null) {
            return ("Loading...");
        }

        const config = this.state.defaultConfig;
        const classes = this.props.classes;

        return (
            <Paper className={classes.paper}>
                <Formik
                    initialValues={config}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        const request = httpHelper.post('/calc/config', values);

                        request.response.then(() => {
                            this.setState({
                                snackbar: {
                                    open: true, message: 'Config is updated', variant: 'success'
                                }
                            });
                            actions.setSubmitting(false);
                        }).catch(e => {
                            this.setState({
                                snackbar: {
                                    open: true, message: 'Can not update config', variant: 'error'
                                }
                            });
                        })
                    }}
                    validateOnBlur
                >
                    {({ values, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <div className={classes.header}>
                                <h6>Minimal prices</h6>
                            </div>
                            <div className={classes.textFieldGroup}>
                                <PriceTextField
                                    name="minPrice"
                                    label="Min price"
                                    value={values.minPrice}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={classes.textField}
                                />
                                <PriceTextField
                                    name="minPriceDistance"
                                    label="Min price distance"
                                    value={values.minPriceDistance}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={classes.textField}
                                />
                            </div>

                            <div className={classes.header}>
                                <h6>Prices per mile</h6>
                            </div>

                            <div className={classes.textFieldGroup}>

                                {sortedCategoryKeys.map((categoryKey, index) => {
                                    const name = "pricePerMileByCategories." + categoryKey;
                                    const value = values["pricePerMileByCategories"][categoryKey];

                                    return (
                                        <PriceTextField
                                            key={index}
                                            name={name}
                                            label={categoryKeyLabels[categoryKey]}
                                            className={classes.textField}
                                            value={value}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                    )
                                })}
                            </div>


                            <div className={classes.header}>
                                <h6>Max prices</h6>
                            </div>

                            <div className={classes.textFieldGroup}>
                                {sortedCategoryKeys.map((categoryKey, index) => {
                                    const name = "maxPriceByCategories." + categoryKey;
                                    const value = values["maxPriceByCategories"][categoryKey];

                                    return (
                                        <PriceTextField
                                            key={index}
                                            name={name}
                                            label={categoryKeyLabels[categoryKey]}
                                            className={classes.textField}
                                            value={value}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                    )
                                })}
                            </div>
                            <div className={classes.header}>
                                <h6>Discount</h6>
                            </div>

                            <div className={classes.textFieldGroup}>
                                {sortedDiscountKeys.map((categoryKey, index) => {
                                    const name = "countDiscounts." + categoryKey;
                                    const value = values["countDiscounts"][categoryKey];

                                    return (
                                        <PercentageTextField
                                            key={index}
                                            name={name}
                                            label={discountLabels[categoryKey]}
                                            className={classes.textField}
                                            value={value}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                    )
                                })}
                            </div>

                            <div className={classes.textFieldGroup}>
                                <PercentageTextField
                                    label="Enclosed"
                                    name="enclosed"

                                    className={classes.textField}
                                    value={values.enclosed}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={classes.textFieldGroup}>
                                <PercentageTextField
                                    label="Not running"
                                    name="notRunning"

                                    className={classes.textField}
                                    value={values.notRunning}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={classes.textFieldGroup}>
                                <PercentageTextField
                                    label="Cash discount"
                                    name="cashDiscount"

                                    className={classes.textField}
                                    value={values.cashDiscount}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className={classes.buttonContainer}>
                                <ProgressButton
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                    text="Update config">
                                </ProgressButton>
                            </div>
                        </Form>
                    )}
                </Formik>


                <Snackbar
                    open={this.state.snackbar.open}
                    onClose={this.handleCloseSnackbar}
                    autoHideDuration={5000}
                >
                    <SnackbarContentWrapper
                        variant={this.state.snackbar.variant || 'info'}
                        message={this.state.snackbar.message}
                    />
                </Snackbar>
            </Paper>
        );
    }
}
