import { Conversation, Group, User } from '@/interface/type'
import { create } from 'zustand'


type ProfileState = {
    state: User
    conversations: Conversation[]
    groups: Group[]
    setState: (data: User) => void
    setConversations: (data: Conversation[]) => void
    setGroups: (data: Group[]) => void
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
    setState: (data) => set((pre)=>{
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
    setGroups: (data: Group[]) => set({ groups: data })
}))

export default useClientProfile