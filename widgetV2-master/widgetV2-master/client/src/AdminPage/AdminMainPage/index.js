import React, {useEffect, useState} from "react"

import OrdersLayout from "./OrdersLayout";
import EmailSettingLayout from "./EmailSettingLayout";
import WidgetSettingLayout from "./WidgetSettingLayout";
import {BillingLayout} from "./BillingLayout";
import {ReactComponent as OrderSvg} from "../../assets/svg/SvgOrderIcon.svg";
import {ReactComponent as EmailSvg} from "../../assets/svg/SvgEmail.svg";
import {ReactComponent as WidgetSvg} from "../../assets/svg/SvgWidget.svg";
import {ReactComponent as BillingSvg} from "../../assets/svg/SvgBilling.svg";
import {Grid} from "@material-ui/core";
import {useStyles} from "./mstyles";
import {useProvider} from "../../services/tokenValidator";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

import "./style.css"


const AdminMainPage = (props) => {
    const history = useHistory();
    const token = JSON.parse(localStorage.getItem("token"));
    const useToken = useProvider();

    const {toggle} = props;
    const classes = useStyles();
    const [chosenFrame, setChosenFrame] = useState(-1);
    const [content, setContent] = useState(<OrdersLayout/>);
    const [isOpen, setIsOpen] = useState(false);
    const [isActiveItem, setActiveItem] = useState(0);

    const itemList = [
        {title: "Orders", icon: <OrderSvg/>},
        {title: "Email settings", icon: <EmailSvg/>},
        {title: "Quote settings", icon: <WidgetSvg/>},
        {title: "Billing", icon: <BillingSvg/>},
    ]

    const onChangeFrame = (frame) => {
        setChosenFrame(frame);
    };

    useEffect(() => {
        let expired = useToken.isTokenExpired(token);
        if (expired) {
            useToken.removeToken();
            history.push("/authPage");
        }
    });

    useEffect(() => {
        setIsOpen(toggle);

        switch (chosenFrame) {
            case 0: {
                setContent(<OrdersLayout/>);
                break;
            }
            case 1: {
                setContent(<EmailSettingLayout/>);
                break;
            }
            case 2: {
                setContent(<WidgetSettingLayout/>);
                break;
            }
            case 3: {
                setContent(<BillingLayout/>);
                break;
            }

            default:
                setContent(<OrdersLayout/>);
        }

    }, [chosenFrame, toggle]);


    return (
        <Grid container className={classes.container}>
            <Grid className={isOpen ? "sideBarOpen" : "sideBarClose"}>
                <nav>
                    <ul>
                        {
                            itemList.map((item, i) => {
                                return (
                                    <li key={i}
                                        className={classes.item}
                                        onClick={() => {
                                            setActiveItem(i)
                                            onChangeFrame(i)
                                        }}>
                                        <span
                                            className={isActiveItem === i ? classes.borderItemActive : classes.borderItem}>
                                        </span>
                                        <span
                                            className={isActiveItem === i ? classes.iconActive : classes.icon}>{item.icon}</span>
                                        <span
                                            className={isActiveItem === i ? classes.itemActiveText : classes.itemText}>
                                            {item.title}
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </Grid>

            <Grid container className={isOpen ? "wrapperContentOpen" : "wrapperContent"}>
                {content}
            </Grid>
        </Grid>
    );
};

export default AdminMainPage;
