// React
import { useEffect, useState, useRef } from 'react';

// Firebase
import { SendMessage } from '../../API/Messaging';
import { auth } from '../../firebase';
import { Timestamp } from 'firebase/firestore';

// Components
import MessageLink from '../../Components/MessageLink';
import Message from '../../Components/Message'

// antd
import { Input, Button, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles
import './styles.scss'
import { useSelector } from 'react-redux';


const { Search } = Input;






const MessagingPage = () => {

  const messages = useSelector(state => state.messages.values)
  const chats = useSelector(state => state.chats.values)
  const faculty = useSelector(state => state.faculty.values)
  const msgRef = useRef()
  const chatContainer = useRef()
  const onSearch = () => {}

  const [selectedChat, setSelectedChat] = useState(0)
  const [sending, setSending] = useState(false)



  const getFacultyName = chatIndex => {
    const f = faculty[chats[chatIndex].facultyID]
    return f.firstname + ' ' + f.lastname
  }

  const filterMessages = chatIndex => {
    return messages.filter(msg => msg.chatID === chats[chatIndex].id)
  }

  const sendMessage = async () => {
    const message = msgRef.current.value
    if (!message) return 
    setSending(true)

    const chat = chats[selectedChat]
    const msg = {
      message, 
      chatID: chat.id,
      attachmentID: '', 
      facultyID: chat.facultyID, 
      studentID: auth.currentUser.uid, 
      recipientID: chat.facultyID,
      senderID: auth.currentUser.uid,
      timestamp: Timestamp.now()
    }


    await SendMessage(msg)
    setSending(false)
    msgRef.current.value = ''
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight
  }


  return (
    <div className="messaging-page">
      
      <div className="message-drawer">
        <div className="search">
          <Search placeholder="Search" onSearch={onSearch} />
        </div>
        <div className="messages">
          { chats.map((chat, i) => (
              <MessageLink 
                key={ chat.id } 
                message={ filterMessages(i).at(-1) ? filterMessages(i).at(-1).message : '' } 
                faculty={ getFacultyName(i) } 
                onClick={ () => setSelectedChat(i) } 
                selected={ chats[selectedChat].id === chat.id }
              />
          )) }
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



          <div className="messages" ref={ chatContainer }>
            { filterMessages(selectedChat).map(message => <Message key={ message.id } message={ message } />) }
          </div>




          <div className="input-container">
              <textarea ref={ msgRef } rows={3} placeholder='Write your message...' />
          </div>

          <div className="message-options">
            <button className="option">
              <span>Attach</span>
              <FontAwesomeIcon icon='paperclip' size='lg' />
            </button>
            <button className="option" onClick={ sendMessage }>
              <span>Send</span>
              {
                sending 
                ? <Spin style={{ height: '16px', marginTop: '-8px' }} size='small' indicator={ <LoadingOutlined color='#FF0000' /> } />
                : <FontAwesomeIcon icon='paper-plane' size='lg' />
              }
            </button>
          </div>



          
        </div>
      </div>  

    </div>
  )
}

export default MessagingPage