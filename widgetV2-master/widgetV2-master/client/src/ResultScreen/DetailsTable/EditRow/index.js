import React, { Fragment } from 'react';

import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { KeyboardDatePicker } from "@material-ui/pickers";

import CustomAutocomplete from '../../../CommonCustomComponents/CustomAutocomplete';
import CustomPlaceAutocomplete from '../../../CommonCustomComponents/CustomPlaceAutocomplete';

export class EditRow extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isEditMode: false,
            value: this.props.value || '',
            error: ''
        };

        this._event = null;
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({ value: this.props.value, isEditMode: false });
        }

        if (this.props.disabled !== prevProps.disabled) {
            this.setState({ value: this.props.value, isEditMode: false });
        }
    }

    handleChange = (controlValue, event = null) => {

        this.setState({ value: controlValue, error: '' });
        this._event = event;

    }

    handleError = error => {
        if (error !== this.state.error) {
            this.setState({ error });
        }
    }

    handleEditModeEnable = () => {
        this.setState({ isEditMode: true });
    }

    validate() {
        if (this.state.error) {
            return;
        }

        if (typeof this.state.value === 'string') {
            if (!this.state.value.trim()) {
                this.setState({ error: 'Select or enter value' });
                return;
            }
        } else {
            if (this.state.value == null) {
                this.setState({ error: 'Select or enter value' });
                return;
            }
        }

        return true;
    }

    handleDisplayModeEnable = (isChecked) => {
        if (isChecked) {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            if (this.state.value !== this.props.value) {
                this.props.onChange(this._event || this.state.value);
            }

            this.setState({ isEditMode: false });
            return;
        }

        const initialValue = this.props.value || '';
        this.setState({ value: initialValue, error: '', isEditMode: false });
    }

    render() {
        // console.log('render');
        let editValueColumnControl;

        if (this.props.columnType === 'datePickerColumn') {
            editValueColumnControl = (
                <CustomDatepickerControl
                    value={this.state.value}
                    onChange={this.handleChange}
                    onError={this.handleError}
                    params={this.props.params}
                    error={this.state.error}
                />
            );
        } else if (this.props.columnType === 'autocompleteColumn') {
            editValueColumnControl = (
                <CustomAutocompleteControl
                    value={this.state.value}
                    params={this.props.params}
                    onChange={this.handleChange}
                    error={this.state.error}
                />
            );
        } else if (this.props.columnType === 'placeAutocompleteColumn') {
            editValueColumnControl = (
                <CustomPlaceAutocompleteControl
                    value={this.state.value}
                    onChange={this.handleChange}
                    error={this.state.error}
                />
            );
        } else {
            editValueColumnControl = (
                <TextField
                    value={this.state.value}
                    onChange={event => this.handleChange(event.target.value)}
                    error={Boolean(this.state.error)}
                />
            );
        }

        const editValueColumn = (
            <EditValueColumn
                isEditMode={this.state.isEditMode}
                displayText={this.props.displayText}>

                {editValueColumnControl}
            </EditValueColumn>
        );

        const editActionsColumn = (
            <EditActionsColumn
                onDisplayModeEnable={this.handleDisplayModeEnable}
                onEditModeEnable={this.handleEditModeEnable}
                isEditMode={this.state.isEditMode}
            />
        )

        return (
            <div className="row">
                {this.props.renderColumns({
                    editValueColumn,
                    editActionsColumn
                })}
            </div>
        )
    }
}

export class EditActionsColumn extends React.PureComponent {

    onEditClick = () => {
        this.props.onEditModeEnable();
    }

    onCloseClick = () => {
        this.props.onDisplayModeEnable(false);
    }

    onCheckClick = () => {
        this.props.onDisplayModeEnable(true);
    }

    render() {
        return this.props.isEditMode ?
            <Fragment>
                <IconButton aria-label="check" onClick={this.onCheckClick}>
                    <CheckIcon />
                </IconButton>
                <IconButton aria-label="close" onClick={this.onCloseClick}>
                    <CloseIcon />
                </IconButton>
            </Fragment> :
            <IconButton disabled={this.props.disabled} aria-label="edit" onClick={this.onEditClick}>
                <EditIcon />
            </IconButton>
    }
}

export class EditValueColumn extends React.PureComponent {

    render() {
        return this.props.isEditMode ?
            this.props.children :
            <span>{this.props.displayText}</span>
    }
}

export function CustomAutocompleteControl(props) {
    const { value, onChange, error, params } = props;

    const handleChange = (value) => { onChange(value) };

    return (
        <CustomAutocomplete
            fullWidth
            variant="standard"
            url={params.url}
            textField={params.textField}
            type={params.type}
            staticOptions={params.staticOptions}
            value={value}
            onChange={handleChange}
            error={Boolean(error)}
        />
    )
}

export function CustomDatepickerControl(props) {
    const { value, onChange, onError, error, params } = props;

    const minDate = params && params.minDate;

    const handleChange = (date) => { onChange(date) };

    return (
        <KeyboardDatePicker
            fullWidth
            inputVariant="standard"
            format="MM/dd/yyyy"
            minDate={minDate}
            value={value}
            onChange={handleChange}
            error={Boolean(error)}
            onError={onError}
        />
    )
}

export function CustomPlaceAutocompleteControl(props) {
    const { value, onChange, error } = props;

    const handleChange = (value, description, placeId) => {
        onChange(description, { value, description, placeId });
    }

    return (
        <CustomPlaceAutocomplete
            fullWidth
            variant="standard"
            value={value}
            onChange={handleChange}
            error={Boolean(error)}
        />
    )
}
