import qs  from 'query-string';
import axios from "axios"
import { getCookie } from 'cookies-next';
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

export {
    getUserData,
    getUserConversation,
    getSearchUser
}