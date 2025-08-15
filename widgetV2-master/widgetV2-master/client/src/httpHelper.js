import axios from 'axios';
import * as properties from './properties';

const CancelToken = axios.CancelToken;
const baseURL = properties.apiUrl + '/';

const handleError = error => {
    if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
        return;
    }

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }

    console.log(error.config);
}

axios.interceptors.request.use(function (config) {
    config.url = config.url.indexOf('?') > 0 ? config.url + '&timestamp=' + new Date().getTime() : config.url + '?timestamp=' + new Date().getTime();
    config.headers  = {
        Authorization: `Bearer ` + localStorage.getItem('token'),
        'User-Domain': window.parent.location.hostname,
        'User-ID': localStorage.getItem('userId')
    };
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const HttpHelper = {
    get: function (url, params) {
        const cancelTokenSource = CancelToken.source();
        const config = {
            baseURL,
            cancelToken: cancelTokenSource.token,
        };

        if (typeof params !== undefined) {
            config.params = params;
        }

        const response = axios
            .get(
                url,
                config
            )
            .then(response => response.data)
            .catch(handleError);

        return { response, cancelTokenSource };
    },

    post: function (url, data) {
        const cancelTokenSource = CancelToken.source();
        const config = {
            baseURL,
            cancelToken: cancelTokenSource.token,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = axios
            .post(
                url,
                data,
                config
            )
            .then(response => response.data)
            .catch(handleError);

        return { response, cancelTokenSource };
    }
};

export default HttpHelper;
