import {TextField} from "@material-ui/core";
import React from "react";
import {useField, useFormikContext} from "formik";
import MaskedInput from "react-text-mask";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


const defaultMaskOptions = {
    prefix: '$ ',
    suffix: '00',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 5, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
}

export function CustomInputMask(props) {
    const {inputRef, ...other} = props;

    const currencyMask = createNumberMask({
        ...defaultMaskOptions
    })

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={currencyMask}

        />
    )
}

const CurrencyTextField = ({
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
            placeholder="$0.00"
            InputProps={{
                inputComponent: CustomInputMask,
            }}
        />
    );
};

export default CurrencyTextField;
