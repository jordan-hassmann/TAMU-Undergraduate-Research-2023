
import { Checkbox, Select, Tag, Modal, Segmented, AutoComplete, Tooltip } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Fab from '../Fab'


import './styles.scss'




const FilterModal = ({ 
  open, 
  clearFilters,
  onClose, 
  filters, 
  setFilters, 
}) => {

  const options = {
    category: ['Research Position', 'Symposium', 'Program', 'Funding', 'Conference', 'Publication'],
    location: ['On Campus', 'Off Campus', 'Virtual'],
    team:     ['Team Project', 'Individual Project'],
    paid:     ['Paid', 'Unpaid'],
  }





  return (
    <Modal open={ open } width='fit-content' centered closable={false} footer={ null }>
      <div className="filter-modal-card">



        <div className="header">
          <h3>Filter your projects</h3>
          <Fab size={ 45 } onClick={ onClose }>
            <FontAwesomeIcon icon='xmark' size='2x' />
          </Fab>
        </div>



        <div className="content">


          <div className="col">

            <h5>Category</h5>
            <Checkbox.Group options={ options.category } value={ filters.categories } onChange={ categories => setFilters({ ...filters, categories }) } />

            <h5>Field of Study</h5>
            <Select
              style={{ width: 300 }}
              allowClear
              mode='multiple'
              onChange={ fields => setFilters({ ...filters, fields }) }
              value={ filters.fields }
              options={[
                { value: 'CSCE' }, 
                { value: 'COMP' }, 
                { value: 'CHEN' }, 
                { value: 'PSYC' }, 
                { value: 'BIMS' }, 
                { value: 'ESET' }, 

              ]}
            />

            <h5>Related Skills</h5>
            <Select
              style={{ width: 300 }}
              allowClear
              onChange={ skills => setFilters({ ...filters, skills })}
              mode='multiple'
              value={ filters.skills }
              options={[
                { value: 'Python' }, 
                { value: 'JavaScript' }, 
                { value: 'R' }, 
                { value: 'Java' }, 
                { value: 'Scala' }, 
              ]}
            />

          </div>


          <div className="col">

            <h5>Location</h5>
            <Checkbox.Group options={ options.location } value={ filters.location } onChange={ location => setFilters({ ...filters, location }) } />

            <h5>Team</h5>
            <Checkbox.Group options={ options.team } value={ filters.team } onChange={ team => setFilters({ ...filters, team }) } />

            <h5>Paid</h5>
            <Checkbox.Group options={ options.paid } value={ filters.paid } onChange={ paid => setFilters({ ...filters, paid }) } />

            <div className="help">
              <h5>Favorited</h5>
              <Tooltip title='See all projects you favorited'>
                <FontAwesomeIcon icon='question-circle' color='#5570FA' />
              </Tooltip>
            </div>
            <Segmented
              style={{ width: 'fit-content' }}
              options={[
                {
                  label: 'All',
                  value: 'All',
                  icon: <FontAwesomeIcon icon='layer-group' style={{ marginRight: 6}} />
                },
                {
                  label: 'Favorited',
                  value: 'Favorited',
                  icon: <FontAwesomeIcon icon='star' style={{ marginRight: 6}} />,
                },
              ]}
              value={ filters.favorite }
              onChange={ favorite => setFilters({ ...filters, favorite}) }
            />

          </div>

            
        </div>



        <div className="options">
          <button className="clear" onClick={ clearFilters }>Clear</button>
        </div>


      </div>
    </Modal>
  )
}

export default FilterModal