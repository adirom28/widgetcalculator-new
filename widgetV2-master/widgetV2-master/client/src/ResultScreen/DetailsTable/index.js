import React, {Fragment} from 'react';
import {getValidDateRange} from '../../utils';

import RadioGroup from '../../CommonCustomComponents/RadioGroup';

import {EditRow} from './EditRow';

import './style.css';


export default class DetailsTable extends React.Component {

    constructor(props) {
        super(props);

        this.validDateRange = getValidDateRange(this.props.data.shipDate)

        this.onChange = this.onChange.bind(this);
    }

    onChange = (formValue) => {
        this.props.onChange(formValue);
    }

    handleCarChange = (name, value) => {
        let formValue;
        if (name === 'vehicleYear') {
            formValue = { vehicleYear: value, vehicleMaker: '', vehicleModel: null };
        } else if (name === 'vehicleMaker') {
            formValue = { vehicleMaker: value, vehicleModel: null };
        } else {
            formValue = { vehicleModel: value };
        }

        this.props.onCarChange(formValue);
    }

    handlePlaceChange = (name, description, placeId) => {
        let formValue = {
            [name]: description,
            [name + "Id"]: placeId
        };

        if (formValue.placeFrom) {
            if (formValue.placeFromId === this.props.data.placeToId) {
                Object.assign(formValue, { placeToId: '', placeTo: '' });
            }
        } else if (formValue.placeTo) {
            if (formValue.placeToId === this.props.data.placeFromId) {
                Object.assign(formValue, { placeFromId: '', placeFrom: '' });
            }
        }

        this.props.onChange(formValue);
    }

    handleChange = (name, value) => {
        this.props.onChange({ [name]: value });
    }

    render() {
        const makerDisabled = !this.props.data.cars[0].vehicleYear;
        const modelDisabled = !this.props.data.cars[0].vehicleMaker || !this.props.data.cars[0].vehicleYear;

        const vehicleModel = this.props.data.cars[0].vehicleModel ? this.props.data.cars[0].vehicleModel.model : '';

        return (
            <div>
                <div className="block-title">Details</div>

                <div className="container-fluid table-details">
                    <div className="row">
                        <div className="table-row-name">Distance</div>
                        <div className="table-row-value">{this.props.data.distanceText}</div>
                    </div>
                    <hr className="details-hr"/>


                    <EditRow
                        value={this.props.data.shipDate}
                        displayText={this.props.data.shipDate.toLocaleDateString('en-US')}
                        onChange={date => this.handleChange('shipDate', date)}
                        columnType="datePickerColumn"
                        params={{
                            minDate: this.validDateRange.minDate
                        }}
                        renderColumns={columns => (
                            <Fragment>
                                <div className="table-row-name"><span>Ship date</span></div>
                                <div className="table-row-value">
                                    {columns.editValueColumn}
                                </div>
                                <div className="table-row-actions">
                                    {columns.editActionsColumn}
                                </div>
                            </Fragment>
                        )}>
                    </EditRow>
                    <hr className="details-hr" />


                    <EditRow
                        value={this.props.data.cars[0].vehicleYear}
                        displayText={this.props.data.cars[0].vehicleYear}
                        onChange={value => this.handleCarChange('vehicleYear', value)}
                        columnType="autocompleteColumn"
                        params={{
                            url: `/cars/years`,
                            type: 'number',
                            staticOptions: true
                        }}
                        renderColumns={columns => (
                            <Fragment>
                                <div className="table-row-name"><span>Vehicle year</span></div>
                                <div className="table-row-value">
                                    {columns.editValueColumn}
                                </div>
                                <div className="table-row-actions">
                                    {columns.editActionsColumn}
                                </div>
                            </Fragment>
                        )}>
                    </EditRow>
                    <hr className="details-hr" />

                    <EditRow
                        value={this.props.data.cars[0].vehicleModel}
                        displayText={this.props.data.cars[0].vehicleMaker}
                        onChange={value => this.handleCarChange('vehicleMaker', value)}
                        columnType="autocompleteColumn"
                        params={{
                            url: `cars/makers?year=${this.props.data.cars[0].vehicleYear}`
                        }}
                        disabled={makerDisabled}
                        renderColumns={columns => (
                            <Fragment>
                                <div className="table-row-name"><span>Vehicle maker</span></div>
                                <div className="table-row-value">
                                    {columns.editValueColumn}
                                </div>
                                <div className="table-row-actions">
                                    {columns.editActionsColumn}
                                </div>
                            </Fragment>
                        )}>
                    </EditRow>
                    <hr className="details-hr" />

                    <EditRow
                        value={this.props.data.cars[0].vehicleModel}
                        displayText={vehicleModel}
                        onChange={value => this.handleCarChange('vehicleModel', value)}
                        columnType="autocompleteColumn"
                        disabled={modelDisabled}
                        params={{
                            url: `/cars/models?year=${this.props.data.cars[0].vehicleYear}&maker=${this.props.data.cars[0].vehicleMaker}`,
                            textField: 'model'
                        }}
                        renderColumns={columns => (
                            <Fragment>
                                <div className="table-row-name"><span>Vehicle model</span></div>
                                <div className="table-row-value">
                                    {columns.editValueColumn}
                                </div>
                                <div className="table-row-actions">
                                    {columns.editActionsColumn}
                                </div>
                            </Fragment>
                        )}>
                    </EditRow>
                    <hr className="details-hr" />


                    <EditRow
                        value={this.props.data.placeFrom}
                        displayText={this.props.data.placeFrom}
                        onChange={({ value, description, placeId }) => this.handlePlaceChange('placeFrom', description, placeId)}
                        columnType="placeAutocompleteColumn"
                        renderColumns={columns => (
                            <Fragment>
                                <div className="table-row-name"><span>Ship from</span></div>
                                <div className="table-row-value">
                                    {columns.editValueColumn}
                                </div>
                                <div className="table-row-actions">
                                    {columns.editActionsColumn}
                                </div>
                            </Fragment>
                        )}>
                    </EditRow>
                    <hr className="details-hr" />

                    <EditRow
                        value={this.props.data.placeTo}
                        displayText={this.props.data.placeTo}
                        onChange={({ value, description, placeId }) => this.handlePlaceChange('placeTo', description, placeId)}
                        columnType="placeAutocompleteColumn"
                        renderColumns={columns => (
                            <Fragment>
                                <div className="table-row-name"><span>Ship to</span></div>
                                <div className="table-row-value">
                                    {columns.editValueColumn}
                                </div>
                                <div className="table-row-actions">
                                    {columns.editActionsColumn}
                                </div>
                            </Fragment>
                        )}>
                    </EditRow>
                    <hr className="details-hr" />

                    <div className="row">
                        <div className="table-row-name">
                            Vehicle condition
                        </div>
                        <div className="table-row-value">
                            <RadioGroup
                                firstRadioId="firstEditRowRunning"
                                secondRadioId="secondEditRowRunning"
                                name="running"
                                defaultValue={this.props.data.cars[0].running}
                                values={[
                                    {value: "yes", text: "Running"},
                                    {value: "no", text: "Not running"}
                                ]}
                                onChange={value => this.handleCarChange('running', value)}
                                radioFlexBasis="100px"
                            />
                        </div>
                    </div>
                    <hr className="details-hr" />

                    <div className="row">
                        <div className="table-row-name">
                            Transport type
                        </div>
                        <div className="table-row-value">
                            <RadioGroup
                                name="transportType"
                                firstRadioId="firstEditRowTransport"
                                secondRadioId="secondEditRowTransport"
                                defaultValue={this.props.data.transportType}
                                values={[
                                    { value: "open", text: "Open" },
                                    { value: "enclosed", text: "Enclosed" }
                                ]}
                                onChange={this.onChange}
                                radioFlexBasis="100px"
                            />
                        </div>
                    </div>
                    <hr className="details-hr" />

                    <div className="row">
                        <div className="table-row-name">
                            Service type
                        </div>
                        <div className="table-row-value">Door to door</div>
                    </div>
                    <hr className="details-hr" />

                    <div className="row">
                        <div className="table-row-name">
                            Insurance
                        </div>
                        <div className="table-row-value">Included</div>
                    </div>
                    <hr className="details-hr" />

                    <div className="row">
                        <div className="table-row-name">
                            Transit time
                        </div>
                        <div className="table-row-value">{this.props.data.durationText}</div>
                    </div>

                </div>
            </div >
        );
    }
}