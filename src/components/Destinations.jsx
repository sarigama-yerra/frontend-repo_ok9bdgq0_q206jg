import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const places = [
  {
    title: "Cox's Bazar",
    img: 'https://images.unsplash.com/photo-1594026112284-02aa220777a4?q=80&w=1600&auto=format&fit=crop',
    desc: 'World’s longest natural sea beach with golden sands and sunsets.'
  },
  {
    title: 'Sundarbans',
    img: 'https://images.unsplash.com/photo-1601972599720-8b5923eae524?q=80&w=1600&auto=format&fit=crop',
    desc: 'Mystic mangrove forest, home of the Royal Bengal Tiger.'
  },
  {
    title: 'Srimangal',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600&auto=format&fit=crop',
    desc: 'Rolling tea gardens, rainforests and tranquil hills.'
  },
  {
    title: 'Bandarban',
    img: 'https://images.unsplash.com/photo-1517821099605-330e1b5a34f0?q=80&w=1600&auto=format&fit=crop',
    desc: 'Cloud-kissed mountains, ethnic culture, and adventure trails.'
  }
]

export default function Destinations() {
  const cardsRef = useRef([])

  useEffect(() => {
    const cards = cardsRef.current
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#destinations',
          start: 'top 80%'
        }
      }
    )
  }, [])

  return (
    <section id="destinations" className="relative w-full bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">Top Destinations</h2>
          <p className="mt-2 text-white/70">Handpicked spots to feel the vibe of Bangladesh.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {places.map((p, i) => (
            <article
              key={p.title}
              ref={el => (cardsRef.current[i] = el)}
              className="group relative overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 hover:ring-orange-400/40 transition"
            >
              <img src={p.img} alt={p.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-white/70 mt-1">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
