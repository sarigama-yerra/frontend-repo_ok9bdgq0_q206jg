import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Sundarbans3D() {
  const containerRef = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05120d, 0.03)

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200)
    camera.position.set(0, 3.2, 10)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Lights
    const hemi = new THREE.HemisphereLight(0x86ffb0, 0x0a1a14, 0.8)
    scene.add(hemi)
    const dir = new THREE.DirectionalLight(0xfff1c7, 0.6)
    dir.position.set(-3, 6, 2)
    scene.add(dir)

    // Water plane (simple vertex wave)
    const planeGeo = new THREE.PlaneGeometry(60, 60, 200, 200)
    planeGeo.rotateX(-Math.PI / 2)
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0a3a2c,
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.95,
    })
    const water = new THREE.Mesh(planeGeo, waterMat)
    water.position.y = 0
    scene.add(water)

    // Mangrove "trees" - instanced cylinders + simple canopy spheres
    const trunkGeo = new THREE.CylinderGeometry(0.05, 0.07, 1.1, 6)
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3a2f26, roughness: 1 })
    const canopyGeo = new THREE.SphereGeometry(0.35, 10, 10)
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x2e7d5a, roughness: 0.8 })

    const treeGroup = new THREE.Group()
    const treeCount = 120
    for (let i = 0; i < treeCount; i++) {
      const x = (Math.random() - 0.5) * 30
      const z = -Math.random() * 25 - 2
      const trunk = new THREE.Mesh(trunkGeo, trunkMat)
      trunk.position.set(x, 0.55, z)
      trunk.rotation.y = Math.random() * Math.PI
      const canopy = new THREE.Mesh(canopyGeo, canopyMat)
      canopy.position.set(x + (Math.random() - 0.5) * 0.3, 1.2 + Math.random() * 0.2, z + (Math.random() - 0.5) * 0.3)
      treeGroup.add(trunk)
      treeGroup.add(canopy)
    }
    scene.add(treeGroup)

    // Fireflies (points)
    const fireflyCount = 300
    const ffGeom = new THREE.BufferGeometry()
    const positions = new Float32Array(fireflyCount * 3)
    const scales = new Float32Array(fireflyCount)
    for (let i = 0; i < fireflyCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 3 + 0.5
      positions[i * 3 + 2] = -Math.random() * 20 - 2
      scales[i] = Math.random() * 1.5 + 0.5
    }
    ffGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    ffGeom.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    const ffMat = new THREE.PointsMaterial({ color: 0xffd27a, size: 0.06, sizeAttenuation: true, transparent: true, opacity: 0.9 })
    const fireflies = new THREE.Points(ffGeom, ffMat)
    scene.add(fireflies)

    // Subtle fog plane to enhance depth near horizon
    const fogPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 20),
      new THREE.MeshBasicMaterial({ color: 0x071a14, transparent: true, opacity: 0.6, depthWrite: false })
    )
    fogPlane.position.set(0, 2.5, -25)
    scene.add(fogPlane)

    const clock = new THREE.Clock()

    function animate() {
      const t = clock.getElapsedTime()

      // Wave displacement
      const pos = planeGeo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3
        const x = pos.array[ix]
        const z = pos.array[ix + 2]
        const y = Math.sin((x + t * 1.2) * 0.18) * 0.08 + Math.cos((z + t * 0.8) * 0.22) * 0.06
        pos.array[ix + 1] = y
      }
      pos.needsUpdate = true
      water.rotation.z = Math.sin(t * 0.05) * 0.02

      // Fireflies gently float
      const pf = ffGeom.attributes.position
      for (let i = 0; i < fireflyCount; i++) {
        const ix = i * 3
        pf.array[ix] += Math.sin(t * 0.6 + i) * 0.0008
        pf.array[ix + 1] += Math.cos(t * 0.8 + i) * 0.0009
      }
      pf.needsUpdate = true

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    let raf = requestAnimationFrame(animate)

    // Resize handling
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Scroll-driven camera move
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        // progress 0..1
        const p = self.progress
        camera.position.z = 10 - p * 6 // move closer
        camera.position.y = 3.2 - p * 1.2
        camera.lookAt(0, 0.8, -8)
      }
    })

    // Small entrance reveal of tree group
    gsap.fromTo(treeGroup.position, { y: -0.2 }, { y: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: container, start: 'top 80%' } })

    cleanupRef.current = () => {
      st.kill()
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      renderer.dispose()
      planeGeo.dispose()
      waterMat.dispose()
      trunkGeo.dispose()
      trunkMat.dispose()
      canopyGeo.dispose()
      canopyMat.dispose()
      ffGeom.dispose()
      ffMat.dispose()
      fogPlane.geometry.dispose()
      fogPlane.material.dispose()
      container.removeChild(renderer.domElement)
    }

    return () => {
      cleanupRef.current && cleanupRef.current()
    }
  }, [])

  return (
    <section id="sundarbans" className="relative bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-green-500/15 text-green-300 px-3 py-1 text-xs ring-1 ring-green-400/30">Focus</span>
          <h2 className="text-3xl sm:text-4xl font-bold">Sundarbans — The Mystic Mangroves</h2>
        </div>
        <p className="text-white/75 max-w-3xl">Cruise through emerald creeks, watch for crocodiles and deer, and feel the hush of the world’s largest mangrove forest. This interactive scene evokes the mood you’ll experience on the water.</p>
      </div>
      <div ref={containerRef} className="h-[60vh] sm:h-[70vh] w-full" />
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6 text-white/85">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
            <p className="text-sm">Best time: Nov–Feb</p>
            <p className="text-sm">Activities: Boat safari, watchtowers, creek cruise</p>
          </div>
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
            <p className="text-sm">Wildlife: Royal Bengal Tiger, spotted deer, crocodiles, kingfishers</p>
          </div>
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
            <p className="text-sm">Tips: Wear neutral colors, carry binoculars, respect local guidelines</p>
          </div>
        </div>
      </div>
    </section>
  )
}
