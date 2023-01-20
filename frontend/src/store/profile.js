import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
    name: 'info',
    initialState: {
        users: [],
    },
    reducers: {
        getUserInfo(state, action) {
            const user = action.payload;
            state.users.push({
                userId: user.id,
                nickname: user.nickname
            })
        }
    }
})

export const infoActions = infoSlice.actions;
export default infoSlice;