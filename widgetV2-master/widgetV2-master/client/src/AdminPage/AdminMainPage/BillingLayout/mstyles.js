import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    mainWrap: {
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
        width: "100%"
    },
    container: {
        backgroundColor: "#ffffff",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "1px solid rgba(0,0,0,.125)",
        borderRadius: ".75rem",
        boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
        marginBottom: "20px",
        minHeight: "500px",
    },
    wrap: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    card: {
        border: "1px solid rgba(0,0,0,.125)",
        borderRadius: ".5rem",
        padding: "1rem",
        width: "200px",
        marginBottom: "1rem",
        margin: ".5rem",
    },
    price: {
        fontSize: "1.2rem",
        color: "#008ecc",
        marginBottom: "10px",
    },

    text: {
        color: "rgba(0, 0, 0, 0.54);",
        fontSize: ".7rem",
    },
    textForm: {
        color: "rgba(0, 0, 0, 0.54);",
        fontSize: ".8rem",
    },
    selectCard: {
        border: "1px solid #008ecc",
        borderRadius: ".5rem",
        boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
        width: "200px",
        padding: "1rem",
        transition: " all .5s easy-in-out",
    },
    wrapBtn: {
        textAlign: "center",
    },
    payBtn: {
        color: "#fff",
        border: "1px solid #008ecc",
        padding: "0.2rem 0.5rem",
        fontSize: ".8rem",
        borderRadius: "5px",
        backgroundColor: "#008ecc",
        marginTop: "1rem",
        "&.MuiButton-root.Mui-disabled": {
            color: "#fff",
        }
    },
    form: {
        marginTop: "1rem",
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
            width: "50%"
        },
        "& .MuiOutlinedInput-root.Mui-error": {
            "& fieldset": {
                borderColor: "#D7D7D7",
            }
        }
    },
    wrapSubmit: {
        width: "100%",
        padding: "0 12px",
    },
    wrapConfirmBtn: {
        width: "100%",
        textAlign: "center",
    },
    wrapSubscBtn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    wrapLoader: {
        marginLeft: "10px",
        marginTop: "3px"
    },
    loader: {
        "&.MuiCircularProgress-colorPrimary": {
            color: "#fff",
        }
    },
    subTitle: {
        color: "#008ecc",
        textAlign: "center",
        margin: "1rem 0",
    },
    details: {
        display: "flex",
        flexWrap: "wrap",
        "& p:first-child": {
            flexGrow: "1",
        }
    },
    detailsCard: {
        color: "rgba(0, 0, 0, 0.54);",
        display: "flex",
    },
    dot: {
        marginTop: "-5px",
        fontWeight: "bold",
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
    buttonLink: {
        outline: "none",
        borderColor: "transparent",
        backgroundColor: "transparent",
        color: "#008ecc",
    },
    mainLoader: {
        "&.MuiCircularProgress-colorPrimary": {
            color: "#008ecc",
        }
    },
    bottomSnackBar: {
        backgroundColor: "white",
        border: "2px solid #008ecc",
        padding: ".5rem 1rem",
        borderRadius: "0.5rem",
        color: "rgba(0, 0, 0, 0.54)",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 15%), 0 1px 3px 1px rgb(0 0 0 / 15%)",
    }
}));
