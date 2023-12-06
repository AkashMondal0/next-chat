import { Conversation, MessageDirect, User } from '@/interface/type';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface conversationState {
    conversation:Conversation[] | null;
}

const initialState: conversationState = {
    conversation: null,
}

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setConversation: (state, action: PayloadAction<Conversation[]>) => {
            state.conversation = action.payload;
        },
        insertMessageToConversation: (state, action: PayloadAction<{message: MessageDirect}>) => {
            state.conversation?.map((conversation) => {
                if (conversation.id === action.payload.message.conversationId) {
                    if (!conversation.messages.find((message) => (message.id === action.payload.message.id))) {
                        conversation.messages.push(action.payload.message)
                        conversation.lastMessage = action.payload.message.content
                        conversation.updatedAt = new Date()
                    }
                }
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setConversation,
    insertMessageToConversation,
} = conversationSlice.actions

export default conversationSlice.reducer