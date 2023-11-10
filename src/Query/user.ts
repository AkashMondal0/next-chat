import qs from 'query-string';
import axios from "axios"
import { getCookie, setCookie } from 'cookies-next';
import { login_credential, register_credential } from '@/interface/type';
const token = getCookie('profile')

const getUserConversation = async (userId: string) => {
    const url = qs.stringifyUrl({
        url: "/api/chat/direct/list",
        query: {
            userId: userId
        }
    });
    const res = await axios.get(url)
    return res.data
}

const getSearchUser = async () => {
    const res = await axios.post('/api/users');
    return res.data;
}

// const updateProfileCloudMessageId = async (id: string) => {
//     const url = qs.stringifyUrl({
//         url: "/api/profile/update",
//         query: {
//             userId: token,
//             cloudId: id
//         }
//     });
//     const res = token && await axios.patch(url) || { data: null }
//     return res.data
// }
// interface PushNotification {
//     registrationToken: string,
//     title: string,
//     body: string,
//     imageUrl: string
// }
// const pushNotification = async (data: PushNotification) => {
//     const url = "http://localhost:3003/cloudMessage"
//     const res = await axios.post(url, data)
//     return res.data
// }

const userLogin = async (data: login_credential) => {
    const res = await axios.post('/api/authentication/login', data)
    setCookie("profile", res.data, {
        maxAge: 60 * 60,
    })
    if (res.status === 401) {
        return new Error("email incorrect")
    } else {
        return res.data
    }
}
const userRegister = async (data: register_credential) => {
    const res = await axios.post('/api/authentication/register', data)
    setCookie("profile", res.data, {
        maxAge: 60 * 60,
    })
    return res.data
}
const userLogout = async () => {
    const res = await axios.post('/api/authentication/logout')
    return res.data
}
const userData = async () => {
    const url = qs.stringifyUrl({
        url: "/api/authentication/authorize",
        query: {
            token: token
        }
    });
    const res = await axios.get(url)
    return res.data
}

export {
    // getUserData,
    getUserConversation,
    getSearchUser,
    // updateProfileCloudMessageId,
    // pushNotification,
    userLogin,
    userRegister,
    userLogout,
    userData
}