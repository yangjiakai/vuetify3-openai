import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.unsplash.com",
    timeout: 1000,
});


export const getUsers = (query: string) => {
    return instance.get(`/user?q=${query}`)
}