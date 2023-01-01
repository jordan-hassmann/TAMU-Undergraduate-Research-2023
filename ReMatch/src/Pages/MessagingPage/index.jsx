// React
import { useEffect, useState } from 'react';

// Firebase
import { SendMessage } from '../../API/Messaging';

// Components
import MessageLink from '../../Components/MessageLink';
import Message from '../../Components/Message'

// antd
import { Input, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles
import './styles.scss'
import { useSelector } from 'react-redux';


const { Search } = Input;






const MessagingPage = () => {

  const messages = useSelector(state => state.messages.values)
  const chats = useSelector(state => state.chats.values)
  const faculty = useSelector(state => state.faculty.values)
  const onSearch = () => {}

  const [selectedChat, setSelectedChat] = useState(0)



  const getFacultyName = chatIndex => {
    const f = faculty[chats[chatIndex].facultyID]
    return f.firstname + ' ' + f.lastname
  }

  const filterMessages = chatIndex => {
    return messages.filter(msg => msg.chatID === chats[chatIndex].id)
  }

  


  return (
    <div className="messaging-page">
      
      <div className="message-drawer">
        <div className="search">
          <Search placeholder="Search" onSearch={onSearch} />
        </div>
        <div className="messages">
          { chats.map((chat, i) => <MessageLink key={ chat.id } message={ filterMessages(i).at(-1) ? filterMessages(i).at(-1).message : '' } faculty={ getFacultyName(i) } onClick={ () => setSelectedChat(i) } />) }
        </div>
      </div>

      <div className="chat">
        <div className="card">


          <div className="header">
            <h2>{ getFacultyName(selectedChat) }</h2>
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
            { filterMessages(selectedChat).map(message => <Message key={ message.id } message={ message } />) }
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