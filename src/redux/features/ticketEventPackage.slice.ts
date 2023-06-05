import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TicketEventPackage } from "../../types/type";
import { updateDateEventTicket, updateStatusEventTicket } from "../../firebase/controller";

interface TicketEventPackageState {
    ticketEventList: TicketEventPackage[]
}
const ticketEventPackage:TicketEventPackage = {
    bookingCode:'',
    congCheckIn:'',
    key:'',
    ngaySuDung:'',
    ngayXuatVe:'',
    soVe:0,
    tenSuKien:''
}
const initialTicketEventState:TicketEventPackage[] = [
    ticketEventPackage
]
const initialState: TicketEventPackageState = {
    ticketEventList: initialTicketEventState
}

const ticketEventPackageSlice = createSlice({
    name:'ticketEventPackage',
    initialState,
    reducers:{
        getListTicketEventPackage:(state,action:PayloadAction<{list:TicketEventPackage[]}>)=>{
            state.ticketEventList = action.payload.list;
        },
        updateDateTicketEventPackage:(state,action:PayloadAction<{key:string,hanSuDung:string}>)=>{
            const id = action.payload.key;
            state.ticketEventList.some((ticketEvent,index)=>{
                if(ticketEvent.key === id){
                    state.ticketEventList[index].ngaySuDung = action.payload.hanSuDung
                    updateDateEventTicket(id,action.payload.hanSuDung);
                    return true;
                }
                return false;
            })
        },
        updateStatusTicket:(state,action:PayloadAction<{key:string}>)=>{
            const id = action.payload.key;
            state.ticketEventList.some((ticketEvent,index)=>{
                if(ticketEvent.key === id){
                    state.ticketEventList[index].tinhTrangSuDung = 'Đã sử dụng';
                    updateStatusEventTicket(id);
                    return true;
                }
                return false;
            })
        }
    }
})

export const {getListTicketEventPackage,updateDateTicketEventPackage,updateStatusTicket} = ticketEventPackageSlice.actions;
export default ticketEventPackageSlice.reducer;