import React, {useEffect, useState} from "react";
import {useStyles} from "./mstyles";
import Arrow from "../../../assets/svg/arrowRight.svg";
import "./style.css";
import {useBilling} from "../../../services/useBilling";
import {CircularProgress, Grid} from "@material-ui/core";

export const SubscriptionDetail = (props) => {
    const classes = useStyles();
    const {subscription, handleOpenSnackbar, refreshSubscription, hasConfirm, hasCard} = props;
    const {deleteSubscription, changeSubscriptionCard, setSubscription, getSubscriptionDetail} = useBilling();
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState(null);


    useEffect(() => {
        getSubscriptionDetail().then((res) => {
            setSubscriptionData(res.data);
            setSuccess(true);
        }).catch((e) => console.log(e));
    }, []);

    const handleSubscribe = () => {
        setLoading(true);
        const values = {cardId: subscriptionData.cardId, priceId: props.priceDetails[0].id};
        values && setSubscription(values)
            .then((res) => {
                const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    props.handleSetNewSubscription(true);
                    setLoading(false);
                    props.handleOpenSnackbar("Subscription completed successfully");
                } else {
                    props.handleOpenSnackbar("An error occurred while subscribing");
                }
            }).catch(() => props.handleOpenSnackbar("An error occurred while subscribing"));
    }

    const handleCancelCard = () => {
        changeSubscriptionCard(subscription.cardId)
            .then((res) => {
                const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    handleOpenSnackbar("The card was successfully deleted");
                    setTimeout(() => {
                        refreshSubscription("cancelSubscription");
                    }, 2000);
                } else {
                    handleOpenSnackbar("Stripe error occurred while detaching card")
                }
                })
                .catch(() => {
                    handleOpenSnackbar("Stripe error occurred while detaching card")
                });
    }

    const handleCancelSubscription = () => {
        deleteSubscription(subscription.subscriptionId)
            .then((res) => {
                const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    handleOpenSnackbar("Subscription has canceled");
                    refreshSubscription("deleteCard");
                } else {
                    handleOpenSnackbar("An error occurred while unsubscribing")
                }
            })
            .catch(() => {
                handleOpenSnackbar("An error occurred while unsubscribing")
            });
    }

    return (
        <>
            {
                !success ?
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="flex-start"
                        style={{minHeight: '100vh'}}
                    >
                        <CircularProgress className={classes.mainLoader} size={80}/>
                    </Grid> :

                    <section className="confirm-wrap">
                        <div className="wrapper">
                            {
                                !hasCard &&
                                <>
                                    {
                                        hasConfirm ?
                                            <h6 className={classes.subTitle}>Confirm subscription</h6> :
                                            <h6 className={classes.subTitle}>Account settings</h6>
                                    }
                                </>
                            }

                            {
                                hasCard &&
                                <h6 className={classes.subTitle}>Delete subscription card</h6>
                            }

                            <div className={classes.details}>
                                <p className="text-tittle">Current price</p>
                                <div className={classes.detailsCard}>
                                    <div className={classes.detailsCard}>
                                        $ {props.priceDetails[0].price}.00
                                    </div>
                                </div>
                            </div>
                            <div className={classes.details}>
                                <p className="text-tittle">Credit card</p>
                                <div className={classes.detailsCard}>
                                    <div className={classes.dot}>....{" "}</div>
                                    {subscription.cardNumber}
                                </div>
                            </div>
                            <div className={classes.details}>
                                <p className="text-tittle">Expiry date</p>
                                <div className={classes.detailsCard}>
                                    {subscription.cardExtMonth + "/" + subscription.cardExtYear}
                                </div>
                            </div>
                            {
                                (!hasConfirm && !hasCard) &&
                                <>
                                    <div className={classes.details}>
                                        <p className="text-tittle">Payment time</p>
                                        <div className={classes.detailsCard}>
                                            {subscription.paidTime}
                                        </div>
                                    </div>
                                    <div className={classes.details}>
                                        <p className="text-tittle">Subscription active to</p>
                                        <div className={classes.detailsCard}>
                                            {subscription.activeUntil}
                                        </div>
                                    </div>
                                </>
                            }
                            {
                                !hasCard &&
                                <>
                                    {
                                        hasConfirm ?
                                            <div className={classes.wrapConfirmBtn}>
                                                <button
                                                    type="button"
                                                    onClick={handleSubscribe}
                                                    className={classes.payBtn}>
                                                    Subscribe
                                                    {loading &&
                                                    <span className={classes.wrapLoader}>
                             <CircularProgress size={15} className={classes.loader}/>
                        </span>
                                                    }
                                                </button>
                                            </div> :

                                            <div className={classes.wrapSubscBtn}>
                                                <button
                                                    className={classes.buttonLink}
                                                    onClick={handleCancelSubscription}>
                                                    Cancel subscription <img src={Arrow} alt="arrow"/>
                                                </button>

                                            </div>
                                    }
                                </>
                            }

                            {
                                hasCard &&
                                <button className={classes.buttonLink} onClick={handleCancelCard}>
                                    Delete card <img src={Arrow} alt="arrow"/>
                                </button>
                            }

                        </div>
                    </section>
            }
        </>
    )
}
