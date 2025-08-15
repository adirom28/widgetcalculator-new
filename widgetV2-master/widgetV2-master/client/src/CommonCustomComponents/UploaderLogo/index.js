import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {Snackbar} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: "130px",
        height: "110px",
        border: "1px solid #008ecc",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "transparent",
        outline: "none",
        border: "none",
        fontSize: "0.8rem",
        padding: "0.5rem",
        color: "rgba(0, 0, 0, 0.54)"
    },
    input: {
        display: "none"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: "100%",
    },
    snackBar: {
        backgroundColor: "white",
        border: "2px solid #008ecc",
        padding: ".5rem 1rem",
        borderRadius: "0.5rem",
        color: "rgba(0, 0, 0, 0.54)",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 15%), 0 1px 3px 1px rgb(0 0 0 / 15%)",
    }

}));

export const ImageUpload = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [error, setError] = useState('');
    const inputFile = useRef(null);
    const [open, setOpen] = useState(false);


    const onButtonClick = () => {
        inputFile.current.click();
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const isImageValid = (files) => {
        // Check if file only one.
        if (files.length > 1) {
            setError("Sorry, you can only upload one photo.");
            setOpen(true);

            return false;
        }
        // Check file size.
        if (files[0].size > 5242880) {
            setError('Make sure you upload images up to 5 MB in size');
            setOpen(true);

            return false;
        }
        return true;
    };


    const onFileUpload = (e) => {

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        if (!isImageValid(e.target.files)) {
            return;
        }

        const file = e.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
            dispatch({
                    type: "SET_USER_LOGO",
                    payload: {logo: reader.result}
                }
            );
        }
        reader.readAsDataURL(file);
    }

    return (
        <>
            <div className={classes.wrapper}>
                <input
                    className={classes.input}
                    type='file'
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={onFileUpload}
                    ref={inputFile}/>
                {!selectedFile && <button
                    className={classes.button}
                    onClick={onButtonClick}
                    type="button"
                >Upload company logo
                </button>}
                {selectedFile && <img alt="logo" className={classes.image} src={preview}/>}
            </div>
            <Snackbar
                className={classes.snackBar}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
                autoHideDuration={5000}
                open={open}
                onClose={handleCloseSnackBar}>
                <div>{error}</div>
            </Snackbar>
        </>
    )
}