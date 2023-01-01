import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import './styles.scss'


const LoadingPage = () => {

  return (
    <div className="loading-page">
      <Spin size='large' />
    </div>
  )
}

export default LoadingPage