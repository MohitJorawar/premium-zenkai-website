import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import about1 from '../assets/about-1.jpg'
import about2 from '../assets/about-2.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageLeftWrapperRef = useRef(null)
  const imageRightWrapperRef = useRef(null)
  const imageLeftRef = useRef(null)
  const imageRightRef = useRef(null)

  useEffect(() => {
    // Set initial states to ensure no flash of content
    gsap.set([imageLeftRef.current, imageRightRef.current], {
      clipPath: 'inset(0% 0% 100% 0%)'
    })

    let ctx = gsap.context(() => {
      // Create a timeline triggered when the About section comes into view
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      })

      // 1. Text elements slide up and fade in
      entranceTl.fromTo(
        textRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
        }
      )

      // 2. Image Reveal (Vertical Unrolling) Animation
      // Unroll Left Image
      entranceTl.to(imageLeftRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.6,
        ease: 'power3.inOut',
      }, '-=0.8')

      // Unroll Right Image (staggered slightly after Left starts)
      entranceTl.to(imageRightRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.6,
        ease: 'power3.inOut',
      }, '-=1.2')

      // Subtle scroll-linked parallax for image wrappers (moving image + rod together)
      gsap.to(imageLeftWrapperRef.current, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })

      gsap.to(imageRightWrapperRef.current, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#faf7f2] text-[#121212] py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden z-20"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Text Content */}
        <div ref={textRef} className="flex flex-col justify-center h-full max-w-xl">
          <span className="text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.25em] text-[#8b6e4e] font-serif font-light mb-12 block">
            About Us
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-light text-[#121212] leading-[1.15] mb-8 select-none">
            A New <span className="font-script italic text-[1.2em] text-[#8b6e4e] font-normal inline-block transform translate-y-1">Rhythm</span> of Living
          </h2>
          <p className="text-zinc-700 font-sans font-light text-sm md:text-base leading-relaxed max-w-md">
            We create interiors that slow the pace of daily life. Through gentle lines, muted tones, and purposeful layout, we turn homes into havens of ease and connection.
          </p>
        </div>

        {/* Right Column: Architectural Images Grid */}
        <div className="relative flex items-start gap-6 md:gap-8 w-full max-w-2xl lg:max-w-none mx-auto">
          {/* Left/Smaller Image */}
          <div ref={imageLeftWrapperRef} className="w-[46%] relative">
            <img
              ref={imageLeftRef}
              src={about1}
              alt="Minimalist luxury interior archway lobby"
              className="w-full object-cover rounded-xs shadow-lg aspect-[4/5] bg-zinc-100 relative z-10"
              style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            />
          </div>
          
          {/* Right/Taller Image */}
          <div ref={imageRightWrapperRef} className="w-[54%] relative">
            <img
              ref={imageRightRef}
              src={about2}
              alt="Concrete arch lounge with glass windows"
              className="w-full object-cover rounded-xs shadow-2xl aspect-[3/5] bg-zinc-200 relative z-10"
              style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
