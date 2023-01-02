
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs'
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
          <span>{ dayjs(message.timestamp * 1000).format('MMM Do @ h:mm a') }</span>
        </div>
        <p>{ message.message }</p>
      </div>

    </div>
  )
}

export default Message



