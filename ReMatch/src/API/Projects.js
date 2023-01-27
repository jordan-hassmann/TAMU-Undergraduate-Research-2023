

import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase'
import { serverTimestamp } from "firebase/firestore";


export const CreateProject = async project => {
  return await addDoc(collection(db, 'Projects'), {...project, timestamp: serverTimestamp() })
}