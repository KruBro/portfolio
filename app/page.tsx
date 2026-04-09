'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  DownloadIcon,
  ExternalLinkIcon,
} from './components/Icons'

/* ─────────────────────────────────────────────────────────────
   ANIMATION ENGINE — "Hardware" Physics
   Easing: expo-out cubic-bezier feels like a weighted mechanism
   Springs: stiffness 100 / damping 20 → deliberate, not bouncy
─────────────────────────────────────────────────────────────── */
const EXPO_OUT = [0.22, 1, 0.36, 1] as const

const revealUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EXPO_OUT,
      delay: i * 0.08,
    },
  }),
}

const revealCard = {
  hidden:  { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: EXPO_OUT,
      delay: i * 0.09,
    },
  }),
}

const HOVER_LIFT = {
  scale: 1.012,
  transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
}

/* ─────────────────────────────────────────────────────────────
   DATA
─────────────────────────────────────────────────────────────── */
const NAV = [
  { href: '#about',        label: 'About' },
  { href: '#skills',       label: 'Skills' },
  { href: '#projects',     label: 'Projects' },
  { href: '#publications', label: 'Publications' },
  { href: '#contact',      label: 'Contact' },
]

const STATS = [
  { value: '6',    label: 'Projects' },
  { value: '2',    label: 'Publications' },
  { value: '7.69', label: 'CGPA' },
  { value: 'ECEP', label: 'Training' },
]

const SKILLS = [
  {
    idx:      '01',
    title:    'Microcontroller & Firmware',
    variant:  'em' as const,
    pills:    ['Bitwise Logic', 'Register Masking', 'GPIO Control', 'LSB Algorithms', 'Embedded C'],
    proof:    { label: 'LSB Steganographic Engine', href: 'https://github.com/KruBro/LSB_Stegenography' },
    col:      'md:col-span-2',
  },
  {
    idx:      '02',
    title:    'Systems & Linux',
    variant:  'cb' as const,
    pills:    ['POSIX File I/O', 'Binary Streams', 'Shell Scripting', 'Makefiles', 'Hex Analysis'],
    proof:    { label: 'Custom Search Engine', href: 'https://github.com/KruBro/Inverted_Search_Engine' },
    col:      'md:col-span-1',
  },
]

// 4 featured projects — large bento cards
const FEATURED = [
  {
    idx:     '01',
    title:   'ID3v2 Binary Parser & Metadata Editor',
    variant: 'em' as const,
    win:     'Engineered a zero-dependency C parser to sequentially read, decode, and modify ID3v2 tags directly within raw MP3 byte streams. Navigated complex offset frame alignments and endianness conversions by implementing robust bitwise masking and custom buffer management to mutate the binary without corrupting the audio data payload.',
    tags:    ['C', 'Bitwise Logic', 'Binary Parsing', 'Pointer Arithmetic'],
    href:    'https://github.com/KruBro/MP3-Tag-Reader-Editor',
  },
  {
    idx:     '02',
    title:   'Real-Time ESP32 IoT Environmental Monitor',
    variant: 'cb' as const,
    win:     'Architected a real-time embedded IoT application on the ESP32 platform to interface with hardware sensors, process environmental data, and securely transmit telemetry. Optimized the firmware for memory-constrained edge hardware using PlatformIO, integrating automated Python scripting for secure token generation and OTA pipeline handling.',
    tags:    ['C++', 'ESP32', 'PlatformIO', 'IoT Architecture'],
    href:    'https://github.com/KruBro/esp32-air-quality-monitor',
  },
  {
    idx:     '03',
    title:   'LSB Steganographic Encoding Engine',
    variant: 'em' as const,
    win:     'Developed a high-performance CLI utility to seamlessly inject hidden data payloads into BMP image files by directly manipulating the least significant bits of the raw pixel array. Strictly navigated BMP header structures and memory boundaries via pointer arithmetic to ensure the resulting binary remained structurally valid and visually lossless.',
    tags:    ['C', 'Bit-level Manipulation', 'Memory Management', 'File I/O'],
    href:    'https://github.com/KruBro/LSB_Stegenography',
  },
  {
    idx:     '04',
    title:   'Arbitrary-Precision Arithmetic Engine',
    variant: 'cb' as const,
    win:     'Designed a scalable memory-backed arithmetic engine capable of executing operations on infinitely large numbers by leveraging custom, dynamically allocated doubly-linked lists. Prevented catastrophic heap fragmentation and memory leaks by engineering a strict manual allocation and teardown lifecycle for deep node chains.',
    tags:    ['C', 'Dynamic Memory Allocation', 'Algorithmic Optimization', 'Data Structures'],
    href:    'https://github.com/KruBro/Arbitrary_Precision_Calculator_-APC-',
  },
]

// 2 notable projects — compact table rows
const NOTABLE = [
  {
    num:   '05',
    title: 'Deterministic Self-Balancing Red-Black Tree',
    win:   'Engineered a deeply optimized, self-balancing Red-Black Tree from scratch in C to guarantee strict O(log n) time complexity for insertions, deletions, and lookups. Implemented complex pointer rotations and color-recoloring algorithms while maintaining rigorous memory safety and strict tree invariants.',
    tags:  ['C', 'Advanced Pointer Mechanics', 'Algorithmic Complexity'],
    href:  'https://github.com/KruBro/Red_Black_Tree',
  },
  {
    num:   '06',
    title: 'Custom Inverted Index Search Engine',
    win:   'Architected a high-throughput text indexing engine utilizing custom hash tables and nested linked lists to map tokenized data to file locations. Engineered custom database serialization and deserialization routines via raw POSIX file I/O to persist the index securely across execution cycles.',
    tags:  ['C', 'Systems Architecture', 'File I/O', 'Hash Tables'],
    href:  'https://github.com/KruBro/Inverted_Search_Engine',
  },
]

const PUBLICATIONS = [
  {
    title:   'Smart Water Management Technology',
    journal: 'IJIRT Journal',
    date:    'March 2025',
    url:     'https://ijirt.org/article?manuscript=174039/',
    summary: 'Architected a low-power sensor network for real-time hydraulic monitoring and automated conservation.',
  },
  {
    title:   'An IoT-Based Smart Agriculture System',
    journal: 'IJIRT Journal',
    date:    'May 2025',
    url:     'https://ijirt.org/article?manuscript=177692',
    summary: 'Developed an edge-computing framework for precision agriculture using mesh-networked soil telemetry.',
  },
]

/* ─────────────────────────────────────────────────────────────
   COMPONENT
─────────────────────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollY } = useScroll()
  // Very gentle parallax — keeps the sense of weight
  const heroY = useTransform(scrollY, [0, 600], ['0%', '5%'])

  return (
    <main className="min-h-screen bg-canvas relative">
      <div className="bg-orb-1" aria-hidden="true" />
      <div className="bg-orb-2" aria-hidden="true" />

      {/* ══════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 nav-glass z-50">
        <div className="max-w-6xl mx-auto px-6 py-[18px] flex items-center justify-between">

          <a href="#top" className="font-display font-extrabold text-lg text-white hover:text-em transition-colors duration-300 tracking-tight">
            <span className="em-glow">S</span>K
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-9">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link font-mono text-sm tracking-[0.18em] uppercase text-ts hover:text-tp transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="font-mono text-sm tracking-wider border border-em/30 text-em px-4 py-2 hover:bg-em/8 transition-all duration-300"
            >
              CV.PDF ↓
            </a>
          </div>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-5 text-ts hover:text-tp transition-colors"
          >
            <span className="block h-px bg-current transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(5.5px)' : 'none' }} />
            <span className="block h-px bg-current transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px bg-current transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-5.5px)' : 'none' }} />
          </button>
        </div>

        {/* Frosted drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: EXPO_OUT }}
              className="md:hidden overflow-hidden border-t border-white/[0.042]"
            >
              <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-5">
                {NAV.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: EXPO_OUT, delay: i * 0.055 }}
                    className="font-mono text-sm tracking-[0.18em] uppercase text-ts hover:text-em transition-colors"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/resume.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: EXPO_OUT, delay: NAV.length * 0.055 }}
                  className="font-mono text-sm tracking-wider border border-em/30 text-em px-4 py-3 text-center hover:bg-em/8 transition-all mt-2"
                >
                  Download CV
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        id="about"
        className="relative min-h-screen flex items-center max-w-6xl mx-auto px-6 pt-28 pb-20 relative-z"
      >
        <motion.div style={{ y: heroY }} className="w-full">
          <div className="max-w-[780px] space-y-8">

            {/* Eyebrow */}
            <motion.div
              custom={0} variants={revealUp} initial="hidden" animate="visible"
              className="flex items-center gap-4"
            >
              <div className="led led-em" />
              <span className="section-eyebrow">Embedded Systems Engineer</span>
              <span className="hidden sm:block h-px w-8 bg-em/25" />
              <span className="hidden sm:block font-mono text-xs text-tm tracking-widest">
                Bengaluru, India
              </span>
            </motion.div>

            {/* Name — with terminal cursor */}
            <motion.div custom={1} variants={revealUp} initial="hidden" animate="visible">
              <h1 className="font-display font-black leading-[0.9] tracking-tight">
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[62px] text-tp">
                  SHAHAD
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[62px] em-glow">
                  KURUNGADAN
                  <span className="terminal-cursor" aria-hidden="true" />
                </span>
              </h1>
            </motion.div>

            {/* Bio */}
            <motion.div
              custom={2} variants={revealUp} initial="hidden" animate="visible"
              className="space-y-3.5 text-ts text-lg sm:text-xl leading-relaxed max-w-[640px]"
            >
              <p>
                I build software that talks to hardware. My focus is systems programming in C/C++,
                binary serialization, and bit-level manipulation—tools that interact directly with
                bare metal and raw data streams.
              </p>
              <p>
                Experienced with Linux development environments, build systems like Make, and
                hardware-software interfacing. Currently deepening expertise in Embedded Linux and
                OS internals through Emertxe&apos;s ECEP program.
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              custom={3} variants={revealUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              <a href="tel:+918714230350"
                className="font-mono text-sm text-tm hover:text-em transition-colors">
                +91 8714230350
              </a>
              <span className="text-tm/40 font-mono">·</span>
              <a href="mailto:shahadkurungadan7@gmail.com"
                className="font-mono text-sm text-tm hover:text-em transition-colors">
                shahadkurungadan7@gmail.com
              </a>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={4} variants={revealUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0,229,160,0.22)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="inline-flex items-center gap-2.5 bg-em text-[#09090B] font-display font-bold px-7 py-3.5 text-base"
              >
                <DownloadIcon />
                Download CV
              </motion.a>
              <motion.a
                href="https://github.com/KruBro"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={HOVER_LIFT}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 glass glass-hover-em text-ts hover:text-tp px-7 py-3.5 text-base"
              >
                <GitHubIcon />
                KruBro
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={5} variants={revealUp} initial="hidden" animate="visible"
              className="pt-5 border-t border-white/[0.055] flex flex-wrap gap-x-10 gap-y-4"
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="font-display text-[28px] font-bold text-tp">{s.value}</span>
                  <span className="font-mono text-xs tracking-widest uppercase text-tm">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative crosshair — desktop only */}
        <motion.div
          initial={{ opacity: 0, rotate: -8 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.9, duration: 1.4, ease: EXPO_OUT }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block opacity-[0.14]"
          aria-hidden="true"
        >
          <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
            {/* Outer dashed ring */}
            <circle cx="130" cy="130" r="112" stroke="#00E5A0" strokeWidth="0.5" strokeDasharray="4 6" />
            {/* Mid ring */}
            <circle cx="130" cy="130" r="72"  stroke="#00E5A0" strokeWidth="0.5" opacity="0.55" />
            {/* Inner ring */}
            <circle cx="130" cy="130" r="36"  stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
            {/* Center dot */}
            <circle cx="130" cy="130" r="4" fill="#00E5A0" />
            {/* Cross hairs */}
            <line x1="130" y1="10"  x2="130" y2="94"  stroke="#00E5A0" strokeWidth="0.5" />
            <line x1="130" y1="166" x2="130" y2="250" stroke="#00E5A0" strokeWidth="0.5" />
            <line x1="10"  y1="130" x2="94"  y2="130" stroke="#00E5A0" strokeWidth="0.5" />
            <line x1="166" y1="130" x2="250" y2="130" stroke="#00E5A0" strokeWidth="0.5" />
            {/* Tick marks on outer ring */}
            {[0,45,90,135,180,225,270,315].map((deg) => {
              const r = deg * Math.PI / 180
              const x1 = 130 + 106 * Math.cos(r)
              const y1 = 130 + 106 * Math.sin(r)
              const x2 = 130 + 112 * Math.cos(r)
              const y2 = 130 + 112 * Math.sin(r)
              return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00E5A0" strokeWidth="0.8" />
            })}
            {/* Corner bracket dots */}
            <circle cx="42"  cy="42"  r="2.5" fill="#38BDF8" opacity="0.6" />
            <circle cx="218" cy="42"  r="2.5" fill="#38BDF8" opacity="0.6" />
            <circle cx="42"  cy="218" r="2.5" fill="#38BDF8" opacity="0.6" />
            <circle cx="218" cy="218" r="2.5" fill="#38BDF8" opacity="0.6" />
          </svg>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SKILLS — BENTO GRID
      ══════════════════════════════════════════ */}
      <section id="skills" className="relative-z max-w-6xl mx-auto px-6 py-24">

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-12"
        >
          <motion.span custom={0} variants={revealUp} className="section-eyebrow block mb-3">
            Technical Proficiencies
          </motion.span>
          <motion.h2 custom={1} variants={revealUp}
            className="font-display text-5xl md:text-6xl font-bold text-tp">
            Skills Matrix
          </motion.h2>
        </motion.div>

        {/* Top row: 2/3 + 1/3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {SKILLS.map((sk, i) => (
            <motion.div
              key={sk.idx}
              custom={i} variants={revealCard}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={HOVER_LIFT}
              className={`glass ${sk.variant === 'em' ? 'glass-hover-em' : 'glass-hover-cb'} p-8 ${sk.col} cursor-default`}
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div className={`led ${sk.variant === 'em' ? 'led-em' : 'led-cb'}`} />
                <span className="font-mono text-xs tracking-[0.2em] uppercase"
                  style={{ color: sk.variant === 'em' ? '#00E5A0' : '#38BDF8' }}>
                  {sk.idx}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-tp mb-5">{sk.title}</h3>
              <div className="flex flex-wrap gap-2 mb-7">
                {sk.pills.map((p) => (
                  <span key={p} className={sk.variant === 'em' ? 'pill-em' : 'pill-cb'}>{p}</span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-tm tracking-widest">PROOF →</span>
                <a href={sk.proof.href} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-sm text-cb hover:text-tp transition-colors">
                  {sk.proof.label}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom full-width: Software Architecture */}
        <motion.div
          custom={2} variants={revealCard}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          whileHover={{ scale: 1.006, transition: { type: 'spring', stiffness: 100, damping: 20 } }}
          className="glass glass-hover-em p-8 cursor-default"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <div className="led led-em" style={{ animationDelay: '1.4s' }} />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-em">03</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold text-tp mb-4">Software Architecture</h3>
              <div className="flex flex-wrap gap-2">
                {['Serialization', 'Custom Libraries', 'Binary Parsing (ID3v2)', 'Lossless Codecs', 'Modular C Design', 'Linked List Engines'].map((p) => (
                  <span key={p} className="pill-em">{p}</span>
                ))}
              </div>
            </div>
            <div className="hidden md:block w-px bg-white/[0.055]" />
            <div className="flex-1">
              <h4 className="font-mono text-xs tracking-widest uppercase text-tm mb-3">Languages & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['C', 'C++', 'Python', 'GCC', 'GDB', 'Valgrind', 'Make', 'Git', 'QEMU', 'PlatformIO', 'UART', 'I2C', 'SPI'].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="hidden md:block w-px bg-white/[0.055]" />
            <div className="flex-1 md:max-w-[190px]">
              <h4 className="font-mono text-xs tracking-widest uppercase text-tm mb-3">Interfaces</h4>
              <div className="flex flex-wrap gap-2">
                {['ESP32', 'IoT Architecture', 'OTA Pipelines', 'Sensor Integration'].map((t) => (
                  <span key={t} className="tag-em">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PROJECTS — 2×2 BENTO
      ══════════════════════════════════════════ */}
      <section id="projects" className="relative-z max-w-6xl mx-auto px-6 py-24">

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <motion.div custom={0} variants={revealUp} className="flex items-center gap-3 mb-3">
            <span className="section-eyebrow">🌟 Engineering Work</span>
          </motion.div>
          <motion.h2 custom={1} variants={revealUp}
            className="font-display text-5xl md:text-6xl font-bold text-tp">
            Featured Projects
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {FEATURED.map((p, i) => (
            <motion.a
              key={p.idx}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={i} variants={revealCard}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={HOVER_LIFT}
              className={`glass ${p.variant === 'em' ? 'glass-hover-em' : 'glass-hover-cb'} p-8 block group`}
            >
              {/* Meta */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs tracking-widest text-tm">
                  {p.idx} / FEATURED
                </span>
                <span
                  className="font-mono text-xs tracking-widest uppercase transition-colors duration-300"
                  style={{ color: p.variant === 'em' ? 'rgba(0,229,160,0.4)' : 'rgba(56,189,248,0.4)' }}
                >
                  {p.variant === 'em' ? '●' : '◆'}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl sm:text-[26px] font-bold text-tp mb-3 transition-colors duration-400 group-hover:text-tp leading-tight">
                {p.title}
              </h3>

              {/* Win label */}
              <p className="font-mono text-xs tracking-widest uppercase text-tm mb-2">Technical Win</p>

              {/* Description */}
              <p className="text-ts text-base leading-relaxed mb-6">{p.win}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((t) => (
                  <span key={t} className={p.variant === 'em' ? 'tag-em' : 'tag'}>{t}</span>
                ))}
              </div>

              {/* Link row */}
              <div className="flex items-center gap-2 text-tm group-hover:text-ts transition-colors duration-300">
                <ExternalLinkIcon />
                <span className="font-mono text-sm">View on GitHub</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ─── Notable Systems Projects — table layout ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
          <motion.div custom={0} variants={revealUp} className="flex items-center gap-3 mb-3">
            <span className="section-eyebrow">📌 Systems Work</span>
          </motion.div>
          <motion.h3 custom={1} variants={revealUp}
            className="font-display text-3xl md:text-4xl font-bold text-tp">
            Notable Projects
          </motion.h3>
        </motion.div>

        <div>
          {NOTABLE.map((p, i) => (
            <motion.a
              key={p.num}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={i} variants={revealCard}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="notable-row flex items-start gap-6 group block"
              whileHover={{ x: 6, transition: { type: 'spring', stiffness: 100, damping: 20 } }}
            >
              {/* Number */}
              <span className="font-display text-3xl font-black text-em/20 group-hover:text-em/50 transition-colors duration-300 flex-shrink-0 w-10 pt-0.5">
                {p.num}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-display text-xl font-bold text-tp group-hover:text-em transition-colors duration-300 leading-tight">
                    {p.title}
                  </h4>
                  <ExternalLinkIcon />
                </div>
                <p className="text-ts text-base leading-relaxed mb-3 max-w-[680px]">{p.win}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PUBLICATIONS
      ══════════════════════════════════════════ */}
      <section id="publications" className="relative-z max-w-6xl mx-auto px-6 py-24">

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <motion.span custom={0} variants={revealUp} className="section-eyebrow block mb-3">
            Academic Work
          </motion.span>
          <motion.h2 custom={1} variants={revealUp}
            className="font-display text-5xl md:text-6xl font-bold text-tp">
            Publications
          </motion.h2>
        </motion.div>

        <div className="space-y-4">
          {PUBLICATIONS.map((pub, i) => (
            <motion.a
              key={i}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              custom={i} variants={revealCard}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ x: 6, transition: { type: 'spring', stiffness: 100, damping: 20 } }}
              className="glass glass-hover-em p-7 flex items-center gap-6 group block"
            >
              <div className="w-[2px] h-14 bg-gradient-to-b from-em to-em/5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-xl font-semibold text-tp group-hover:text-em transition-colors duration-300">
                  {pub.title}
                </h3>
                <p className="text-ts text-sm leading-relaxed mt-1.5 mb-2">{pub.summary}</p>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-cb">{pub.journal}</span>
                  <span className="text-tm/40">·</span>
                  <span className="font-mono text-sm text-tm">{pub.date}</span>
                  <span className="text-tm/40">·</span>
                  <span className="font-mono text-xs text-em/60 group-hover:text-em transition-colors duration-300">
                    Read Paper ↗
                  </span>
                </div>
              </div>
              <span className="font-display text-[40px] font-black text-em/12 group-hover:text-em/30 transition-colors duration-300 flex-shrink-0">
                0{i + 1}
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESUME CTA
      ══════════════════════════════════════════ */}
      <section className="relative-z max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EXPO_OUT }}
          className="glass relative overflow-hidden px-8 py-16 text-center"
        >
          {/* Subtle radial glows */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 25% 50%, rgba(0,229,160,0.042) 0%, transparent 58%), radial-gradient(ellipse at 75% 50%, rgba(56,189,248,0.032) 0%, transparent 58%)',
          }} />
          {/* Bracket corners */}
          {[
            'top-0 left-0 border-t-2 border-l-2',
            'top-0 right-0 border-t-2 border-r-2',
            'bottom-0 left-0 border-b-2 border-l-2',
            'bottom-0 right-0 border-b-2 border-r-2',
          ].map((cls, i) => (
            <div key={i} className={`absolute ${cls} w-5 h-5 border-em/35`} />
          ))}

          <span className="section-eyebrow block mb-4">Technical CV</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-tp mb-3">
            See The Full Picture
          </h2>
          <p className="text-ts text-base mb-10 max-w-[380px] mx-auto leading-relaxed">
            Complete resume — every project, skill, and training credential in one document.
          </p>
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.03, boxShadow: '0 0 52px rgba(0,229,160,0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="inline-flex items-center gap-3 bg-em text-[#09090B] font-display font-bold px-10 py-4 text-base"
          >
            <DownloadIcon />
            Download Technical CV
          </motion.a>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER / CONTACT
      ══════════════════════════════════════════ */}
      <footer id="contact" className="relative-z max-w-6xl mx-auto px-6 pt-16 pb-10 mt-8">
        <div className="divider mb-12" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <a href="#top"
              className="font-display text-[27px] font-black text-tp hover:text-em transition-colors">
              <span className="em-glow">S</span>K
            </a>
            <p className="font-mono text-xs text-tm mt-1.5 tracking-widest">
              Embedded Systems Engineer · Bengaluru, India
            </p>
          </div>

          <div className="flex flex-wrap gap-7">
            <a href="mailto:shahadkurungadan7@gmail.com"
              className="flex items-center gap-2 text-ts hover:text-em transition-colors group">
              <EmailIcon />
              <span className="font-mono text-sm group-hover:text-em transition-colors">
                shahadkurungadan7@gmail.com
              </span>
            </a>
            <a href="https://www.linkedin.com/in/shahad-kurungadan-057596227/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-ts hover:text-cb transition-colors group">
              <LinkedInIcon />
              <span className="font-mono text-sm group-hover:text-cb transition-colors">LinkedIn</span>
            </a>
            <a href="https://github.com/KruBro"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-ts hover:text-tp transition-colors">
              <GitHubIcon />
              <span className="font-mono text-sm">KruBro</span>
            </a>
          </div>
        </div>

        <div className="divider mt-10 mb-5" />
        <p className="font-mono text-xs text-tm text-center tracking-widest uppercase">
          Built with Next.js · Framer Motion · Tailwind CSS
        </p>
      </footer>
    </main>
  )
}