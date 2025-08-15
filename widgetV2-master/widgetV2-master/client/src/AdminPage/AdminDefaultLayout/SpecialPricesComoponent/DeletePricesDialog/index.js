import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';


export default function DeletePricesConfirmationDialog(props) {
    const { onClose, open, ...other } = props;

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose('OK');
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">Delete Price(s)</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you realy want to delete selected price(s)?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} style={{color: "#008ecc", outline: "none"}}>
                    Cancel
                </Button>
                <Button onClick={handleOk} style={{color: "#008ecc", outline: "none"}}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DeletePricesConfirmationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
