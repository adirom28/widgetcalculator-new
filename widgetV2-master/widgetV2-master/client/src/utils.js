
export const isObjectInvalid = (data) => {
    let isInvalid = false;
    const keys = Object.keys(data);

    for (let key of keys) {
        if (data[key] == null || data[key] === '') {
            isInvalid = true;
            break;
        }
    }

    return isInvalid;
};


export function getValidDateRange(shipDate) {
    // let [fullYear, month, date] = [shipDate.getFullYear(), shipDate.getMonth(), shipDate.getDate()];
    let currentDate = new Date();
    let [fullYear, month, date] = [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()];

    const minDate = new Date(fullYear, month, date);
    const maxDate = new Date(fullYear + 1, month + 1, date + 1);

    return { minDate, maxDate };
}
