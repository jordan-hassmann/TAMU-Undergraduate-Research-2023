// React 
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailAuthCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

// antd
import { Input, Space, Spin } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Styles
import './styles.scss'






const LoginAlert = () => {

  return (
    <div className="login-alert">
      <FontAwesomeIcon icon='circle-xmark' />
      <span>Incorrect credentials</span>
    </div>
  )
}



const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)


  const login = e => {
    e.preventDefault()
    if (loading) return 

    setLoading(true)
    auth.currentUser
    ? navigate('/')
    : signInWithEmailAndPassword(auth, email, password)
      .catch(err => { setError(true); console.log(err)})
      .finally(() => setLoading(false))
  } 

  const updateEmail = e => {
    setError(false)
    setEmail(e.target.value)
  }
  const updatePassword = e => {
    setError(false)
    setPassword(e.target.value)
  }



  return (
    <div className="login-page">



      <div className="logo">
        <Space size='middle'>
          <h1>ReMatch</h1>
          <FontAwesomeIcon icon='hippo' size='3x' />
        </Space>
      </div>  
      


      <div className="form">
        

          <form>
            <Space direction='vertical' size={ 70 }>
            <h2>Login</h2>

            <Space direction='vertical'>
              <Input
                onChange={ updateEmail }
                className='email-field'
                size='large'
                placeholder="Email address"
              />
              <Input.Password
                onChange={ updatePassword }
                size='large'
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              />
              { error && <LoginAlert /> }
            </Space>

            <button className="login-button" onClick={ login }>
              <span>Login</span>
              { loading && <Spin indicator={ <LoadingOutlined spin /> } /> }
            </button>
            </Space>
          </form>

      </div>





    </div>
  )
}

export default LoginPage

