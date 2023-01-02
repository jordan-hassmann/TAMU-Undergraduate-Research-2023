

import { LoadingOutlined } from '@ant-design/icons'
import { Modal, Spin, message } from 'antd'
import Fab from '../Fab'
import Skill from '../Skill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { auth } from '../../firebase'

import './styles.scss'
import FileInput from '../FileInput'
import { Timestamp } from 'firebase/firestore'
import { SumbitApplication } from '../../API/Applications'


const ApplyModal = ({ open, onClose, project }) => {

  const [showDetails, setShowDetails] = useState(true)
  const [showApplication, setShowApplication] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resume, setResume] = useState(null)
  const [why_me, setWhy_me] = useState('')




  const uploadApplication = async () => {
    if (!why_me || !resume) return 

    setSubmitting(true)


    const application = {
      facultyID: project.facultyID,
      projectID: project.id, 
      resumeURL: null, 
      status: 'In Review',
      filename: resume.name, 
      studentID: auth.currentUser.uid, 
      submitted: Timestamp.now(),
      why_me
    }

    await SumbitApplication(application, resume)

    setSubmitting(false)
    onClose()
    setWhy_me('')
    setResume(null)
    message.success('Successfully submitted application')
  }




  return (
    <Modal 
    open={ open } 
    closable={false} 
    width='50%' 
    style={{ top: 40, paddingBottom: 40 }} 
    centered 
    footer={ null }>

      <div className="apply-modal-card">
      

        <div className="header">
          <h3>Application</h3>
          <Fab size={ 45 } onClick={ onClose }>
            <FontAwesomeIcon icon='xmark' size='2x' />
          </Fab>
        </div>



        <div className="header-info">
          <h4>Title</h4>
          <p className="subtitle">Headline</p>
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
                The purpose of this project is to develop software 
                and statistical/machine learning methods to facilitate 
                analyses of such data in the context of diabetes research.
              </p>
            </div>

            <div className='section'>
              <h4>Required Skills</h4>
              <div className="skills">
                <Skill skill={ 'Python' } />
                <Skill skill={ 'Python' } />
                <Skill skill={ 'Python' } />
                <Skill skill={ 'Python' } />
              </div>
            </div>

            <div className="section">
              <h4>Preferred Skills</h4>
              <div className="skills">
                <Skill skill={ 'Python' } />
                <Skill skill={ 'Python' } />
                <Skill skill={ 'Python' } />
                <Skill skill={ 'Python' } />
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
              <textarea value={ why_me } rows={10} onChange={ e => setWhy_me(e.target.value) } className='why-me' />
            </div>

            <div className="section">
              <h4>Resume</h4>
              <div className="resume-upload">
                <FileInput file={resume} setFile={setResume} />
              </div>
            </div>


          </div>

        </div>



        <div className="options">
          <button disabled={ !resume || !why_me } onClick={uploadApplication} className={`submit ${!resume || !why_me ? 'disabled' : '' }`}>
            <span>Submit Application</span>
            {
              submitting 
              ? <Spin style={{ height: '16px', marginTop: '-8px' }} size='small' indicator={ <LoadingOutlined style={{ color: '#FFFFFF' }} /> } />
              : <FontAwesomeIcon className='file-icon' icon='file-arrow-up' color='#FFFFFF' size='lg' />
            }
          </button>
        </div>
      </div>
    </Modal>
  )
}


export default ApplyModal