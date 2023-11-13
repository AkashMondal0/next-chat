import qs from 'query-string';
import axios from "axios"
import { User } from '@/interface/type';


const getGroupConversation = async (userId: string) => {
    const url = qs.stringifyUrl({
      url: "/api/chat/group/list",
      query: {
        userId: userId
      }
    });
    const res = await axios.get(url)
    return res.data
  }

interface CreateGroupConversationData {
    currentProfileId: string, 
    users: User["id"][],
    name: string
}
const createGroupConversation = async (data:CreateGroupConversationData) => {
    const url = qs.stringifyUrl({
        url: "/api/chat/group/create",
        query: {
            authorId: data.currentProfileId
        }
    });
    let res = await axios.post(url, data)
    return res
}

const sendGroupMessage = async (data: any) => {
  const url = qs.stringifyUrl({
    url: "/api/chat/group/message/send",
  });
  let res = await axios.post(url, data)
  return res
}

export {
    createGroupConversation,
    getGroupConversation,
    sendGroupMessage
}