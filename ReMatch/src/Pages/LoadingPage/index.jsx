import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import './styles.scss'


const LoadingPage = () => {
  // const navigate = useNavigate()
  // const messagesLoaded      = useSelector(state => state.messages.values.length > 0)
  // const chatsLoaded         = useSelector(state => state.chats.values.length > 0)
  // const applicationsLoaded  = useSelector(state => state.applications.values.length > 0)
  // const projectsLoaded      = useSelector(state => state.projects.values.length > 0)
  // const studentLoaded       = useSelector(state => state.student.student.id)

  // useEffect(() => {
  //   if (messagesLoaded && chatsLoaded && applicationsLoaded && projectsLoaded && studentLoaded) {
  //     console.log("All data loaded")
  //     navigate('/')
  //   }

  // }, [messagesLoaded, chatsLoaded, applicationsLoaded, projectsLoaded, studentLoaded])


  return (
    <div className="loading-page">
      <Spin size='large' />
    </div>
  )
}

export default LoadingPage