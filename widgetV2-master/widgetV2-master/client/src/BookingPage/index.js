import React from 'react';

import BookingForm from "./BookingForm";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#ffffff",
        width: "100%",
    },

}));

export default function BookingPage() {
    const classes = useStyles();

    return (
        <section className={classes.container}>
            <BookingForm/>
        </section>
    )
}