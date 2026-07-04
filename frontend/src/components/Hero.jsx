import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, CustomEase)

export default function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const content = contentRef.current
    const polobarKnob = document.querySelector(".polobar-knob")
    const polobarLine = document.querySelector(".polobar-line")

    // Set initial states to avoid flash of unstyled content (FOUC)
    gsap.set(".hero-image", { scale: 1.08, yPercent: 20 })
    gsap.set(".hero-overlay", { yPercent: -100 })
    gsap.set(".line-1", { opacity: 0, y: 30 })
    gsap.set(".script-of", { opacity: 0, y: 30 })
    gsap.set(".line-2-text", { opacity: 0, y: 30 })
    if (polobarKnob) {
      gsap.set(polobarKnob, { scale: 0, opacity: 0 })
    }
    if (polobarLine) {
      gsap.set(polobarLine, { scaleX: 0 })
    }
    gsap.set(".subtext-line", { scaleY: 0 })
    gsap.set(".subtext-text p", { xPercent: -105, opacity: 0 })
    gsap.set(".video-line", { scaleY: 0 })
    gsap.set(".video-wrapper", { xPercent: 105, opacity: 0 })
    gsap.set(".scroll-knob", { opacity: 0, scale: 0 })
    gsap.set(".scroll-line", { scaleY: 0 })

    let ctx = gsap.context(() => {
      // Create custom eases
      CustomEase.create("heroEase", "0.16, 1, 0.3, 1") // cubic-bezier(0.16, 1, 0.3, 1)
      CustomEase.create("textEase", "0.25, 0.46, 0.45, 0.94") // cubic-bezier(0.25, 0.46, 0.45, 0.94)

      const tl = gsap.timeline()

      // Phase 1 -> Phase 2 (at 200ms, white loader overlay hides)
      tl.to(".page-flash-overlay", {
        opacity: 0,
        display: "none",
        duration: 0
      }, 0.2)

      // Phase 2: Hero Background Image Zoom + Pan (200ms - 2000ms, duration 1.8s)
      tl.to(".hero-image", {
        scale: 1.0,
        yPercent: 0,
        duration: 1.8,
        ease: "heroEase"
      }, 0.2)

      // Black Overlay Falling Down Animation (Starts at 2.0s, duration 0.5s)
      tl.to(".hero-overlay", {
        yPercent: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 2.0)

      // Phase 3: Hero Text Reveals (Staggered bottom-to-top sequence)
      // Line 1: Starts at 2.3s (700ms duration)
      tl.to(".line-1", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "textEase"
      }, 2.3)

      // Script word "of": Starts at 2.45s (700ms duration)
      tl.to(".script-of", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "textEase"
      }, 2.45)

      // Line 2: Starts at 2.55s (700ms duration)
      tl.to(".line-2-text", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "textEase"
      }, 2.55)

      // Symmetrical line reveals (Starts at 2.9s, duration 0.6s)
      tl.to([".subtext-line", ".video-line"], {
        scaleY: 1,
        duration: 0.6,
        ease: "power2.out"
      }, 2.9)

      // Symmetrical side reveals (Starts at 3.5s, duration 0.6s)
      tl.to(".subtext-text p", {
        xPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, 3.5)
      tl.to(".video-wrapper", {
        xPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, 3.5)

      // Phase 4: Symmetrical Knobs (Polobar & Polo Stick) Appear (Starts at 4.1s, duration 0.4s)
      if (polobarKnob) {
        tl.to(polobarKnob, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)"
        }, 4.1)
      }
      tl.to(".scroll-knob", {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, 4.1)

      // Phase 5: Symmetrical Sticks (Polobar horizontal line & Polo Stick vertical line) Grow (Starts at 4.5s, duration 0.5s)
      if (polobarLine) {
        tl.to(polobarLine, {
          scaleX: 1,
          duration: 0.5,
          ease: "heroEase"
        }, 4.5)
      }
      tl.to(".scroll-line", {
        scaleY: 1.0,
        duration: 0.5,
        ease: "heroEase"
      }, 4.5)

      // Continuous Ken Burns zoom-out loop and scroll-indicator bobbing (Final Held State 4.8s+)
      tl.add(() => {
        // Continuous subtle zoom-out and zoom-in
        gsap.to(".hero-image", {
          scale: 1.02,
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        })
      }, 4.8)

      // SCROLL-LINKED PARALLAX TIMELINE
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      })

      scrollTl.to(".hero-image", { yPercent: 12, ease: "none" }, 0)
      scrollTl.to(content, { scale: 0.94, ease: "none" }, 0)
      scrollTl.to(".scroll-indicator", { opacity: 0, ease: "none" }, 0)
      scrollTl.to(".subtext-block", { y: -25, ease: "none" }, 0)
      scrollTl.to(".video-block", { y: -25, ease: "none" }, 0)

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center select-none bg-[#121212]"
    >
      {/* Phase 1 Page Flash Overlay */}
      <div className="fixed inset-0 bg-[#F5F0EA] z-50 pointer-events-none page-flash-overlay" />

      {/* Background Media Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Soft Dark Overlay Layer */}
        <div className="absolute inset-0 bg-black/65 z-10 hero-overlay" />

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
          alt="Moody luxury living room background"
          className="hero-image absolute left-0 w-full h-[130%] -top-[30%] object-cover pointer-events-none z-0"
        />
      </div>

      {/* Headlines and Content Wrapper */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-6xl"
      >
        <h1 className="font-serif text-[#F5F0EA] text-[7vw] sm:text-[6.5vw] md:text-[6vw] lg:text-[5.5rem] xl:text-[6.5rem] leading-[1.1] tracking-wide text-center w-full select-none flex flex-col items-center">
          <span className="line-1 block">A New Sense</span>
          <span className="line-2 block mt-2 whitespace-nowrap">
            <span className="script-of inline-block font-serif italic text-[0.65em] text-[#a87f5a] mr-4 select-none">of</span>
            <span className="line-2-text inline-block">Inner Calm</span>
          </span>
        </h1>
      </div>

      {/* Scroll Indicator (Polo Stick) */}
      <div className="scroll-indicator absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        {/* Scroll Knob */}
        <div className="scroll-knob w-4 h-4 rounded-full border border-white/40 flex items-center justify-center bg-white/5 backdrop-blur-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F5F0EA]" />
        </div>
        {/* Scroll Line (connected directly to dot, extending to bottom end) */}
        <div className="scroll-line w-[1px] h-[180px] bg-white/70 origin-top mt-0" />
      </div>

      {/* Bottom Left description text with vertical accent border */}
      <div className="subtext-block absolute bottom-12 left-6 md:left-12 lg:left-16 z-20 max-w-[300px] md:max-w-[360px] text-left pl-4">
        {/* Growing vertical line on the left */}
        <div className="subtext-line absolute left-0 top-0.5 bottom-0.5 w-[1.5px] bg-[#F5F0EA]/50 origin-top" />
        
        {/* Overflow-hidden text container */}
        <div className="subtext-text overflow-hidden">
          <p className="text-[14px] md:text-[15px] font-sans font-light leading-relaxed tracking-wider text-[#F5F0EA]/90 whitespace-pre-line">
            Elevate your surroundings with{"\n"}serene layouts built for peaceful{"\n"}living.
          </p>
        </div>
      </div>

      {/* Bottom Right luxury video card with vertical accent border */}
      <div className="video-block absolute bottom-12 right-6 md:right-12 lg:right-16 z-20 w-[160px] sm:w-[200px] md:w-[240px] pr-4">
        {/* Growing vertical line on the right */}
        <div className="video-line absolute right-0 top-0.5 bottom-0.5 w-[1.5px] bg-[#F5F0EA]/50 origin-top" />
        
        {/* Overflow-hidden video container */}
        <div className="video-wrapper overflow-hidden aspect-video rounded-xs border border-white/10 bg-[#1f1a14] shadow-2xl">
          <video
            src="https://player.vimeo.com/external/435674703.sd.mp4?s=7f3747eb68b31a89c9e88bf9266e74b88d3d9e84&profile_id=165&oauth2_token_id=57447761"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Decorative background bottom lighting overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#0d0905]/20 to-transparent pointer-events-none z-10" />
    </section>
  )
}
