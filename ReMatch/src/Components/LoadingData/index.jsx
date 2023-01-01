

import { Progress } from 'antd'
import './styles.scss'


const LoadingData = ({ data }) => {

  const getProgress = () => {
    let progress = 0
    data.forEach(data => progress += data ? 20 : 0)
    return progress
  }

  return (
    <div className="loading-data">
      <div className="progress">
        <Progress status={getProgress() === 100 ? 'success' : 'active'} percent={ getProgress() } />
        <p className="message">{ getProgress() === 100 ? 'Data Loaded' : 'Loading your data...' }</p>
      </div>
      
    </div>
  )
}

export default LoadingData