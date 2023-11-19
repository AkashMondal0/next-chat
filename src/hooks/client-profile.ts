import { GroupMessageSeenSocket } from '@/app/api/chat/group/message/seen/route'
import { Conversation, Group, GroupMessage, MessageDirect, User } from '@/interface/type'
import { create } from 'zustand'

const _state = {
    id: '',
    cloudMessageId: '',
    name: '',
    imageUrl: '',
    email: '',
    phone: '',
    status: '',
    notification: [],
    conversations: [],
    groups: [],
    userHistory: [],
    createdAt: new Date(),
    updatedAt: new Date(),
}
type ProfileState = {
    state: User
    loginToken: string
    setLoginToken: (data: string) => void
    conversations: Conversation[]
    groups: Group[]
    setState: (data: User) => void
    setConversations: (data: Conversation[]) => void
    setGroups: (data: Group[]) => void
    updateConversation: (data: MessageDirect) => void
    conversationMessageSeen: (conversationId: string, data: string[]) => void
    updateGroupMessages: (data: GroupMessage) => void
    groupMessageSeen: (data: GroupMessageSeenSocket) => void
    logout: () => void
}

const useClientProfile = create<ProfileState>((set) => ({
    state: _state,
    loginToken: '',
    conversations: [],
    groups: [],
    setLoginToken: (data) => set({ loginToken: data }),
    setState: (data) => set((pre) => {
        return {
            state: {
                ...pre.state,
                id: data.id,
                name: data.name,
                imageUrl: data.imageUrl,
                email: data.email,
            }
        }
    }),
    setConversations: (data: Conversation[]) => set({ conversations: data }),
    setGroups: (data: Group[]) => set({ groups: data }),
    updateConversation: (data: MessageDirect) => set((pre) => {
        const updatedConversations = pre.conversations.map((conversation) => {
            if (conversation.id === data.conversationId) {
                if (!conversation.messages.find((message) => (message.id === data.id))) {
                    conversation.messages.push(data)
                    conversation.lastMessage = data.content
                    conversation.updatedAt = new Date()
                }
            }
            return conversation
        })
        return { conversations: updatedConversations }
    }),
    conversationMessageSeen: (conversationId: string, data: string[]) => set((pre) => {
        const updatedConversations = pre.conversations.map((conversation) => {
            if (conversation.id === conversationId) {
                conversation.messages.map((message) => {
                    if (data.find((id) => (id === message.id))) {
                        message.deleted = true
                    }
                    return message
                })
            }
            return conversation
        })
        return { conversations: updatedConversations }
    }),
    logout: () => set({
        state: _state,
        loginToken: '',
        conversations: [],
        groups: [],
    }),
    // update message in conversation
    updateGroupMessages: (data: GroupMessage) => set((pre) => {
        const updated_group = pre.groups.map((group) => {
            if (group.id === data.groupId) {
                if (!group.messages.find((message) => (message.id === data.id))) {
                    group.messages.push(data)
                    group.lastMessage = data.content
                    group.updatedAt = new Date()
                }
            }
            return group
        })
        return { groups: updated_group }
    }),
    groupMessageSeen: (data: GroupMessageSeenSocket) => set((pre) => {
        const updatedConversations = pre.groups.map((group) => {
            if (group.id === data.groupId) {
                group.messages.map((message) => {
                    if (data.messageIds.find((id) => (id === message.id))) {
                        if(!message.seenBy?.includes({ userId: data.seenUserId })){
                            message.seenBy?.push({ userId: data.seenUserId })
                        }
                    }
                    return message
                })
            }
            return group
        })
        return { groups: updatedConversations }
    }),
}))
export default useClientProfile