import { Conversation, Group, User } from '@/interface/type'
import { create } from 'zustand'


type ProfileState = {
    data: User | null
    conversations: Conversation[]
    groups: Group[]
    setData: (data: User) => void
    setConversations: (data: Conversation[]) => void
    setGroups: (data: Group[]) => void
}

const useClientProfile = create<ProfileState>((set) => ({
    data: null,
    conversations: [],
    groups: [],
    setData: (data: User) => set({ data: data }),
    setConversations: (data: Conversation[]) => set({ conversations: data }),
    setGroups: (data: Group[]) => set({ groups: data })
}))

export default useClientProfile