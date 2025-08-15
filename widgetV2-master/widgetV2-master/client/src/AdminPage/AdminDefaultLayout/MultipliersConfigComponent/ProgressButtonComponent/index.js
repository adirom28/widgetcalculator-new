import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'relative',
        width: '200px'
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: "#fff",
        position: 'absolute',
        top: '50%',
        right: '5%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function ProgressButton(props) {
    const classes = useStyles();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: props.success,
    });

    return (
        <div className={classes.wrapper}>
            <Button
                fullWidth
                type="submit"
                variant="contained"
                style={{backgroundColor: "#008ecc", color: "#fff", borderRadius: "50px"}}
                className={buttonClassname}
                disabled={props.disabled || props.loading}
                onClick={props.onClick}
            >
                {props.text}
            </Button>
            {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}