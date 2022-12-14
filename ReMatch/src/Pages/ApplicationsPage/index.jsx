// React
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Components 
import FilterChip from '../../Components/FilterChip'
import ApplicationCard from '../../Components/ApplicationCard'
import ApplicationModal from '../../Components/ApplicationModal'

// Styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, Dropdown, Empty, Button } from 'antd'
import './styles.scss'





const ApplicationsPage = () => {
  
  const navigate = useNavigate()
  const applications = useSelector(state => state.applications.values)
  const faculty = useSelector(state => state.faculty.values)
  const projects = useSelector(state => state.projects.values)

  const [selectedApplication, setSelectedApplication] = useState(null)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
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







  function toggleFilter(filter) {
    setFilters(prev => {
      prev[filter].icon = prev[filter].icon ? null : <FontAwesomeIcon icon='check' color='#3ACC37' />
      return {...prev}
    })
  }

  function getHeadline(application) {
    const f = faculty[application.facultyID]
    return f.name + ' - ' + f.headline
  }

  function selectApplication(application) {
    const project = projects.find(p => p.id === application.projectID)
    setSelectedApplication({ 
      ...application, 
      project: {
        ...project, 
        headline: getHeadline(application)
      } 
    })
  }

  function filteredApplications() {
    const searchFiltered = applications.filter(app => projects.find(p => p.id === app.projectID).title.toLowerCase().includes(search.toLowerCase()))
    let selectedFilters = Object.entries(filters).filter(entry => entry[1].icon).map(entry => entry[0]) 
    return selectedFilters.length ? searchFiltered.filter(value => selectedFilters.includes(value.status)) : searchFiltered
  }




  

  return (
    <div className="applications-page">

      <div className="container">
        <div className="options">

          <Dropdown open={ open } menu={{ items: Object.values(filters) }} trigger={['click']}>
            <button onClick={ () => setOpen(prev => !prev) } className='filter-button'>
              <span>Filters</span>
              { open ? <FontAwesomeIcon icon='chevron-up' size='xs' /> : <FontAwesomeIcon icon='plus-minus' />}
            </button>
          </Dropdown>

          <div className="filters">
            { Object.values(filters).filter(({icon}) => icon).map(item => {
              return <FilterChip onClick={ () => toggleFilter(item.filter) } filter={item.filter} key={item.filter} />
            } )}
          </div>


          <Input.Search placeholder='Search' onChange={ e => setSearch(e.target.value) } className='search' style={{ width: 300 }} />
        </div>


        {
          !applications.length
          ? (
            <div className="empty">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 150 }}
                description='You have not applied to any projects yet'
              >
                <Button onClick={ () => navigate('/') } type="primary">Explore Projects</Button>
              </Empty>
            </div>
          )
          : (
            <div className="applications">
              { filteredApplications().map(application => (
                <ApplicationCard 
                  status={ application.status }
                  onOpen={ () => selectApplication(application) }
                  title={ projects.find(p => p.id === application.projectID).title } 
                  faculty={ faculty[application.facultyID].name }
                  key={ application.id } 
                />
              ) )}
            </div>
          )
        }

      </div>


      <ApplicationModal open={ selectedApplication } application={ selectedApplication } onClose={ () => setSelectedApplication(null) } />
    </div>
  )
}

export default ApplicationsPage