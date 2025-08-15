import React, {Fragment} from 'react';
import {isObjectInvalid} from '../../utils';

import RadioGroup from '../../CommonCustomComponents/RadioGroup';
import CustomPlaceAutocomplete from '../../CommonCustomComponents/CustomPlaceAutocomplete';

export default class DestinationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            btnDisabled: false,
            submitted: false,
            data: {
                placeFrom: props.data.placeFrom || '',
                placeFromId: props.data.placeFromId || '',
                placeTo: props.data.placeTo || '',
                placeToId: props.data.placeToId || '',
                transportType: props.data.transportType || 'open',
            }
        };
    }

    handleChange = (formValue) => {
        let newData = Object.assign({}, this.state.data, formValue);

        this.setState({ data: newData });

        if (this.state.submitted) {
            this.setState({ btnDisabled: isObjectInvalid(newData) });
        }

        if (this.props.setData) {
            this.props.setData(newData);
        }
    };

    handlePlaceChange = (name, description, placeId) => {
        let formValue = {
            [name]: description,
            [name + "Id"]: placeId
        };
        let newData = Object.assign({}, this.state.data, formValue);

        if (formValue.placeFrom) {
            if (formValue.placeFromId === this.state.data.placeToId) {
                Object.assign(newData, { placeToId: '', placeTo: '' });
            }
        } else if (formValue.placeTo) {
            if (formValue.placeToId === this.state.data.placeFromId) {
                Object.assign(newData, { placeFromId: '', placeFrom: '' });
            }
        }

        this.setState({ data: newData });

        if (this.state.submitted) {
            this.setState({ btnDisabled: isObjectInvalid(newData) });
        }

        if (this.props.setData) {
            this.props.setData(newData);
        }
    };

    onSubmit = () => {
        if (!isObjectInvalid(this.state.data)) {
            if (this.props.toNextForm) {
                this.props.toNextForm();
            }
        } else {
            this.setState({
                btnDisabled: true,
                submitted: true
            });
        }
    };

    render() {
        return (
            <Fragment>
                <div className="inner-form-content">
                    <div className="mb-15">
                        <CustomPlaceAutocomplete
                            name="placeFrom"
                            label="Transport car from"
                            error={this.state.submitted && !this.state.data.placeFrom}
                            errorText="Please select car transport from"
                            value={this.state.data.placeFrom}
                            onChange={(value, description, placeId) => this.handlePlaceChange("placeFrom", description, placeId)}
                        />
                    </div>


                    <div className="mb-15">
                        <CustomPlaceAutocomplete
                            name="placeTo"
                            label="Transport car to"
                            error={this.state.submitted && !this.state.data.placeTo}
                            errorText="Please select car transport to"
                            value={this.state.data.placeTo}
                            onChange={(value, description, placeId) => this.handlePlaceChange("placeTo", description, placeId)}

                        />
                    </div>

                    <RadioGroup title="Transport type"
                                name="transportType"
                                firstRadioId="firstTransportForm"
                                secondRadioId="secondTransportForm"
                                values={
                                    [
                                        {text: 'Open', value: 'open'},
                                        {text: 'Enclosed', value: 'enclosed'}
                                    ]
                                }
                                defaultValue={this.state.data.transportType}
                                onChange={this.handleChange}
                                radioFlexBasis="50%"
                    />
                </div>
                <div>
                    <button className="btn main-btn" disabled={this.state.btnDisabled}
                        onClick={this.onSubmit}
                    >
                        <span>Vehicle details</span> <i className="fa fa-arrow-right icon-arrow" />
                    </button>
                </div>
            </Fragment>
        );
    }
}