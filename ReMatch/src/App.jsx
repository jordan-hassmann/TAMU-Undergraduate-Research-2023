import { useState } from 'react'
import GetData from './Components/FirebaseExamples/GetData'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <GetData />
    </div>
  )
}

export default App
