import React, { Fragment } from 'react';

import { KeyboardDatePicker } from "@material-ui/pickers";
import { getValidDateRange } from '../../utils';

import CustomPhoneTextField from '../../CommonCustomComponents/PhoneInput';
import CustomEmailTextField from '../../CommonCustomComponents/EmailInput';

export function CustomKeyboardDatePicker(props) {
    const { error, errorText, ...otherProps } = props;

    return (
        <KeyboardDatePicker
            {...otherProps}
            invalidDateMessage="Invalid date format"
            minDateMessage="Date should not be before current date"
            helperText={errorText}
            error={error}
        />
    )
}


export default class DetailsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                email: props.defaultData.email || '',
                phone: props.defaultData.phone || '',
                shipDate: props.defaultData.shipDate || new Date()
            },
            errors: {
                email: '', phone: '', shipDate: ''
            },
        };

        this.lastErrors = {
            shipDate: '', phone: '', email: ''
        }

        this.requiredMessages = {
            email: 'Please enter an email address',
            shipDate: 'Please select or enter a ship date',
            phone: 'Please enter a phone number'
        };


        this.dateRange = getValidDateRange(this.state.data.shipDate);
    }

    handleChange = (name, value) => {
        const { data, errors } = this.state;
        const newData = {
            ...data,
            [name]: value,
        }

        this.setState({
            data: newData,
            errors: {
                ...errors,
                [name]: '',
            },
        });

        this.lastErrors[name] = '';


        if (this.props.setData) {
            this.props.setData(newData);
        }
    };

    handleError = (name, error) => {
        this.lastErrors[name] = error;
    }

    handleBlur = (event) => {
        const name = event.target.name;
        const error = this.lastErrors[name];

        if (error) {
            this.setState(state => ({
                errors: { ...state.errors, [name]: error }
            }));
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { data, errors } = this.state;
        const isValid = Object.keys(data).reduce(
            (sum, item) => sum && !errors[item] && this.validate(item, data[item]),
            true
        );

        if (isValid) {
            if (this.props.onSubmit) {
                this.props.onSubmit();
            }
        }
    };

    validate = (name, value) => {
        let error = '';

        if (typeof value === 'string') {
            if (!value.trim()) {
                error = this.requiredMessages[name] || "Field is required";
            }
        } else {
            if (value == null) {
                error = this.requiredMessages[name] || "Field is required";
            }
        }

        if (error) {
            this.setState(
                ({ errors }) => ({
                    errors: {
                        ...errors,
                        [name]: error
                    },
                }),
                () => false
            );
        } else {
            return true;
        }
    }

    render() {

        return (
            <Fragment>
                <form className="detailsForm" onSubmit={this.handleSubmit}>
                    <div className="inner-form-content">
                        <div className="mb-15">

                            <CustomEmailTextField
                                fullWidth
                                name="email"
                                label="Email"
                                variant="outlined"
                                value={this.state.data.email}
                                onChange={value => this.handleChange('email', value)}
                                onError={error => this.handleError('email', error)}
                                onBlur={event => this.handleBlur(event)}
                                errorText={this.state.errors.email}
                                error={Boolean(this.state.errors.email)}
                            />
                        </div>

                        <div className="mb-15">
                            <CustomKeyboardDatePicker
                                fullWidth
                                name="shipDate"
                                inputVariant="outlined"
                                label="First available ship date"
                                format="MM/dd/yyyy"
                                value={this.state.data.shipDate}
                                onChange={date => this.handleChange('shipDate', date)}
                                onError={error => this.handleError('shipDate', error)}
                                onBlur={event => this.handleBlur(event)}
                                minDate={this.dateRange.minDate}
                                errorText={this.state.errors.shipDate}
                                error={Boolean(this.state.errors.shipDate)}
                            />
                        </div>

                        <div className="mb-15">

                            <CustomPhoneTextField
                                fullWidth
                                name="phone"
                                label="Phone"
                                variant="outlined"
                                value={this.state.data.phone}
                                onChange={value => this.handleChange('phone', value)}
                                onError={error => this.handleError('phone', error)}
                                onBlur={event => this.handleBlur(event)}
                                errorText={this.state.errors.phone}
                                error={Boolean(this.state.errors.phone)}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="btn main-btn" type="submit">
                            <span>Calculate</span> <i className="fa fa-arrow-right icon-arrow" />
                        </button>
                    </div>
                </form>
            </Fragment>
        );
    }
}
