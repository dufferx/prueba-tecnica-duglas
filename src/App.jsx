import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/home'
import EditLocation from './views/EditLocation'
import './App.css'

function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditLocation />} />
      </Routes>
    </Router>
  )
}

export default App
