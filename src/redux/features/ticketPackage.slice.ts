import { TicketPackage, TicketPackageType } from "../../types/type";
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addPackage, updateTicketPackages } from "../../firebase/controller";

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
        },
        updateTicketPackage: (state,action:PayloadAction<{key:string,ticketPackage:TicketPackageType}>)=>{
            let id = action.payload.key;
            state.settingList.some((data,index)=>{
                if(data.key === id){
                    state.settingList[index].maGoi = action.payload.ticketPackage.maGoi;
                    state.settingList[index].tenGoiVe = action.payload.ticketPackage.tenGoiVe;
                    state.settingList[index].ngayApDung = action.payload.ticketPackage.ngayApDung;
                    state.settingList[index].ngayHetHan = action.payload.ticketPackage.ngayHetHan;
                    state.settingList[index].giaCombo = action.payload.ticketPackage.giaCombo;
                    state.settingList[index].giaVe = action.payload.ticketPackage.giaVe;
                    state.settingList[index].tinhTrang = action.payload.ticketPackage.tinhTrang;
                    updateTicketPackages(id,action.payload.ticketPackage);
                    return true;
                }
                return false;
            })
        }
    }
})
export const { getListTicketPackage, addTicketPackage,updateTicketPackage } = ticketPackageSlice.actions;
export default ticketPackageSlice.reducer;