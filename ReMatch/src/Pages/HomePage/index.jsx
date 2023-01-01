
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import OpportunityLink from '../../Components/OpportunityLink';
import Skill from '../../Components/Skill';

// antd
import { Input, Popover, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles
import './styles.scss'
import FilterModal from '../../Components/FilterModal';

// Firebase
import { CreateChat, SendMessage } from '../../API/Messaging';
import { Timestamp } from 'firebase/firestore';
import { auth } from '../../firebase';


const { Search } = Input;








const HomePage = () => {

  const onSearch = () => {}
  const projects = useSelector(state => state.projects.values)
  const chats = useSelector(state => state.chats.values)
  const faculty = useSelector(state => state.faculty.values)

  const [openFilters, setOpenFilters] = useState(false)
  const [sending, setSending] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messenger, setMessenger] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false)
  const msgRef = useRef()
  


  const sendMessage = async () => {
    const message = msgRef.current.value
    if (!message) return 
    setSending(true)


    const chatExists = chats.find(chat => chat.facultyID === selectedProject.facultyID)


    const chatID = chatExists ? chatExists.id : await CreateChat(auth.currentUser.uid, selectedProject.facultyID).id
    const msg = {
      message, 
      chatID,
      attachmentID: '', 
      facultyID: selectedProject.facultyID, 
      studentID: auth.currentUser.uid, 
      recipientID: selectedProject.facultyID,
      senderID: auth.currentUser.uid,
      timestamp: Timestamp.now()
    }


    await SendMessage(msg)
    msgRef.current.value = ''
    setSentSuccess(true)
    setSending(false)
    setTimeout(() => {
      setMessenger(false)
      setSentSuccess(false)
    }, 1200);
  }

  const getHeadline = project => {
    const f = faculty[project.facultyID]
    return f.firstname + ' ' + f.lastname + ' - ' + f.headline
  }

  const updateSelectedProject = project => {
    if (!selectedProject || project.id !== selectedProject.id) setSelectedProject(project)
    else setSelectedProject(null) 
  }

 
  return (
    <div className="home-page">
      
      <div className="opportunity-drawer">
        <div className="search">
          <Search placeholder="Search" onSearch={onSearch} />
          <button className="filters" onClick={ () => setOpenFilters(true) }>
            <span>Filters</span>
            <FontAwesomeIcon icon='sliders' />
          </button>
        </div>
        <div className="opportunities">
          { projects.map(project => <OpportunityLink opportunity={project} headline={ getHeadline(project) } key={project.id} onClick={ () => updateSelectedProject(project) } /> ) }
        </div>
      </div>

      <div className="opportunity-details">
        {
          selectedProject !== null && 
          <div className="card">


            <div className="header">
              <h3 className='header-title'>{ selectedProject.title }</h3>
              <button className="apply">
                <span>Apply</span>
                <FontAwesomeIcon icon='file-signature' />
              </button>
              <p className="subtitle">{ getHeadline(selectedProject) }</p>
              <div className="options">

                <Popover 
                placement='bottomLeft' 
                title='Send Irina a message' 
                trigger='click'
                open={ messenger }
                content={
                  <div className="popover-card">
                    {
                      sentSuccess
                      ? <div className='message-success-icon'><FontAwesomeIcon icon='circle-check' size='5x' color='#3ACC37' /></div>
                      : <textarea ref={ msgRef } />
                    }
                    <div className="options">
                      <button className="option" onClick={ sendMessage }>
                        <span>Send</span>
                        {
                          sending 
                          ? <Spin style={{ height: '16px', marginTop: '-8px' }} size='small' indicator={ <LoadingOutlined color='#FF0000' /> } />
                          : <FontAwesomeIcon icon='paper-plane' size='lg' />
                        }
                      </button>
                    </div>
                  </div>
                }
                >
                  <button className="message" onClick={ () => setMessenger(!messenger) }>
                    <span>Message</span>
                    <FontAwesomeIcon icon='message' />
                  </button>
                </Popover>
                  
                <FontAwesomeIcon className='star' icon='star' size='2x' />
              </div>
            </div>


            <div className="content">

              <div className="section">
                <h4>Description</h4>
                <p className="text">{ selectedProject.description }</p>
              </div>

              <div className='section'>
                <h4>Required Skills</h4>
                <div className="skills">
                  { selectedProject.required_skills.map((skill, i) => <Skill skill={skill} key={`required-${i}`} />) }
                </div>
              </div>

              <div className="section">
                <h4>Preferred Skills</h4>
                <div className="skills">
                  { selectedProject.preferred_skills.map((skill, i) => <Skill skill={skill} key={`preferred-${i}`} />) }
                </div>
              </div>

              <div className="section">
                <h4>Job Details</h4>
                <div className="highlights">
                  <p>Duration: </p>
                  <p>{ selectedProject.details.duration[0] } - { selectedProject.details.duration[1] }</p>
                  <p>Paid: </p>
                  <p>{ selectedProject.details.Paid ? 'Paid' : 'Unpaid' }</p>
                  <p>Spots: </p>
                  <p>{ selectedProject.details.Spots } Available Spots</p>
                </div>

                <p className="job-details">{ selectedProject.misc_details }</p>
              </div>
            </div>

            
          </div>
        }
      </div>  

      <FilterModal open={ openFilters } onClose={ () => setOpenFilters(false) } />
    </div>
  )
}

export default HomePage