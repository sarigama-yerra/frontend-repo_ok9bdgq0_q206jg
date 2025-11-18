import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Contact() {
  const formRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(formRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
  }, [])

  return (
    <section id="contact" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">Plan Your Trip</h2>
          <p className="mt-2 text-white/70">Tell us what you want to see in Bangladesh and we’ll craft a perfect itinerary.</p>
        </div>

        <form ref={formRef} className="grid md:grid-cols-2 gap-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
          <input placeholder="Name" className="rounded-lg bg-black/40 px-4 py-3 ring-1 ring-white/10 focus:ring-orange-400 outline-none" />
          <input placeholder="Email" className="rounded-lg bg-black/40 px-4 py-3 ring-1 ring-white/10 focus:ring-orange-400 outline-none" />
          <input placeholder="Travel Dates" className="rounded-lg bg-black/40 px-4 py-3 ring-1 ring-white/10 focus:ring-orange-400 outline-none md:col-span-2" />
          <textarea placeholder="Interests (beaches, forests, hills, culture)" rows={4} className="rounded-lg bg-black/40 px-4 py-3 ring-1 ring-white/10 focus:ring-orange-400 outline-none md:col-span-2" />
          <button className="rounded-lg bg-orange-500/90 px-5 py-3 font-semibold hover:bg-orange-400 transition md:col-span-2">Request Itinerary</button>
        </form>
      </div>
    </section>
  )
}
