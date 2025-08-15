import React from "react";
import {TextField} from "@material-ui/core";
import {useField} from "formik";

const DateTimePicker = ({
     name,
    ...otherProps
    }) => {
  const [field, meta] = useField(name);

    const config = {
        ...field,
        ...otherProps,
        type: "date",
        variant: "outlined",
        fullWidth: true,
        InputLabelProps: {
            shrink: true
        }
    };

    return (
        <TextField {...config}/>
    )
}
export default DateTimePicker;