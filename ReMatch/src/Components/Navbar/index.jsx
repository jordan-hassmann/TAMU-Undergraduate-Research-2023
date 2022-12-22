//React 
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// antd
import { Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Styles
import './styles.scss'


const links = [
  {
    to: '/', 
    value: 'Home',
    href: ''
  },
  {
    to: '/messaging', 
    value: 'Messaging',
    href: 'messaging'
  },
  {
    to: '/applications', 
    value: 'Applications',
    href: 'applications'
  },
  {
    to: '/profile', 
    value: 'Profile',
    href: 'profile'
  },
]

const Navbar = () => {
  
  const [active, setActive] = useState(-1)


  useEffect(() => {
    const url = window.location.href.split('/').at(-1)
    const link = links.map(({ href }) => href).indexOf(url)
    setActive(prev => link)
  }, [])
  


  return (
    <div className="navbar">
      <Space className='logo' size='middle'>
        <h1>ReMatch</h1>
        <FontAwesomeIcon icon='hippo' size='2x' />
      </Space>


      <nav>
        <Space size={ 30 }>
          { links.map((link, i) => {
            return (
              <Link 
                to={link.to} 
                key={link.to} 
                className={ i === active ? 'active' : '' } 
                onClick={ () => setActive(i) }>{ link.value }</Link>
            )
          })}
        </Space>
      </nav>
      
    </div>
  )
}

export default Navbar