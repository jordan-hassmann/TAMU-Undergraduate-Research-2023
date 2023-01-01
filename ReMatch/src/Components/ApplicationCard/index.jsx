

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Progress } from 'antd'

import './styles.scss'




const CustomProgress = ({ status }) => {


  const variants = {
    'Accepted': {
      strokeColor: '#3ACC37', 
      trailColor: 'rgba(0, 179, 255, 0.30)',
      icon: <FontAwesomeIcon icon='thumbs-up' />,
      progress: 100,
    },
    'In Review': {
      strokeColor: '#00B2FF', 
      trailColor: 'rgba(0, 179, 255, 0.30)',
      icon: '',
      progress: 75,
    },
    'In Progress': {
      strokeColor: '#00B2FF', 
      trailColor: 'rgba(0, 179, 255, 0.30)',
      icon: '',
      progress: 25,
    },
    'Rejected': {
      strokeColor: '#FF0000', 
      trailColor: 'rgba(0, 0, 0, 0.30)',
      icon: <FontAwesomeIcon icon='xmark' color='#FF0000' />,
      progress: 100,
    }
  }

  const { strokeColor, trailColor, icon, progress } = variants[status]
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


const ApplicationCard = ({ title, faculty, status, onOpen }) => {

  const statusSubtitle = {
    'Accepted': 'You have been accepted for this research position!',
    'In Review': 'Your application is currently being reviewed',
    'In Progress': 'You have not completed your application yet',
    'Rejected': 'You are no longer being considered for this position',
  }

  return (
    <div className="application-card">

      <div className="info">
        <h5>Research</h5>
        <h3>{ title }</h3>
        <div className="faculty">
          <FontAwesomeIcon icon='diagram-project' />
          <p className="subtitle">{ faculty }</p>
        </div>
        <button onClick={ onOpen }>
          <span>View Application</span>
          <FontAwesomeIcon icon='chevron-right' />
        </button>
      </div>

      <div className="status">
        <div className="content">
          <h5>Status</h5>
          <h3>{ status }</h3>
          <p className="subtitle">{ statusSubtitle[status] }</p>
        </div>

        <CustomProgress className='progress' status={status} />
      </div>

      <button className="remove">
        <FontAwesomeIcon icon='trash' />
      </button>

    </div>
  )
}

export default ApplicationCard 