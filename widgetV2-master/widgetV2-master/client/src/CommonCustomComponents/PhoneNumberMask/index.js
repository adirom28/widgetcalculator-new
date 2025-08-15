import {TextField} from "@material-ui/core";
import React from "react";
import {useField, useFormikContext} from "formik";
import MaskedInput from "react-text-mask";


export function CustomInputMask(props) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            showMask
        />
    )
}

const FormikTextField = ({
                             name,
                             ...otherProps
                         }) => {

    const [field, meta] = useField(name);
    const {setFieldValue} = useFormikContext();


    const {value} = meta;

    const handleChange = (e) => {
        const {value} = e.target;
        setFieldValue(name, value);
    }

    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: "outlined",
    }
    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }


    return (
        <TextField
            {...configTextField}
            value={value}
            onChange={handleChange}
            InputProps={{
                inputComponent: CustomInputMask,
            }}
        />
    );
};

export default FormikTextField;
