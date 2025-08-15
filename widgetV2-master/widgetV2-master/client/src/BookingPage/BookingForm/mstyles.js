import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    fullWidth: {
        padding: "2rem",
        boxShadow: "0px 3px 10px -2px rgb(0 0 0 / 20%);",
        backgroundColor: "#f3f6f6",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "flex-start",
        position: "relative"
    },
    formWrapper: {
        maxWidth: "700px"
    },
    logo: {
        borderRadius: "100%",
        width: "130px",
        height: "110px",
        backgroundColor: "#fff",
        boxShadow: "0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%)",
    },
    imgLogo: {
        width: "100%",
        height: "100%",
    },
    titleLogo: {
        color: "#f29112",
        margin: "10px 0"
    },
    wrapBlockInput: {
        marginTop: "8px",
        marginBottom: "8px",
    },

    wrapPickUpForm: {
        width: "100%"
    },
    wrapDatePicker: {
        marginTop: "8px",
        marginBottom: "8px",
        display: "flex",
        justifyContent: "flex-end"
    },
    datePicker: {
        width: "50%",
        padding: "0 16px"
    },
    wrapTextArea: {
        paddingTop: "16px",
        paddingBottom: "8px"
    },
    textArea: {
        marginTop: "8px",
        borderColor: "#f29112",
        "& .MuiOutlinedInput-root": {
            color: "#f29112",
            fontSize: "15px",
            lineHeight: "1.5rem",
            borderColor: "#f29112",
            backgroundColor: "#fcf9ef",
            "&.Mui-focused fieldset": {
                borderColor: "#f29112"
            },
            '&:hover fieldset': {
                borderColor: "#f29112",
            },
        },
        "& .MuiOutlinedInput-multiline": {
            padding: "5px 10px",
        }
    },
    commentsField: {
        "& .MuiOutlinedInput-multiline": {
            padding: "10px",
        }
    },
    wrapButton: {
        margin: "0 auto",
        paddingTop: "8px",
        paddingBottom: "8px",
        width: "150px",
    },
    bookFormInput: {
        "& .MuiOutlinedInput-input": {
            padding: "13px 13px !important",
        },
        "&.MuiFormControl-root [class*='MuiInputLabel-outlined']": {
            transform: "translate(14px, 13px) scale(1)!important",
        },
        "&.MuiFormControl-root [class*='MuiInputLabel-outlined'][class*='MuiInputLabel-shrink']": {
            transform: "translate(14px, -6px) scale(0.75)!important",
        },
    },
    inputDisabled: {
        borderColor: "#D7D7D7",
        color: "#3A3A3A",
        borderRadius: "0.1rem",
        transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
        "& .MuiOutlinedInput-input": {
            padding: "13px 13px !important",
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "none"
            },
            '&:hover fieldset': {
                borderColor: "none",
            },
        },
    },
    wrapLoader: {
        marginLeft: "10px",
        paddingTop: "3px"
    },
    loader: {
        "&.MuiCircularProgress-colorPrimary": {
            color: "#fff",
        }
    },
    mainLoader: {
        "&.MuiCircularProgress-colorPrimary": {
            color: "#f29112",
        }
    },
}));
