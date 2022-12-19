import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const SignIn = () => {

  const authenticate = () => {

    const auth = getAuth()
    signInWithEmailAndPassword(auth, 'johnsmith@gmail.com', 'password')
    .then(userCredential => {

      // Signed In
      const user = userCredential.user
      console.log('The user below just signed in!')
      console.log(user)
      
    })
    .catch(err => console.log(err.code, err.message))

  }

  return (
    <button className="sign-in" onClick={ authenticate }>Sign In!</button>
  )
}

export default SignIn