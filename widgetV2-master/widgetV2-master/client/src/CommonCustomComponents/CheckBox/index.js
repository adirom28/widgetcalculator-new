import React from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel,} from "@material-ui/core";
import {useField, useFormikContext} from "formik";


const CheckBoxWrapper = ({
                             name,
                             label,
                             legend,
                             ...otherProps
                         }) => {

    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = e => {
        const {checked} = e.target;
        setFieldValue(name, checked);
    }
    const config = {
        ...field,
        onChange: handleChange
    }

    const configFormControl = {};

    if (meta && meta.touched && meta.error) {
        configFormControl.error = true;
    }

    return (
        <FormControl {...configFormControl}>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox  {...config}/>}
                    label={label}
                    checked={field.value}
                />
            </FormGroup>
        </FormControl>
    )
}

export default CheckBoxWrapper;