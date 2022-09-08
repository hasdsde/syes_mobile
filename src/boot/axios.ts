import {boot} from 'quasar/wrappers';
import axios, {AxiosInstance} from 'axios';
import {CommFail} from "components/common";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}
declare module "axios" {
    interface AxiosResponse<T = any> {
        code: any;
        msg: any;
        data: T;
        // 这里追加你的参数
    }
}
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({baseURL: 'http://192.168.0.106:8000'});

export default boot(({app}) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API

    //请求拦截器
    api.interceptors.request.use(
        (config) => {
            if (localStorage.getItem("token") == null) {
                window.location.href = "/#/login"
            } else {
                let token: any = localStorage.getItem('token');
                token = token.substring(1, token.length - 1);
                config.headers.token = token
            }
            return config
        },
        err => {
            return Promise.reject(err)
        }
    )
    //相应拦截器
    api.interceptors.response.use(
        res => {
            if (res.data.code === '200') {
                return res.data
            } else {
                CommFail(res.data.msg)
            }
            if (res.data.code === '499') {
                CommFail('请重新登录')
                window.location.href = "/#/login"
            }
        }
    )
});

export {api};
