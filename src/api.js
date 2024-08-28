import axios from "axios";
import {data} from "autoprefixer";

const route = import.meta.env.VITE_API_URl;

const url = axios.create({
    baseURL: route,
})

url.interceptors.response.use((response) => {
    return response;
}, (res) => {
    if (res.response.status === 401) {
        const origin = new URL(location.href).origin;

        if (origin+'/'===window.location.href)
            return;

        localStorage.removeItem("token");
        window.location.href = origin;
    }

    return Promise.reject(res);
})

if (localStorage.getItem("token"))
    url.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export function login(data) {
    return url.post('/login', data)
        .then(res => {
            url.defaults.headers.common['Authorization'] = "Bearer " + res.data.authorisation.token;
            localStorage.setItem("token", res.data.authorisation.token);

            return res.data;
        }).catch(res => {
            return Promise.reject(res);
        });
}

export function registerUser(data) {
    return url.post('/register', data)
}

export function onlineUser() {
    return url.get('onlines');
}

export function sendUserMessage(data) {
    return url.post('chats', data)
}