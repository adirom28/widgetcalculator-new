import React from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import httpHelper from '../../httpHelper';


class CustomAutocomplete extends React.Component {
    _reqToken = null;
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            loading: false,
            open: false
        };

        this.inputRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.addComponentForFocus && this.props.name) {
            this.props.addComponentForFocus(this.props.name, this.inputRef.current);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.url !== this.props.url) {
            if (this._reqToken) {
                this._reqToken.cancel();
            }

            this.setState({
                options: [],
                loading: false,
                open: false
            });
        }
    }

    fetchOptions = () => {
        if (this._reqToken) {
            this._reqToken.cancel();
        }

        const req = httpHelper.get(this.props.url);

        req.response.then(options => {
            this._reqToken = null;
            this.setState({
                options,
                loading: false
            });
        }).catch(e => {
            this.setState({
                options: [],
                loading: false,
                open: false
            });
        });

        this._reqToken = req.cancelTokenSource;
    };

    onOpen = () => {
        if (this.props.staticOptions && this.state.options.length) {
            this.setState({ open: true });
            return;
        }

        this.setState(s => ({
            loading: true,
            open: true
        }));

        this.fetchOptions();
    };

    onClose = () => {
        if (this.props.staticOptions) {
            this.setState({ open: false });
            return;
        }

        if (this._reqToken) {
            this._reqToken.cancel();
        } else {
            this.setState({ open: false, options: [] });
        }
    }

    getOptionValue = (option) => {
        if (typeof option === "object" && this.props.textField) {
            return String(option[this.props.textField]);
        } else if (option) {
            return String(option);
        }

        return '';
    };

    handleChange = (event, value) => {
        this.props.onChange(value);
    }

    render() {

        return (
            <Autocomplete
                style={{ width: '100%' }}
                autoComplete={this.props.type === 'text'}
                autoSelect={this.props.type === 'text'}
                open={this.state.open}

                loading={this.state.loading}

                disabled={this.props.disabled}

                onOpen={this.onOpen}
                onClose={this.onClose}

                onChange={this.handleChange}

                value={this.props.value}
                defaultValue={this.props.defaultValue}
                getOptionLabel={this.getOptionValue}

                options={this.state.options}
                renderInput={params => (
                    <TextField
                        {...params}
                        label={this.props.label}
                        fullWidth
                        error={!this.props.disabled && this.props.error}
                        helperText={!this.props.disabled && this.props.error && this.props.errorText}
                        // inputRef={this.inputRef}
                        type={this.props.type || 'text'}
                        variant={this.props.variant || "outlined"}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        )
    }
}


CustomAutocomplete.propTypes = {
    url: PropTypes.string.isRequired
}

// export default withStyles(mstyles.theme)(CustomAutocomplete);
export default CustomAutocomplete;