import React from 'react'
import { Link } from 'react-router-dom'
import { FiTwitter, FiLinkedin, FiFacebook, FiInstagram } from 'react-icons/fi'
import magnifiLogo from '../assets/magnifi.png'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-red-800 to-red-950 text-white border-t-4 border-red-500 pt-16 pb-8 mt-12 relative overflow-hidden shadow-[0_-10px_30px_-10px_rgba(220,38,38,0.3)]">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="col-span-1 md:col-span-5">
          <div className="flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl inline-flex shadow-xl">
            <img src={magnifiLogo} alt="Magnifi-Intelligence" className="h-12 object-contain filter drop-shadow-md" />
          </div>
          <p className="text-red-100 text-[15px] max-w-md leading-relaxed font-medium tracking-wide">
            Your premium global news portal. Bringing you breaking news, top stories, and personalized AI-generated summaries at lightning speed.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#" className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-red-900 transition-all duration-300 shadow-lg text-xl hover:scale-110"><FiTwitter /></a>
            <a href="#" className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-red-900 transition-all duration-300 shadow-lg text-xl hover:scale-110"><FiLinkedin /></a>
            <a href="#" className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-red-900 transition-all duration-300 shadow-lg text-xl hover:scale-110"><FiFacebook /></a>
            <a href="#" className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-red-900 transition-all duration-300 shadow-lg text-xl hover:scale-110"><FiInstagram /></a>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-3 md:col-start-7">
          <h4 className="font-bold text-lg mb-6 uppercase tracking-[0.2em] border-b border-red-500/50 pb-2 inline-block text-red-50">Categories</h4>
          <ul className="space-y-4 font-medium text-red-200">
            <li><Link to="/category/world" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2"><span className="text-red-400">•</span> World News</Link></li>
            <li><Link to="/category/india" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2"><span className="text-red-400">•</span> India News</Link></li>
            <li><Link to="/category/technology" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2"><span className="text-red-400">•</span> Technology</Link></li>
            <li><Link to="/category/business" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2"><span className="text-red-400">•</span> Business</Link></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3">
          <h4 className="font-bold text-lg mb-6 uppercase tracking-[0.2em] border-b border-red-500/50 pb-2 inline-block text-red-50">Legal</h4>
          <ul className="space-y-4 font-medium text-red-200">
            <li><Link to="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2"><span className="text-red-400">•</span> Terms of Use</Link></li>
            <li><Link to="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2"><span className="text-red-400">•</span> Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2"><span className="text-red-400">•</span> Cookies Policy</Link></li>
            <li><Link to="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2"><span className="text-red-400">•</span> Accessibility</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-red-800 text-center relative z-10">
        <p className="font-semibold text-red-300 tracking-wide text-sm">
          &copy; {new Date().getFullYear()} Magnifi-Intelligence. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
