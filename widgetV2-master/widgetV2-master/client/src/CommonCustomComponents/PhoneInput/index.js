import React, { useState, useEffect } from 'react';

import { TextField } from '@material-ui/core';

// import InputMask from 'react-input-mask';
import MaskedInput from 'react-text-mask';

export function CustomInputMask(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            showMask
        />
        // <InputMask
        //     {...other}
        //     ref={ref => {
        //         inputRef(ref ? ref.inputElement : null);
        //     }}
        //     mask="(999) 999-9999"
        // />
    )
}

export default function CustomPhoneTextField(props) {
    const regExp = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;

    const { value: valueProp, error, errorText, onChange, onError, ...otherProps } = props;

    const [value, setValue] = useState(valueProp);


    const handleChange = (event) => {
        const val = event.target.value;

        setValue(val);
        onChange(val);

        if (val.trim() && !regExp.test(val)) {
            onError('Invalid phone format');
        }
    }

    useEffect(() => {
        if (value !== valueProp) {
            setValue(valueProp);
            if (valueProp && valueProp.trim() && !regExp.test(valueProp)) {
                onError('Invalid phone format');
            }
        }
    }, [valueProp])

    return (
        <TextField
            {...otherProps}
            value={value}
            onChange={handleChange}
            helperText={errorText}
            error={error}
            InputProps={{
                inputComponent: CustomInputMask,
            }}
        />
    )
}