import React, {useEffect, useState} from "react";
import {AppBar, Avatar, CircularProgress, Grid, Snackbar, Tab, Tabs, Typography} from "@material-ui/core";

import * as properties from "../../../properties";
import {allProps, TabPanel} from "../../../services/helperCreatorTabs";
import {Order} from "./Order";
import {AddNewOrderForm} from "./AddNewOrderForm";
import {EditOrderForm} from "./EditOrderForm";
import {useAllOrders} from "../../../services/useAllOrders";
import SvgSort from "../../../assets/svg/arrowUp.svg";
import "./style.css";

import {useStyles} from "./mstyles";

const url = `${properties.apiUrl}/orders`;

export default function OrdersLayout() {
    const classes = useStyles();

    const token = JSON.parse(localStorage.getItem("token"));
    const allOrders = useAllOrders(token);

    const [addNewOrder, setAddNewOrder] = useState(false);
    const [editOrder, setEditOrder] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [currentPage0, setCurrentPage0] = useState(1);
    const [currentPage1, setCurrentPage1] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [currentPage3, setCurrentPage3] = useState(1);
    const [currentPage4, setCurrentPage4] = useState(1);
    const [currentPage5, setCurrentPage5] = useState(1);

    const [fetching, setFetching] = useState(false);
    const [showBtn, setShowBtn] = useState(false);

    const [orderListNew, setOrderListNew] = useState(allOrders.orderListNew);
    const [orderListDispatched, setOrderListDispatched] = useState(allOrders.orderListDispatched);
    const [orderListPickedUp, setOrderListPickedUp] = useState(allOrders.orderListPickedUp);
    const [orderListPaid, setOrderListPaid] = useState(allOrders.orderListPaid);
    const [orderListDelivered, setOrderListDelivered] = useState(allOrders.orderListDelivered);
    const [orderListCancelled, setOrderListCancelled] = useState(allOrders.orderListCancelled);

    const [countNewOrder, setCountNewOrder] = useState(allOrders.countNewOrder);
    const [countDispatchedOrder, setCountDispatchedOrder] = useState(allOrders.countDispatchedOrder);
    const [countPickedUpOrder, setCountPickedUpOrder] = useState(allOrders.countPickedUpOrder);
    const [countPaidOrder, setCountPaidOrder] = useState(allOrders.countPaidOrder);
    const [countDeliveredOrder, setCountDeliveredOrder] = useState(allOrders.countDeliveredOrder);
    const [countCancelledOrder, setCountCancelledOrder] = useState(allOrders.countCancelledOrder);

    const [sortString0, setSortString0] = useState(false);
    const [sortString1, setSortString1] = useState(false);
    const [sortString2, setSortString2] = useState(false);
    const [sortString3, setSortString3] = useState(false);
    const [sortString4, setSortString4] = useState(false);
    const [sortString5, setSortString5] = useState(false);

    const tabList = [
        {index: 0, orderList: orderListNew, status: "new"},
        {index: 1, orderList: orderListDispatched, status: "dispatched"},
        {index: 2, orderList: orderListPickedUp, status: "pickedUp"},
        {index: 3, orderList: orderListDelivered, status: "delivered"},
        {index: 4, orderList: orderListPaid, status: "paid"},
        {index: 5, orderList: orderListCancelled, status: "cancelled"},
    ];

    useEffect(() => {
        setLoading(true);
        allOrders.getAllOrders(url);
    }, []);

    const handleLoadingPage = (value) => {
        setLoading(value);
    }

    const handleOpenAddForm = () => {
        setAddNewOrder(true);
    };
    const handleCloseAddForm = (type) => {
        type === "add" && setAddNewOrder(false);
        type === "edit" && setEditOrder(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const editOrderForm = (edit, item) => {
        setOrderDetail(item);
        setEditOrder(edit);
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleOpenSnackBar = (open, message) => {
        setOpen(open);
        setMessage(message)
    };

    const addNew = (value) => {
        if (value) {
            handleRefreshStatus("new");
        }
    }

    const changeStatus = (status, prevStatus) => {

        setTimeout(() => {
            handleRefreshStatus(status);
            handleChangeOrdersList(prevStatus);
            handleLoadingPage(false);
        }, 1000);
    }

    const handleRefreshStatus = (status) => {
        if (status === "picked_up") {
            allOrders.getPickedUpOrders(url).then((res) => {
                setOrderListPickedUp(res.data.data);
                setCountPickedUpOrder(res.data.count);
            });
        } else if (status === "paid") {
            allOrders.getPaidOrders(url).then((res) => {
                setOrderListPaid(res.data.data);
                setCountPaidOrder(res.data.count);
            });
        } else if (status === "delivered") {
            allOrders.getDeliveredOrders(url).then((res) => {
                setOrderListDelivered(res.data.data);
                setCountDeliveredOrder(res.data.count);
            });
        } else if (status === "cancelled") {
            allOrders.getCancelledOrders(url).then((res) => {
                setOrderListCancelled(res.data.data);
                setCountCancelledOrder(res.data.count);
            });
        } else if (status === "new") {
            allOrders.getNewOrders(url).then((res) => {
                setOrderListNew(res.data.data);
                setCountNewOrder(res.data.count);
            });
        } else if (status === "dispatched") {
            allOrders.getDispatchOrders(url).then((res) => {
                setOrderListDispatched(res.data.data);
                setCountDispatchedOrder(res.data.count);
            });
        }
    }

    const handleSetDispatchStatus = () => {
        console.log('dispatch')
        setTimeout(() => {
            handleRefreshStatus("dispatched");
            handleRefreshStatus("new");
        });
    }

    const handleChangeOrdersList = (prevStatus) => {
        if (prevStatus === "NEW") {
            handleRefreshStatus("new");
        }
        if (prevStatus === "DISPATCHED") {
            handleRefreshStatus("dispatched");
        }
        if (prevStatus === "PICKED_UP") {
            handleRefreshStatus("picked_up");
        }
        if (prevStatus === "PAID") {
            handleRefreshStatus("paid");
        }
        if (prevStatus === "DELIVERED") {
            handleRefreshStatus("delivered");
        }
        if (prevStatus === "CANCELLED") {
            handleRefreshStatus("cancelled");
        }
    }

    const editOrderRow = (id, data, status) => {
        if (status === "NEW") {
            let newList = orderListNew.filter((order, i) => order.id !== id);
            let newData = {...data, id, status}
            newList.unshift(newData);
            setOrderListNew(newList)
        }
        if (status === "DISPATCHED") {
            let newList = orderListDispatched.filter((order, i) => order.id !== id);
            let newData = {...data, id, status}
            newList.unshift(newData);
            setOrderListDispatched(newList)
        }
        if (status === "PICKED_UP") {
            let newList = orderListPickedUp.filter((order, i) => order.id !== id);
            let newData = {...data, id, status}
            newList.unshift(newData);
            setOrderListPickedUp(newList)
        }
        if (status === "PAID") {
            let newList = orderListPaid.filter((order, i) => order.id !== id);
            let newData = {...data, id, status}
            newList.unshift(newData);
            setOrderListPaid(newList)
        }
        if (status === "DELIVERED") {
            let newList = orderListDelivered.filter((order, i) => order.id !== id);
            let newData = {...data, id, status};
            newList.unshift(newData);
            setOrderListDelivered(newList);
        }
        if (status === "CANCELLED") {
            let newList = orderListCancelled.filter((order, i) => order.id !== id);
            let newData = {...data, id, status};
            newList.unshift(newData);
            setOrderListCancelled(newList);
        }
    }

    /* sorting*/

    const handleSort = () => {
        getSortingOrders(value);
    }

    const getSortingOrders = (value) => {
        let sortString;
        let pageNumber = 0;
        switch (value) {
            case 0:
                sortString0 ? sortString = "DESC" : sortString = "ASC";
                allOrders.getNewOrders(url, pageNumber, sortString).then((res) => {
                    setOrderListNew(res.data.data);
                }).finally(() => {
                    setSortString0(!sortString0);
                })
                break;
            case 1:
                sortString1 ? sortString = "DESC" : sortString = "ASC";
                allOrders.getDispatchOrders(url, pageNumber, sortString).then((res) => {
                    setOrderListDispatched(res.data.data);
                }).finally(() => {
                    setSortString1(!sortString1);
                })
                break;
            case 2:
                sortString2 ? sortString = "DESC" : sortString = "ASC";
                allOrders.getPickedUpOrders(url, pageNumber, sortString).then((res) => {
                    setOrderListPickedUp(res.data.data);
                }).finally(() => {
                    setSortString2(!sortString2);
                })
                break;
            case 3:
                sortString3 ? sortString = "DESC" : sortString = "ASC";
                allOrders.getDeliveredOrders(url, pageNumber, sortString).then((res) => {
                    setOrderListDelivered(res.data.data);
                }).finally(() => {
                    setSortString3(!sortString3);
                })
                break;
            case 4:
                sortString4 ? sortString = "DESC" : sortString = "ASC";
                allOrders.getPaidOrders(url, pageNumber, sortString).then((res) => {
                    setOrderListPaid(res.data.data);
                }).finally(() => {
                    setSortString4(!sortString4);
                })
                break;
            case 5:
                sortString5 ? sortString = "DESC" : sortString = "ASC";
                allOrders.getCancelledOrders(url, pageNumber, sortString).then((res) => {
                    setOrderListCancelled(res.data.data);
                }).finally(() => {
                    setSortString5(!sortString5);
                })
                break;
            default:
        }
    }

    useEffect(() => {

        if (allOrders.success) {
            setOrderListNew(allOrders.orderListNew);
            setOrderListDispatched(allOrders.orderListDispatched);
            setOrderListPickedUp(allOrders.orderListPickedUp);
            setOrderListPaid(allOrders.orderListPaid);
            setOrderListDelivered(allOrders.orderListDelivered);
            setOrderListCancelled(allOrders.orderListCancelled);

            setCountNewOrder(allOrders.countNewOrder);
            setCountDispatchedOrder(allOrders.countDispatchedOrder);
            setCountPickedUpOrder(allOrders.countPickedUpOrder);
            setCountPaidOrder(allOrders.countPaidOrder);
            setCountDeliveredOrder(allOrders.countDeliveredOrder);
            setCountCancelledOrder(allOrders.countCancelledOrder);

            setLoading(false);
        }

    }, [allOrders.success]);

    /*pagination*/

    useEffect(() => {

        if (fetching) {
            switch (value) {
                case 0:
                    if (orderListNew.length === allOrders.countNewOrder) {
                        return;
                    }
                    allOrders.getNewOrders(url, currentPage0).then((res) => {
                        setOrderListNew([...orderListNew, ...res.data.data]);
                        setCurrentPage0(currentPage0 + 1);
                        setShowBtn(true);
                    }).finally(() => setFetching(false));

                    break;

                case 1:
                    if (orderListDispatched.length === allOrders.countDispatchedOrder) {
                        return;
                    }
                    allOrders.getDispatchOrders(url, currentPage1).then((res) => {
                        setOrderListDispatched([...orderListDispatched, ...res.data.data]);
                        setCurrentPage1(currentPage1 + 1);
                        setShowBtn(true);
                    }).finally(() => setFetching(false));

                    break;

                case 2:
                    if (orderListPickedUp.length === allOrders.countPickedUpOrder) {
                        return;
                    }
                    allOrders.getPickedUpOrders(url, currentPage2).then((res) => {
                        setOrderListPickedUp([...orderListPickedUp, ...res.data.data]);
                        setCurrentPage2(currentPage2 + 1);
                        setShowBtn(true);
                    }).finally(() => setFetching(false));

                    break;

                case 3:
                    if (orderListDelivered.length === allOrders.countDeliveredOrder) {
                        return;
                    }
                    allOrders.getDeliveredOrders(url, currentPage4).then((res) => {
                        setOrderListDelivered([...orderListDelivered, ...res.data.data]);
                        setCurrentPage3(currentPage3 + 1);
                        setShowBtn(true);
                    }).finally(() => setFetching(false));
                    break;
                case 4:
                    if (orderListPaid.length === allOrders.countPaidOrder) {
                        return;
                    }
                    allOrders.getPaidOrders(url, currentPage3).then((res) => {
                        setOrderListPaid([...orderListPaid, ...res.data.data]);
                        setCurrentPage4(currentPage4 + 1);
                        setShowBtn(true);
                    }).finally(() => setFetching(false));
                    break;

                case 5:
                    if (orderListCancelled.length === allOrders.countCancelledOrder) {
                        return;
                    }
                    allOrders.getCancelledOrders(url, currentPage5).then((res) => {
                        setOrderListCancelled([...orderListCancelled, ...res.data.data]);
                        setCurrentPage5(currentPage5 + 1);
                        setShowBtn(true);
                    }).finally(() => setFetching(false));
                    break;
                default:
            }
        }

    }, [fetching, value, showBtn]);


    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true);
        }
    }

    const handleScrollUp = () => {
        window.scrollTo({behavior: 'smooth', top: '0px'});
        setShowBtn(false);
    }

    return (
        <Grid container className={classes.container}>
            <div className={classes.wrapHeader}>
                <Typography variant="h4" className={classes.title}>Orders</Typography>
                <button
                    disabled={editOrder}
                    onClick={handleOpenAddForm}
                    className={classes.btn}>Add new
                </button>
            </div>
            {
                loading
                    ? (
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="flex-start"
                            style={{minHeight: '100vh'}}
                        >
                            <CircularProgress className={classes.loader} size={60}/>
                        </Grid>
                    ) : (
                        <>
                            {
                                (!addNewOrder && !editOrder) &&
                                (<div className="wrapper-tabs">
                                    <AppBar position="static">
                                        <Tabs
                                            TabIndicatorProps={{
                                                style: {backgroundColor: "#f29112"}
                                            }}
                                            textColor="primary"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                            className={classes.tabs}
                                            value={value}
                                            onChange={handleChange}>

                                            <Tab
                                                className="tab"
                                                label={`New ${countNewOrder === 0 ? " " : countNewOrder}`}
                                                icon={<Avatar
                                                    onClick={handleSort} alt="arrow" src={SvgSort}/>}
                                                {...allProps(0)}>

                                            </Tab>
                                            <Tab
                                                className="tab"
                                                label={`Dispatched ${countDispatchedOrder === 0 ? " " : countDispatchedOrder}`}
                                                icon={<Avatar alt="arrow" onClick={handleSort}
                                                              src={SvgSort}/>}
                                                {...allProps(1)} />
                                            <Tab
                                                className="tab"
                                                label={`Picked up ${countPickedUpOrder === 0 ? " " : countPickedUpOrder}`}
                                                icon={<Avatar alt="arrow" onClick={handleSort}
                                                              src={SvgSort}/>}
                                                {...allProps(2)} />
                                            <Tab
                                                className="tab"
                                                label={`Delivered ${countDeliveredOrder === 0 ? " " : countDeliveredOrder}`}
                                                icon={<Avatar alt="arrow" onClick={handleSort}
                                                              src={SvgSort}/>}
                                                {...allProps(3)} />
                                            <Tab
                                                className="tab"
                                                label={`Paid ${countPaidOrder === 0 ? " " : countPaidOrder}`}
                                                icon={<Avatar alt="arrow" onClick={handleSort} src={SvgSort}/>}
                                                {...allProps(4)} />
                                            <Tab
                                                className="tab"
                                                label={`Cancelled ${countCancelledOrder === 0 ? " " : countCancelledOrder}`}
                                                icon={<Avatar alt="arrow" onClick={handleSort}
                                                              src={SvgSort}/>}
                                                {...allProps(5)} />
                                        </Tabs>

                                    </AppBar>
                                    {
                                        tabList.map((tab, i) => {
                                            return (
                                                <TabPanel key={i} value={value} index={tab.index}>
                                                    {tab.orderList.length ?
                                                        tab.orderList.map((item, index) => {
                                                            return (
                                                                <Order status={tab.status} item={item} key={index}
                                                                       handleLoadingPage={handleLoadingPage}
                                                                       editOrderForm={editOrderForm}
                                                                       handleSetDispatchStatus={handleSetDispatchStatus}
                                                                       changeStatus={changeStatus}
                                                                       handleOpenSnackBar={handleOpenSnackBar}/>
                                                            )
                                                        }) :
                                                        (<div className={classes.wrapEmptyList}>
                                                            <div>Orders list is empty</div>
                                                        </div>)
                                                    }
                                                    {
                                                        showBtn &&
                                                        <div className={classes.wrapBtn}>
                                                            <button className={classes.btn} onClick={handleScrollUp}>Scroll
                                                                Up
                                                            </button>
                                                        </div>
                                                    }
                                                </TabPanel>
                                            )
                                        })
                                    }
                                </div>)
                            }
                        </>)
            }
            {
                addNewOrder && !editOrder &&
                <AddNewOrderForm
                    addNew={addNew}
                    close={handleCloseAddForm}
                    handleOpenSnackBar={handleOpenSnackBar}
                />
            }
            {
                !addNewOrder && editOrder &&
                <EditOrderForm close={handleCloseAddForm}
                               handleOpenSnackBar={handleOpenSnackBar}
                               editOrderRow={editOrderRow}
                               orderData={orderDetail}/>
            }
            <Snackbar
                className={classes.snackBar}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                autoHideDuration={3000}
                open={open}
                onClose={handleCloseSnackBar}>
                <div>{message}</div>
            </Snackbar>
        </Grid>
    )
}
