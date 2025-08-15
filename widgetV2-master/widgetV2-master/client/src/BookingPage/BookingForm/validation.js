import * as Yup from 'yup';


export const validationField = Yup.object().shape({
    name: Yup.string()
        .required("This field is required"),
    email: Yup.string()
        .email("Please, enter a valid email")
        .required("This field is required"),
    phone: Yup.string()
        .min(10, "The phone number has 10 characters")
        .required("This field is required"),
    firstFrom: Yup.string()
        .required("This field is required"),
    lastFrom: Yup.string()
        .required("This field is required"),
    phoneFrom: Yup.string()
        .min(10, "The phone number has 10 characters")
        .required("This field is required"),
    companyNameFrom: Yup.string()
        .required("This field is required"),
    addressFrom: Yup.string()
        .required("This field is required"),
    cityFrom: Yup.string()
        .required("This field is required"),
    stateFrom: Yup.string()
        .required("This field is required"),
    firstTo: Yup.string()
        .required("This field is required"),
    lastTo: Yup.string()
        .required("This field is required"),
    phoneTo: Yup.string()
        .min(10, "The phone number has 10 characters")
        .required("This field is required"),
    companyNameTo: Yup.string()
        .required("This field is required"),
    streetTo: Yup.string()
        .required("This field is required"),
    cityTo: Yup.string()
        .required("This field is required"),
    stateTo: Yup.string()
        .required("This field is required"),
    comments: Yup.string()
        .max(80, "The number of characters entered can't  exceed 80 characters"),
    detail: Yup.string(),
    price: Yup.string()
});
