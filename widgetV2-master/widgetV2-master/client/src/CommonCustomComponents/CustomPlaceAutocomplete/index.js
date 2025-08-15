import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import throttle from 'lodash/throttle';

const autocompleteService = { current: null };


export default function CustomPlaceAutocomplete(props) {
    // const classes = useStyles();
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const { id, style, name, variant, error, errorText, value, defaultValue, onChange, label, ...other } = props;

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const fetch = React.useMemo(
        () =>
            throttle((input, callback) => {
                autocompleteService.current.getPlacePredictions(input, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions([]);
            return undefined;
        }

        fetch({
            input: inputValue,
            types: ['(regions)'],
            componentRestrictions: { country: 'us' }
        }, results => {
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, fetch]);


    const getOptionLabel = option => typeof option === 'string' ? option : option.description.replace(', USA', '');
    const getOptionDisabled = option => {
        if (option.types.includes('administrative_area_level_1')) {
            return true;
        }

        if (option.types.includes('country')) {
            return true;
        }

        if (option.terms.find(t => t.value === 'AK')) {
            return true;
        }

        return false;
    }

    const handleAutocompleteChnage = (event, value) => {
        if (typeof value === 'string' || value == null) {
            onChange(value);
        } else {
            onChange(value, value.description.replace(', USA', ''), value.place_id);
        }
    }

    return (
        <Autocomplete
            style={{ width: '100%' }}
            value={value}
            defaultValue={defaultValue}
            onChange={handleAutocompleteChnage}
            getOptionLabel={getOptionLabel}
            options={options}
            getOptionDisabled={getOptionDisabled}
            autoComplete
            // includeInputInList
            // freeSolo
            disableopenonfocus="true"
            renderInput={params => (
                <TextField
                    {...params}
                    id={id}
                    name={name}
                    label={label}
                    placeholder="ZIP or CITY"
                    error={error}
                    helperText={error && errorText}
                    variant={variant || "outlined"}
                    fullWidth
                    onChange={handleInputChange}
                />
            )}
        />
    );
}