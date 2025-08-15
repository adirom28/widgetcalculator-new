import {useState} from "react";
import {useSelector} from "react-redux";


export const useRegistration = (endpoint) => {
    const data = useSelector(state => state.userLogoReducer);

    const [error, setError] = useState({
        hasError: false,
        errorMessage: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState({
        success: false,
        successMessage: ""
    });

    const handleSubmit = (values) => {
        const formValue = {...values, logo: data.logo};

        fetch(endpoint, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formValue)
        })
            .then(res => {
                const statusCode = res.status.toString();
                const result = res.json();

                if (statusCode.match(/^[23]\d{2}$/)) {
                    setSuccess({
                        success: true,
                        successMessage: "YYou have successfully registered"
                    });
                    setSubmitted(true);
                    setError({hasError: false, errorMessage: ''});

                } else {
                    result.then(data => {
                        if (data.error === "Unauthorized") {
                            data.errorMessage = "You are not authorized, please register";
                        }
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
                console.log('catch')
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
        success,
    };
}
