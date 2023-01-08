// React
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

// Components
import MessageLink from '../../Components/MessageLink';
import Message from '../../Components/Message'

// Firebase
import { HideChat, SendMessage } from '../../API/Messaging';
import { auth } from '../../firebase';
import { Timestamp } from 'firebase/firestore';



// Styles
import { Input, Button, Spin, Empty, Dropdown, Tooltip } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss'








const MessagingPage = () => {

  const navigate = useNavigate()
  const messages = useSelector(state => state.messages.values)
  const chats = useSelector(state => state.chats.values)
  const faculty = useSelector(state => state.faculty.values)
  const msgRef = useRef()
  const chatContainer = useRef()

  const [selectedChat, setSelectedChat] = useState(0)
  const [sending, setSending] = useState(false)
  const [search, setSearch] = useState('')
  const menu = [
    {
      key: '1', 
      label: (
        <Tooltip title="Removing this chat won't remove it for the faculty" placement='bottomLeft'>
          <a onClick={ hideChat }>Remove Chat</a>
        </Tooltip>
      ),
      icon: <FontAwesomeIcon icon='close' />,
      danger: true,
    }
  ]




  function getFacultyName(chatIndex) {
    return faculty[chats[chatIndex].facultyID].name
  }

  function filterMessages(chatIndex) {
    return messages.filter(msg => msg.chatID === chats[chatIndex].id)
  }

  function filterChats() {
    return chats.filter(chat => !chat.hide && faculty[chat.facultyID].name.toLowerCase().includes(search.toLowerCase()))
  }

  async function sendMessage() {
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

  async function hideChat() {
    await HideChat(chats[selectedChat].id)
    setSelectedChat(0)
  }






  return (
    <div className="messaging-page">
      
      <div className="message-drawer">
        <div className="search">
          <Input.Search placeholder="Search" onChange={ e => setSearch(e.target.value) } />
        </div>
        <div className="messages">
          { filterChats().map((chat, i) => (
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

      {
        !chats.length
        ? (
          <div className="no-chats">
            <Empty description='You have not started a chat yet'>
              <Button type='primary' onClick={ () => navigate('/') }>Explore Projects</Button>
            </Empty>
          </div>
        )
        : (
          <div className="chat">
            <div className="card">


              <div className="header">
                <h2>{ getFacultyName(selectedChat) }</h2>
                <div className="options">
                  <Dropdown menu={{ items: menu }} trigger='click'>
                    <Button shape='circle' size='large' className="option">
                      <FontAwesomeIcon icon="ellipsis-vertical" size='lg' />
                    </Button>
                  </Dropdown>
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
        )
      }

    </div>
  )
}

export default MessagingPage