import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "./Radio";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: 15,
        height: 15,
        paddingTop: 0,
        paddingBottom: 0,
    },
    label: {
        fontSize: "12px"
    }

});


const FormikRadioGroup = ({
                              field,
                              form: {touched, errors},
                              name,
                              options,
                              onChange,
                              ...props
                          }) => {

    const classes = useStyles();
    const fieldName = name || field.name;

    return (
        <>
            <RadioGroup className={classes.label} {...field} {...props} name={fieldName}>
                {options.map(option => (
                    <Radio
                        className={classes.root}
                        key={option.id}
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={field.onChange}
                        label={option.label}
                        id={fieldName}
                    />
                ))}
            </RadioGroup>

            {touched[fieldName] && errors[fieldName] && (
                <>{errors[fieldName]}</>
            )}
        </>
    );
};

export default FormikRadioGroup;
