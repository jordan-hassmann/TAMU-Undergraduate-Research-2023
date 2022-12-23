
import Skill from '../Skill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles.scss'


const OpportunityLink = ({ opportunity }) => {
  
  return (
    <div className="opportunity-link">



      <div className="content">

        <h3>Machine learning for predicting glucose trajectories</h3>
        <p className="subtitle">
          Irina Gaynanova  —  DeBakey Executive Research Leadership Program
        </p>
        <p className="description">
          Data from wearable devices, such as continuous glucose 
          monitors (CGM), activity trackers, ambulatory blood 
          pressure monitors, and sleep EEG monitors, are increasingly 
          common. This wealth of data has the potential...
        </p>
        <div className="skills">
          <Skill />
          <Skill />
          <Skill />
          <Skill />
        </div>
        <p className="subtitle">Posted 3 weeks ago</p>

      </div>




      <div className="arrow">
        <FontAwesomeIcon icon='chevron-right' size='1x' />
      </div>



    </div>
  )
}


export default OpportunityLink