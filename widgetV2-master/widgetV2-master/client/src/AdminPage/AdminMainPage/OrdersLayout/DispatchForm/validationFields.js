import * as Yup from 'yup';


export const validationDispatchForm = Yup.object().shape({
    nameCarrier: Yup.string().nullable()
        .required("This field is required"),
    contactPerson: Yup.string()
        .required("This field is required"),
    contactEmail: Yup.string()
        .email("Please, enter a valid email")
        .required("This field is required"),
    contactPhoneNumber: Yup.string()
        .min(10, "The phone number has 10 characters")
        .required("This field is required"),
    driverName: Yup.string()
        .required("This field is required"),
    driverNumber: Yup.string()
        .min(10, "The phone number has 10 characters")
        .required("This field is required"),
    isCarEnclosed: Yup.string().required("Please, select a track type."),
    pickUpDate: Yup.date().required("Date is required"),
    deliveryDate: Yup.date().required("Date is required"),
});
