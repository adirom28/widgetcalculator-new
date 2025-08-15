import React, {useEffect, useState} from "react";
import {useStyles} from "./mstyles";
import {PaymentForm} from "./PaymentForm";
import {Cards} from "./Cards";
import {CircularProgress, Grid, Snackbar} from "@material-ui/core";
import {useBilling} from "../../../services/useBilling";
import {SubscriptionDetail} from "./SubscriptionDetail";

export const BillingLayout = () => {

    const {getSubscriptionDetail, getSubscriptionTypes} = useBilling();
    const classes = useStyles();

    const [subscription, setSubscription] = useState(null);
    const [hasSubscription, setHasSubscription] = useState(false);
    const [subscriptionTypes, setSubscriptionTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasCard, setHasCard] = useState(false);
    const [hasConfirm, setConfirm] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setLoading(true);

        getSubscriptionDetail()
            .then((res) => {
                const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    setSubscription(res.data);
                    res.data.subscriptionId && setHasSubscription(true);
                    if (!res.data.subscriptionId && res.data.cardNumber) {
                        setHasSubscription(true);
                        setHasCard(true);
                    }
                    setLoading(false);
                } else {
                    setOpen(true);
                    setMessage("An error occurred while receiving the subscription plan");
                }
            })
            .catch(() => {
                setOpen(true);
                setMessage("An error occurred while receiving the subscription plan");
            });

        getSubscriptionTypes().then((res) => {
            const statusCode = res.status.toString();
            if (statusCode.match(/^[23]\d{2}$/)) {
                setSubscriptionTypes(res.data);
            } else {
                setOpen(true);
                setMessage("An error occurred while receiving the subscription plan");
            }
        })
            .catch(() => {
                setOpen(true);
                setMessage("An error occurred while receiving the subscription plan");
            });

    }, []);

    const handleSetNewSubscription = (value) => {
        setHasSubscription(true);
        setConfirm(false);
        getSubscriptionDetail()
            .then((res) => {
                setSubscription(res.data);
            })
            .catch(() => {
                setOpen(true);
                setMessage("An error occurred while receiving the subscription plan");
            });

        setHasSubscription(value);
    }
    const refreshSubscription = (value) => {
        console.log(value)
        setHasSubscription(true);
        getSubscriptionDetail()
            .then((res) => {
                setSubscription(res.data);
                if (value === "confirm") {
                    setHasCard(false)
                    setConfirm(true);
                }
                if (value === "deleteCard") {
                    setHasCard(true);
                    setConfirm(false);
                }
                if (value === "cancelSubscription") setHasSubscription(false);
            })
            .catch(() => {
                setOpen(true);
                setMessage("An error occurred while receiving the subscription plan");
            });
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleOpenSnackbar = (message) => {
        setOpen(true);
        setMessage(message);
    }

    return (
        <section className={classes.mainWrap}>
            <div className={classes.container}>
                <h2 className="title">Subscribe to a plan</h2>
                {
                    loading ? (
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="flex-start"
                            style={{minHeight: '100vh'}}
                        >
                            <CircularProgress className={classes.mainLoader} size={80}/>
                        </Grid>
                    ) : (
                        <>

                            <Cards subscriptionTypes={subscriptionTypes}/>
                            {
                                !hasSubscription ?
                                    <PaymentForm
                                        handleOpenSnackbar={handleOpenSnackbar}
                                        refreshSubscription={refreshSubscription}
                                    /> :
                                    <SubscriptionDetail
                                        hasCard={hasCard}
                                        hasConfirm={hasConfirm}
                                        refreshSubscription={refreshSubscription}
                                        handleSetNewSubscription={handleSetNewSubscription}
                                        handleOpenSnackbar={handleOpenSnackbar}
                                        priceDetails={subscriptionTypes}
                                        subscription={subscription}
                                    />
                            }
                            <Snackbar
                                className={classes.snackBar}
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                autoHideDuration={3000}
                                open={open}
                                onClose={handleCloseSnackBar}>
                                <div>{message}</div>
                            </Snackbar>
                        </>
                    )}
            </div>
        </section>
    )
}
