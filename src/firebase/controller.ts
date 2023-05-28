import { addDoc, collection, } from "firebase/firestore";
import { TicketPackageType } from "../types/type";
import { db } from "./fbConfig";

export const ticketPackageCollection = collection(db, "PackageTicket");
export const addPackage = async (ticketpackage:TicketPackageType) => {
    try{
        await addDoc(ticketPackageCollection,{...ticketpackage})
    }catch(err){
        console.log(err);
    }
}
export const ticketEventPackageCollection = collection(db,"TicketEventPackage");
export const ticketFamilyPackageCollection = collection(db,"TicketFamilyPackage");
export const ticketCheckPackageCollection = collection(db,"TicketCheck");