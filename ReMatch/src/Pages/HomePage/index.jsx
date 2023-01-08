
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import ApplyModal from '../../Components/ApplyModal';
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
import { CreateChat, SendMessage, UnhideChat } from '../../API/Messaging';
import { UpdateStudent } from '../../API/Profile'
import { Timestamp } from 'firebase/firestore';
import { auth } from '../../firebase';


const { Search } = Input;




function intersection(arr1, arr2) {
  return arr1.filter(value => arr2.includes(value))
}



const HomePage = () => {

  const projects = useSelector(state => state.projects.values)
  const chats = useSelector(state => state.chats.values)
  const faculty = useSelector(state => state.faculty.values)
  const applications = useSelector(state => state.applications.values)
  const student = useSelector(state => state.student.student)

  const [openFilters, setOpenFilters] = useState(false)
  const [openApply, setOpenApply] = useState(false)
  const [sending, setSending] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messenger, setMessenger] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false)
  const [search, setSearch] = useState('')
  const [liking, setLiking] = useState(false)

  const [categories, setCategories] = useState([])
  const [location, setLocation] = useState([])
  const [team, setTeam] = useState([])
  const [paid, setPaid] = useState([])
  const [fields, setFields] = useState([])
  const [skills, setSkills] = useState([])
  const [favorite, setFavorite] = useState('All')
  const msgRef = useRef()
  


  const sendMessage = async () => {
    const message = msgRef.current.value
    if (!message) return 
    setSending(true)


    const chatExists = chats.find(chat => chat.facultyID === selectedProject.facultyID)
    const res = chatExists || await CreateChat(auth.currentUser.uid, selectedProject.facultyID)

    const msg = {
      message, 
      chatID: res.id,
      attachmentID: '', 
      facultyID: selectedProject.facultyID, 
      studentID: auth.currentUser.uid, 
      recipientID: selectedProject.facultyID,
      senderID: auth.currentUser.uid,
      timestamp: Timestamp.now()
    }

    if (res.hide) await UnhideChat(res.id)
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

  async function toggleFavorite() {
    if (liking) return
    setLiking(true)

    const favorites = student.favorites.includes(selectedProject.id)
    ? student.favorites.filter(id => id !== selectedProject.id)
    : [...student.favorites, selectedProject.id]

    await UpdateStudent(student.id, { favorites })

    setLiking(false)
    if (favorite === 'Favorited') setSelectedProject(null)
  }


  function clearFilters() {
    [setCategories, setLocation, setTeam, setPaid].forEach(func => func([]))
  }


  function filteredProjects() {
    let filtered = projects
    filtered = !search.length      ? filtered : filtered.filter(project => project.title.includes(search))
    filtered = !location.length    ? filtered : filtered.filter(project => location.includes(project.location))
    filtered = !paid.length        ? filtered : filtered.filter(project => paid.includes(project.paid ? 'Paid' : 'Unpaid'))
    filtered = !team.length        ? filtered : filtered.filter(project => team.includes(project.team ? 'Team Project' : 'Individual Project'))
    filtered = !categories.length  ? filtered : filtered.filter(project => intersection(project.categories, categories).length)
    filtered = !fields.length      ? filtered : filtered.filter(project => intersection(project.fields, fields).length)
    filtered = !skills.length      ? filtered : filtered.filter(project => intersection(project.required_skills, skills).length)
    filtered = favorite === 'All'  ? filtered : filtered.filter(project => student.favorites.includes(project.id))
    return filtered
  }


 
  return (
    <div className="home-page">
      
      <div className="opportunity-drawer">
        <div className="search">
          <Search placeholder="Search" onChange={ e => setSearch(e.target.value) } />
          <button className="filters" onClick={ () => setOpenFilters(true) }>
            <span>Filters</span>
            <FontAwesomeIcon icon='sliders' />
          </button>
        </div>
        <div className="opportunities">
          { filteredProjects().map(project => (
            <OpportunityLink 
              opportunity={project} 
              headline={ getHeadline(project) } 
              key={project.id} 
              onClick={ () => updateSelectedProject(project) } 
              selected={ selectedProject && selectedProject.id === project.id }
            />
          ) ) }
        </div>
      </div>

      <div className="opportunity-details">
        {
          selectedProject !== null && 
          <div className="card">


            <div className="header">
              <h3 className='header-title'>{ selectedProject.title }</h3>
              {
                applications.find(app => app.projectID == selectedProject.id)
                ? (
                  <button className="applied">
                    <span>Applied</span>
                    <FontAwesomeIcon icon='check' />
                  </button>
                )
                : (
                  <button className="apply" onClick={ () => setOpenApply(true) }>
                    <span>Apply</span>
                    <FontAwesomeIcon icon='file-signature' />
                  </button>
                )
              }
              <p className="subtitle">{ getHeadline(selectedProject) }</p>
              <div className="options">

                <Popover 
                placement='bottomLeft' 
                title={`Send ${faculty[selectedProject.facultyID].firstname} a message`}
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
                  
                <FontAwesomeIcon 
                  className={`star ${ student.favorites.includes(selectedProject.id) }`} 
                  icon='star' 
                  size='2x' 
                  onClick={ toggleFavorite }
                />
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

      <FilterModal 
        open={ openFilters } 
        clear={ clearFilters }
        onClose={ () => setOpenFilters(false) } 
        onCategoryChange={ val => setCategories(val)}
        onLocationChange={ val => setLocation(val) }
        onTeamChange={ val => setTeam(val) }
        onPaidChange={ val => setPaid(val) }
        onFieldsChange={ val => setFields(val) }
        onSkillsChange={ val => setSkills(val) }
        onFavoriteChange={ val => setFavorite(val) }
        categories={categories}
        location={location}
        team={team}
        paid={paid}
        fields={fields}
        skills={skills}
        favorite={favorite}
      />
      <ApplyModal open={ openApply } project={ selectedProject } onClose={ () => setOpenApply(false) } />
    </div>
  )
}

export default HomePage