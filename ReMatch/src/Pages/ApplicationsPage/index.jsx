// React
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, Dropdown } from 'antd'
import FilterChip from '../../Components/FilterChip'
import ApplicationCard from '../../Components/ApplicationCard'

import './styles.scss'



// const MenuItem = ({ label, onClick, })



const ApplicationsPage = () => {

  const [filters, setFilters] = useState([])
  const [open, setOpen] = useState(false);
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

          <div className="spacer" />

          <Input.Search placeholder='Search' className='search' style={{ width: 300 }} />
        </div>


        <div className="applications">

          <ApplicationCard />
          <ApplicationCard />
          <ApplicationCard />
          <ApplicationCard />
          <ApplicationCard />
          <ApplicationCard />
          <ApplicationCard />
          <ApplicationCard />
          
        </div>

      </div>
    </div>
  )
}

export default ApplicationsPage