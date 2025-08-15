import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({

    container: {
        position: "relative",
    },

    item: {
        listStyleType: "none",
        height: "120px",
        borderBottom: "1px solid #f3f3f3",
        color: "##3a3a3a",
        fontSize: "13px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    borderItem: {
        display: "none",
    },
    borderItemActive: {
        height: "100px",
        width: "6px",
        backgroundColor: "#008ecc",
        borderRadius: "6px",
        position: "absolute",
        top: "9px",
        left: "0",
    },
    itemText: {
        marginTop: "5px",
        textAlign: "center"
    },
    itemActiveText: {
        color: "#008ecc",
        marginTop: "5px",
        textAlign: "center"
    },
    icon: {
        "& path": {
            fill: "#3a3a3a"
        }
    },
    iconActive: {
        "& path": {
            fill: "#008ecc"
        }
    },
    loader: {
        "&.MuiCircularProgress-colorPrimary": {
            color: "#008ecc",
        }
    },
}));
