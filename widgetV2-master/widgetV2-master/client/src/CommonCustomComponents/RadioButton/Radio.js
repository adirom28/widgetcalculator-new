import React from "react";
import classNames from "classnames";

import MUIRadio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export const Radio = ({
                          checked, color, disabled, id, inputRef, label, onChange, value, className
                      }) => (
    <FormControlLabel
        control={
            <MUIRadio
                checked={checked}
                color={color}
                disabled={disabled}
                id={id}
                inputRef={inputRef}
                value={value}
                onChange={onChange}
                className={classNames({[className]: className})}
            />
        }
        label={label}
        labelPlacement="end"
    />
);

export default Radio;
