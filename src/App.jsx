import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

// Register GSAP plugin
if (typeof window !== 'undefined' && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

const glass = 'backdrop-blur-2xl bg-white/10 dark:bg-white/5 border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.25)] rounded-2xl'
const accent = 'from-cyan-400/30 via-fuchsia-400/20 to-teal-400/30'

const Pane = ({ className = '', children }) => (
  <div className={`${glass} ${className}`}>{children}</div>
)

function useParallax(ref, opts = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const { y = 80, start = 'top bottom', end = 'bottom top', scrub = true } = opts

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: typeof y === 'number' ? y : y[0], opacity: 0.6 },
        {
          y: typeof y === 'number' ? 0 : y[1],
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [ref, opts])
}

const GradientNoise = () => (
  <div className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
    <div className={`absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(0,255,255,0.06),transparent_60%),radial-gradient(800px_400px_at_80%_20%,rgba(168,85,247,0.07),transparent_60%),radial-gradient(1000px_500px_at_50%_120%,rgba(45,212,191,0.06),transparent_60%)]`} />
    <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light" style={{backgroundImage: 'url("data:image/svg+xml;utf8,\
      <svg xmlns=\'http://www.w3.org/2000/svg\' width=\'1200\' height=\'1200\'>\
        <filter id=\'n\'>\
          <feTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'4\' stitchTiles=\'stitch\'/>\
          <feColorMatrix type=\'saturate\' values=\'0\'/>\
        </filter>\
        <rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.4\'/>\
      </svg>\n")'}} />
  </div>
)

const FloatingOrbs = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-20 -left-20 h-[40vmax] w-[40vmax] rounded-full bg-cyan-500/10 blur-3xl" />
    <div className="absolute top-40 -right-10 h-[28vmax] w-[28vmax] rounded-full bg-fuchsia-500/10 blur-3xl" />
    <div className="absolute bottom-[-10vmax] left-1/3 h-[34vmax] w-[34vmax] rounded-full bg-teal-400/10 blur-3xl" />
  </div>
)

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-6 md:px-12 ${className}`}>
    <div className="w-full max-w-7xl">{children}</div>
  </section>
)

function App() {
  const heroRef = useRef(null)
  const heroShapesRef = useRef(null)
  const problemRef = useRef(null)
  const solutionRef = useRef(null)
  const visionRef = useRef(null)
  const missionRef = useRef(null)
  const archRef = useRef(null)
  const modelsRef = useRef(null)
  const statsRef = useRef(null)
  const teamRef = useRef(null)
  const closingRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
    tl.from(heroRef.current.querySelectorAll('.hero-line'), { y: 20, opacity: 0, stagger: 0.12, duration: 0.9 })
      .from(heroRef.current.querySelector('.hero-cta'), { y: 20, opacity: 0, duration: 0.8 }, '-=0.4')

    // Parallax hero layers
    const ctx = gsap.context(() => {
      gsap.to(heroShapesRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(heroRef.current.querySelector('.hero-title'), {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })

    return () => ctx.revert()
  }, [])

  useParallax(problemRef, { y: 60 })
  useParallax(solutionRef, { y: 70 })
  useParallax(visionRef, { y: 80 })
  useParallax(missionRef, { y: 80 })
  useParallax(archRef, { y: 90 })
  useParallax(modelsRef, { y: 70 })
  useParallax(statsRef, { y: 60 })
  useParallax(teamRef, { y: 60 })
  useParallax(closingRef, { y: 50 })

  const modelIcons = [
    { name: 'Gemini', color: 'from-cyan-400 to-blue-500' },
    { name: 'Imagen', color: 'from-fuchsia-400 to-violet-500' },
    { name: 'Flux', color: 'from-teal-400 to-emerald-500' },
    { name: 'Claude', color: 'from-violet-400 to-indigo-500' },
    { name: 'Llama', color: 'from-rose-400 to-orange-500' },
  ]

  return (
    <div className="relative min-h-screen text-white bg-black overflow-x-hidden">
      <GradientNoise />
      <FloatingOrbs />

      {/* Hero */}
      <Section id="hero" className="pt-20">
        <div ref={heroRef} className="relative">
          <div ref={heroShapesRef} className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
            <div className="absolute right-1/5 top-20 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-2xl" />
            <div className="absolute left-1/2 top-40 h-20 w-20 rounded-full bg-teal-400/20 blur-2xl" />
          </div>

          <div className="text-center select-none">
            <h1 className="hero-title hero-line text-4xl md:text-7xl font-[600] tracking-tight">
              Papercut: A Unified Creative Studio
            </h1>
            <p className="hero-line mt-4 text-lg md:text-2xl text-white/70">
              Create Intelligently. Own Completely.
            </p>
            <div className="hero-cta mt-10 flex items-center justify-center">
              <button className={`${glass} px-6 py-3 text-sm md:text-base bg-white/10 hover:bg-white/15 transition-colors`}>Watch Demo</button>
            </div>
          </div>
        </div>
      </Section>

      {/* Problem */}
      <Section id="problem">
        <div ref={problemRef}>
          <Pane className="p-6 md:p-10 bg-white/8">
            <h2 className="text-xl md:text-3xl font-semibold mb-6">The Problem</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-white/80">
              {['Too many tools', 'Prompt complexity', 'Fragmented workflows', 'Cloud-privacy issues'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <span className="whitespace-nowrap">{item}</span>
                </li>
              ))}
            </ul>
          </Pane>
        </div>
      </Section>

      {/* Solution */}
      <Section id="solution">
        <div ref={solutionRef}>
          <Pane className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="grid grid-cols-5 gap-4 w-full md:w-auto">
                {modelIcons.map((m) => (
                  <div key={m.name} className={`${glass} aspect-square w-16 md:w-20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors`}
                    style={{
                      backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    }}
                  >
                    <span className={`text-[11px] md:text-sm bg-clip-text text-transparent bg-gradient-to-br ${m.color}`}>{m.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-semibold mb-3">Papercut</h3>
                <p className="text-white/70">One intelligent workspace. Offline-first. Cloud-optional.</p>
              </div>
            </div>
          </Pane>
        </div>
      </Section>

      {/* Vision + Mission */}
      <Section id="vision-mission">
        <div className="grid md:grid-cols-2 gap-6">
          <div ref={visionRef}>
            <Pane className="p-8">
              <h4 className="text-lg md:text-2xl font-semibold mb-3">Vision</h4>
              <p className="text-white/70">Effortless, intelligent, private creativity.</p>
            </Pane>
          </div>
          <div ref={missionRef}>
            <Pane className="p-8">
              <h4 className="text-lg md:text-2xl font-semibold mb-3">Mission</h4>
              <p className="text-white/70">Unify reasoning, design, and presentation while keeping users in control.</p>
            </Pane>
          </div>
        </div>
      </Section>

      {/* Product Architecture */}
      <Section id="architecture">
        <div ref={archRef}>
          <Pane className="p-10 md:p-14">
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="relative order-2 md:order-1">
                <div className={`${glass} h-48 md:h-64 rounded-3xl border-dashed border-white/20 flex items-center justify-center`}
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
                >
                  <div className="relative">
                    <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-cyan-400/10 via-fuchsia-400/10 to-teal-400/10 blur-2xl" />
                    <div className="relative px-6 py-3 rounded-xl border border-white/15 bg-white/5 text-white/80">.papercut</div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h4 className="text-xl md:text-3xl font-semibold mb-3">Product Architecture</h4>
                <p className="text-white/70">Portable. Secure. Offline-first.</p>
              </div>
            </div>
          </Pane>
        </div>
      </Section>

      {/* Multi-Model Access */}
      <Section id="models">
        <div ref={modelsRef}>
          <div className={`${glass} p-6 md:p-8 overflow-hidden`}>
            <div className="flex gap-4 md:gap-6 overflow-x-auto py-2">
              {modelIcons.map((m) => (
                <div key={m.name} className={`${glass} shrink-0 w-28 md:w-32 h-16 md:h-20 flex items-center justify-center bg-white/5 hover:scale-[1.02] transition-transform`}
                  style={{ backgroundImage: 'linear-gradient(120deg, rgba(0,255,255,0.08), rgba(168,85,247,0.08))' }}
                >
                  <span className={`text-sm bg-clip-text text-transparent bg-gradient-to-br ${m.color}`}>{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Market Opportunity */}
      <Section id="market">
        <div ref={statsRef}>
          <Pane className="p-8 md:p-12 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[
                { n: '95%', t: 'Simpler prompts' },
                { n: '3x', t: 'Faster ideation' },
                { n: '0%', t: 'Forced cloud' },
                { n: '100%', t: 'Ownership' },
              ].map((s) => (
                <div key={s.t} className="relative">
                  <div className="absolute -inset-3 rounded-2xl bg-cyan-400/10 blur-xl" />
                  <div className="relative">
                    <div className="text-3xl md:text-5xl font-semibold tracking-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]">{s.n}</div>
                    <div className="mt-1 text-white/60">{s.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </Pane>
        </div>
      </Section>

      {/* Team */}
      <Section id="team">
        <div ref={teamRef}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Pane key={i} className="p-4 md:p-6 text-center bg-white/8 hover:bg-white/10 transition-colors">
                <div className="mx-auto h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-cyan-400/30 to-fuchsia-400/30" />
                <div className="mt-3 text-sm md:text-base">Teammate {i + 1}</div>
                <div className="text-xs text-white/50">Design/Build</div>
              </Pane>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing */}
      <Section id="closing" className="pb-24">
        <div ref={closingRef} className="text-center">
          <div className="relative">
            <div className="absolute -inset-24 -z-10 rounded-full bg-gradient-to-br from-cyan-400/20 via-fuchsia-400/10 to-teal-400/20 blur-3xl" />
            <h2 className="text-2xl md:text-4xl font-semibold">Papercut — Create Intelligently. Own Completely.</h2>
          </div>
        </div>
      </Section>

      <footer className="h-10" />
    </div>
  )
}

export default App
