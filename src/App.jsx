import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Team from './components/Team';
import Events from './components/Events';
import Admin from './components/Admin.jsx';
import Header from './components/Header.jsx';
import DinoEasterEgg from './components/DinoEasterEgg';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <main className="min-h-screen max-w-3xl mx-auto p-4 font-sans">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Events />
                <Team />
                <ContactForm />
              </>
            }
          />
          <Route path="/dino" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <DinoEasterEgg />
    </Router>
  );
}

export default App;