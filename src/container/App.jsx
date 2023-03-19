import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentDeployment from '../Pages/StudentDeployment/StudentDeployment'
import Admin from '../Pages/Admin/Admin'

function App() {


  return (
    <div className="App">
      {/* <Admin/> */}
   <StudentDeployment/>
    </div>
  )
}

export default App
