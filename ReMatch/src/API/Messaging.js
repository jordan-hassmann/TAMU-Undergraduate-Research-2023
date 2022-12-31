

import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase'



export const CreateChat = async (studentID, facultyID) => {
  return await addDoc(collection(db, 'Chats'), {
    studentID,
    facultyID
  })
}


export const SendMessage = async (message) => {
  return await addDoc(collection(db, 'Messages'), message)
}

