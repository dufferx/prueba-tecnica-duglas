import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './views/home'
import EditLocation from './views/EditLocation'
import './App.css'

function App() {

  return (
    <>
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditLocation />} />
      </Routes>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
