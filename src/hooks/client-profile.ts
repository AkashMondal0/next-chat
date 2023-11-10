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
    conversationMessageSeen: (conversationId: string, data: string[]) => void
}

const useClientProfile = create<ProfileState>((set) => ({
    state: {
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
    })
    // update message in conversation

}))
export default useClientProfile