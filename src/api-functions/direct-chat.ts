import qs from 'query-string';
import axios from "axios"
import { MessageDirect, typingState } from '@/interface/type';
import socket from '@/lib/socket';

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

const addFriendToConversation = async (currentProfileId: string, receiverId: string) => {
  const url = qs.stringifyUrl({
    url: "/api/chat/direct/create",
    query: {
      senderId: currentProfileId
    }
  });
  let res = await axios.post(url, { receiverId })
  return res
}

const sendMessage = async (data: MessageDirect, receiverId: string) => {
  const url = qs.stringifyUrl({
    url: "/api/chat/direct/message/send",
    query: {
      receiverId: receiverId,
    }
  });
  let res = await axios.post(url, data)
  return res
}

const isTyping = (data: typingState) => {
  socket.emit('_typing', data)
}

const stopTyping = (data: typingState) => {
  socket.emit('_typing', data)
}


export {
  getUserConversation,
  addFriendToConversation,
  sendMessage,
  isTyping,
  stopTyping
}