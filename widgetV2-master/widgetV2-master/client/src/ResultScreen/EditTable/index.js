import React, {Fragment} from 'react';
import {getValidDateRange} from '../../utils';

import RadioGroup from '../../CommonCustomComponents/RadioGroup';

import {EditRow} from '../DetailsTable/EditRow';

import '../DetailsTable/style.css';
import '../AddNewCarTable/style.css';


export default class EditNewCarTable extends React.Component {

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
            this.setState({helperText: 'Please choose vehicle maker'});
        } else if (name === 'vehicleMaker') {
            formValue = {vehicleMaker: value, vehicleModel: null};
            this.setState({helperText: 'Please choose vehicle model'});
        } else {
            this.setState({helperText: ''});

            this.props.handleValidField && this.props.handleValidField(false);

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
                {
                    this.state.helperText && <div className="helper-text">{this.state.helperText}</div>
                }
                <div className="details-block order-1 order-lg-2">

                    <div className="container-fluid table-details">

                        <EditRow
                            value={this.props.data.vehicleYear}
                            displayText={this.props.data.vehicleYear}
                            onChange={value => this.handleCarChange('vehicleYear', value)}
                            columnType="autocompleteColumn"
                            params={{
                                url: `/cars/years`,
                                type: 'number',
                                staticOptions: true
                            }}
                            InputProps={{disableUnderline: true}}
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
                        <hr className="details-hr"/>

                        <EditRow
                            value={this.props.data.vehicleMaker}
                            displayText={this.props.data.vehicleMaker}
                            onChange={value => this.handleCarChange('vehicleMaker', value)}
                            columnType="autocompleteColumn"
                            params={{
                                url: `cars/makers?year=${this.props.data.vehicleYear}`
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
                        <hr className="details-hr"/>

                        <EditRow
                            value={this.props.data.vehicleModel}
                            displayText={vehicleModel}
                            onChange={value => this.handleCarChange('vehicleModel', value)}
                            columnType="autocompleteColumn"
                            disabled={modelDisabled}
                            params={{
                                url: `/cars/models?year=${this.props.data.vehicleYear}&maker=${this.props.data.vehicleMaker}`,
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
                        <hr className="details-hr"/>

                        <div className="row">
                            <div className="table-row-name">
                                Vehicle condition
                            </div>
                            <div className="table-row-value">
                                <RadioGroup
                                    firstRadioId="firstEditTableForm"
                                    secondRadioId="secondEditTableForm"
                                    name={this.state.nameRadio}
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
