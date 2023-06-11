import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TicketPackage } from "../../types/type";

const initialState:TicketPackage = {
    key:'',
    giaCombo:'',
    giaVe:'',
    maGoi:'',
    ngayApDung:'',
    ngayHetHan:'',
    tenGoiVe:'',
    tinhTrang:''
}
export const editTicketPackageSlice = createSlice({
    name:'editTicketPackage',
    initialState,
    reducers:{
        editTicketPackage:(state,action:PayloadAction<{ticketPackage:TicketPackage}>)=>{
            state.giaCombo = action.payload.ticketPackage.giaCombo
            state.giaVe = action.payload.ticketPackage.giaVe
            state.key = action.payload.ticketPackage.key
            state.maGoi = action.payload.ticketPackage.maGoi
            state.ngayApDung = action.payload.ticketPackage.ngayApDung
            state.ngayHetHan = action.payload.ticketPackage.ngayHetHan
            state.tenGoiVe = action.payload.ticketPackage.tenGoiVe
            state.tinhTrang = action.payload.ticketPackage.tinhTrang
        }
    }
})
export const {editTicketPackage} = editTicketPackageSlice.actions;
export default editTicketPackageSlice.reducer;