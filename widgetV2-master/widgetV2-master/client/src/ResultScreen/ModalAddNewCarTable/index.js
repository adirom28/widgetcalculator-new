import React, {useState} from 'react';

import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";

import '../DetailsTable/style.css';
import './style.css';
import AddNewCarTable from "../AddNewCarTable";

const ModalAddNewCarTable = (props) => {
    const {onChange, handleClose, nameRadio} = props;
    const [disabled, setDisabled] = useState(true);
    const [hasFormData, setHasFormData] = useState(false);
    const [data, setData] = useState({});

    const handleAddNewCar = () => {
        onChange(data);
        setDisabled(true);
        setData({});
        handleClose();
    }

    const handleValidField = () => {
        setHasFormData(true);
    }

    const handleFieldChange = (formValue) => {
        setData({...data, ...formValue});
        hasFormData && setDisabled(false);
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <div className="details-block modal-wrap">
                <DialogTitle className="modal-title">New Car</DialogTitle>

                <AddNewCarTable
                    nameRadio={nameRadio}
                    className="wrap-table"
                    data={data} onChange={handleFieldChange}
                    handleValidField={handleValidField}/>

                <DialogActions className="wrap-form-btn">
                    <button className="modal-btn cancel-btn" onClick={props.handleClose}>Cancel</button>
                    <button disabled={disabled} className="modal-btn add-btn" onClick={handleAddNewCar}>Add car</button>
                </DialogActions>
            </div>
        </Dialog>
    );

}
export default ModalAddNewCarTable;