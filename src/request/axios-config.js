import Axios from 'axios'
import NProgress from 'nprogress'
import { Notify } from '../compotents'
import '../assets/css/myNprogress.css'
// Axios.defaults.baseURL = 'http://192.168.2.30:8888'
Axios.interceptors.request.use(config => {
    NProgress.start();
    return config;
}, (err) => {
    // 对请求错误做点什么
    NProgress.done();
    Notify({ type: "error", message: "请求失败" })
    return Promise.reject(err);
})
Axios.interceptors.response.use(config => {
    NProgress.done();
    return config;
}, (err) => {
    // 对响应错误做点什么
    NProgress.done();
    Notify({ type: "error", message: "服务器发生错误" })
    return Promise.reject(err);
})

export default Axios;