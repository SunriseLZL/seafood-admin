import Vue from 'vue';
import axios from 'axios';
import {getToken} from '@/utils/kit.js';

axios.defaults.timeout = 15000;
axios.defaults.retry = 3;
axios.defaults.retryDelay = 2000;

function axiosRetryInterceptor(err) {
    let config = err.config;

    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the letiable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    let backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
        return axios(config);
    });
}

axios.interceptors.request.use(
    config => {
        // development
        if (process.env.NODE_ENV === 'production') {
            config.url = '/WXB' + config.url;
            // 地图数据不需要加/WXB前缀
            /* if (config.url.indexOf('map/json/province') > -1) {
              config.url = config.url.substr(4)
            } */
        }
        config.params = {
            ...config.params
            // jid: Math.random()
        };
        // 设置token
        const token = getToken();
        // const appCode = cookies.get('appCode')
        if (token) {
            config.headers = {
                ...config.headers,
                name: localStorage.getItem('name'),
                Authorization: token
            };
        } else {
            config.headers = {
                ...config.headers,
                AppCode: 'YWWEB'
            };
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// axios.interceptors.response.use(res => res.data, err => Promise.reject(err))
axios.interceptors.response.use(res => {
    if (res.data.code !== 200 && res.data.code !== 304) {
        if (res.data.message === 'token不正确') {
            Vue.prototype.$message({
                type: 'error',
                message: res.data.message
            });
            window.location.href = '/';
            return false;
        }
        Vue.prototype.$message({
            type: 'error',
            message: res.data.message
        });
    }

    /* if (res.data.message === 'token过期') {
      console.log('token过期')
      let url = window.location.href.split('#')[0]
      window.location.replace(url + '#/login')
      return res.data
    } */

    return res.data;
}, axiosRetryInterceptor);

/**
 * usage
 * import { fetch } from '@/plugin/axios';
 *
 */
export {axios as fetch};

export default {
    install: function (Vue, options) {
        Vue.prototype.$axios = axios;
    }
};
