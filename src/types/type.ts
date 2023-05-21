export interface EventTicketType {
    key: string,
    bookingCode: string,
    soVe: number,
    tenSuKien: string,
    tinhTrangSuDung: string,
    ngaySuDung: string,
    ngayXuatVe: string,
    congCheckIn: string
  }
export interface TicketCheckType{
    key:string,
    soVe: string,
    ngaySuDung: string,
    tenLoaiVe: string,
    congCheckIn: string,
    doiSoat:string
}
export interface TicketType{
    key:string,
    maGoi:string,
    tenGoiVe:string,
    ngayApDung:string,
    ngayHetHan:string,
    giaVe:string,
    giaCombo:string,
    tinhTrang:string
}