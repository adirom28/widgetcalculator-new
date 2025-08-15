import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    blockOrderInfo: {
        paddingRight: "5px",
        marginTop: "5px",
    },
    boldText: {
        fontSize: ".7rem",
        fontWeight: "500"
    },

    orderDetailPrice: {
        color: "#008ecc",
        fontSize: ".8rem",
        marginBottom: "5px",
    },
    wrapPriceBlock: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
    },
    wrapId: {
        border: "1px solid rgba(0,0,0,.125)",
        borderRadius: "4px",
        padding: "0 5px",
        marginBottom: "5px",
        marginRight: "8px",
    },
    blockDetail: {
        color: "#6c757d",
        fontSize: ".7rem",
        marginBottom: "5px"
    },
    orderDetail: {
        color: "#6c757d",
        fontSize: ".7rem",
        marginBottom: "0",
    },
    orderDetailTitle: {
        color: "#3a3a3a",
        fontSize: "11px",
        width: "15%",
        flexWrap: "nowrap",
        marginBottom: "5px",
    },
    btn: {
        lineHeight: "1.3",
        fontSize: ".8rem",
        padding: ".2rem .5rem",
        backgroundColor: "#fff",
        color: "#6c757d",
        borderRadius: "5px",
        border: " 1px solid #008ecc",
        outline: "none",
        transition: "all 0.5sec easy in",
        height: "32px",
        margin: "0 1rem",

        "&:hover": {
            backgroundColor: "#008ecc",
            color: "#fff",
        }
    },

    NoteBtn: {
        padding: ".2rem .5rem",
        backgroundColor: "#008ecc",
        color: "#fff",
        fontSize: ".8rem",
        borderRadius: "5px",
        border: " 1px solid #008ecc",
        height: "32px",
        "&:hover": {
            backgroundColor: "#fff",
            color: "#008ecc"
        },
    },
    snackBar: {
        backgroundColor: "#008ecc",
        border: "2px solid #008ecc",
        padding: "1.5rem 1rem",
        borderRadius: "0.5rem",
        color: "white",
        opacity: ".9",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 15%), 0 1px 3px 1px rgb(0 0 0 / 15%)",
    },
    select: {
        width: "100%!important",
        "& .MuiFormControl-fullWidth": {
            width: "100%!important",
        },
        "& .MuiOutlinedInput-input": {
            padding: "10px",
        },
        "& .MuiSelect-select.MuiSelect-select ": {
            width: "100%",
            minWidth: "50px",
            border: "1px solid #008ecc",
            padding: "0.3rem 1.2rem 0.5rem 0.5rem",
            borderRadius: "5px",
        },
        "& .MuiFormControl-root [class*='MuiInputLabel-outlined']": {
            transform: "translate(14px, 11px) scale(1)",
        },
        '& .MuiFormControl-root [class*="MuiInputLabel-outlined"][class*="MuiInputLabel-shrink"] ': {
            transform: "translate(14px, -6px) scale(0.75)"
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#008ecc",
                color: "#008ecc",
            },
            '&:hover fieldset': {
                borderColor: "#008ecc",
            },
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink.Mui-focused': {
            color: "#008ecc",
        },
        "&.MuiInput-underline:before": {
            borderBottom: "none!important",
        },
        "&.MuiInput-underline:after": {
            borderBottom: "none!important",
        },
    },
    wrapSelect: {
        "&.MuiInputLabel-formControl ": {
            transform: "translate(0, 26px) scale(1)!important"
        },
    },
    labelSelect: {
        color: "rgba(0, 0, 0, 0.54);",
        fontSize: "14px",
        paddingRight: "20px",
        "&.MuiInputLabel-formControl ": {
            marginLeft: "5px",
        },
        "&.MuiFormLabel-root.Mui-focused ": {
            color: "#008ecc",
        }
    },
}));
