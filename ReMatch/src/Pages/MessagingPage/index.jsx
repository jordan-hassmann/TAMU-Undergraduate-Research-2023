
import MessageLink from '../../Components/MessageLink';
import Message from '../../Components/Message'

// antd
import { Input, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles
import './styles.scss'


const { Search } = Input;






const MessagingPage = () => {

  const onSearch = () => {}

  return (
    <div className="messaging-page">
      
      <div className="message-drawer">
        <div className="search">
          <Search placeholder="Search" onSearch={onSearch} />
        </div>
        <div className="messages">
          <MessageLink />
          <MessageLink />
          <MessageLink />
          <MessageLink />
          <MessageLink />
          <MessageLink />
          <MessageLink />
          <MessageLink />
          <MessageLink />
          <MessageLink />
          <MessageLink />
          <MessageLink />
        </div>
      </div>

      <div className="chat">
        <div className="card">


          <div className="header">
            <h2>Jane Doe</h2>
            <div className="options">
              <Button shape='circle' size='large' className="option">
                <FontAwesomeIcon icon="magnifying-glass" size='lg' />
              </Button>
              <Button shape='circle' size='large' className="option">
                <FontAwesomeIcon icon="ellipsis-vertical" size='lg' />
              </Button>
            </div>
          </div>



          <div className="messages">
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>




          <div className="input-container">
              <textarea rows={3} placeholder='Write your message...' />
          </div>

          <div className="message-options">
            <button className="option">
              <span>Attach</span>
              <FontAwesomeIcon icon='paperclip' size='lg' />
            </button>
            <button className="option">
              <span>Send</span>
              <FontAwesomeIcon icon='paper-plane' size='lg' />
            </button>
          </div>



          
        </div>
      </div>  

    </div>
  )
}

export default MessagingPage