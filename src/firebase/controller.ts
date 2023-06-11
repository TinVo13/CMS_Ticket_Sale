import { addDoc, collection, doc, updateDoc, } from "firebase/firestore";
import { TicketPackage } from "../types/type";
import { db } from "./fbConfig";
import dayjs from "dayjs";

export const ticketPackageCollection = collection(db, "PackageTicket");
export const ticketEventPackageCollection = collection(db, "TicketEventPackage");
export const ticketFamilyPackageCollection = collection(db, "TicketFamilyPackage");
export const ticketCheckPackageCollection = collection(db, "TicketCheck");

export const addPackage = async (ticketpackage: TicketPackage) => {
    await addDoc(ticketPackageCollection, { ...ticketpackage })
        .then(() => {
            alert('Thêm gói vé thành công!');
        }).catch((err) => {
            alert('Thêm thất bại: ' + err);
        })
}

// Update document with ID "key" in collection "TicketFamilyPackage"
export const updateDateFamilyTicket = async (key: string, hanSuDung: string) => {
    const ref = doc(ticketFamilyPackageCollection, key);
    await updateDoc(ref, {
        ngaySuDung: hanSuDung
    }).then(() => {
        alert('Thành công!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}
// Update document with ID "key" in collection "TicketFamilyPackage"
export const updateStatusFamilyTicket = async (key: string) => {
    const ref = doc(ticketFamilyPackageCollection, key);
    await updateDoc(ref, {
        tinhTrangSuDung: 'Đã sử dụng'
    }).then(() => {
        alert('Cập nhật thành công!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}
// Update document with ID "key" in collection "TicketEventPackage"
export const updateDateEventTicket = async (key: string, hanSuDung: string) => {
    const ref = doc(ticketEventPackageCollection, key);
    await updateDoc(ref, {
        ngaySuDung: hanSuDung
    }).then(() => {
        alert('Thành công!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}
// Update document with ID "key" in collection "TicketEventPackage"
export const updateStatusEventTicket = async (key: string) => {
    const ref = doc(ticketEventPackageCollection, key);
    await updateDoc(ref, {
        tinhTrangSuDung: 'Đã sử dụng',
        ngaySuDung: dayjs().format('YYYY/MM/DD').toString()
    }).then(() => {
        alert('Cập nhật thành công!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}
export const updateTicketPackages = async (key: string, ticketPackage: TicketPackage) => {
    const ref = doc(ticketPackageCollection, key);
    await updateDoc(ref, {
        maGoi: ticketPackage.maGoi,
        tenGoiVe: ticketPackage.tenGoiVe,
        ngayApDung: ticketPackage.ngayApDung,
        ngayHetHan: ticketPackage.ngayHetHan,
        giaVe: ticketPackage.giaVe,
        giaCombo: ticketPackage.giaCombo,
        tinhTrang: ticketPackage.tinhTrang
    }).then(() => {
        alert('Cập nhật thành công!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}