import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'signin', 'signup', 'dashboard'
  const [userEmail, setUserEmail] = useState('');

  const handleGetStartedClick = () => {
    setCurrentPage('signup');
  };

  const handleSignUpSuccess = (userData) => {
    setUserEmail(userData.email);
    setCurrentPage('signin');
  };

  const handleNavigateToSignIn = () => {
    setCurrentPage('signin');
  };

  const handleNavigateToSignUp = () => {
    setCurrentPage('signup');
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
  if (currentPage === 'signup') {
    return (
      <SignUp 
        onSignUpSuccess={handleSignUpSuccess}
        onNavigateToSignIn={handleNavigateToSignIn}
      />
    );
  }

  if (currentPage === 'signin') {
    return (
      <SignIn 
        onSignInSuccess={handleSignInSuccess}
        onNavigateToSignUp={handleNavigateToSignUp}
      />
    );
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
