import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhyChooseUs from './components/WhyChooseUs'
import FeaturedProducts from './components/FeaturedProducts'
import LatestProducts from './components/LatestProducts'
import Inspirations from './components/Inspirations'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [hoveredId, setHoveredId] = useState(null)
  const [sectionInView, setSectionInView] = useState(false)
  const [staggerActive, setStaggerActive] = useState(true)

  // Shopping Cart States
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Cart helper functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prevCart => 
      prevCart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    )
  }

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const collection = [
    {
      id: 1,
      title: 'Minimalist Dining Lounge',
      category: 'Living Space',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Monochrome Accent Chair',
      category: 'Furniture Design',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Warm Earth tones Bedroom',
      category: 'Private Quarters',
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80'
    }
  ]

  useEffect(() => {
    // Symmetrical Polo components setup
    gsap.set(".design-polobar-knob-left", { left: "50%", xPercent: -50, scale: 0, opacity: 0 })
    gsap.set(".design-polobar-knob-right", { left: "50%", xPercent: -50, scale: 0, opacity: 0 })
    gsap.set(".design-polobar-line", { scaleX: 0 })

    let timeoutId;

    // Global GSAP ScrollTrigger performance configurations
    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true
    })
    ScrollTrigger.normalizeScroll({ allowNestedScroll: true })

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".design-polobar-container",
          start: "top 90%",
          toggleActions: "play none none none"
        }
      })

      // 1. Knobs appear in the middle (overlapping as one circle)
      tl.to([".design-polobar-knob-left", ".design-polobar-knob-right"], {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      })

      // 2. Line expands and knobs slide smoothly to their left & right edges
      tl.to(".design-polobar-line", {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "+=0.1")

      tl.to(".design-polobar-knob-left", {
        left: "0%",
        xPercent: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "<")

      tl.to(".design-polobar-knob-right", {
        left: "100%",
        xPercent: -100,
        duration: 0.8,
        ease: "power2.out"
      }, "<")

      // ScrollTrigger for Design Philosophy cards entrance
      ScrollTrigger.create({
        trigger: ".design-philosophy-section",
        start: "top 75%",
        onEnter: () => {
          setSectionInView(true)
          timeoutId = setTimeout(() => {
            setStaggerActive(false)
          }, 1000)
        },
        onLeaveBack: () => {
          setSectionInView(false)
          setStaggerActive(true)
          if (timeoutId) clearTimeout(timeoutId)
        }
      })
    })

    return () => {
      ctx.revert()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="w-full bg-[#121212] min-h-screen text-white select-none relative">
      {/* Premium Navigation Header */}
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* Hero Showcase Section */}
      <Hero />

      {/* About Us Section */}
      <About />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      <section className="design-philosophy-section py-24 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto bg-[#16120e] relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 pb-8 gap-4 relative">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#a87f5a] font-medium block mb-2">Curated Showroom</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-zinc-100 leading-tight">
              Design Philosophy
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-light leading-relaxed">
            We craft sensory architectural experiences tailored to the modern dweller, prioritizing natural lighting, sustainable materials, and sculptural furniture layouts.
          </p>

          {/* Symmetrical expanding Polo Bar */}
          <div className="design-polobar-container absolute bottom-0 left-0 right-0 h-[16px] flex items-center pointer-events-none">
            {/* Horizontal Line */}
            <div className="design-polobar-line w-full h-[1px] bg-white/70 origin-center scale-x-0" />
            
            {/* Left Knob */}
            <div className="design-polobar-knob-left w-4 h-4 rounded-full border border-white/40 flex items-center justify-center bg-[#16120e] absolute left-1/2 -translate-x-1/2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5F0EA]" />
            </div>

            {/* Right Knob */}
            <div className="design-polobar-knob-right w-4 h-4 rounded-full border border-white/40 flex items-center justify-center bg-[#16120e] absolute left-1/2 -translate-x-1/2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5F0EA]" />
            </div>
          </div>
        </div>

        {/* Interior cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-8">
          {collection.map((item) => {
            const isHovered = hoveredId === item.id;
            const isAnyHovered = hoveredId !== null;
            
            let cardClass = "group relative overflow-hidden bg-[#1f1a14] rounded-xs border cursor-pointer design-card-transition ";
            
            if (!sectionInView) {
              cardClass += "opacity-0 translate-y-12 scale-[0.95] border-zinc-900 z-10";
            } else {
              cardClass += "opacity-100 translate-y-0 ";
              
              if (!isAnyHovered) {
                // Default state: middle card is larger, side cards are smaller
                if (item.id === 2) {
                  cardClass += "scale-[1.05] border-zinc-800 z-10 shadow-lg";
                } else {
                  cardClass += "scale-[0.90] border-zinc-900/50 z-10 opacity-90";
                }
              } else {
                // Focus state: hovered is larger, others are smaller & slightly dimmed
                if (isHovered) {
                  cardClass += "scale-[1.08] border-zinc-700 z-20 shadow-2xl";
                } else {
                  cardClass += "scale-[0.90] border-zinc-900/30 z-10 opacity-40";
                }
              }
            }

            const delay = (sectionInView && staggerActive) ? `${(item.id - 1) * 150}ms` : '0ms';

            return (
              <div
                key={item.id}
                className={cardClass}
                style={{ transitionDelay: delay }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Container with zoom effect */}
                <div className="aspect-[4/5] overflow-hidden w-full relative">
                  <div className="absolute inset-0 bg-[#0d0905]/10 group-hover:bg-[#0d0905]/0 transition-colors duration-500 z-10" />
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover image-zoom-transition group-hover:scale-105"
                  />
                </div>

                {/* Text Info */}
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#a87f5a] font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-light text-zinc-100 group-hover:text-[#ead8c3] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Featured Products Section */}
      <FeaturedProducts onAddToCart={addToCart} />

      {/* Latest Products Section */}
      <LatestProducts onAddToCart={addToCart} />

      {/* Inspirations Section */}
      <Inspirations />

      {/* Footer */}
      <Footer />

      {/* Shopping Cart Drawer Overlays */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false)
          setIsCheckoutOpen(true)
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={() => {
          clearCart()
          setIsCheckoutOpen(false)
        }}
      />
    </div>
  )
}
