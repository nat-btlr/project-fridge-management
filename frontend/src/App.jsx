import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Fridge from './components/Fridge';
import './output.css'

function App() {
  return (
  <Router>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/fridge" element={<Fridge />} />
    </Routes>
  </Router>
  )
}

export default App;
