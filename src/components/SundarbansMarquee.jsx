import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SundarbansMarquee() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const tl = gsap.timeline({ repeat: -1 })
    tl.to(el, { xPercent: -50, duration: 18, ease: 'none' })

    // Pin on scroll for dramatic section
    ScrollTrigger.create({
      trigger: el.parentElement,
      start: 'top bottom',
      end: '+=300',
      scrub: true
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(s => s.kill())
    }
  }, [])

  const chips = ['Royal Bengal Tiger', 'Mangrove Creeks', 'Saltwater Crocodile', 'Spotted Deer', 'Watchtowers', 'Dolphins', 'Kingfishers', 'Otters']

  return (
    <div className="bg-black/80 border-y border-white/10 py-6 overflow-hidden">
      <div className="whitespace-nowrap will-change-transform" ref={wrapRef}>
        {Array(2).fill(0).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-white/80 text-sm sm:text-base mr-10">
            {chips.map(c => (
              <span key={c + i} className="inline-flex items-center gap-2 mr-10">
                <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10">{c}</span>
                <span className="w-1 h-1 rounded-full bg-orange-400" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
