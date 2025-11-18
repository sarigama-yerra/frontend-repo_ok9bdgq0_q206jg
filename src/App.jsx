import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SundarbansMarquee from './components/SundarbansMarquee'
import Sundarbans3D from './components/Sundarbans3D'
import Destinations from './components/Destinations'
import Tours from './components/Tours'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Navbar />
      <Hero />
      <SundarbansMarquee />
      <Sundarbans3D />
      <Destinations />
      <Tours />
      <Contact />
      <footer className="border-t border-white/10 bg-black text-white/60">
        <div className="mx-auto max-w-6xl px-6 py-10 flex items-center justify-between">
          <p>© {new Date().getFullYear()} BD Travel & Tourism</p>
          <nav className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
