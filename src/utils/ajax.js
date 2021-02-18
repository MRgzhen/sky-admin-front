import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { decrypt } from '@/utils/common'
import fileDownload from 'js-file-download'
import qs from 'qs'

// 创建axios实例
const ajax = axios.create({
    baseURL: process.env.VUE_APP_BASE_API // api的base_url
    // timeout: 5000 // 请求超时时间
})

// request拦截器
ajax.interceptors.request.use(config => {
    // Do something before request is sent
    if (!store.getters.token) {
        config.headers['Authorization'] = 'Basic eWFueXU6c2t5'
        // config.headers['tenantCode'] = config.data.tenantCode
    } else {
        config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
ajax.interceptors.response.use(
    response => {
        const res = response.data
        if (response.config.notHandler && response.config.notHandler === true) {
            return response.data
        } else {
            if (res.code !== '10000' && res.code !== '10001') {
                if (res.code === '401') {
                    store.dispatch('user/cleanUser').then(() => {
                        // 为了重新实例化vue-router对象 避免bug
                        // location.reload()
                    })
                } else {
                    Message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
                return Promise.reject('error')
            } else {
                if (res.code === '10001') {
                    const data = decrypt(response.data.bean.key)
                    return data
                } else {
                    return response.data
                }
            }
        }
    },
    error => {
        console.log('err' + error)// for debug
        Message({
            message: '请检查 API 是否异常',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject('error')
    })

export default {
    get(url, params = {}, notHandler = false) {
        return ajax.get(url, { params: params }, { notHandler: notHandler })
    },
    post(url, data = {}, notHandler = false) {
        return ajax.post(url, data, { notHandler: notHandler })
    },
    postForm(url, data = {}, notHandler = false) {
        return ajax.post(url, qs.stringify(data), { notHandler: notHandler })
    },
    postDecrypt(url, data = {}) {
        return ajax.post(url, data, {
            encrypt: '1'
        })
    },
    download(url, data = {}, fileName = 'skymt') {
        return ajax({
            method: 'post',
            url,
            data,
            responseType: 'arraybuffer',
            notHandler: true
        }).then(data => {
            console.log(data)
            fileDownload(data, fileName)
        })
    },
    _axios(config) {
        return ajax(config)
    }
}
