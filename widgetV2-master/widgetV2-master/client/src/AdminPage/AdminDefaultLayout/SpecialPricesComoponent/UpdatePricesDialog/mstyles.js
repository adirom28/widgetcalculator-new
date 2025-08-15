import {makeStyles} from '@material-ui/core/styles';


export const useStyles = makeStyles(theme=> ({
    textFieldGroup: {
        marginBottom: theme.spacing(1),
        display: 'flex'
    },

    textFieldLabel: {
        padding: '18px 0',
        display: 'inline-flex',
        flex: '0 0 100px'
    },
    textField: {
        borderColor: "#D7D7D7",
        color: "#3A3A3A",
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#008ecc"
            },
            '&:hover fieldset': {
                borderColor: "#008ecc",
            },
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
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
    },
    editButton: {
        color: "#008ecc",
        outline: "none",
    }
}));
