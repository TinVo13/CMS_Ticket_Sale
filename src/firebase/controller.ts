import {  addDoc, collection, doc, updateDoc, } from "firebase/firestore";
import { TicketPackage } from "../types/type";
import { db } from "./fbConfig";

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

export const updateDateTicket = async (key: string, hanSuDung: string) => {
    // Update document with ID "key" in collection "TicketFamilyPackage"
    const ref = doc(ticketFamilyPackageCollection, key);
    await updateDoc(ref, {
        ngaySuDung: hanSuDung
    }).then(() => {
        alert('Thành công!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}
export const updateStatusTicket = async (key: string) => {
    // Update document with ID "key" in collection "TicketFamilyPackage"
    const ref = doc(ticketFamilyPackageCollection, key);
    await updateDoc(ref, {
        tinhTrangSuDung: 'Đã sử dụng'
    }).then(() => {
        alert('Cập nhật thành công!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}
export const updateDateEventTicket = async (key: string, hanSuDung: string) => {
    // Update document with ID "key" in collection "TicketFamilyPackage"
    const ref = doc(ticketEventPackageCollection, key);
    await updateDoc(ref, {
        ngaySuDung: hanSuDung
    }).then(() => {
        alert('Thành công!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}
export const updateStatusEventTicket = async (key: string) => {
    // Update document with ID "key" in collection "TicketFamilyPackage"
    const ref = doc(ticketEventPackageCollection, key);
    await updateDoc(ref, {
        tinhTrangSuDung: 'Đã sử dụng'
    }).then(() => {
        alert('Cập nhật thành công 1!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}