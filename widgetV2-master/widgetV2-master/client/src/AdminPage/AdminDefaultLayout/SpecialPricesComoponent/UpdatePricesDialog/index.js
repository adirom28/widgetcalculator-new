import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import TextField from '@material-ui/core/TextField';
import {useStyles} from './mstyles';


export default function UpdatePricesConfirmationDialog(props) {
    const {onClose, getRows, open, ...other} = props;
    const [rows, setRows] = React.useState(getRows());

    const classes = useStyles();

    React.useEffect(() => {
        if (!open) {
            setRows(getRows());
        }
    }, [open, getRows]);

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(rows);
    };

    const handleChange = (event) => {
        const id = event.target.id;
        const price = event.target.value;
        console.log(id, rows)

        const index = rows.findIndex(r => r.id === id);
        let row = rows[index];
        rows[index] = {...row, specialPricePerMi: price};

        setRows([...rows]);
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
            <DialogTitle id="confirmation-dialog-title">Edit Price(s)</DialogTitle>
            <DialogContent dividers>
                {rows.map((row, index) => {
                    const id = "" + row.id;
                    return (
                        <div className={classes.textFieldGroup} key={id}>
                            <div className={classes.textFieldLabel}><span>{row.model}</span></div>
                            <TextField
                                className={classes.textField}
                                id={id}
                                name={id}
                                label="Price"
                                type="number"
                                value={row.specialPricePerMi}
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </div>
                    )
                })}

            </DialogContent>
            <DialogActions>
                <Button
                    className={classes.editButton}
                    onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button
                    className={classes.editButton}
                    onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog >
    );
}

UpdatePricesConfirmationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    getRows: PropTypes.func.isRequired,
};
