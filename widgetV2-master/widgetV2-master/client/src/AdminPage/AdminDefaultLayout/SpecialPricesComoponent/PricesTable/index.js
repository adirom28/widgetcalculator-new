import React, {useEffect, useReducer} from 'react';

import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Checkbox from '@material-ui/core/Checkbox';

import {useStyles} from './mstyles';
import Axios from "axios";

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

export const useDataApi = (url, initialData) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const [ignored, reload] = useReducer(x => x + 1, 0);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        Axios.get(
            url,
            config
        ).then((res) => {
                dispatch({type: 'FETCH_INIT'});
                const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    if (!didCancel) {
                        dispatch({type: 'FETCH_SUCCESS', payload: res.data});
                    }
                } else {
                    if (!didCancel) {
                        dispatch({type: 'FETCH_FAILURE'});
                    }
                }
            }
        ).catch((error) => {
            if (!didCancel) {
                dispatch({type: 'FETCH_FAILURE'});
            }

        });

        return () => {
            didCancel = true;
        };
    }, [url, ignored]);

    return [state, reload];
};

function EnhancedTableHead(props) {
    const classes = useStyles();
    const {onSelectAllClick, numSelected, rowCount} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        className={classes.checkbox}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all prices' }}
                    />
                </TableCell>
                <TableCell>Model</TableCell>
                <TableCell align="right">Maker</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Price&nbsp;($)</TableCell>
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function PricesTable(props) {
    const classes = useStyles();
    const { state } = props;
    const { data, isLoading, isError } = state;
    const rows = data;

    // const [selected, setSelected] = React.useState([]);
    const { selected, onSelect } = props;


    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelected = rows.map(r => r.id);
            // setSelected(newSelected);
            onSelect(newSelected);
            return;
        }
        // setSelected([]);
        onSelect([]);
    };

    const handleClick = (event, row) => {
        const selectedIndex = selected.indexOf(row.id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row.id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        // setSelected(newSelected);
        onSelect(newSelected);
    };

    const isSelected = row => selected.indexOf(row.id) !== -1;

    return (
        <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-label="simple table">
                <EnhancedTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={rows.length}
                />
                <TableBody>
                    {isError && (
                        <TableRow style={{ height: 53 }}>
                            <TableCell colSpan={6}>Something went wrong ..</TableCell>
                        </TableRow>
                    )}
                    {isLoading ? (
                        <TableRow style={{ height: 53 }}>
                            <TableCell colSpan={6}>Loading ..</TableCell>
                        </TableRow>
                    ) : (
                            rows.map((row, index) => {
                                const isItemSelected = isSelected(row);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => handleClick(event, row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell>{row.model}</TableCell>
                                        <TableCell align="right">{row.maker}</TableCell>
                                        <TableCell align="right">{row.year}</TableCell>
                                        <TableCell align="right">{row.category}</TableCell>
                                        <TableCell align="right">{row.specialPricePerMi}</TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                </TableBody>
            </Table>
        </div>
    );
}
