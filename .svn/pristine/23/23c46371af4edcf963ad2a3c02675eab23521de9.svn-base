import axios from 'axios'
import Vue from 'vue';
import {
    Message
} from 'element-ui';
import router from '../../router';
import {
    setToken,
    removeToken,
    setUser,
    getToken
} from './auth'
axios.defaults.headers.common['application'] = 'manager' // 让每个请求携带自定义token 请根据实际情况自行修改
axios.defaults.headers.common['Content-Type'] - 'application/x-www-form-urlencoded' // 自定义通用头部
// axios.defaults.baseURL = 'http://192.168.1.134:8802/'
axios.defaults.timeout = 10000 // 超出当前时间请求将中止

// request拦截器
axios.interceptors.request.use(
    config => {
        // 在发送之前做些什么
        const token = localStorage.getItem('userToken');
        if (token) {

            config.headers['UserToken'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        // Do something with 请求错误
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
axios.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code != 0 && res.code!=null) {
            // Token 过期了;
            if (res.code == 301) {
                // Message.error(res.Message)
                localStorage.removeItem("userToken");
                router.push('/login');
            } else {
                Message.error(res.Message)
            }
            return Promise.reject(res.Message);
        } else {
            return res;
        }
    },
    error => {
        // 响应失败的时候
        console.log('err' + error) // for debug
        Message.error('网络错误')
        return Promise.reject(error)
    }
)

export default function fetch(url, method, data) {
    return new Promise((resolve, reject) => {
        if (method === 'get' || method === 'GET') {
            axios.get(url, {
                params: data
            })
                .then(response => {
                    resolve(response)
                }, err => {
                    reject(err)
                })
        } else {
            axios({
                method,
                url,
                data
            })
                .then(response => {
                    resolve(response)
                }, err => {
                    reject(err)
                })
        }
    })
}
