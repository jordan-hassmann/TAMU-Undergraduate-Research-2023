// React 
import { useNavigate } from 'react-router-dom'

// antd
import { Input, Space } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Styles
import './styles.scss'



const LoginPage = () => {
  const navigate = useNavigate()

  const login = () => {
    navigate('/')
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
        <Space direction='vertical' size={ 70 }>

          <h2>Login</h2>
          <form>
            <Space direction='vertical'>
              <Input
                className='email-field'
                size='large'
                placeholder="Email address"
              />
              <Input.Password
                size='large'
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              />
            </Space>
          </form>
          <button className="login-button" onClick={ login }>Login</button>

        </Space>
      </div>





    </div>
  )
}

export default LoginPage

