

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'antd/es/modal/Modal'
import Skill from '../Skill'
import Fab from '../Fab'
import './styles.scss'
import { useState } from 'react'


const ApplicationModal = ({ open, onClose }) => {

  const [showDetails, setShowDetails] = useState(true)
  const [showApplication, setShowApplication] = useState(true)


  return (
    <Modal 
    open={ open } 
    closable={false} 
    width='50%' 
    style={{ top: 40, paddingBottom: 40 }} 
    centered 
    footer={ null }>

      <div className="application-modal-card">
        

        <div className="header">
          <h3>Application</h3>
          <Fab size={ 45 } onClick={ onClose }>
            <FontAwesomeIcon icon='xmark' size='2x' />
          </Fab>
        </div>



        <div className="header-info">
          <h4>Improving LIDAR in Self-Driving Cars</h4>
          <p className="subtitle">
            Irina Gaynanova  —  DeBakey Executive Research Leadership Program
          </p>
          <div className="submitted">
            <span>Submitted December 4th, 2022</span>
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
              <p className="text">
                Data from wearable devices, such as continuous 
                glucose monitors (CGM), activity trackers, ambulatory 
                blood pressure monitors, and sleep EEG monitors, 
                are increasingly common. This wealth of data has 
                the potential to improve health outcomes and improve 
                the management of various chronic diseases, e.g. diabetes. 
                The purpose of this project is to develop software and 
                statistical/machine learning methods to facilitate 
                analyses of such data in the context of diabetes 
                research.
              </p>
            </div>

            <div className='section'>
              <h4>Required Skills</h4>
              <div className="skills">
                <Skill />
                <Skill />
                <Skill />
                <Skill />
              </div>
            </div>

            <div className="section">
              <h4>Preferred Skills</h4>
              <div className="skills">
                <Skill />
                <Skill />
                <Skill />
                <Skill />
              </div>
            </div>

            <div className="section">
              <h4>Job Details</h4>
              <div className="highlights">
                <p>Duration: </p>
                <p>Fall 2022 - Unset</p>
                <p>Paid: </p>
                <p>Unpaid</p>
                <p>Spots: </p>
                <p>4 Available Spots</p>
              </div>

              <p className="job-details">
                Lorem ipsum dolor sit, amet consectetur adipisicing 
                elit. Quod maxime praesentium doloremque doloribus 
                exercitationem placeat veritatis maiores molestias 
                delectus illo ex suscipit velit earum, dolor 
                reprehenderit provident, corrupti soluta optio 
                architecto mollitia nemo, pariatur consequatur 
                obcaecati itaque! Officia, molestiae repudiandae.
              </p>
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
              <p className="text">
                Data from wearable devices, such as continuous 
                glucose monitors (CGM), activity trackers, ambulatory 
                blood pressure monitors, and sleep EEG monitors, 
                are increasingly common. This wealth of data has 
                the potential to improve health outcomes and improve 
                the management of various chronic diseases, e.g. diabetes. 
                The purpose of this project is to develop software and 
                statistical/machine learning methods to facilitate 
                analyses of such data in the context of diabetes 
                research.
              </p>
            </div>

            <div className="section">
              <h4>Resume</h4>
              <div className="resume">
                <span>Applied with:</span> 
                <span>Resume - Jordan Hassmann.pdf</span>
                <FontAwesomeIcon icon='cloud-download' />
              </div>
            </div>


          </div>

        </div>



        <div className="options">
          <button className="revoke">
            <span>Revoke Application</span>
            <FontAwesomeIcon icon='trash' color='#FF0000' size='lg' />
          </button>
        </div>
      </div>
    </Modal>
  )
}


export default ApplicationModal