import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import {lighten, makeStyles} from '@material-ui/core/styles';

import UpdatePricesConfirmationDialog from '../UpdatePricesDialog';
import DeletePricesConfirmationDialog from '../DeletePricesDialog';
import Axios from "axios";
import * as properties from "../../../../properties";

const token = JSON.parse(localStorage.getItem("token"));

const config = {
    headers: {Authorization: `Bearer ${token}`}
};

const deletePrices = (ids) => {
    return Axios.post(`${properties.apiUrl}/specialPrice/delete`, ids, config)
};

const updatePrices = (models) => {
    return Axios.post(`${properties.apiUrl}/specialPrice/update`, models, config)
};


const useStyles = makeStyles(theme => ({
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

export default function PricesTableToolbar(props) {
    const classes = useStyles();
    const { selected, rows, numSelected, onEdit, onDelete } = props;

    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const handleDeleteClick = () => {
        setOpenDeleteDialog(true);
    };

    const handleEditClick = () => {
        setOpenUpdateDialog(true);
    };

    const handleUpdateDialogClose = (editedRows) => {
        setOpenUpdateDialog(false);

        if (editedRows) {
            const req = updatePrices(editedRows.map(r => ({ id: r.id, price: r.specialPricePerMi })))
            req.then(() => {
                onEdit(editedRows);
            });
        }
    };

    const handleDeleteDialogClose = (value) => {
        if (value !== 'OK') {
            setOpenDeleteDialog(false);
            return;
        }

        setOpenDeleteDialog(false);

        const req = deletePrices(selected);
        req.then(() => {
            onDelete(selected);
        });

    };

    const getSelectedRows = React.useCallback(() => {
        const selectedRows = [];

        selected.forEach(id => {
            const row = rows.find(row => row.id === id);
            selectedRows.push(row);
        });

        return selectedRows;
    }, [selected, rows]);

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        Special prices
                    </Typography>
                )}
            <Tooltip title="Delete price(s)">
                <IconButton aria-label="delete" onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit price(s)" onClick={handleEditClick}>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <UpdatePricesConfirmationDialog
                classes={{
                    paper: classes.paper,
                }}
                keepMounted
                open={openUpdateDialog}
                onClose={handleUpdateDialogClose}
                getRows={getSelectedRows}
            />
            <DeletePricesConfirmationDialog
                classes={{
                    paper: classes.paper,
                }}
                keepMounted
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}

            />
        </Toolbar>
    )
};

PricesTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selected: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
