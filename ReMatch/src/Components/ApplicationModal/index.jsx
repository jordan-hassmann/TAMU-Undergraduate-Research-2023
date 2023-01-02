

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'antd/es/modal/Modal'
import Skill from '../Skill'
import Fab from '../Fab'
import './styles.scss'
import { useState } from 'react'
import { RevokeApplication } from '../../API/Applications'
import { Popconfirm, message } from 'antd'


const ApplicationModal = ({ open, onClose, application }) => {

  const [showDetails, setShowDetails] = useState(true)
  const [showApplication, setShowApplication] = useState(true)


  const removeApplication = async () => {
    onClose()
    await RevokeApplication(application)
    message.success('Successfully revoked application')
  }



  return (
    <Modal 
    open={ open } 
    closable={false} 
    width='50%' 
    style={{ top: 40, paddingBottom: 40 }} 
    centered 
    footer={ null }>

      {
        application &&
        <div className="application-modal-card">
        

          <div className="header">
            <h3>Application</h3>
            <Fab size={ 45 } onClick={ onClose }>
              <FontAwesomeIcon icon='xmark' size='2x' />
            </Fab>
          </div>



          <div className="header-info">
            <h4>{ application.project.title }</h4>
            <p className="subtitle">{ application.project.headline }</p>
            <div className="submitted">
              { application.submitted !== null && <span>Submitted { application.submitted }</span>}
              <FontAwesomeIcon icon='check' size='lg' />
            </div>
          </div>


          <div className="details">
            <button className="divider" onClick={ () => setShowDetails(!showDetails) }>

              <div className="line" />
              <div className="title">
                <FontAwesomeIcon icon='chevron-down' className={`chevron ${showDetails}`} />
                <span>Project Details</span>
              </div>
              <div className="line" />

            </button>


            <div className={`content ${showDetails}`}>

              <div className="section">
                <h4>Description</h4>
                <p className="text">{ application.project.description }</p>
              </div>

              <div className='section'>
                <h4>Required Skills</h4>
                <div className="skills">
                  { application.project.required_skills.map((skill, i) => <Skill key={`required_skill-${i}-${application.id}`} skill={skill} />) }
                </div>
              </div>

              <div className="section">
                <h4>Preferred Skills</h4>
                <div className="skills">
                  { application.project.preferred_skills.map((skill, i) => <Skill key={`preferred_skill-${i}-${application.id}`} skill={skill} />) }
                </div>
              </div>

              <div className="section">
                <h4>Job Details</h4>
                <div className="highlights">
                  <p>Duration: </p>
                  <p>{ application.project.details.duration[0] } - { application.project.details.duration[1] }</p>
                  <p>Paid: </p>
                  <p>{ application.project.details.Paid ? 'Paid' : 'Unpaid' }</p>
                  <p>Spots: </p>
                  <p>{ application.project.details.Spots } Available Spots</p>
                </div>

                <p className="job-details">{ application.project.misc_details }</p>
              </div>
            </div>

          </div>






          <div className="application">
            <button className="divider" onClick={ () => setShowApplication(!showApplication) }>

              <div className="line" />
              <div className="title">
                <FontAwesomeIcon icon='chevron-down' className={`chevron ${showApplication}`} />
                <span>My Application</span>
              </div>
              <div className="line" />

            </button>

            <div className={`content ${showApplication}`}>

              <div className="section">
                <h4>Why me?</h4>
                <p className="text">{ application.why_me }</p>
              </div>

              <div className="section">
                <h4>Resume</h4>
                <div className="resume">
                  <span>Applied with:</span> 
                  <span>{ application.filename }</span>
                  <a target='_blank' href={ application.resumeURL }><FontAwesomeIcon icon='cloud-download' /></a>
                </div>
              </div>


            </div>

          </div>



          <div className="options">
            <Popconfirm 
              title="Revoke this application"
              onConfirm={ removeApplication }
              okText="Yes"
              cancelText="No"
            >
              <button className="revoke">
                <span>Revoke Application</span>
                <FontAwesomeIcon icon='trash' color='#FF0000' size='lg' />
              </button>
            </Popconfirm>
          </div>
        </div>
      }
    </Modal>
  )
}


export default ApplicationModal