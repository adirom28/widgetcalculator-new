import {useState} from "react";
import {useHistory} from "react-router-dom";
import {changeDateFormat} from "../AdminPage/AdminMainPage/OrdersLayout/Order";

export const useBooking = (endpoint) => {
    const history = useHistory();

    const [error, setError] = useState({
        hasError: false,
        errorMessage: '',
    });
    const [submitted, setSubmitted] = useState({submitted: false});

    const handleSubmit = (values) => {
        let newDate = changeDateFormat(values.date);
        delete values.date;

        const userId = "61e51ae98b09b36c8f4e9df3";
        const data = {...values, userId: userId, date: newDate};

        fetch(endpoint, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => {
                const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    setSubmitted({submitted: true});
                    setError({
                        hasError: false,
                        errorMessage: '',
                    });
                    history.push("/confirm");
                    localStorage.removeItem("shipData")
                } else {
                    const result = res.json();
                    result.then(data => {
                        setError({
                            hasError: true,
                            errorMessage: data.errorMessage || "Something went wrong. Try again!",
                        });
                    })

                    setTimeout(() => {
                        setError({
                            hasError: false,
                            errorMessage: "",
                        });
                    }, 6000);
                }
            })
            .catch((error) => {
                setError({
                    hasError: true,
                    errorMessage: "Something went wrong. Try again!",
                })
                setTimeout(() => {
                    setError({
                        hasError: false,
                        errorMessage: "",
                    });
                }, 6000);
            })
    }

    return {
        handleSubmit,
        submitted,
        error,
    };
}
