import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        flexDirection: "column",
        width: "100%",
    },
    wrapHeader: {
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid rgba(0,0,0,.125)",
        padding: "2rem 0",
        color: "#3a3a3a",
        marginBottom: "1rem"
    },
    title: {
        color: "#3a3a3a",
        flexGrow: "1"
    },
    emptyList: {
        padding: "1.75rem",
        boxShadow: "0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%)",
        borderRadius: "0.75rem",
        backgroundColor: "#fff",
        border: "1px solid rgba(0,0,0,.125)",
        marginBottom: "15px",
        textAlign: "center",
    },
    wrapEmptyList: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingTop: "20px",
    },
    wrapImg: {
        width: "80px",
        height: "80px",
        marginBottom: "10px",
    },
    wrapBtn: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px"
    },
    btn: {
        lineHeight: "1.3",
        fontSize: "1rem",
        padding: ".3rem 2rem",
        backgroundColor: "#008ecc",
        color: "#fff",
        borderRadius: "50px",
        border: " 1px solid #008ecc",
        outline: "none",
        "&:hover": {
            color: "#008ecc",
            backgroundColor: "#ffffff",
            borderColor: "#008ecc",
            boxShadow: "4px 3px 8px 0px rgba(117, 139, 156, 0.2)",
        },
        "&[disabled]": {
            opacity: "0.6",
            pointerEvents: "none"
        }
    },
    wrapLoader: {
        margin: "0 auto",
        paddingTop: "30px"
    },
    loader: {
        "&.MuiCircularProgress-colorPrimary": {
            color: "#008ecc",
        }
    },
    tabs: {
        backgroundColor: "#fff",
        "& .MuiTabs-flexContainer": {
            display: "flex",
            justifyContent: "space-between!important",
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
}));
