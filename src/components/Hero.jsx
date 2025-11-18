import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  const titleRef = useRef(null)

  useEffect(() => {
    // Subtle entrance animation using Web Animations API (no GSAP needed here)
    titleRef.current?.animate([
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0px)' }
    ], { duration: 800, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards', delay: 200 })
  }, [])

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability (doesn't block Spline interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-24 flex flex-col items-start">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-white/80 ring-1 ring-white/20 backdrop-blur">
          Explore Bangladesh • Sundarbans • Cox's Bazar • Sylhet
        </span>
        <h1 ref={titleRef} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
          Discover Bangladesh
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80">
          A cinematic travel experience across rivers, rainforests, and historic cities. Plan trips, find stays, and book guided tours.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#destinations" className="rounded-lg bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-orange-100 transition">
            Explore Destinations
          </a>
          <a href="#tours" className="rounded-lg bg-orange-500/90 text-white px-5 py-3 text-sm font-semibold hover:bg-orange-400 transition">
            View Tours & Packages
          </a>
        </div>
      </div>
    </section>
  )
}
