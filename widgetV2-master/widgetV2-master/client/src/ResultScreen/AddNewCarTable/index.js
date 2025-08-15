import React from 'react';
import {getValidDateRange} from '../../utils';

import RadioGroup from '../../CommonCustomComponents/RadioGroup';

import '../DetailsTable/style.css';
import './style.css';
import CustomAutocomplete from "../../CommonCustomComponents/CustomAutocomplete";


export default class AddNewCarTable extends React.Component {

    constructor(props) {
        super(props);
        this.validDateRange = getValidDateRange(this.props.data.shipDate);
        this.state = {
            helperText: '',
            nameRadio: this.props.nameRadio,
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
    }

    onChange = (formValue) => {
        this.props.onChange(formValue);
    }

    handleCarChange = (name, value) => {

        let formValue;
        if (name === 'vehicleYear') {
            formValue = {vehicleYear: value, vehicleMaker: '', vehicleModel: null};
        } else if (name === 'vehicleMaker') {
            formValue = {vehicleMaker: value, vehicleModel: null};
        } else {
            this.setState({helperText: ''});

            this.props.handleValidField && this.props.handleValidField();

            formValue = {vehicleModel: value}
        }

        this.props.onChange(formValue);
    }

    handleChange = (name, value) => {
        this.props.onChange({[name]: value});
    }

    render() {
        const makerDisabled = !this.props.data.vehicleYear;
        const modelDisabled = !this.props.data.vehicleMaker || !this.props.data.vehicleYear;

        const vehicleModel = this.props.data.vehicleModel ? this.props.data.vehicleModel.model : '';

        return (
            <div className="wrap-table">
                <div className="wrap-details-block">

                    <div className="table-add-new-details">
                        <div className="mb-15">
                            <CustomAutocomplete
                                url='/cars/years'
                                name='vehicleYear'
                                value={this.props.data.vehicleYear}
                                label='Vehicle year'
                                onChange={value => this.handleCarChange('vehicleYear', value)}
                                error={this.state.submitted && !this.props.data.vehicleYear}
                                errorText="Please select a vehicle year"
                                staticOptions
                                type='number'
                            />
                        </div>
                        <div className="mb-15">
                            <CustomAutocomplete
                                url={`/cars/makers?year=${this.props.data.vehicleYear}`}
                                name='vehicleMaker'
                                value={this.props.data.vehicleMaker}
                                label='Vehicle maker'
                                disabled={makerDisabled}
                                onChange={value => this.handleCarChange('vehicleMaker', value)}
                                errorText="Please select a vehicle maker"
                            />
                        </div>
                        <div className="mb-15">
                            <CustomAutocomplete
                                url={`/cars/models?year=${this.props.data.vehicleYear}&maker=${this.props.data.vehicleMaker}`}
                                name='vehicleModel'
                                defaultValue={this.props.data.vehicleModel}
                                label='Vehicle model'
                                disabled={modelDisabled}
                                onChange={value => this.handleCarChange('vehicleModel', value)}
                                textField="model"
                                error={this.state.submitted && !this.props.data.vehicleModel}
                                errorText="Please SELECT a vehicle model"
                            />
                        </div>
                        <div className="table-group-radio">
                            <div className="table-name">
                                Vehicle condition
                            </div>
                            <div className="table-radio-value">
                                <RadioGroup
                                    name={this.state.nameRadio}
                                    firstRadioId="firstAddNewCar"
                                    secondRadioId="secondAddNewCar"
                                    defaultValue={this.props.data.running}
                                    values={[
                                        {value: "yes", text: "Running"},
                                        {value: "no", text: "Not running"}
                                    ]}
                                    onChange={this.props.onChange}
                                    radioFlexBasis="100px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
