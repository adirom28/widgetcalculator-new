import React from 'react';

import {CssBaseline} from '@material-ui/core';

import {useStyles} from './mstyles';
import MultipliersConfigCommponent from './MultipliersConfigComponent';
import SpecialPricesCommponent from './SpecialPricesComoponent';


export default function AdminDefaultLayout(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main
                className={classes.content}
            >
                <div>
                    <MultipliersConfigCommponent classes={classes}></MultipliersConfigCommponent>
                </div>

                <div>
                    <SpecialPricesCommponent></SpecialPricesCommponent>
                </div>

            </main>
        </div>
    );
}
