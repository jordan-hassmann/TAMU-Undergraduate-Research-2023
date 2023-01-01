
import Skill from '../Skill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles.scss'
import { useSelector } from 'react-redux'


const OpportunityLink = ({ opportunity, headline, onClick }) => {

  return (
    <div className="opportunity-link" onClick={ onClick }>



      <div className="content">

        <h3>{ opportunity['title'] }</h3>
        <p className="subtitle">{ headline }</p>
        <p className="description">{ opportunity['description'] }</p>
        <div className="skills">
          { opportunity['required_skills'].map(skill => <Skill skill={skill} />) }
        </div>
        <p className="date">Posted { opportunity['timestamp'] }</p>

      </div>




      <div className="arrow">
        <FontAwesomeIcon icon='chevron-right' size='1x' />
      </div>



    </div>
  )
}


export default OpportunityLink