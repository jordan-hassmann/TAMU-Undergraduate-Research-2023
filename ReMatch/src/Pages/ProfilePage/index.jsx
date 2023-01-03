
import { DatePicker, Input, InputNumber, message, Spin, Tooltip } from 'antd'
import dayjs from 'dayjs'

// Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LoadingOutlined } from '@ant-design/icons'
import Skill from '../../Components/Skill'
import { useState, useRef } from 'react'

import './styles.scss'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { clearChats } from '../../Slices/ChatsSlice'
import { clearStudent } from '../../Slices/StudentSlice'
import { clearFaculty } from '../../Slices/FacultySlice'
import { clearApplications } from '../../Slices/ApplicationsSlice'
import { clearMessages } from '../../Slices/MessagesSlice'
import { clearProjects } from '../../Slices/ProjectsSlice'
import { UpdateStudent } from '../../API/Profile'


const PitchCard = ({ student }) => {

  const [editing, setEditing] = useState(false)
  const name = useRef()
  const headline = useRef()
  const description = useRef()

  const updatePitch = async () => {
    const n = name.current.value
    const h = headline.current.value 
    const d = description.current.value
    if (n === student.name && h === student.headline && d === student.description) return 
    await UpdateStudent(student.id, { 
      name: n, 
      headline: h,
      pitch: d
    })
    .catch(err => message.success('There was an error updating your information'))
    setEditing(false)
  }
  
  return editing
  ? (
    <div className="pitch-card card">
      <h5 className='subtitle-header'>Pitch</h5>
      <input ref={name} className='edit-name' defaultValue={ student.name } />
      <div className="caption">
        <FontAwesomeIcon icon='arrow-turn-up' style={{ transform: 'rotate(90deg)' }} size='lg' />
        <input ref={headline} className='edit-headline' defaultValue={student.headline} />
      </div>
      <textarea ref={description} className='edit-description' defaultValue={ student.pitch } />

      <button className="edit-fab" onClick={ updatePitch }>
        <FontAwesomeIcon icon='check' size='xl' />
      </button>
    </div>
  )
  : (
    <div className="pitch-card card">
      <h5 className='subtitle-header'>Pitch</h5>
      <h2>{ student.name }</h2>
      <div className="caption">
        <FontAwesomeIcon icon='arrow-turn-up' style={{ transform: 'rotate(90deg)' }} size='lg' />
        <p>{ student.headline }</p>
      </div>
      <p className="description">{ student.pitch }</p>

      <button className="edit-fab" onClick={ () => setEditing(true) }>
        <FontAwesomeIcon icon='pen-to-square' size='xl' />
      </button>
    </div>
  )
}



const SkillsCard = ({ student }) => {


  const [toDelete, setToDelete] = useState([])
  const [deleting, setDeleting] = useState(false)

  const select = (e, skill) => {
    if (!deleting) return 
    
    if (toDelete.includes(skill)) {
      setToDelete(prev => [...prev.filter(s => s !== skill)])
      e.target.classList.remove('selected')
    } else {
      setToDelete(prev => [...prev, skill])
      e.target.classList.add('selected')
    }
    
  }

  const removeSkills = async () => {
    if (!toDelete.length) return 

    await UpdateStudent(student.id, { skills: student.skills.filter(value => !toDelete.includes(value)) })
    .catch(err => message.error('There was an error updating your skills'))

    setToDelete([])
    setDeleting(false)
  }

  const addSkill = async e => {
    const newSkill = e.target.value
    if (e.key !== 'Enter') return
    if (student.skills.includes(newSkill)) return 
    e.target.value = ''
    await UpdateStudent(student.id, { skills: [...student.skills, newSkill]})
    .catch(err => message.error('There was an issue updating your skills'))
  }
  
  return (
    <div className="skills-card card">
      <h5 className="subtitle-header">Skills</h5>
      <div className={`skills ${ deleting ? 'deleting' : '' }`}>
        { student.skills.map((skill, i) => (
          <Skill onClick={ e => select(e, skill) } skill={skill} key={`${skill}-${i}`} />
        )) }
        
        {
          !deleting &&
          <div className="skill-adder">
            <input 
              placeholder='Skill'
              onKeyDown={ addSkill }
              onFocus={ e => e.target.parentElement.classList.toggle('active', true) }
              onBlur={ e => e.target.parentElement.classList.toggle('active', false) } 
            />
            <FontAwesomeIcon icon='plus' className='add-skill-icon' />
          </div>
        }
      </div>

      {
        deleting 
        ? (
          <Tooltip title='Confirm removal' placement='left'>
            <button className="edit-fab confirm" onClick={ removeSkills }>
              <FontAwesomeIcon icon='check' size='xl' />
            </button>
          </Tooltip>
        )
        : (
          <Tooltip title='Select skills to remove' placement='left'>
            <button className="edit-fab" onClick={ () => setDeleting(true) }>
              <FontAwesomeIcon icon='pen-to-square' size='xl' />
            </button>
          </Tooltip>
        )
      }
    </div>
  )
}

const StatCard = ({ count, type }) => {
  const colors = {
    'Accepted': '#3ACC37',
    'Rejected': '#FF0000',
    'In Progress': '#E19500',
    'In Review': '#0085FF'
  }

  return (
    <div className="stat-card" style={{ backgroundColor: colors[type] }}>
      <h3>{ count }</h3>
      <p className="type">{ type }</p>
    </div>
  )
}

const StatsCard = ({ stats }) => {

  return (
    <div className="stats-card card">
      <h5 className="subtitle-header">Stats</h5>
      <div className="stats">
        { Object.entries(stats).map(([key, val]) => <StatCard count={val} type={key} key={key} />) }
      </div>
    </div>
  )
}


const PreferredCard = ({ student }) => {

  

  const updateDuration = async duration => {
    await UpdateStudent(student.id, { duration: duration ? duration.map(val => val.unix() * 1000) : [null, null] })
    .catch(err => message.error('There was an error updating your preferred duration'))
  }

  const updatePay = async val => {
    if (val === student.pay) return
    await UpdateStudent(student.id, { pay: val })
    .catch(err => message.error('There was an error updating your preferred pay'))
  }

  const updateMinPay = async e => {
    if (e.target.value === student.minPay) return
    await UpdateStudent(student.id, { minPay: e.target.value })
    .catch(err => message.error('There was an error updating your preferred min pay'))
  }






  return (
    <div className="preferred-card card">
      <h5 className="subtitle-header">Preferred</h5>


      <div className="content">
        <div className='header'>
          <p>Duration:</p>
        </div>
        <div className="fields">
          <DatePicker.RangePicker 
            picker='month' 
            value={ student.duration[0] ? student.duration.map(dayjs) : student.duration } 
            format='YYYY MMM' 
            onChange={ updateDuration } 
          />
        </div>


        <div className="header">
          <p>Pay: </p>
        </div>
        <div className="fields">

          <button className={`radio ${ student.pay ? 'active' : '' }`} onClick={ () => updatePay(true) }>
            { student.pay && <FontAwesomeIcon icon='circle-check' size='lg' color='#3ACC37' /> }
            <span>Yes</span>
          </button>

          <button className={`radio ${ !student.pay ? 'active' : '' }`} onClick={ () => updatePay(false) }>
            { !student.pay && <FontAwesomeIcon icon='circle-xmark' size='lg' color='#FF0000' /> }
            <span>No</span>
          </button>

        </div>


        <div className="header">
          <p>Minimum Desired Pay: </p>
        </div>
        <div className="fields"> 
          <input 
            type='number' 
            defaultValue={ student.minPay } 
            onBlur={ updateMinPay } 
            className='min-pay-input'
            onKeyDown={ e => (e.key === 'e' || e.key === '.') && e.preventDefault() }  
          />
        </div>
      </div>



    </div>
  )
}


const SignOutCard = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const logout = () => {
    setLoading(true)
    signOut(auth)
    .then(() => {
      setLoading(false)

      // Clear Redux Store
      const actions = [ clearApplications, clearChats, clearFaculty, clearMessages, clearProjects, clearStudent ]
      actions.forEach(action => dispatch(action()))
    })
  }

  return (
    <div className="signout-card card">
      <h5 className="subtitle-header">Signout</h5>
      <p className="subtitle">Signout of the application and return to the login screen</p>
      <button className="logout" onClick={ logout }>
        <span>Sign Out</span>
        { loading && <Spin style={{ height: '16px', marginTop: '-8px' }} size='small' indicator={ <LoadingOutlined color='#FF0000' /> } /> }
      </button>
    </div>
  )
}



const ProfilePage = () => {


  const student = useSelector(state => state.student.student)
  const applications = useSelector(state => state.applications.values)

  const formatApplications = applications => {
    const stats = {
      'Accepted': 0,
      'Rejected': 0,
      'In Progress': 0,
      'In Review': 0
    }
    applications.forEach(application => stats[application.status] += 1)
    return stats
  }
  

  return (
    <div className="profile-page">
      
      <div className="col">
        <PitchCard student={student} />
        <StatsCard stats={ formatApplications(applications) } />
      </div>
      <div className="col">
        <SkillsCard student={student} />
        <PreferredCard student={student} />
        <SignOutCard />
      </div>
      
    </div>
  )
}

export default ProfilePage