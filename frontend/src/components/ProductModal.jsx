import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'

export default function ProductModal({ isOpen, onClose, product, onAddToCart }) {
  if (!isOpen || !product) return null

  // Setup carousel images.
  // We automatically look for product-specific suffixes like _1, _2, _3
  // and fall back to the main image to ensure the carousel has multiple slides.
  const carouselImages = [
    product.image,
    // The user can place these images in public/images/ e.g. woven_rattan_pot_1.png
    product.image.replace('.png', '_1.png'),
    product.image.replace('.png', '_2.png')
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  // Reset slide index when opening a new product
  useEffect(() => {
    setCurrentSlide(0)
  }, [product])

  const nextSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  // Prevent scroll propagation when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Detailed descriptions & specs database
  const getProductDetails = (id) => {
    const detailsMap = {
      1: {
        category: 'Handcrafted Home Goods',
        description: 'Handcrafted from 100% natural organic rattan, this woven pot brings warm textures and raw, earthy tones to any space. Its lightweight yet durable construction makes it a perfect housing for indoor plants or dried floral arrangements.',
        specs: {
          'Materials': '100% Natural Organic Rattan, Eco-friendly Fibers',
          'Dimensions': '8" Diameter x 8.5" Height (20cm x 22cm)',
          'Care Instructions': 'Wipe with dry soft cloth. Avoid direct water exposure or soaking.',
          'Country of Origin': 'Handmade in Bali, Indonesia'
        }
      },
      2: {
        category: 'Japandi Dining Furniture',
        description: 'A classic minimalist dining chair featuring clean geometric lines, constructed entirely from solid premium ash wood. Its ergonomically curved backrest and structural simplicity embody the pure junction of Scandinavian utility and Japanese minimalism.',
        specs: {
          'Materials': 'Solid Ash Wood, Protective Matte Polyurethane Finish',
          'Dimensions': '18" Width x 19" Depth x 31" Height (Seat Height: 18")',
          'Care Instructions': 'Clean with damp cloth. Avoid harsh chemicals or abrasive wood cleaners.',
          'Country of Origin': 'Crafted in Shizuoka, Japan'
        }
      },
      3: {
        category: 'Ergonomic Workspaces',
        description: 'Reimagine your workspace with this compact, minimalist office chair. Designed with breathable woven organic cotton upholstery, a steel-reinforced solid wood frame, and smooth-gliding nylon casters, it offers maximum comfort without compromising on aesthetic simplicity.',
        specs: {
          'Materials': 'Solid Oak, Organic Cotton Canvas, Reinforced Alloy Steel',
          'Dimensions': '22" Width x 22" Depth x 32" Adjustable Height',
          'Care Instructions': 'Vacuum fabric gently. Wipe metal frame with dry microfiber cloth.',
          'Country of Origin': 'Manufactured in Copenhagen, Denmark'
        }
      },
      4: {
        category: 'Minimalist Storage',
        description: 'A stunning low-profile credenza featuring sliding wooden tambour doors that open to reveal generous shelving. Crafted from rich European white oak, this cabinet acts as a beautiful focal piece in a living room, bedroom, or entryway.',
        specs: {
          'Materials': 'Solid European White Oak, Brushed Brass Hardware',
          'Dimensions': '47" Width x 16" Depth x 28" Height (120cm x 40cm x 71cm)',
          'Care Instructions': 'Dust regularly with dry lint-free cloth. Treat with organic beeswax polish yearly.',
          'Country of Origin': 'Designed and crafted in Oslo, Norway'
        }
      },
      5: {
        category: 'Minimalist Lighting',
        description: 'A sleek, industrial-inspired table lamp featuring a matte black dome shade and adjustable arm joints finished in rich brass. It provides focused task lighting perfect for desks, side tables, or reading nooks, combining retro character with modern functionality.',
        specs: {
          'Materials': 'Steel shade and arm, solid brass joints, weighted iron base',
          'Dimensions': '14" Width x 18" Height x 7" Base Diameter',
          'Care Instructions': 'Unplug before cleaning. Wipe metal surfaces with a dry microfiber cloth.',
          'Country of Origin': 'Designed in Stockholm, Sweden'
        }
      },
      6: {
        category: 'Timepieces',
        description: 'An elegant open-frame skeleton wall clock featuring custom Roman numerals and slim tapered brass hands. The absence of a dial face allows the wall texture to show through, creating a sculptural focal point that floats gracefully on any background.',
        specs: {
          'Materials': 'Iron skeleton frame, solid brass hands, high-torque quartz movement',
          'Dimensions': '24" Diameter x 1.5" Depth (60cm x 4cm)',
          'Care Instructions': 'Dust lightly with a feather duster. Requires 1 AA battery (not included).',
          'Country of Origin': 'Crafted in Munich, Germany'
        }
      },
      7: {
        category: 'Sculptural Furniture',
        description: 'A beautifully rounded small wooden shelf and side table that rests on three tall tapered legs. Designed to serve as a bedside table or a plant stand, it features a built-in shelf compartment to organize books, accessories, or decorative items.',
        specs: {
          'Materials': 'Premium Solid Walnut, Matte Natural Oil Finish',
          'Dimensions': '16" Width x 14" Depth x 26" Height (40cm x 35cm x 66cm)',
          'Care Instructions': 'Wipe spills immediately. Clean with damp cloth and dry immediately.',
          'Country of Origin': 'Designed in Copenhagen, Denmark'
        }
      },
      8: {
        category: 'Handcrafted Home Goods',
        description: 'Handcrafted from 100% natural organic rattan, this woven pot brings warm textures and raw, earthy tones to any space. Its lightweight yet durable construction makes it a perfect housing for indoor plants or dried floral arrangements.',
        specs: {
          'Materials': '100% Natural Organic Rattan, Eco-friendly Fibers',
          'Dimensions': '8" Diameter x 8.5" Height (20cm x 22cm)',
          'Care Instructions': 'Wipe with dry soft cloth. Avoid direct water exposure or soaking.',
          'Country of Origin': 'Handmade in Bali, Indonesia'
        }
      }
    }
    return detailsMap[id] || {
      category: 'Home Goods',
      description: 'A beautifully styled Japandi/Scandinavian piece designed to bring organic warmth and structural simplicity to your modern dwelling.',
      specs: {
        'Materials': 'Premium Natural Wood & Sustainable Fibers',
        'Dimensions': 'Standard sizing',
        'Care Instructions': 'Dust regularly with soft dry cloth.',
        'Country of Origin': 'Designed in Copenhagen'
      }
    }
  }

  const details = getProductDetails(product.id)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none bg-[#121212]/60 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Card container */}
      <div
        className="relative w-full max-w-4xl bg-[#F0EDE8] text-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row gap-8 p-6 md:p-8 animate-[fadeInUp_0.4s_cubic-bezier(0.25,0.1,0.25,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#E8E4DE] rounded-full p-2 transition-all cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Carousel */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-square w-full bg-[#E8E4DE] rounded-[8px] flex items-center justify-center overflow-hidden relative group">
            <img
              src={carouselImages[currentSlide]}
              alt={`${product.name} slide ${currentSlide + 1}`}
              className="w-[70%] h-[70%] object-contain mix-blend-multiply transition-all duration-300"
              onError={(e) => {
                // Fall back to main image if secondary images fail to load
                e.target.src = product.image
              }}
            />

            {/* Left navigation arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#F0EDE8]/80 hover:bg-[#F0EDE8] border border-[#1A1A1A]/5 rounded-full p-1.5 shadow-sm text-[#1A1A1A] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#F0EDE8]/80 hover:bg-[#F0EDE8] border border-[#1A1A1A]/5 rounded-full p-1.5 shadow-sm text-[#1A1A1A] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx 
                    ? 'bg-[#B87333] w-4' 
                    : 'bg-[#E8E4DE] hover:bg-[#1A1A1A]/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto max-h-[70vh] md:max-h-none pr-1">
          <div>
            {/* Category label */}
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B87333] font-sans font-semibold block mb-2">
              {details.category}
            </span>

            {/* Product Title */}
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight mb-2">
              {product.name}
            </h2>

            {/* Price */}
            <p className="font-serif text-lg md:text-xl text-[#B87333] font-medium mb-6">
              {product.price}
            </p>

            {/* Divider line */}
            <hr className="border-[#E8E4DE] mb-6" />

            {/* Product Description */}
            <p className="text-zinc-600 font-sans font-light text-sm md:text-[14.5px] leading-relaxed mb-6">
              {details.description}
            </p>

            {/* About / Product Specifications */}
            <div className="flex flex-col gap-3 mb-8">
              <h4 className="font-sans font-semibold text-[13px] uppercase tracking-wider text-[#1A1A1A] mb-1">
                Product Details
              </h4>
              {Object.entries(details.specs).map(([key, val]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-start text-xs border-b border-[#E8E4DE]/50 pb-2">
                  <span className="font-medium text-[#1A1A1A]/60 sm:w-1/3 mb-1 sm:mb-0 select-none">
                    {key}
                  </span>
                  <span className="text-zinc-700 sm:w-2/3">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => {
              onAddToCart(product)
              onClose()
            }}
            className="w-full bg-[#1A1A1A] text-[#F0EDE8] py-3.5 px-6 font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#B87333] transition-colors duration-300 cursor-pointer rounded-xs"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  )
}
