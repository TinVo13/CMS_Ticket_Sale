import { addDoc, collection, doc, getCountFromServer, query, updateDoc, where, } from "firebase/firestore";
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
        tinhTrangSuDung: 'Đã sử dụng'
    }).then(() => {
        alert('Cập nhật thành công 1!');
    }).catch((err) => {
        alert('Lỗi: ' + err);
    })
}
export const getUnusedTicketFamilyPackage = async () => {
    const q = query(ticketFamilyPackageCollection, where("tinhTrangSuDung", "==", "Chưa sử dụng"));
    const snapshot = await getCountFromServer(q);
    let count: number = snapshot.data().count;
    return count;
}
export function getUsedTicketFamilyPackage() {
    async function callAsync() {
        const q = query(ticketFamilyPackageCollection, where("tinhTrangSuDung", "==", "Đã sử dụng"));
        return (await getCountFromServer(q)).data().count;
    }
    callAsync();
}