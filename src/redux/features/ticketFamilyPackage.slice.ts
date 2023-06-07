import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {TicketFamilyPackage} from '../../types/type';
import { updateDateFamilyTicket } from '../../firebase/controller';

const ticketFamilyPackage:TicketFamilyPackage = {
    bookingCode:'',
    congCheckIn:'',
    key:'',
    ngaySuDung:'',
    ngayXuatVe:'',
    soVe:0,
    tinhTrangSuDung:''
}
const initialTicketFamilyState:TicketFamilyPackage[] = [
    ticketFamilyPackage
]
interface TicketFamilyPackageState {
    ticketEventList: TicketFamilyPackage[]
}
const initialState:TicketFamilyPackageState = {
    ticketEventList: initialTicketFamilyState
}
const ticketFamilyPackageSlice = createSlice({
    name:'ticketFamilyPackage',
    initialState,
    reducers:{
        getTicketFamilyPackage:(state,action:PayloadAction<{list:TicketFamilyPackage[]}>)=>{
            state.ticketEventList = action.payload.list;
        },
        updateTicketFamilyPackage:(state,action:PayloadAction<{key:string,hanSuDung:string}>)=>{
            const id = action.payload.key;
            state.ticketEventList.some((ticketFamily,index)=>{
                if(ticketFamily.key === id){
                    state.ticketEventList[index].ngaySuDung = action.payload.hanSuDung;
                    updateDateFamilyTicket(id,action.payload.hanSuDung);
                    return true;
                }
                return false;
            })
        },
        updateStatusFamilyPackage:(state,action:PayloadAction<{key:string}>)=>{
            const id = action.payload.key;
            state.ticketEventList.some((data,index)=>{
                if(data.key === id){
                    state.ticketEventList[index].tinhTrangSuDung = 'Đã sử dụng';
                    return true;
                }
                return false;
            })
        }
    }
})
export const {getTicketFamilyPackage,updateTicketFamilyPackage,updateStatusFamilyPackage} = ticketFamilyPackageSlice.actions;
export default ticketFamilyPackageSlice.reducer;