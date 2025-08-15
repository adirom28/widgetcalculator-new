import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        maxWidth: "600px"
    },

    blockContactInfo: {
        width: "50%"
    },
    blockDriverInfo: {
        width: "50%"
    },
    wrapDatePicker: {
        marginTop: "8px",
        marginBottom: "8px",
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
        "& .MuiOutlinedInput-multiline": {
            padding: "0!important",
        },
        "& .MuiFormHelperText-root.Mui-error": {
            border: " 1px solid #008ecc",
            color: "black",
            padding: "0.2rem 0.5rem",
            textAlign: "center",
            position: "absolute",
            top: "20px",
            left: "44%",
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
        }
    },

    autocompleteField: {
        "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
            padding: "4px!important",
        },
        "& .MuiFormControl-root [class*='MuiInputLabel-outlined']": {
            transform: "translate(20px, 16px) scale(1)",
            fontSize: "13px"
        },
        "& .MuiFormLabel-root.Mui-error": {
            color: "#008ecc",
        },
    },
    wrapRadio: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: "5px"
    },
    labelRadio: {
        fontSize: "13px",
        paddingRight: "5px",
        paddingLeft: "15px",
        color: "#008ecc",
        flexGrow: "1",
        whiteSpace: "nowrap",
        paddingBottom: "5px"
    },
    radioBtn: {
        flexDirection: "row",
        flexWrap: "nowrap",

        "& .MuiRadio-colorSecondary.Mui-checked": {
            color: "#008ecc",
        },

        "& .MuiSvgIcon-root": {
            width: ".8rem",
            height: ".8rem",
        }

    },
    datePicker: {
        width: "100%",
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#008ecc"
            },
            '&:hover fieldset': {
                borderColor: "#008ecc",
            },
        },
    },
    wrapLoader: {
        marginLeft: "10px",
        paddingTop: "3px",
        marginTop: "2px"
    },
    loader: {
        "&.MuiCircularProgress-colorPrimary": {
            color: "#fff",
        }
    },
    wrapButton: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        color: "#FFFFFF",
        backgroundColor: "#008ecc",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,.15),0 1px 3px 1px rgba(0,0,0,.15)",
        borderRadius: "50px",
        border: "1px solid #008ecc",
        outline: "none",
        fontSize: ".8rem",
        fontWeight: "600",
        padding: "0 .3rem .1rem .3rem",
        width: "100px",
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "10px",
        height: "32px",
        "&:hover": {
            color: "#FFFFFF",
            backgroundColor: "#008ecc",
            borderColor: "#008ecc",
            boxShadow: "0 1px 2px 0 rgba(0,0,0,.15),0 1px 3px 1px rgba(0,0,0,.15)",
        },
        "&.Mui-disabled": {
            color: "#fff",
            opacity: ".6"
        },
    },
}));
