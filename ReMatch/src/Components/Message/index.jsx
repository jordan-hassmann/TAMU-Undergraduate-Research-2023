
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
          <h4>Tracy Hammond</h4>
          <span>Feb 4th @ 1:46 pm</span>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      </div>

    </div>
  )
}

export default Message