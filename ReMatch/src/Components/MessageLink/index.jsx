
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.scss'



const MessageLink = ({ message, faculty, onClick, selected }) => {
  return (
    <div className={`message-link ${selected}`} onClick={ onClick }>

      <div className="profile-image">
        <FontAwesomeIcon icon="circle-user" size='2x'/>
      </div>

      <div className="content">
        <h4>{ faculty }</h4>
        <p>{ message }</p>
      </div>

      <div className="symbol">
      </div>
    </div>
  )
}


export default MessageLink