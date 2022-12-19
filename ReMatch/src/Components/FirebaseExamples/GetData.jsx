import { collection, getDocs, getDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/config"


const GetData = () => {

  const fetchData = async () => {

    // Fetch a collection of data
    await getDocs(collection(db, 'example_collection'))
    .catch(err => console.log(err))
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(`Doc ID: ${doc.id}`)
        console.log(doc.data())
      })
    })


    // Fetch a specific doc from a collection 
    await getDoc(doc(db, 'example_collection', 'oV6mhOgmzCt7ydsRaigo'))
    .catch(err => console.log(err))
    .then(doc => {
      console.log(`Doc ID: ${doc.id}`)
      console.log(doc.data())
    })
  }



  return (
    <button className="get-data" onClick={ fetchData }>Get Data!</button>
  )
}

export default GetData