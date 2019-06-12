import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'   // 转换为key=value的格式必须增加content-type
    },
});
// 添加一个请求拦截器
instance.interceptors.request.use(function (config) {
    config.data = qs.stringify(config.data);
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加一个响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;