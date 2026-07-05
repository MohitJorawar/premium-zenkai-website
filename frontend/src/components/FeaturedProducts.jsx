import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag } from 'lucide-react'
import ProductModal from './ProductModal'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProducts({ onAddToCart }) {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const gridRef = useRef(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const products = [
    {
      id: 1,
      name: 'Woven Rattan Pot',
      price: '$24.00 USD',
      image: '/images/woven_rattan_pot.png'
    },
    {
      id: 2,
      name: 'Basic Wooden Chair',
      price: '$100.00 USD',
      image: '/images/basic_wooden_chair.png'
    },
    {
      id: 3,
      name: 'Small Office Chair',
      price: '$135.00 USD',
      image: '/images/small_office_chair.png'
    },
    {
      id: 4,
      name: 'Wooden Cabinet',
      price: '$175.00 USD',
      image: '/images/wooden_cabinet.png'
    }
  ]

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      })

      // Animate headline as a single unit with a fade-up entrance
      tl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }
      )

      // Staggered fade-up for each product card wrapper
      tl.fromTo(
        '.product-card-animate',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12, // 120ms stagger between cards
          ease: 'power2.out'
        },
        '-=0.4' // overlap with headline animation
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="featured-products"
      className="w-full bg-[#F0EDE8] pt-20 pb-40 px-6 md:px-12 lg:px-16 overflow-hidden relative z-20 border-0"
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* Centered Small Label & Mixed Typography Headline */}
        <div ref={headlineRef} className="text-center mb-20 opacity-0">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-sans font-medium block mb-4 select-none">
            Featured Products
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] font-bold text-[#1A1A1A] leading-tight select-none flex flex-wrap justify-center items-baseline gap-x-4 lg:gap-x-5">
            <span>Curated</span>
            <span className="font-script italic text-[#B87333] font-light tracking-normal leading-none transform translate-y-1 md:translate-y-2">
              Classics
            </span>
            <span>Reimagined</span>
          </h2>
        </div>

        {/* Product Grid with Zig-Zag Alignment Offset */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 xs:gap-x-4 sm:gap-x-6 gap-y-12 sm:gap-y-16 select-none"
        >
          {products.map((product, idx) => (
            <div
              key={product.id}
              className={`w-full transition-transform duration-300 ${
                idx % 2 === 1 ? 'lg:translate-y-12' : ''
              }`}
            >
              
              {/* Animated container wrapper for GSAP */}
              <div className="flex flex-col group product-card-animate opacity-0">
                
                {/* Product Card Image Container */}
                <div className="aspect-square w-full bg-[#E8E4DE] rounded-[8px] flex items-center justify-center overflow-hidden relative transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-[6px] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-[70%] h-[70%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* View Product Button Overlay (pointer-events handles clickability inside hidden group) */}
                  <div className="absolute inset-0 bg-[#121212]/15 backdrop-blur-xs opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedProduct(product)
                      }}
                      className="bg-[#F0EDE8]/95 text-[#1A1A1A] border border-[#1A1A1A]/10 px-3 xs:px-5 py-2.5 rounded-xs uppercase tracking-widest text-[9px] xs:text-[11px] font-semibold transition-all duration-300 hover:bg-[#1A1A1A] hover:text-[#F0EDE8] hover:border-[#1A1A1A] transform translate-y-4 group-hover:translate-y-0 cursor-pointer shadow-md"
                    >
                      View Product
                    </button>
                  </div>
                </div>

                {/* Product Info Row - Larger Typo to match Design Philosophy */}
                <div className="mt-5 flex justify-between items-start px-0.5">
                  <div className="flex flex-col">
                    <h3 className="font-serif font-medium text-[15px] xs:text-base sm:text-lg md:text-xl lg:text-[22px] text-[#1A1A1A] leading-tight group-hover:text-[#B87333] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <span className="font-serif font-light text-[13px] xs:text-sm sm:text-base md:text-lg text-[#1A1A1A]/70 mt-1.5">
                      {product.price}
                    </span>
                  </div>
                  
                  {/* Minimal Outline Cart/Bag Icon (Clicking opens product detail modal) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedProduct(product)
                    }}
                    className="text-[#1A1A1A]/80 hover:text-[#B87333] transition-colors p-1 cursor-pointer"
                    aria-label={`View details of ${product.name}`}
                  >
                    <ShoppingBag className="w-5 h-5 xs:w-5.5 xs:h-5.5 stroke-[1.5]" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Details Modal */}
      <ProductModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </section>
  )
}
