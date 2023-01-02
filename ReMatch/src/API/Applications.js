

import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";


export const UploadResume = async (file, projectID) => {
  const fileRef = ref(storage, `resumes/${projectID}/${file.name}`)
  await uploadBytes(fileRef, file)
  .catch(err => console.log(err))
  const url = await getDownloadURL(fileRef)
  return url
}


export const SumbitApplication = async (application, resume) => {
  application.resumeURL = await UploadResume(resume, application.projectID)
  return await addDoc(collection(db, 'Applications'), application)
}




export const RevokeApplication = async application => {
  await deleteObject(ref(storage, `resumes/${application.projectID}/${application.filename}`))
  .catch(err => console.log(err))
  return await deleteDoc(doc(db, `Applications/${application.id}`))
}