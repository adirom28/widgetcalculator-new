import {makeStyles} from '@material-ui/core';

export const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        width: '100%',
        border: "1px solid #eaeaea",
        padding: "20px",
        borderRadius: ".75rem",
        boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
        marginBottom: theme.spacing(2),
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        width: "100%",
    },

    list: {
        width: 250,
    },
    appBarContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logoutIcon: {
        marginRight: '30px'
    },

    textField: {
        margin: theme.spacing(1),
        width: '200px',
        borderColor: "#D7D7D7",
        color: "#3A3A3A",
        borderRadius: "0.1rem",
        padding: ".5rem .75rem",
        fontSize: ".8rem",
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

    textFieldGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(2),
    },

    buttonContainer: {
        marginLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
}));
