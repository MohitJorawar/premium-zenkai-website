import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart } from 'lucide-react'
import ProductModal from './ProductModal'

gsap.registerPlugin(ScrollTrigger)

export default function LatestProducts({ onAddToCart }) {
  const sectionRef = useRef(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const latestProducts = [
    {
      id: 5,
      name: 'Table Lamp',
      price: '$30.00 USD',
      image: '/images/table_lamp.png'
    },
    {
      id: 6,
      name: 'Romanian Wall Clock',
      price: '$80.00 USD',
      image: '/images/romanian_wall_clock.png'
    },
    {
      id: 7,
      name: 'Small Wooden Shelf',
      price: '$150.00 USD',
      image: '/images/small_wooden_shelf.png'
    },
    {
      id: 8,
      name: 'Woven Rattan Pot',
      price: '$24.00 USD',
      image: '/images/woven_rattan_pot.png'
    }
  ]

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial states to prevent flash of content
      gsap.set('.latest-products-header', { opacity: 0, y: 30 })
      gsap.set('.latest-product-card-wrapper', { opacity: 0, y: 40, scale: 0.95 })
      gsap.set('.latest-product-card-image-reveal', { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set('.latest-product-card-image', { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })

      // 1. Reveal headers (fonts appear first)
      tl.to('.latest-products-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      // 2. Reveal card wrappers (fade-in & slide-up)
      tl.to('.latest-product-card-wrapper', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      }, '-=0.4')

      // 3. Unroll card images (window reveal) & scale down image inside
      tl.to('.latest-product-card-image-reveal', {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.inOut'
      }, '<')

      tl.to('.latest-product-card-image', {
        opacity: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out'
      }, '<')

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="latest-products"
      className="w-full bg-[#FAF7F2] py-24 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden relative z-20 border-0"
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* Centered Small Label & Mixed Typography Headline */}
        <div className="latest-products-header text-center mb-20 opacity-0">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-sans font-medium block mb-3 select-none">
            Latest Products
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#1A1A1A] leading-tight select-none">
            <span>Signature </span>
            <span className="font-script italic text-[#1A1A1A] tracking-normal leading-none inline-block mt-2">
              Releases
            </span>
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 xs:gap-x-4 sm:gap-x-6 gap-y-12 sm:gap-y-16 select-none">
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="latest-product-card-wrapper flex flex-col group opacity-0"
            >
              
              {/* Product Card Image Container with window reveal */}
              <div 
                className="latest-product-card-image-reveal aspect-square w-full bg-[#F4F0EB] rounded-[4px] flex items-center justify-center overflow-hidden relative transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-[6px] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] cursor-pointer"
                style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="latest-product-card-image w-[75%] h-[75%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />

                {/* View Product Button Overlay */}
                <div className="absolute inset-0 bg-[#121212]/10 backdrop-blur-xs opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedProduct(product)
                    }}
                    className="bg-[#FAF7F2]/95 text-[#1A1A1A] border border-[#1A1A1A]/10 px-3 xs:px-5 py-2.5 rounded-xs uppercase tracking-widest text-[9px] xs:text-[11px] font-semibold transition-all duration-300 hover:bg-[#1A1A1A] hover:text-[#FAF7F2] hover:border-[#1A1A1A] transform translate-y-4 group-hover:translate-y-0 cursor-pointer shadow-sm"
                  >
                    View Product
                  </button>
                </div>
              </div>

              {/* Product Info Row */}
              <div className="mt-5 flex justify-between items-start px-0.5">
                <div className="flex flex-col">
                  <h3 
                    className="font-serif font-medium text-[15px] xs:text-base sm:text-lg text-[#1A1A1A] leading-tight group-hover:text-[#8b6e4e] transition-colors duration-300 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.name}
                  </h3>
                  <span className="font-serif font-light text-[13px] xs:text-sm sm:text-base text-[#1A1A1A]/70 mt-1.5">
                    {product.price}
                  </span>
                </div>
                
                {/* Shopping Cart Icon button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedProduct(product)
                  }}
                  className="text-[#1A1A1A]/80 hover:text-[#8b6e4e] transition-colors p-1 cursor-pointer"
                  aria-label={`View details of ${product.name}`}
                >
                  <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Show All Collections Link */}
        <div className="mt-16 flex justify-end">
          <a
            href="#collections"
            onClick={(e) => {
              e.preventDefault()
              alert('Showing collections...')
            }}
            className="text-sm md:text-base font-serif italic text-[#8B6E4E] hover:text-[#2d251d] transition-colors flex items-center gap-1 select-none font-medium hover:underline decoration-1 underline-offset-4"
          >
            Show All Collections
          </a>
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
