

import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase'



export const UpdateStudent = async (studentID, updates) => {
  return await updateDoc(doc(db, `Students/${studentID}`), { ...updates })
}