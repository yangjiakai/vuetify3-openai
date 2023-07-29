import md5 from 'crypto-js/md5'
import { useAuthStore } from '@/stores/authStore'
import axios, { type AxiosResponse } from 'axios'

const service = axios.create({
    // baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    baseURL: 'https://crossentropy.asia',
})

service.interceptors.request.use(
    (config) => {
        const token = useAuthStore().token
        if (token)
            config.headers.Authorization = `${token}`

        return config
    },
    (error) => {
        return Promise.reject(error.response)
    },
)


service.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        if (response.status === 200)
            return response.data
        if (response.status === 403) {
            useAuthStore().removeToken()
            window.location.reload()
        }

        throw new Error(response.status.toString())
    },
    (error) => {
        return Promise.reject(error)
    },
)



// 获取验证码
export const getVerifyCode = (phone: string) => {
    return service.post('/api/v1/auth/verify', {
        user_id: phone,
    })
}

// 登录
export const login = (phone: string, password: string) => {

    const encryptedPassword = md5(password).toString()


    // return service.post('api/login_separate', {
    //     user_id: phone,
    //     password: encryptedPassword,
    // })

    return service.post('api/login_separate', {
        user_id: phone,
        password: encryptedPassword,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export interface RegisterParams {
    phone: string
    validCode: string
    password: string
}

// 注册
export const register = ({ phone, validCode, password }: RegisterParams) => {
    const encryptedPassword = md5(password).toString()
    return service.post('/api/user_register', {
        reg_type: 'phone',
        valid_code: validCode,
        user_id: phone,
        password: encryptedPassword,
    })
}


