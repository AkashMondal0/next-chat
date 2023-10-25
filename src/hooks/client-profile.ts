import { Conversation, Group, MessageDirect, User } from '@/interface/type'
import { create } from 'zustand'


type ProfileState = {
    state: User
    conversations: Conversation[]
    groups: Group[]
    setState: (data: User) => void
    setConversations: (data: Conversation[]) => void
    setGroups: (data: Group[]) => void
    updateConversation: (data: MessageDirect) => void
}

const useClientProfile = create<ProfileState>((set) => ({
    state: {
        id: '',
        userId: '',
        name: '',
        imageUrl: '',
        email: '',
        phone: '',
        status: '',
        notification: [],
        conversations: [],
        groups: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        SeenBy: [],
        GroupSeenBy: []
    },
    conversations: [],
    groups: [],
    setState: (data) => set((pre) => {
        return {
            state: {
                ...pre.state,
                id: data.id,
                userId: data.userId,
                name: data.name,
                imageUrl: data.imageUrl,
                email: data.email,
            }
        }
    }),
    setConversations: (data: Conversation[]) => set({ conversations: data }),
    setGroups: (data: Group[]) => set({ groups: data }),
    updateConversation: (data: MessageDirect) => set((pre) => {
        const index = pre.conversations.findIndex((item) => item.id === data.conversationId)
        const conversations = [...pre.conversations]
        const conversation = conversations[index]
        conversation.lastMessage = data.content
        conversation.lastMessageTime = data.createdAt
        conversation.messages.push(data)
        conversations[index] = conversation
        return { conversations }
    })
}))

export default useClientProfile