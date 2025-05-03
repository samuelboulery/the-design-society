import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from './components/About';
import SocialLinks from './components/SocialLinks';
import Team from './components/Team';
import Events from './components/Events';
import Admin from './components/Admin.jsx';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="max-w-3xl mx-auto p-4 font-sans">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <About />
                <SocialLinks />
                <Events />
                <Team />
              </>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;