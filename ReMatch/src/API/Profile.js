

import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase'



export const UpdateStudent = async (studentID, updates) => {
  return await updateDoc(doc(db, `Students/${studentID}`), { ...updates })
}

export const CreateStudent = async student => {
  const user = await createUserWithEmailAndPassword(auth, student.email, student.password)
  return await setDoc(doc(db, 'Students', user.user.uid), {
    name: 'New User',
    headline: '<headline>',
    minPay: 10000,
    pay: true, 
    pitch: 'Lorem ipsum',
    favorites: [], 
    duration: [null, null],
    skills: []
  })
}

export const CreateFaculty = async faculty => {
  return await setDoc(doc(db, 'Faculty', faculty.name), faculty)
}