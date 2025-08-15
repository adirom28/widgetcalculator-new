import React, {useEffect, useState} from "react";

import {useStyles} from "./mstyles";
import {DispatchForm} from "../DispatchForm";
import {useChangeStatusOrder} from "../../../../services/useChangeStatusOrder";
import * as properties from "../../../../properties";
import {AddNotesForm} from "../AddNotesPopUP";

import "./style.css";
import Select from '@material-ui/core/Select';

import {
    optionsCancelled,
    optionsDelivered,
    optionsDispatch,
    optionsNew,
    optionsPaid,
    optionsPickedUp
} from "./helperCreatorSelect";
import {FormControl, InputLabel, MenuItem} from "@material-ui/core";


export function changeDateFormat(date, type) {
    if (!date) {
        return;
    }

    if (type === "revert") {
        const newDate = date.split('/');
        if (date.count === 0) {
            return null;
        }

        const year = newDate[2];
        const month = newDate[0];
        const day = newDate[1];

        return year + '-' + month + '-' + day;
    } else {
        const splitDate = date.split('-');
        if (date.count === 0) {
            return null;
        }

        const year = splitDate[0];
        const month = splitDate[1];
        const day = splitDate[2];

        return month + '/' + day + '/' + year;
    }
}

export const Order = (props) => {

    const {
        item,
        editOrderForm,
        status,
        handleOpenSnackBar,
        changeStatus,
        handleSetDispatchStatus,
        handleLoadingPage
    } = props;

    const useChangeStatus = useChangeStatusOrder();

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [openNote, setOpenNote] = useState(false);

    const [options, setOptions] = useState(optionsNew);
    const [selectStatus, setSelectStatus] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onEdit = () => {
        editOrderForm(true, item);
    }

    const handleAddNewNote = () => {
        setOpenNote(true);
    }

    const handleCloseNoteBlock = () => {
        setOpenNote(false);

    };

    const handleChange = (e) => {
        setSelectStatus(e.target.value);
        handleChangeStatus(e.target.value);
    };

    useEffect(() => {
        if (status === "dispatched") {
            setOptions(optionsDispatch);
        }
        if (status === "pickedUp") {
            setOptions(optionsPickedUp);
        }
        if (status === "paid") {
            setOptions(optionsPaid);
        }
        if (status === "delivered") {
            setOptions(optionsDelivered);
        }
        if (status === "cancelled") {
            setOptions(optionsCancelled);
        }

        if (useChangeStatus.success.success) {
            console.log('order')
            handleLoadingPage(true);
            handleOpenSnackBar(useChangeStatus.success.success, useChangeStatus.success.successMessage)
        }

    }, [status, useChangeStatus.success.success, useChangeStatus.success, handleLoadingPage, handleOpenSnackBar]);

    const handleChangeStatus = (status) => {

        if (status === "picked_up") {
            setSelectStatus("");
            useChangeStatus.handleSetNewStatus(`${properties.apiUrl}/orders/pick_up/${item.id}`);

        } else if (status === "paid") {
            setSelectStatus("");
            useChangeStatus.handleSetNewStatus(`${properties.apiUrl}/orders/pay/${item.id}`);

        } else if (status === "delivered") {
            setSelectStatus("");
            useChangeStatus.handleSetNewStatus(`${properties.apiUrl}/orders/deliver/${item.id}`);

        } else if (status === "cancelled") {
            setSelectStatus("");
            useChangeStatus.handleSetNewStatus(`${properties.apiUrl}/orders/cancel/${item.id}`);

        } else if (status === "new") {
            setSelectStatus("");
            useChangeStatus.handleSetNewStatus(`${properties.apiUrl}/orders/new/${item.id}`);
        } else if (status === "dispatched") {
            setSelectStatus("");
            handleOpen();
        }

        changeStatus(status, item.status);
    }

    return (
        <div className="order">

            <div className="wrap-detail-orders">

                <div className="order-details">
                    <div className={classes.wrapPriceBlock}>
                        <p className={classes.wrapId}>
                            <span className={classes.boldText}>Load ID:</span>
                            <span className={classes.boldText}>{" "}{item.id}</span>
                        </p>
                        <p className={classes.orderDetailPrice}>{item.price}</p>
                    </div>
                    <div className={classes.blockDetail}>{item.detail}</div>
                </div>

                <div className="wrap-customer-details">

                    <div className={classes.blockOrderInfo}>
                        <h6 className={classes.orderDetailTitle}>ORIGIN</h6>
                        <p className={classes.orderDetail}>Name:{" "}{item.firstFrom}{" "}{item.lastFrom}</p>
                        <p className={classes.orderDetail}>Phone:{" "}{item.phoneFrom}</p>
                        <p className={classes.orderDetail}>Company:{" "}{item.companyNameFrom}</p>
                        <p className={classes.orderDetail}>Street:{" "}{item.addressFrom}</p>
                        <p className={classes.orderDetail}>City:{" "}{item.cityFrom}</p>
                        <p className={classes.orderDetail}>State:{" "}{item.stateFrom}</p>
                        <p className={classes.orderDetail}>Zipcode:{" "}{item.zipCodeFrom}</p>
                    </div>


                    <div className={classes.blockOrderInfo}>
                        <h6 className={classes.orderDetailTitle}>DESTINATION</h6>
                        <p className={classes.orderDetail}>Name:{" "}{item.firstTo}{" "}{item.lastTo}</p>
                        <p className={classes.orderDetail}>Phone:{" "}{item.phoneTo}</p>
                        <p className={classes.orderDetail}>Company:{" "}{item.companyNameTo}</p>
                        <p className={classes.orderDetail}>Street:{" "}{item.streetTo}</p>
                        <p className={classes.orderDetail}>City:{" "}{item.cityTo}</p>
                        <p className={classes.orderDetail}>State:{" "}{item.stateTo}</p>
                        <p className={classes.orderDetail}>Zipcode:{" "}{item.zipCodeTo}</p>
                    </div>

                    <div className={classes.blockOrderInfo}>
                        <h6 className={classes.orderDetailTitle}>SHIPPER/CUSTOMER</h6>
                        <p className={classes.orderDetail}>Name:{" "}{item.name}</p>
                        <p className={classes.orderDetail}>Phone:{" "}{item.phone}</p>
                        <p className={classes.orderDetail}>Email:{" "}{item.email}</p>
                    </div>

                </div>
            </div>


            <div className="wrap-order-status">
                <div className="wrap-status-btn">
                    <div className={classes.wrapSelect}>
                        <FormControl>
                            <InputLabel className={classes.labelSelect}>Status</InputLabel>
                            <Select
                                className={classes.select}
                                label="Status"
                                value={selectStatus}
                                onChange={handleChange}
                            >
                                {
                                    options.map((option, i) => {
                                        return (
                                            <MenuItem key={i} value={option.value}>{option.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <button onClick={onEdit} className={classes.btn}>Edit</button>
                    <div className="wrap-note-btn">
                        <button
                            onClick={handleAddNewNote}
                            className={classes.NoteBtn}>View notes
                        </button>
                    </div>
                </div>

                <div className="wrap-other-info">
                    <p className={classes.orderDetail}>Status:{" "}{item.status}</p>
                    <p className={classes.orderDetail}>Ship date:{" "}{item.date}</p>
                    <p className={classes.orderDetail}>Comments:{" "}{item.comments}</p>
                </div>

            </div>

            <div>
                <DispatchForm
                    handleSetDispatchStatus={handleSetDispatchStatus}
                    handleCloseForm={handleClose}
                    handleOpenSnackBar={handleOpenSnackBar}
                    openForm={open}
                    id={item.id}
                />
            </div>
            <div>
                <AddNotesForm
                    handleCloseNoteBlock={handleCloseNoteBlock}
                    handleOpenSnackBar={handleOpenSnackBar}
                    openNote={openNote}
                    notes={item.notes}
                    id={item.id}
                />
            </div>
        </div>
    )
}
