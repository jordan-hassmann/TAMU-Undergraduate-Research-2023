
import Skill from '../Skill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './styles.scss'

dayjs.extend(relativeTime)


const OpportunityLink = ({ opportunity, headline, onClick, selected }) => {

  return (
    <div className={`opportunity-link ${selected}`} onClick={ onClick }>



      <div className="content">

        <h3>{ opportunity.title }</h3>
        <p className="subtitle">{ headline }</p>
        <p className="description">{ opportunity.description }</p>
        <div className="skills">
          { opportunity['required_skills'].map((skill, i) => <Skill key={`skill-${i}-${opportunity.id}`} skill={skill} />) }
        </div>
        <p className="date">Posted { dayjs(opportunity.timestamp * 1000).fromNow() }</p>

      </div>




      <div className="arrow">
        <FontAwesomeIcon icon='chevron-right' size='1x' />
      </div>



    </div>
  )
}


export default OpportunityLink