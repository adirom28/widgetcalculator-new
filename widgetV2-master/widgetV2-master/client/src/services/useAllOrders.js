import {useState} from "react";
import axios from "axios";

export const useAllOrders = (token) => {
    const [orderListNew, setOrderListNew] = useState([]);
    const [countNewOrder, setCountNewOrder] = useState(0);
    const [orderListDispatched, setOrderListDispatched] = useState([]);
    const [countDispatchedOrder, setCountDispatchedOrder] = useState(0);
    const [orderListPickedUp, setOrderListPickedUp] = useState([]);
    const [countPickedUpOrder, setCountPickedUpOrder] = useState(0);
    const [orderListPaid, setOrderListPaid] = useState([]);
    const [countPaidOrder, setCountPaidOrder] = useState(0);
    const [orderListDelivered, setOrderListDelivered] = useState([]);
    const [countDeliveredOrder, setCountDeliveredOrder] = useState(0);
    const [orderListCancelled, setOrderListCancelled] = useState([]);
    const [countCancelledOrder, setCountCancelledOrder] = useState(0);


    const [success, setSuccess] = useState(false);

    const createConfig = (status, pageNumber, sortString) => {
        return {
            headers: {Authorization: `Bearer ${token}`},
            params: {
                "pageSize": 5,
                "pageNumber": `${pageNumber}`,
                "sortingField": "date",
                "sortingDirection": `${sortString}`,
                "status": `${status}`,
            }
        }
    }

    const getNewOrders = (endpoint, pageNumber = 0, sortString = "DESC") => {
        return axios.get(endpoint, createConfig("NEW", pageNumber, sortString));
    }

    const getDispatchOrders = (endpoint, pageNumber = 0, sortString = "DESC") => {
        return axios.get(endpoint, createConfig("DISPATCHED", pageNumber, sortString));
    };

    const getPickedUpOrders = (endpoint, pageNumber = 0, sortString = "DESC") => {
        return axios.get(endpoint, createConfig("PICKED_UP", pageNumber, sortString));
    };

    const getPaidOrders = (endpoint, pageNumber = 0, sortString = "DESC") => {
        return axios.get(endpoint, createConfig("PAID", pageNumber, sortString));
    };

    const getDeliveredOrders = (endpoint, pageNumber = 0, sortString = "DESC") => {
        return axios.get(endpoint, createConfig("DELIVERED", pageNumber, sortString));
    };

    const getCancelledOrders = (endpoint, pageNumber = 0, sortString = "DESC") => {
        return axios.get(endpoint, createConfig("CANCELLED", pageNumber, sortString));
    }

    const getAllOrders = (endpoint) => {

        Promise.all([getNewOrders(endpoint), getDispatchOrders(endpoint), getPickedUpOrders(endpoint), getPaidOrders(endpoint), getDeliveredOrders(endpoint), getCancelledOrders(endpoint)])
            .then((values) => {
                setOrderListNew(values[0].data.data);
                setCountNewOrder(values[0].data.count);

                setOrderListDispatched(values[1].data.data);
                    setCountDispatchedOrder(values[1].data.count);

                    setOrderListPickedUp(values[2].data.data);
                    setCountPickedUpOrder(values[2].data.count);

                    setOrderListPaid(values[3].data.data);
                    setCountPaidOrder(values[3].data.count);

                    setOrderListDelivered(values[4].data.data);
                    setCountDeliveredOrder(values[4].data.count);

                    setOrderListCancelled(values[5].data.data);
                    setCountCancelledOrder(values[5].data.count)
                    setSuccess(true);
                }
            ).catch((error) => {
            console.log(error)
        })

    }
    return {
        orderListNew,
        orderListDispatched,
        orderListPickedUp,
        orderListPaid,
        orderListDelivered,
        orderListCancelled,
        getAllOrders,
        getNewOrders,
        getDispatchOrders,
        getPickedUpOrders,
        getPaidOrders,
        getDeliveredOrders,
        getCancelledOrders,
        countNewOrder,
        countDispatchedOrder,
        countPickedUpOrder,
        countPaidOrder,
        countDeliveredOrder,
        countCancelledOrder,
        success
    }
}