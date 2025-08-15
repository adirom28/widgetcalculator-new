//export const apiUrl = 'https://widget.allcarstransport.com';
export const apiUrl = 'http://151.115.58.69/api';
// export const apiUrl = 'http://localhost:8080';

export const dateOptions = [
    'ASAP',
    'In 2 weeks',
    'In 30 days or later'
];


export const stringify = (obj) => {
    const vehicleModel = JSON.stringify({
        id: obj.vehicleModel.id,
        model: obj.vehicleModel.model,
        category: obj.vehicleModel.category
    });
    const shipDate = obj.shipDate.toUTCString();

    const params = {...obj, shipDate, vehicleModel};

    const queryStr = Object.keys(params).map((key) => {
        return key + '=' + encodeURIComponent(params[key])
    }).join('&');

    return queryStr;
}

export const parse = (queryStr) => {
    const obj =
        (/^[?#]/.test(queryStr) ? queryStr.slice(1) : queryStr)
            .split('&')
            .reduce((params, param) => {
                let [key, value] = param.split('=');
                params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                return params;
            }, {});

    return obj;
}
