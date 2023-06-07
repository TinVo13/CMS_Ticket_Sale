export interface TicketEventPackage {
    key?: string,
    bookingCode?: string,
    soVe?: number,
    tenSuKien?: string,
    tinhTrangSuDung?: any,
    ngaySuDung?: string,
    ngayXuatVe?: string,
    congCheckIn?: any
}
export interface TicketEventPackageType {
    key: string,
    bookingCode: string,
    soVe: number,
    tenSuKien: string,
    tinhTrangSuDung: string,
    ngaySuDung: string,
    ngayXuatVe: string,
    congCheckIn: string
}
export interface TicketFamilyPackageType {
    key: string,
    bookingCode: string,
    soVe: number,
    tinhTrangSuDung: string,
    ngaySuDung: string,
    ngayXuatVe: string,
    congCheckIn: string
}
export interface TicketFamilyPackage {
    key?: string,
    bookingCode?: string,
    soVe?: number,
    tinhTrangSuDung?: any,
    ngaySuDung?: string,
    ngayXuatVe?: string,
    congCheckIn?: any
}
export interface TicketChecks {
    key?: string,
    soVe?: string,
    ngaySuDung?: string,
    tenLoaiVe?: string,
    congCheckIn?: string,
    doiSoat?: any
}
export interface TicketCheckType {
    key: string,
    soVe: string,
    ngaySuDung: string,
    tenLoaiVe: string,
    congCheckIn: string,
    doiSoat: any
}

export interface TicketPackageType {
    key: string,
    maGoi: string,
    tenGoiVe: string,
    ngayApDung: string,
    ngayHetHan: string,
    giaVe: string,
    giaCombo: string,
    tinhTrang: string
}
export interface TicketPackage {
    key?: string,
    maGoi?: string,
    tenGoiVe?: string,
    ngayApDung?: string,
    ngayHetHan?: string,
    giaVe?: string,
    giaCombo?: string,
    tinhTrang?: string
}
export interface Data {
    used:number,
    unused:number
}