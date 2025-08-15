import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';

import CustomAutocomplete from '../../../CommonCustomComponents/CustomAutocomplete';
import {isObjectInvalid} from '../../../utils';

import PricesTable, {useDataApi} from './PricesTable';
import PricesTableToolbar from './PricesTableToolbar';

import * as properties from "../../../properties";
import Axios from "axios";


const token = JSON.parse(localStorage.getItem("token"));

const addPrice = (id, price) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    const req = Axios.post(`${properties.apiUrl}/specialPrice/update`, [{id, price}], config)
    return req;
}
const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        border: "1px solid #eaeaea",
        padding: "20px",
        borderRadius: ".75rem",
        boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
        marginBottom: theme.spacing(2),
    },
    addButton: {
        borderRadius: '4px',
        border: '1px solid #008ecc',
        color: '#008ecc',
    },
    btnAddForm: {
        color: '#008ecc',
        outline: 'none',
    },
    textField: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#922c88!important"
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
            color: "#008ecc",
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink.Mui-error': {
            color: "##008ecc",
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
}));

export function AddPriceDialog(props) {
    const classes = useStyles();
    const {onAdd} = props;
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState({
        price: null
    });

    const [dialogForm, setDialogForm] = useState({
        submitted: false, disabled: true
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        if (isObjectInvalid(model)) {
            setDialogForm({
                submitted: true
            });
            return;
        }

        addPrice(model.vehicleModel.id, model.price).then(() => {
            setOpen(false);
            onAdd(model);
        });
    };

    const onChangeValue = (formValue, componentNameForFocus) => {
        let newModel = {...model};
        newModel[componentNameForFocus] = formValue;

        if (!newModel.vehicleYear || model.vehicleYear !== newModel.vehicleYear) {
            newModel.vehicleMaker = null;
            newModel.vehicleModel = null;
        } else if (!newModel.vehicleMaker || model.vehicleMaker !== newModel.vehicleMaker) {
            newModel.vehicleModel = null;
        }

        setDialogForm({
            disalbled: isObjectInvalid(newModel)
        });

        setModel(newModel);
    };

    const onChangePrice = (event) => {
        const price = parseFloat(event.target.value);
        const prop = event.target.name;
        const newModel = { ...model, [prop]: price };

        setDialogForm({
            disalbled: isObjectInvalid(newModel)
        });

        setModel(newModel);
    }

    return (
        <>
            <Button variant="outlined" className={classes.addButton} onClick={handleClickOpen}>
                Add price
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add price</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add new special price for selected car
                    </DialogContentText>
                    <div style={{marginBottom: "10px"}}
                         className="select-with-mb">
                        <CustomAutocomplete
                            className={classes.textField}
                            url='/cars/years'
                            name='vehicleYear'
                            defaultValue={model.vehicleYear}
                            label='Vehicle year'
                            open={true}
                            onChange={(value) => onChangeValue(value, "vehicleYear")}
                            error={dialogForm.submitted && !model.vehicleYear}
                            errortext="Please SELECT a vehicle year"
                            staticOptions
                            type='number'
                        />
                    </div>

                    <div
                        style={{marginBottom: "10px"}}
                        className="select-with-mb">
                        <CustomAutocomplete
                            className={classes.textField}
                            url={`/cars/makers?year=${model.vehicleYear}`}
                            name='vehicleMaker'
                            defaultValue={model.vehicleMaker}
                            label='Vehicle maker'
                            disabled={!model.vehicleYear}
                            onChange={(value) => onChangeValue(value, "vehicleMaker")}
                            error={dialogForm.submitted && !model.vehicleMaker}
                            errortext="Please SELECT a vehicle maker"
                        />
                    </div>

                    <div
                        style={{marginBottom: "10px"}}
                        className="select-with-mb">
                        <CustomAutocomplete
                            className={classes.textField}
                            url={`/cars/models?year=${model.vehicleYear}&maker=${model.vehicleMaker}`}
                            name='vehicleModel'
                            defaultValue={model.vehicleModel}
                            label='Vehicle model'
                            disabled={!model.vehicleMaker}
                            onChange={(value) => onChangeValue(value, "vehicleModel")}
                            textField="model"
                            error={dialogForm.submitted && !model.vehicleModel}
                            errortext="Please SELECT a vehicle model"
                        />
                    </div>
                    <div className="select-with-mb">
                        <TextField
                            id="price"
                            name="price"
                            defaultValue={model.price}
                            onChange={onChangePrice}
                            label="Price"
                            type="number"
                            fullWidth
                            variant="outlined"
                            error={dialogForm.submitted && !model.price}
                            errortext="Please ENTER a price"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        className={classes.btnAddForm}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleOk}
                        disabled={dialogForm.disabled}
                        className={classes.btnAddForm}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default function SpecialPricesCommponent() {
    const [selected, setSelected] = React.useState([]);
    const [state, reload] = useDataApi(`${properties.apiUrl}/specialPrice/list`, []);
    const classes = useStyles();

    const handleAddPrice = () => {
        setTimeout(() => {
            reload();
        }, 1000);
    };

    const handleSelect = (selected) => {
        setSelected(selected);
    };

    const handleEdit = (editedRowModels) => {
        setTimeout(() => {
            reload();
        }, 1000);
    };

    const handleDelete = (deletedRowIds) => {
        setTimeout(() => {
            reload();
        }, 1000);

        setSelected([]);
    };


    return (
        <Paper className={classes.paper}>
            <div>
                <AddPriceDialog onAdd={handleAddPrice} />
            </div>
            <div>
                <PricesTableToolbar
                    rows={state.data}
                    numSelected={selected.length}
                    selected={selected}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <PricesTable
                    state={state}
                    onSelect={handleSelect}
                    selected={selected}
                />
            </div>
        </Paper>
    )
}
