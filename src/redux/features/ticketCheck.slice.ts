import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TicketChecks } from "../../types/type";

interface TicketCheckState {
    ticketCheckList: TicketChecks[]
}
const ticketCheck:TicketChecks = {
    congCheckIn:'',
    doiSoat:'',
    key:'',
    ngaySuDung:'',
    soVe:'',
    tenLoaiVe:''
}
const initalTicketCheck: TicketChecks[] = [
    ticketCheck
]
const initialState: TicketCheckState = {
    ticketCheckList: initalTicketCheck
}
const ticketCheckSlice = createSlice({
    name:'ticketCheck',
    initialState,
    reducers:{
        getTicketCheck:(state,action:PayloadAction<{list:TicketChecks[]}>)=>{
            state.ticketCheckList = action.payload.list;
        }
    }
})
export const {getTicketCheck} = ticketCheckSlice.actions;
export default ticketCheckSlice.reducer;