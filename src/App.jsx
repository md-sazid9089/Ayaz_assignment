import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'signin', 'dashboard'
  const [userEmail, setUserEmail] = useState('');

  const handleGetStartedClick = () => {
    setCurrentPage('signin');
  };

  const handleSignInSuccess = (userData) => {
    setUserEmail(userData.email);
    setCurrentPage('dashboard');
  };

  const handleSignOut = () => {
    setUserEmail('');
    setCurrentPage('home');
  };

  // Render based on current page
  if (currentPage === 'signin') {
    return <SignIn onSignInSuccess={handleSignInSuccess} />;
  }

  if (currentPage === 'dashboard') {
    return <Dashboard userEmail={userEmail} onSignOut={handleSignOut} />;
  }

  // Home page (default)
  return (
    <div className="bg-white min-h-screen">
      <Navbar onGetStartedClick={handleGetStartedClick} />
      <Hero onGetStartedClick={handleGetStartedClick} />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}
