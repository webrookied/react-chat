import axios from 'axios'
// console.log(process.env.REACT_APP_URL)
export const http = axios.create({
  baseURL: 'https://api-haoke-web.itheima.net',
  timeout: 20000,
})

/**@name 请求拦截器 */
// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 请求之前做些什么
    //挂载token
    // 开启加载条
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    //关闭加载条

    //访客提示
    if (response.data.statu === 403) {
    }
    //登录失效
    if (response.data.statu === 401) {
    }
    return response
  },
  function (error) {
    // 对响应错误做点什么
    //响应错误时状态码对应的问题
    if (error.response) {
      return error.response.data
    } else {
      return Promise.reject(error)
    }
  }
)

/**
 * @description:get请求
 * @param {url:请求路径,params:请求参数（object）}
 * @return {*}
 */

export const GETHttp = async (url?: any, params?: any) => {
  return await http.get(url, { params })
}

/**
 * @description:post请求
 * @param {url:请求路径,params:请求参数（object）}
 * @return {*}
 */

export const POSTHttp = async (url, params) => {
  return await http.post(url, params)
}
/**
 * @description:put请求
 * @param {url:请求路径,params:请求参数（object）}
 * @return {*}
 */

export const PUTHttp = async (url, params) => {
  return await http.put(url, params)
}
/**
 * @description:delete请求
 * @param {url:请求路径,params:请求参数（object）}
 * @return {*}
 */
export const DELEeteHttp = async (url, params) => {
  return await http.delete(url, { params })
}
/**
 * @description:PATCHHttp
 * @param {url:请求路径,params:请求参数（object）}
 * @return {*}
 */
export const PATCHHttp = async (url, params) => {
  return await http.patch(url, params)
}
