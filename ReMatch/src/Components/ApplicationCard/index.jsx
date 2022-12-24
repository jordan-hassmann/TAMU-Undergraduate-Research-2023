

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Progress } from 'antd'

import './styles.scss'




const CustomProgress = ({ status }) => {

  let props = null

  switch (status) {
    case 'ACCEPTED': 
      props = {
        strokeColor: '#3ACC37', 
        trailColor: 'rgba(0, 179, 255, 0.30)',
        icon: <FontAwesomeIcon icon='thumbs-up' />,
        progress: 100,
      }
      break

    case 'IN REVIEW': 
      props = {
        strokeColor: '#00B2FF', 
        trailColor: 'rgba(0, 179, 255, 0.30)',
        icon: '',
        progress: 75,
      }
      break
    
    case 'IN PROGRESS': 
      props = {
        strokeColor: '#00B2FF', 
        trailColor: 'rgba(0, 179, 255, 0.30)',
        icon: '',
        progress: 25,
      }
      break
    
    case 'REJECTED': 
      props = {
        strokeColor: '#FF0000', 
        trailColor: 'rgba(0, 0, 0, 0.30)',
        icon: <FontAwesomeIcon icon='xmark' color='#FF0000' />,
        progress: 100,
      }
      break
  }

  const { strokeColor, trailColor, icon, progress } = props
  return (
    <Progress 
      className='progress' 
      percent={ progress } 
      type='circle' 
      trailColor={ trailColor }
      strokeColor={ strokeColor }
      strokeWidth={ 8 } 
      width={ 60 } 
      format={ () => icon } 
    /> 
  )
}


const ApplicationCard = ({ application }) => {

  return (
    <div className="application-card">

      <div className="info">
        <h5>Research</h5>
        <h3>Improving LIDAR in Self-Driving Cars</h3>
        <div className="faculty">
          <FontAwesomeIcon icon='diagram-project' />
          <p className="subtitle">Tracy Hammond</p>
        </div>
        <button>
          <span>View Application</span>
          <FontAwesomeIcon icon='chevron-right' />
        </button>
      </div>

      <div className="status">
        <div className="content">
          <h5>Status</h5>
          <h3>In Progress</h3>
          <p className="subtitle">You have not completed your application yet</p>
        </div>

        <CustomProgress className='progress' status='REJECTED' />
      </div>

      <button className="remove">
        <FontAwesomeIcon icon='trash' />
      </button>

    </div>
  )
}

export default ApplicationCard 