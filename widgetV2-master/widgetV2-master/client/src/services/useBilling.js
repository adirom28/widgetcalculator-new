import Axios from "axios";
import * as properties from "../properties";


export const useBilling = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    const getSubscriptionDetail = () => {
        return Axios.get(`${properties.apiUrl}/subscriptions`, config)
    }

    const getSubscriptionTypes = () => {
        return Axios.get(`${properties.apiUrl}/subscriptions/types`, config);
    }

    const setSubscriptionCards = (values) => {
        return Axios.post(`${properties.apiUrl}/subscriptions/cards`, values, config);
    }

    const setSubscription = (values) => {
        return Axios.post(`${properties.apiUrl}/subscriptions`, values, config);
    }

    const deleteSubscription = (id) => {
        return Axios.delete(`${properties.apiUrl}/subscriptions/${id}`, config);
    }

    const changeSubscriptionCard = (id) => {
        return Axios.delete(`${properties.apiUrl}/subscriptions/cards/${id}`, config);
    }

    return {
        getSubscriptionDetail,
        getSubscriptionTypes,
        setSubscription,
        setSubscriptionCards,
        deleteSubscription,
        changeSubscriptionCard
    }
}
