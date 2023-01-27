
import { useState } from 'react'
import { Input, Button, Select } from 'antd'
import { CreateProject } from '../../API/Projects'
import { CreateStudent } from '../../API/Profile'
import { UpdateApplicationStatus } from '../../API/Applications'

import './styles.scss'




const AdminPage = () => {

  const [project, setProject] = useState({})
  const [user, setUser] = useState({})
  const [application, setApplication] = useState({
    id: '', 
    status: 'In Review', 
  })


  async function addProject() {
    const copy = {...project}

    copy.required_skills = copy.required_skills.split(', ')
    copy.preferred_skills = copy.preferred_skills.split(', ')
    copy.fields = copy.fields.split(', ')
    copy.categories = copy.categories.split(', ')
    copy.team = copy.team === 'true'
    copy['details'] = { paid: null, spots: null, duration: null }
    copy['details']['paid'] = copy.paid === 'true'
    copy['details']['spots'] = Number(copy.spots)
    copy['details']['duration'] = copy.duration.split(', ')
    delete copy.paid 
    delete copy.spots
    delete copy.duration
    
    await CreateProject(copy)
    setProject({})
  }

  async function addUser() {
    await CreateStudent(user) 
    setUser({})
  }

  async function updateApplicationStatus() {
    if (application.id === '') return 
    await UpdateApplicationStatus(application.id, application.status)
    setApplication({ id: '', status: 'In Review' })
  }





  const sections = [
    {
      title: 'Create User', 
      fields: [ 'email', 'password' ], 
      onSubmit: () => {
        addUser()
      },
      onChange: (label, e) => {
        setUser({ ...user, [label]: e.target.value })
      }
    },
    {
      title: 'Create Project ', 
      fields: [ 
        'title', 
        'description', 
        'facultyID', 
        'categories', 
        'preferred_skills', 
        'required_skills', 
        'fields', 
        'duration', 
        'location', 
        'team',
        'paid', 
        'spots',
      ], 
      onSubmit: () => {
        addProject()
      }, 
      onChange: (label, e) => {
        setProject({ ...project, [label]: e.target.value })
      }
    },
  ]

  return (
    <div className='admin-page'>

      <h1>Admin Page</h1>



      <div className="row">
        <h2>Change Application Status</h2>
        <div className="application-selection">
          <Input placeholder='Application ID' value={ application.id } onChange={ e => setApplication({ ...application, id: e.target.value })} />
          <Select value={ application.status } onChange={ val => setApplication({ ...application, status: val })} options={[
            { value: 'In Review' },
            { value: 'Accepted' },
            { value: 'Rejected' },
          ]} />
          <Button type='primary' onClick={updateApplicationStatus}>Update</Button>
        </div>
      </div>



      { sections.map(({title, fields, onSubmit, onChange}) => (
        <div className="row" key={title}>

          <h2>{ title }</h2>
          { fields.map(field => <Input key={field} placeholder={field} onChange={ e => onChange(field, e) } /> )}
          <Button style={{ width: 'fit-content' }} type='primary' onClick={ onSubmit }>Submit</Button>

        </div>
      ))}


    </div>
  )
}

export default AdminPage

/* 
firstname: "First name" 
lastname: "Last name"
duration: []
favorites: []
headline: "TAMU CSCE @ College Station"
minPay: 10000
pay: true 
pitch: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
resumeID: null
skills: []
*/