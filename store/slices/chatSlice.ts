import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Message {
    id: string | number;
    text: string;
    senderId: string | number;
}

interface ChatState {
    messages: Message[];
}

const initialState: ChatState = {
    messages: [],
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        receiveMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    }
})

export const {receiveMessage, clearMessages} = chatSlice.actions;
export default chatSlice.reducer;