import { TicketPackage } from "../../types/type";
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addPackage } from "../../firebase/controller";

interface TicketPackageState {
    settingList: TicketPackage[],
}
const ticketPackage = {
    giaCombo: '',
    giaVe: '',
    key: '',
    maGoi: '',
    ngayApDung: '',
    ngayHetHan: '',
    tenGoiVe: '',
    tinhTrang: ''
}
const initalTicketPackage: TicketPackage[] = [
    ticketPackage
]
const initialState: TicketPackageState = {
    settingList: initalTicketPackage
}
const ticketPackageSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        getListTicketPackage: (state,action:PayloadAction<{list:TicketPackage[]}>) => {
            state.settingList = action.payload.list;
        },
        addTicketPackage: (state, action: PayloadAction<{ ticketPackage: TicketPackage }>) => {
            state.settingList.push(action.payload.ticketPackage);
            addPackage(action.payload.ticketPackage);
        }
    }
})
export const { getListTicketPackage, addTicketPackage } = ticketPackageSlice.actions;
export default ticketPackageSlice.reducer;