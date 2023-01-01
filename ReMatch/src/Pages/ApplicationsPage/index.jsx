// React
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, Dropdown } from 'antd'
import FilterChip from '../../Components/FilterChip'
import ApplicationCard from '../../Components/ApplicationCard'
import ApplicationModal from '../../Components/ApplicationModal'

import './styles.scss'



// const applications = [
//   'Improving LIDAR in Self-Driving Cars cars cars', 
//   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ducimus libero architecto eligendi, labore totam.',
//   'Improving LIDAR in ', 
//   'Improving LIDAR in Self-Driving Cars cars cars', 
//   'Improving LIDAR in Self-Driving Cars', 
//   'Improving LIDAR in Self-Driving Cars', 
//   'Improving LIDAR in Self-Driving Cars', 
//   'Improving LIDAR in Self-Driving Cars', 
//   'Improving LIDAR in Self-Driving Cars', 
//   'Improving LIDAR in Self-Driving Cars', 
//   'Improving LIDAR in Self-Driving Cars', 
// ]


const ApplicationsPage = () => {

  const applications = useSelector(state => state.applications.values)
  const faculty = useSelector(state => state.faculty.values)
  const projects = useSelector(state => state.projects.values)

  const [selectedApplication, setSelectedApplication] = useState(null)
  const [filters, setFilters] = useState([])
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState({
    'Accepted': { 
      key: 0,
      filter: 'Accepted',
      label: <a onClick={ () => toggleFilter('Accepted') }>Accepted</a>,
      icon: null
    },
    'Rejected': { 
      key: 1,
      filter: 'Rejected',
      label: <a onClick={ () => toggleFilter('Rejected') }>Rejected</a>,
      icon: null
    },
    'In Progress': { 
      key: 2,
      filter: 'In Progress',
      label: <a onClick={ () => toggleFilter('In Progress') }>In Progress</a>,
      icon: null
    },
    'In Review': { 
      key: 3,
      filter: 'In Review',
      label: <a onClick={ () => toggleFilter('In Review') }>In Review</a>,
      icon: null
    },
  })



  const toggleFilter = filter => {
    setItems(prev => {
      prev[filter].icon = prev[filter].icon ? null : <FontAwesomeIcon icon='check' color='#3ACC37' />
      return {...prev}
    })
  }

  const getFaculty = application => {
    const f = faculty[application.facultyID]
    return f.firstname + ' ' + f.lastname
  }

  const getHeadline = application => {
    const f = faculty[application.facultyID]
    return f.firstname + ' ' + f.lastname + ' - ' + f.headline
  }

  const getTitle = application => {
    const project = projects.find(p => p.id === application.projectID)
    return project.title
  }

  const selectApplication = application => {

    const project = projects.find(p => p.id === application.projectID)
    setSelectedApplication({ 
      ...application, 
      project: {
        ...project, 
        headline: getHeadline(application)
      } 
    })
  }



  return (
    <div className="applications-page">

      <div className="container">
        <div className="options">

          <Dropdown open={ open } menu={{ items: Object.values(items) }} trigger={['click']}>
            <button onClick={ () => setOpen(prev => !prev) } className='filter-button'>
              <span>Filters</span>
              { open ? <FontAwesomeIcon icon='chevron-up' size='xs' /> : <FontAwesomeIcon icon='plus-minus' />}
            </button>
          </Dropdown>

          <div className="filters">
            { Object.values(items).filter(({icon}) => icon).map(item => {
              return <FilterChip onClick={ () => toggleFilter(item.filter) } filter={item.filter} key={item.filter} />
            } )}
          </div>


          <Input.Search placeholder='Search' className='search' style={{ width: 300 }} />
        </div>


        <div className="applications">
          { applications.map((application, i) => (
            <ApplicationCard 
              status={ application.status }
              onOpen={ () => selectApplication(application) }
              title={ getTitle(application) } 
              faculty={ getFaculty(application) }
              key={ application.id } 
            />
          ) )}
        </div>

      </div>


      <ApplicationModal open={ selectedApplication } application={ selectedApplication } onClose={ () => setSelectedApplication(null) } />
    </div>
  )
}

export default ApplicationsPage