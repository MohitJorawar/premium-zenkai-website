import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react'

export default function Navbar({ cartCount, onCartClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', hasDropdown: false },
    { name: 'About', hasDropdown: false },
    { name: 'Products', hasDropdown: true },
    { name: 'Articles', hasDropdown: true },
    { name: 'Contact', hasDropdown: false }
  ]

  return (
    <motion.header
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.2,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out text-[#F5F0EA] border-b border-[#F5F0EA]/10 ${
        scrolled 
          ? 'bg-[#121212]/70 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      {/* Main Navbar Container */}
      <div className={`max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6'
      }`}>
        
        {/* Logo - Serif style */}
        <div className="flex items-center">
          <a href="#" className="font-serif text-2xl font-light tracking-[0.15em] text-[#F5F0EA] uppercase select-none">
            ZENkai
          </a>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-9 text-[13px] font-medium tracking-[0.2em] py-2 uppercase">
          {navItems.map((item) => (
            <div key={item.name} className="relative group flex items-center cursor-pointer">
              <a
                href="#"
                onClick={() => setActiveTab(item.name)}
                className={`transition-colors duration-300 flex items-center gap-1.5 font-sans ${
                  activeTab === item.name 
                    ? 'text-[#B87333]' 
                    : 'text-[#F5F0EA]/80 hover:text-[#B87333]'
                }`}
              >
                {item.name}
                {item.hasDropdown && (
                  <span className="text-[10px] text-zinc-400 font-normal transition-transform duration-300 group-hover:rotate-180">
                    ▼
                  </span>
                )}
              </a>

              {/* Submenu Dropdown */}
              {item.hasDropdown && (
                <div className="absolute top-[calc(100%+12px)] left-0 mt-1 w-48 bg-[#121212] shadow-2xl border border-white/10 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2 text-xs text-[#F5F0EA]/80 font-normal">
                    <a href="#" className="block px-4 py-2 hover:bg-white/5 hover:text-[#B87333] transition-colors">
                      Featured Collection
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-white/5 hover:text-[#B87333] transition-colors">
                      New Arrivals
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side utilities */}
        <div className="flex items-center space-x-6 text-[#F5F0EA]">
          <button className="hover:text-[#B87333] transition-colors duration-300 p-1 cursor-pointer" aria-label="Search">
            <Search className="w-[18px] h-[18px] stroke-[1.8]" />
          </button>

          {/* Cart Icon with badge */}
          <button 
            onClick={onCartClick} 
            className="hover:text-[#B87333] transition-colors duration-300 p-1 cursor-pointer relative flex items-center" 
            aria-label="Cart"
          >
            <ShoppingCart className="w-[18px] h-[18px] stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#E07B2A] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center scale-90 border border-[#121212]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden hover:text-[#B87333] transition-colors p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#121212]/95 backdrop-blur-md border-b border-white/10 overflow-hidden absolute w-full left-0 z-40"
          >
            <div className="px-6 py-6 flex flex-col space-y-4 text-[#F5F0EA]/90 text-sm font-medium tracking-widest uppercase">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-white/5 pb-3">
                  <div className="flex justify-between items-center">
                    <a 
                      href="#" 
                      onClick={() => {
                        setActiveTab(item.name)
                        if (!item.hasDropdown) setMobileMenuOpen(false)
                      }}
                      className={activeTab === item.name ? 'text-[#B87333]' : 'hover:text-[#B87333]'}
                    >
                      {item.name}
                    </a>
                    {item.hasDropdown && <span className="text-xs text-zinc-500">▼</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Polobar (Animated bottom border line/dot) */}
      <div className="absolute bottom-0 left-0 right-0 h-[16px] flex justify-center items-center pointer-events-none translate-y-1/2 z-50">
        {/* Horizontal Line expanding left and right */}
        <div className="polobar-line w-full h-[1px] bg-white/70 origin-center scale-x-0" />
        
        {/* Outer Circle and Inner Dot (Polo Stick Knob equivalent) */}
        <div className="polobar-knob w-4 h-4 rounded-full border border-white/40 flex items-center justify-center bg-white/5 backdrop-blur-xs absolute scale-0 opacity-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F5F0EA]" />
        </div>
      </div>
    </motion.header>
  )
}
