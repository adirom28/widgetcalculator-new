import * as Yup from 'yup';


export const validation = Yup.object().shape({
    email: Yup.string()
        .email("Please, enter a valid email")
        .required("This field is required"),
    password: Yup.string()
        .matches(
            /^[A-Za-z0-9.^$*+-?()[\]{}—#@!%&]{6,15}$/,
            "The password must contain different character types"
        )
        .required("This field is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("This field is required"),
    domain: Yup.string()
        .required("This field is required"),
    companyName: Yup.string()
        .required("This field is required"),
    streetAddress: Yup.string()
        .required("This field is required"),
    secondStreetAddress: Yup.string()
        .required("This field is required"),
    cityAddress: Yup.string()
        .required("This field is required"),
    stateAddress: Yup.string()
        .required("This field is required"),
    zipCode: Yup.string()
        .matches(
            /^\d{5}(-\\d{4})?$/,
            "Please, enter a valid zip code")
        .required("This field is required"),
    phoneNumber: Yup.string()
        .min(10, "The phone number has 10 characters")
        .required("This field is required"),
});
