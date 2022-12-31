
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss'


const Message = ({ message }) => {
  
  return (
    <div className="message">

      <div className="profile-image">
        <FontAwesomeIcon icon="circle-user" size='2x'/>
      </div>

      <div className="content">
        <div className="title">
          <h4>{ message.sender }</h4>
          <span>{ message.timestamp }</span>
        </div>
        <p>{ message.message }</p>
      </div>

    </div>
  )
}

export default Message



{/* <span>Feb 4th @ 1:46 pm</span> */}
