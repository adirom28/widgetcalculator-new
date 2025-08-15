import React, {Fragment} from 'react';
import {isObjectInvalid} from "../../utils";

import RadioGroup from '../../CommonCustomComponents/RadioGroup';
import CustomAutocomplete from '../../CommonCustomComponents/CustomAutocomplete';


export default class CarForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                vehicleYear: props.defaultData.vehicleYear || '',
                vehicleMaker: props.defaultData.vehicleMaker || '',
                vehicleModel: props.defaultData.vehicleModel || '',
                running: props.defaultData.running || 'yes'
            },
            submitted: false,
            btnDisabled: false
        };
    }


    handleChange = (formValue) => {
        const newData = Object.assign({}, this.state.data, formValue);

        if (!newData.vehicleYear || this.state.data.vehicleYear !== newData.vehicleYear) {
            newData.vehicleMaker = null;
            newData.vehicleModel = null;
        } else if (!newData.vehicleMaker || this.state.data.vehicleMaker !== newData.vehicleMaker) {
            newData.vehicleModel = null;
        }

        if (this.state.submitted) {
            this.setState({
                btnDisabled: isObjectInvalid(newData),
                data: newData
            })
        } else {
            this.setState({
                data: newData
            });
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
        const vehicleMakerDisabled = !this.state.data.vehicleYear;
        const vehicleModelDisabled = !this.state.data.vehicleMaker || !this.state.data.vehicleYear;

        return (
            <Fragment>
                <div className="inner-form-content">
                    <div className="mb-15">
                        <CustomAutocomplete
                            url='/cars/years'
                            name='vehicleYear'
                            value={this.state.data.vehicleYear}
                            label='Vehicle year'
                            onChange={value => this.handleChange({ 'vehicleYear': value })}
                            error={this.state.submitted && !this.state.data.vehicleYear}
                            errorText="Please select a vehicle year"
                            staticOptions
                            type='number'
                        />
                    </div>

                    <div className="mb-15">
                        <CustomAutocomplete
                            url={`/cars/makers?year=${this.state.data.vehicleYear}`}
                            name='vehicleMaker'
                            value={this.state.data.vehicleMaker}
                            label='Vehicle maker'
                            disabled={vehicleMakerDisabled}
                            onChange={value => this.handleChange({ 'vehicleMaker': value })}
                            error={this.state.submitted && !this.state.data.vehicleMaker}
                            errorText="Please select a vehicle maker"
                        />
                    </div>

                    <div className="mb-15">
                        <CustomAutocomplete
                            url={`/cars/models?year=${this.state.data.vehicleYear}&maker=${this.state.data.vehicleMaker}`}
                            name='vehicleModel'
                            defaultValue={this.state.data.vehicleModel}
                            label='Vehicle model'
                            disabled={vehicleModelDisabled}
                            onChange={value => this.handleChange({ 'vehicleModel': value })}
                            textField="model"
                            error={this.state.submitted && !this.state.data.vehicleModel}
                            errorText="Please SELECT a vehicle model"
                        />
                    </div>

                    <RadioGroup title="Does the car roll, steer and brake?"
                                name="running"
                                firstRadioId="firstCarForm"
                                secondRadioId="secondCarForm"
                                values={
                                    [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}]
                                }
                                defaultValue={this.state.data.running}
                                onChange={this.onChangeValue}
                                radioFlexBasis="27%"
                    />
                </div>
                <div>
                    <button className="btn main-btn" disabled={this.state.btnDisabled} onClick={this.onSubmit}>
                        <span>Confirmation details</span>
                        <i className="fa fa-arrow-right icon-arrow" />
                    </button>
                </div>
            </Fragment>
        );
    }
}