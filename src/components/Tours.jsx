import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const tours = [
  { name: 'Sundarbans Expedition', days: 3, price: 249, highlights: ['Boat Safari', 'Watch Towers', 'Creek Cruise'] },
  { name: 'Hill Tracts Adventure', days: 4, price: 319, highlights: ['Nafakhum Falls', 'Chimbuk Hills', 'Local Cuisine'] },
  { name: 'Tea Trails & Rainforest', days: 2, price: 189, highlights: ['Lawachara Trek', 'Seven Color Tea', 'Tribal Village'] }
]

export default function Tours() {
  const listRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(listRef.current?.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power2.out' }
    )
  }, [])

  return (
    <section id="tours" className="bg-gradient-to-b from-black to-[#0b0b0b] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Tours</h2>
            <p className="mt-2 text-white/70">Curated experiences with local experts.</p>
          </div>
          <a href="#contact" className="hidden sm:inline-flex rounded-lg bg-orange-500/90 px-4 py-2 text-sm font-semibold hover:bg-orange-400 transition">Customize a Trip</a>
        </div>

        <ul ref={listRef} className="grid md:grid-cols-3 gap-6">
          {tours.map((t) => (
            <li key={t.name} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <span className="text-orange-400 font-bold">${t.price}</span>
              </div>
              <p className="mt-1 text-sm text-white/70">{t.days} days</p>
              <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc list-inside">
                {t.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
              <button className="mt-6 w-full rounded-lg bg-white text-black py-2 text-sm font-semibold hover:bg-orange-100 transition">Book Now</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
