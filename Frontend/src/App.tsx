import { Route, Routes } from 'react-router-dom'
import Home from './services/Home'
import MapService from './services/MapService'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/mapservice" element={<MapService/>} />
    </Routes>
  )
}

export default App
