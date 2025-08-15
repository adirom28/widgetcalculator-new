import {Autocomplete} from "@material-ui/lab";
import TextField from "../TextField";
import React, {useState} from "react";
import {useField, useFormikContext} from "formik";
import * as properties from "../../properties";
import Axios from "axios";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({

    autocompleteField: {
        "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
            padding: "4px!important",
        },
        "& .MuiFormControl-root [class*='MuiInputLabel-outlined']": {
            transform: "translate(20px, 16px) scale(1)",
        },
        "& .MuiFormHelperText-root.Mui-error": {
            color: "#008ecc",
        }
    },
    input: {
        borderColor: "#D7D7D7",
        color: "#3A3A3A",
        borderRadius: "0.1rem",
        padding: ".5rem .75rem",
        transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",

        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#008ecc"
            },
            '&:hover fieldset': {
                borderColor: "#008ecc",
            },
        },
        "& .MuiOutlinedInput-input": {
            padding: "10px",
            color: "#424040",
            fontSize: "12px",
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: "translate(27px, 1px) scale(0.75)!important",
            "&.Mui-focused fieldset": {
                color: "#008ecc"
            },
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink.Mui-focused': {
            color: "#3A3A3A",
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink.Mui-error': {
            color: "#008ecc",
        },
        "& .MuiFormHelperText-root.Mui-error": {
            border: " 1px solid #008ecc",
            color: "black",
            padding: "0.2rem 0.5rem",
            textAlign: "center",
            position: "absolute",
            left: "40%",
            bottom: "-63%",
            transform: "translateX(-50%)",
            marginTop: "1rem",
            zIndex: "2",
            borderRadius: "5px",
            backgroundColor: "white",
            boxShadow: "0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%)",
            width: "80%"
        },
        "& .MuiOutlinedInput-root.Mui-error": {
            "& fieldset": {
                borderColor: "#D7D7D7",
            }
        },
        "& .MuiFormLabel-root.Mui-error ": {
            color: "#008ecc",
        },
    },
});

export const CustomAutocompleteFormik = ({
                                             name,
                                             ...otherProps
                                         }) => {
    const classes = useStyles();

    const {defaultValue} = otherProps;

    const [data, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));

    const [field, meta] = useField(name);
    const {setFieldValue} = useFormikContext();

    const {value} = meta;

    const handleChange = (e, value) => {
        setFieldValue(name, value);
    }

    const config = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: "outlined",
    }

    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
    }

    const getStates = (value) => {
        const configHeaders = {
            headers: {Authorization: `Bearer ${token}`}
        };

        let allStatesUrl = `${properties.apiUrl}/places/states`;
        if (value !== "all") allStatesUrl = `${properties.apiUrl}/places/states?part=${value}`;

        Axios.get(allStatesUrl, configHeaders)
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => console.log(e));
    }

    const handleOpen = (value) => {
        getStates(value);
    };

    return (
        <Autocomplete
            onOpen={() => {
                handleOpen("all")
            }}
            name={name}
            options={data}
            defaultValue={defaultValue}
            className={classes.autocompleteField}
            getOptionLabel={option => option}
            onChange={(e, value) => {
                handleChange(e, value)
            }}
            renderInput={params => (
                <TextField
                    {...config}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={value}
                    className={classes.input}
                    onChange={(e) => {
                        handleOpen(e.target.value);
                    }}
                    {...params}
                />
            )}
        />
    )
}
