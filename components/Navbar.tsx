import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeLinkClass = "bg-primary text-white";
  const inactiveLinkClass = "text-text-muted hover:bg-surface hover:text-text";

  const navLinkClasses = `px-3 py-2 rounded-md text-sm font-medium transition-colors`;
  
  const mobileNavLinkClasses = `block px-3 py-2 rounded-md text-base font-medium`;

  return (
    <nav className="bg-surface/70 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-primary-light">SkillConnect</span>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/dashboard" className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Dashboard</NavLink>
                <NavLink to="/courses" className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Courses</NavLink>
                <NavLink to="/jobs" className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Jobs</NavLink>
                <NavLink to="/profile" className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Profile</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <span className="text-text-muted mr-4">Welcome, {user?.name.split(' ')[0]}</span>
              <button
                onClick={handleLogout}
                className="bg-danger text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-surface inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/dashboard" className={({isActive}) => `${mobileNavLinkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Dashboard</NavLink>
            <NavLink to="/courses" className={({isActive}) => `${mobileNavLinkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Courses</NavLink>
            <NavLink to="/jobs" className={({isActive}) => `${mobileNavLinkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Jobs</NavLink>
            <NavLink to="/profile" className={({isActive}) => `${mobileNavLinkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>Profile</NavLink>
        </div>
        <div className="pt-4 pb-3 border-t border-zinc-700">
            <div className="px-2">
                <button
                    onClick={handleLogout}
                    className="w-full text-left block bg-danger text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;