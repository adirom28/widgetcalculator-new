import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#ffffff",
        flexDirection: "column",
        transition: "height 1sec easy-in-out",
    },
    mainTitle: {
        marginBottom: "20px",
        marginLeft: "10px",
    },
    wrapForm: {
        maxWidth: "500px",
        transition: "height 0.5sec easy-in",
    },
    input: {
        borderColor: "#D7D7D7",
        color: "#3A3A3A",
        borderRadius: "0.1rem",
        padding: ".5rem .75rem",
        fontSize: ".8rem",
        transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",

        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#008ecc"
            },
            '&:hover fieldset': {
                borderColor: "#008ecc",
            },
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: "translate(27px, 3px) scale(0.75)!important",
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
            padding: "0.5rem 1rem",
            textAlign: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "1.5rem",
            zIndex: "2",
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%)",
            width: "70%"
        },
        "& .MuiOutlinedInput-root.Mui-error": {
            "& fieldset": {
                borderColor: "#D7D7D7",
            }
        }
    },
    wrapButton: {
        display: "flex",
        justifyContent: "flex-end"
    },
    containerUpload: {
        display: "flex",
        justifyContent: "flex-start",
        marginTop: "20px",
        padding: "0 .75rem"
    },
    upload: {
        flexGrow: "1",
    },
    wrapSubmit: {
        paddingTop: "12px",
    },
    button: {
        color: "#FFFFFF",
        backgroundColor: "#008ecc",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,.15),0 1px 3px 1px rgba(0,0,0,.15)",
        borderRadius: "50px",
        lineHeight: "1.5",
        fontWeight: "700",
        letterSpacing: ".05rem",
        marginTop: "30px",
        padding: ".3rem 2rem",
        height: "35px",
        transition: "width 2s ease-in-out",

        "&:hover": {
            backgroundColor: "#008ecc",
            borderColor: "#008ecc",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,.15),0 4px 6px 2px rgba(0,0,0,.15)",
        },
        "&.Mui-disabled": {
            color: "#fff",
            opacity: ".6"
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
    wrapTextArea: {
        marginTop: "8px",
        paddingTop: "8px",
        paddingBottom: "8px"
    },
}))
