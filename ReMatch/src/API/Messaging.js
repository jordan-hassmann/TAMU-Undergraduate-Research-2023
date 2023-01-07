

import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { auth } from "../firebase";
import { db } from '../firebase'



export const CreateChat = async (studentID, facultyID) => {
  return await addDoc(collection(db, 'Chats'), {
    studentID,
    facultyID, 
    hide: false,
  })
}

export const HideChat = async chatID => {
  return await updateDoc(doc(db, `Chats/${chatID}`), { hide: true })
}

export const UnhideChat = async chatID => {
  return await updateDoc((doc(db, `Chats/${chatID}`)), { hide: false })
}


export const SendMessage = async (message) => {
  // const chat = query(collection(db, 'Chats'), where('studentID', '==', message.studentID), where('facultyID', '==', message.facultyID))
  return await addDoc(collection(db, 'Messages'), message)
}

