import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../../firebase"

const SignIn = () => {

  const authenticate = () => {

    signInWithEmailAndPassword(auth, 'johnsmith@gmail.com', 'password')
    .then(userCredential => {

      // Signed In
      const user = userCredential.user
      console.log('The user below just signed in!')
      console.log(user)
      
    })
    .catch(err => console.log(err.code, err.message))

  }

  const signout = () => {
    signOut(auth)
    .then(() => console.log("Successful signout"))
    .catch(err => console.log(err))
  }

  return (
    <button className="sign-in" onClick={ signout }>Sign In!</button>
  )
}

export default SignIn