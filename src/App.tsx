import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import SingleNews from './Components/SingleNews';
function App() {


  return (
    <>
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<SingleNews />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
