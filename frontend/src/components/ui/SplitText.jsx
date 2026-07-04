import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  text,
  className = '',
  delay = 30, // staggered delay in ms between items
  duration = 0.8,
  ease = 'power3.out',
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  textAlign = 'left',
  mode = 'chars' // 'chars' or 'words'
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !text) return;
    
    const targets = containerRef.current.querySelectorAll(
      mode === 'chars' ? '.split-char' : '.split-word'
    );
    
    let ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { ...from, force3D: true },
        {
          ...to,
          force3D: true,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), mode]);

  if (!text) return null;

  const words = text.split(' ');

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ textAlign, display: 'inline-block' }}
    >
      {words.map((word, wordIdx) => {
        if (mode === 'words') {
          return (
            <span
              key={wordIdx}
              className="split-word inline-block"
              style={{ marginRight: '0.25em', willChange: 'transform, opacity' }}
            >
              {word}
            </span>
          );
        }

        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap" style={{ marginRight: '0.25em' }}>
            {word.split('').map((char, charIdx) => (
              <span
                key={charIdx}
                className="split-char inline-block"
                style={{ willChange: 'transform, opacity' }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
