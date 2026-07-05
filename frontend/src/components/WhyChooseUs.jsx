import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from './ui/SplitText'

gsap.registerPlugin(ScrollTrigger)

export default function WhyChooseUs() {
  const sectionRef = useRef(null)
  const bgImageRef = useRef(null)

  const cardsData = [
    {
      id: 1,
      num: '01',
      title: 'Timeless',
      desc: 'Designed to stay elegant across seasons.',
      image: 'https://cdn.prod.website-files.com/6961f9a1d21856f6718a4c44/6965b9159546a411c6234221_Timeless%20Image.webp',
      gridClass: 'lg:row-start-1 lg:col-start-2'
    },
    {
      id: 2,
      num: '02',
      title: 'Crafted',
      desc: 'Thoughtful details shaped with care and precision.',
      image: 'https://cdn.prod.website-files.com/6961f9a1d21856f6718a4c44/6965b915e64ee99ba5cff641_Crafted%20Image.webp',
      gridClass: 'lg:row-start-1 lg:col-start-3'
    },
    {
      id: 3,
      num: '03',
      title: 'Balanced',
      desc: 'Minimal aesthetics with luxurious, modern sensibility.',
      image: 'https://cdn.prod.website-files.com/6961f9a1d21856f6718a4c44/6965b915332ba78188f8d960_Balanced%20Image.webp',
      gridClass: 'lg:row-start-2 lg:col-start-1'
    },
    {
      id: 4,
      num: '04',
      title: 'Enduring',
      desc: 'Quality materials built to last through use.',
      image: 'https://cdn.prod.website-files.com/6961f9a1d21856f6718a4c44/6965b9150ca7e57fd0c0736e_Enduring%20Image.webp',
      gridClass: 'lg:row-start-2 lg:col-start-2'
    }
  ]

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance timeline
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })

      // Single background image scale/fade entrance
      entranceTl.fromTo(
        bgImageRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1.00, duration: 1.4, ease: 'power3.out' }
      )

      // Cards sequential reveal
      entranceTl.fromTo(
        '.why-us-card-reveal-wrapper',
        { opacity: 0, y: 80, scale: 0.92, rotate: 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.12
        },
        '-=0.7'
      )

      // Card images reveal (faded in to prevent transition conflicts)
      entranceTl.fromTo(
        '.why-us-card-img',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.12 },
        '<'
      )

      // 2. Parallax Scroll Anim for background image
      gsap.to(bgImageRef.current, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative w-full overflow-hidden bg-[#16120e] py-20 lg:py-24 xl:py-28 flex flex-col justify-center select-none z-20 border-0"
    >
      {/* 1. Background Layer (Unified lifestyle room with plant & shelf) */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury Japandi room interior"
          className="w-full h-full object-cover opacity-0"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#16120e]/60" />
      </div>

      {/* 2. Text Content & Card Grid */}
      <div className="max-w-[1440px] w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-12 lg:px-16 gap-16">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-4 flex flex-col justify-center text-white relative z-20">
          <div className="mb-6">
            <SplitText
              text="Why Choose Us?"
              className="text-zinc-200 font-serif font-light text-xl sm:text-2xl tracking-[0.08em] block"
              delay={40}
              mode="chars"
            />
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-[54px] xl:text-[64px] font-light text-white leading-[1.1] tracking-[-0.02em] mb-10">
            <SplitText
              text="Our Promise of"
              className="block"
              delay={35}
              mode="words"
            />
            <SplitText
              text="Quality"
              className="font-script italic text-white tracking-normal leading-none inline-block mt-3 transform translate-y-1"
              delay={50}
              mode="chars"
            />
          </h2>
          <p className="text-zinc-300 font-sans font-light text-base sm:text-lg lg:text-xl leading-relaxed max-w-[440px]">
            <SplitText
              text="We carefully source materials that honor craftsmanship and comfort, creating pieces that elevate everyday living. With care in every detail, we deliver designs that feel timeless and built to last."
              delay={12}
              mode="words"
            />
          </p>
        </div>

        {/* Right Column: Card Grid (Unified for both mobile and desktop) */}
        <div className="lg:col-span-8 col-span-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 lg:gap-6 w-full max-w-2xl lg:max-w-none mx-auto relative z-20">
          {cardsData.map((card) => (
            <div key={card.id} className={`why-us-card-reveal-wrapper opacity-0 ${card.gridClass || ''}`}>
              <div className="group bg-white p-3.5 xs:p-5 lg:p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 min-h-[230px] xs:min-h-[250px] sm:min-h-[270px] lg:min-h-[250px] xl:min-h-[290px] 2xl:min-h-[320px]">
                <div className="flex justify-between items-start w-full">
                  <span className="font-serif text-[13px] xs:text-[15px] sm:text-[16px] xl:text-[18px] tracking-widest text-zinc-400 mt-0.5">
                    {card.num}
                  </span>
                  <div className="w-[90px] xs:w-[110px] sm:w-[105px] lg:w-[95px] xl:w-[115px] 2xl:w-[130px] aspect-[3/4] overflow-hidden bg-zinc-100 relative shadow-sm">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="why-us-card-img w-full h-full object-cover opacity-0 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex flex-col text-left mt-3 xs:mt-4">
                  <h3 className="font-serif text-base xs:text-lg sm:text-xl xl:text-2xl font-normal text-[#121212] tracking-tight mb-1 mt-1 leading-tight">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[10px] xs:text-[12px] sm:text-[13px] xl:text-[14px] leading-relaxed text-zinc-600 font-light">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
