
import { Dropdown, DatePicker, Input } from 'antd'

// Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Skill from '../../Components/Skill'
import './styles.scss'
import { useState } from 'react'


const PitchCard = ({ pitch }) => {
  
  return (
    <div className="pitch-card card">
      <h5 className='subtitle-header'>Pitch</h5>
      <h2>John Smith</h2>
      <div className="caption">
        <FontAwesomeIcon icon='arrow-turn-up' style={{ transform: 'rotate(90deg)' }} size='lg' />
        <p>Texas A&M Honors CS 23' | Web Developer | Software Engineer</p>
      </div>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit, sed do eiusmod tempor incididunt ut labore et 
        dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip 
        ex ea commodo consequat. <br /><br />

        Duis aute irure dolor in reprehenderit in voluptate 
        velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt 
        in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <button className="edit-fab">
        <FontAwesomeIcon icon='pen-to-square' size='xl' />
      </button>
    </div>
  )
}

const ResumeCard = ({ }) => {
  return (
    <div className="resume-card card">
      <h5 className="subtitle-header">Resume</h5>
      <div className="resume-name">
        <p>Resume - Jordan Hassmann.pdf</p>
        <FontAwesomeIcon icon='check' size='lg' />
      </div>
      <button className="upload">
        <FontAwesomeIcon icon='arrow-up-from-bracket' size='2x' />
      </button>
    </div>
  )
}

const SkillsCard = ({ skills }) => {
  
  return (
    <div className="skills-card card">
      <h5 className="subtitle-header">Skills</h5>
      <div className="skills">
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
      </div>
      <button className="add-skill">
        <span>Add Skill</span>
        <FontAwesomeIcon icon='plus' />
      </button>

      <button className="edit-fab">
        <FontAwesomeIcon icon='pen-to-square' size='xl' />
      </button>
    </div>
  )
}

const StatCard = ({ stat }) => {
  const { type, count } = stat
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
        { stats.map(stat => <StatCard key={ stat.type } stat={stat} /> )}
      </div>
    </div>
  )
}


const PreferredCard = ({  }) => {

  
  const [pay, setPay] = useState(false)
  const [dateRange, setDateRange] = useState([])
  

  return (
    <div className="preferred-card card">
      <h5 className="subtitle-header">Preferred</h5>


      <div className="content">
        <div className='header'>
          <p>Duration:</p>
        </div>
        <div className="fields">
          <DatePicker.RangePicker picker='month' onChange={ val => setDateRange(val) } />
        </div>


        <div className="header">
          <p>Pay: </p>
        </div>
        <div className="fields">

          <button className={`radio ${ pay ? 'active' : '' }`} onClick={ () => setPay(true)}>
            { pay && <FontAwesomeIcon icon='circle-check' size='lg' color='#3ACC37' /> }
            <span>Yes</span>
          </button>

          <button className={`radio ${ !pay ? 'active' : '' }`} onClick={ () => setPay(false)}>
            { !pay && <FontAwesomeIcon icon='circle-xmark' size='lg' color='#FF0000' /> }
            <span>No</span>
          </button>

        </div>


        <div className="header">
          <p>Minimum Desired Pay: </p>
        </div>
        <div className="fields">
          <Input prefix={ <FontAwesomeIcon icon='dollar-sign' /> } placeholder='0.00' />
        </div>
      </div>



    </div>
  )
}



const ProfilePage = () => {

  const stats = [
    { type: 'Accepted',     count: 2 }, 
    { type: 'Rejected',     count: 2 }, 
    { type: 'In Progress',  count: 4 }, 
    { type: 'In Review',    count: 1 }, 
  ]

  return (
    <div className="profile-page">
      
      <div className="col">
        <PitchCard />
        <ResumeCard />
      </div>
      <div className="col">
        <SkillsCard />
        <StatsCard stats={stats} />
        <PreferredCard />
      </div>
      
    </div>
  )
}

export default ProfilePage