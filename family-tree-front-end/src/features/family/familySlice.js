import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    value: {}
}

const familyTreeSlice = createSlice({
    name: "FamilyTree",
    initialState,
    reducers: {
        getFamily: (state, action) => {
            state.value = action.payload;
        },
        updateFamily: (state = initialState, action) => {
            state.value.members = [...state.value.members, action.payload];
        },
        deleteMember: (state, action) => {
            state.value.members = state.value.members.filter((element) => element.member.id !== action.payload)
        },
        updateMember: (state, action) => {
            console.log(action.payload)
            state.value.members = [
                ...state.value.members.filter((element) => element.member.id !== action.payload.member.id),
                action.payload
            ]
        }
    }
})

export default familyTreeSlice;



