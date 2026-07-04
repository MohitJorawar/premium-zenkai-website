import React from 'react'
import SplitText from './ui/SplitText'

export default function Footer() {
  return (
    <footer className="w-full bg-[#121212] text-white pt-24 pb-12 px-6 md:px-12 lg:px-16 relative z-20 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Top Section: Newsletter Signup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Top Left: Heading */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-serif text-sm tracking-wide text-zinc-400 mb-4 block">
              <SplitText 
                text="Weekly Newsletter" 
                delay={60} 
                duration={1.8} 
                mode="words"
              />
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal leading-[1.1] text-white select-none">
              <SplitText 
                text="Your Weekly Dose" 
                delay={50} 
                duration={1.8} 
                mode="words"
              />
              <span className="block font-script italic text-white mt-2">
                <SplitText 
                  text="of Elegance" 
                  delay={80} 
                  duration={2.2} 
                  mode="words"
                />
              </span>
            </h2>
          </div>

          {/* Top Right: Input & Info */}
          <div className="lg:col-span-5 flex flex-col justify-end h-full lg:pt-16">
            <p className="text-zinc-400 font-sans font-light text-sm md:text-[15px] leading-relaxed max-w-sm mb-6">
              <SplitText 
                text="Stay connected with exclusive home styling tips and weekly inspiration." 
                delay={25} 
                duration={1.6} 
                mode="words"
              />
            </p>
            
            {/* Input field */}
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }} className="flex items-center border border-white/10 bg-transparent rounded-none max-w-md w-full overflow-hidden transition-colors focus-within:border-white/30">
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="bg-transparent text-white placeholder-zinc-600 focus:outline-none flex-grow py-3.5 px-5 text-sm font-sans"
              />
              <div className="h-8 w-[1px] bg-white/10"></div>
              <button 
                type="submit"
                className="flex items-center justify-center px-6 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-white/10 mb-16" />

        {/* Bottom Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-12">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-4 flex flex-col text-left">
            <span className="font-serif text-2xl font-light tracking-[0.15em] text-[#F5F0EA] uppercase select-none mb-4">
              ZENkai
            </span>
            <p className="text-zinc-500 font-sans font-light text-xs md:text-sm max-w-[240px] leading-relaxed">
              Crafting harmony through thoughtful design.
            </p>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Resources */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-zinc-500 font-sans font-semibold text-[11px] uppercase tracking-wider select-none">
                Resources
              </span>
              <ul className="flex flex-col gap-2.5 text-[13px] font-sans font-light text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#featured-products" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Articles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-zinc-500 font-sans font-semibold text-[11px] uppercase tracking-wider select-none">
                Follow Us
              </span>
              <ul className="flex flex-col gap-2.5 text-[13px] font-sans font-light text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">X</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
              </ul>
            </div>

            {/* Utility Pages */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-zinc-500 font-sans font-semibold text-[11px] uppercase tracking-wider select-none">
                Utility Pages
              </span>
              <ul className="flex flex-col gap-2.5 text-[13px] font-sans font-light text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Style Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Change Log</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Template Guide</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Divider */}
        <hr className="border-white/5 my-8" />

        {/* Footer Bottom Strip */}
        <div className="flex flex-col items-center justify-center pt-4 text-center">
          <p className="text-[11px] text-zinc-600 font-sans">
            Designed by <a href="#" className="hover:text-zinc-400 underline transition-colors">DhaniDev</a>. Powered by <a href="#" className="hover:text-zinc-400 underline transition-colors">Webflow</a>.
          </p>
        </div>

      </div>
    </footer>
  )
}
