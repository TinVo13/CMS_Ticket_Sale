export interface TicketEventPackage {
    key?: string,
    bookingCode?: string,
    soVe?: number,
    tenSuKien?: string,
    tinhTrangSuDung?: any,
    ngaySuDung?: string,
    ngayXuatVe?: string,
    congCheckIn?: string
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
    congCheckIn?: string
}
export interface TicketCheckType {
    key?: string,
    soVe?: string,
    ngaySuDung?: string,
    tenLoaiVe?: string,
    congCheckIn?: string,
    doiSoat?: string
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