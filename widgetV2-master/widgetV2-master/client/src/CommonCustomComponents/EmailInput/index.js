import React, { useState, useEffect } from 'react';

import { TextField } from '@material-ui/core';


export default function CustomEmailTextField(props) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { error, errorText, value: valueProp, onChange, onError, ...otherProps } = props;

    const [value, setValue] = useState(valueProp);

    const handleChange = (event) => {
        const val = event.target.value;

        setValue(val);
        onChange(val);

        if (val.trim() && !regExp.test(val)) {
            onError('Invalid email format');

            return;
        }
    }

    useEffect(() => {
        if (value !== valueProp) {
            setValue(valueProp);
            if (valueProp && valueProp.trim() && !regExp.test(valueProp)) {
                onError('Invalid email format');
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
        />
    )
}