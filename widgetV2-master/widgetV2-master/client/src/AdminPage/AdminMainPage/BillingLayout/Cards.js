import React from "react";
import {useStyles} from "./mstyles";
import "./style.css";

export const Cards = (props) => {
    const {subscriptionTypes} = props;
    const classes = useStyles();

    return (
        <div className="wrap-cards">
            {
                subscriptionTypes.map((plan, i) => {
                    return (
                        <div key={i} className={classes.card}>
                            <div className={classes.price}>{plan.name}</div>
                            <div className={classes.price}>${" "}{plan.price}.00</div>
                            <div className={classes.text}>Per month</div>
                            <div className={classes.text}>Billed monthly</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
