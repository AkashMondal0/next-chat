import qs from 'query-string';
import axios from "axios"
import { getCookie } from 'cookies-next';
import { User } from '@/interface/type';
const token = getCookie('profile')

const getUserData = async () => {
    const url = qs.stringifyUrl({
        url: "/api/profile",
        query: {
            userId: token,
        }
    });
    const data = await axios.get(url)
    return data.data
}

const getUserConversation = async () => {
    const url = qs.stringifyUrl({
        url: "/api/chat/direct/list",
        query: {
            userId: token,
        }
    });
    const res = await axios.get(url)
    return res.data
}

const getSearchUser = async () => {
    const res = await axios.post('/api/users');
    return res.data;
}

const updateProfileCloudMessageId = async (id: string) => {
    const url = qs.stringifyUrl({
        url: "/api/profile/update",
        query: {
            userId: token,
            cloudId: id
        }
    });
    const res = token && await axios.patch(url) || { data: null }
    return res.data
}
interface PushNotification {
    registrationToken: string,
    title: string,
    body: string,
    imageUrl: string
}
const pushNotification = async (data:PushNotification) => {
    const url = "http://localhost:3003/cloudMessage"
    const res = await axios.post(url, data)
    return res.data
}

export {
    getUserData,
    getUserConversation,
    getSearchUser,
    updateProfileCloudMessageId,
    pushNotification
}