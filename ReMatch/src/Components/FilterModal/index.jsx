
import { Checkbox, Select, Tag, Modal, Segmented, AutoComplete, Tooltip } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Fab from '../Fab'


import './styles.scss'




const FilterModal = ({ open, onClose }) => {

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
            <Checkbox.Group options={ options.category }  />

            <h5>Field of Study</h5>
            <AutoComplete />

            <h5>Related Skills</h5>
            <AutoComplete />

          </div>


          <div className="col">

            <h5>Location</h5>
            <Checkbox.Group options={ options.location } />

            <h5>Team</h5>
            <Checkbox.Group options={ options.team } />

            <h5>Paid</h5>
            <Checkbox.Group options={ options.paid } />

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
            />

          </div>

            
        </div>



        <div className="options">
          <button className="clear">Clear</button>
          <button className="save">Save</button>
        </div>


      </div>
    </Modal>
  )
}

export default FilterModal