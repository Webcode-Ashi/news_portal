import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import magnifiLogo from '../assets/magnifi.png'

const NavItem = ({ to, children, isSpecial, onClick }) => {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`relative group font-bold text-[13px] md:text-[13px] text-lg tracking-widest uppercase transition-all duration-300 block py-3 md:py-0
        ${isSpecial ? 'text-yellow-300 hover:text-yellow-100' : 
          isActive ? 'text-white' : 'text-red-100 hover:text-white'}`}
    >
      {children}
      <span className={`absolute md:-bottom-2 bottom-0 left-0 h-[3px] rounded-full transition-all duration-300 
        ${isSpecial ? 'bg-yellow-300' : 'bg-white'} 
        ${isActive ? 'w-12 md:w-full' : 'w-0 group-hover:w-full'}`}>
      </span>
    </Link>
  )
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-gradient-to-r from-red-900 via-red-700 to-red-600 text-white sticky top-0 z-50 shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)] border-b-4 border-red-950">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-2xl p-2 hover:bg-red-800 rounded-full transition-colors shadow-inner"
          >
            <FiMenu />
          </button>
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <img src={magnifiLogo} alt="Magnifi-Intelligence" className="h-7 sm:h-9 object-contain drop-shadow-sm" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/category/world">World</NavItem>
          <NavItem to="/category/india">India</NavItem>
          <NavItem to="/category/technology">Tech</NavItem>
          <NavItem to="/category/business">Business</NavItem>
          <NavItem to="/category/sports">Sports</NavItem>
          <NavItem to="/trending" isSpecial={true}>Trending</NavItem>
          <NavItem to="/saved">Saved</NavItem>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/search" onClick={closeMenu} className="p-2.5 sm:p-3 bg-red-800/40 hover:bg-red-900 rounded-full transition-all duration-300 shadow-inner border border-red-400/30 hover:scale-110 hover:rotate-3 backdrop-blur-sm">
            <FiSearch className="text-base sm:text-lg" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-red-950/95 backdrop-blur-md z-[100] transition-all duration-500 md:hidden flex flex-col ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-red-800/50">
          <Link to="/" onClick={closeMenu} className="bg-white px-4 py-2 rounded-xl shadow-lg">
            <img src={magnifiLogo} alt="Magnifi-Intelligence" className="h-8 object-contain" />
          </Link>
          <button 
            onClick={closeMenu}
            className="text-3xl p-2 bg-red-900 hover:bg-red-800 text-white rounded-full transition-colors shadow-inner"
          >
            <FiX />
          </button>
        </div>
        
        <nav className="flex flex-col gap-2 p-8 overflow-y-auto">
          <NavItem to="/" onClick={closeMenu}>Home</NavItem>
          <NavItem to="/category/world" onClick={closeMenu}>World News</NavItem>
          <NavItem to="/category/india" onClick={closeMenu}>India News</NavItem>
          <NavItem to="/category/technology" onClick={closeMenu}>Technology</NavItem>
          <NavItem to="/category/business" onClick={closeMenu}>Business</NavItem>
          <NavItem to="/category/sports" onClick={closeMenu}>Sports</NavItem>
          <NavItem to="/trending" isSpecial={true} onClick={closeMenu}>Trending Now</NavItem>
          <NavItem to="/saved" onClick={closeMenu}>Saved Articles</NavItem>
        </nav>
        
        <div className="mt-auto p-8 text-center text-red-300 text-xs font-semibold uppercase tracking-widest border-t border-red-800/50">
          Magnifi-Intelligence &copy; {new Date().getFullYear()}
        </div>
      </div>
    </header>
  )
}

export default Navbar
