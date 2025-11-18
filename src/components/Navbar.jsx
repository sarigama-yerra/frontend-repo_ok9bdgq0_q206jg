import { useEffect, useRef, useState } from 'react'
import { Menu, Mountain, Ship, Map, Plane } from 'lucide-react'
import { gsap } from 'gsap'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const barRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(barRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
  }, [])

  return (
    <header ref={barRef} className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between rounded-b-2xl bg-black/50 backdrop-blur ring-1 ring-white/10">
        <a href="#" className="flex items-center gap-2 text-white font-semibold">
          <Plane className="text-orange-400" size={20} /> BD Travel
        </a>
        <nav className="hidden md:flex items-center gap-8 text-white/80">
          <a href="#destinations" className="hover:text-white transition">Destinations</a>
          <a href="#tours" className="hover:text-white transition">Tours</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <button onClick={() => setOpen(v => !v)} className="md:hidden text-white"><Menu /></button>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-xl bg-black/70 backdrop-blur ring-1 ring-white/10 p-4 text-white/80 md:hidden">
          <a href="#destinations" className="block py-2">Destinations</a>
          <a href="#tours" className="block py-2">Tours</a>
          <a href="#contact" className="block py-2">Contact</a>
        </div>
      )}
    </header>
  )
}
