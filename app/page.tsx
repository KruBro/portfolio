'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubIcon, LinkedInIcon, EmailIcon, DownloadIcon, ExternalLinkIcon, TestingBadgeIcon } from './components/Icons'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-github-bg/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#top" className="text-xl font-bold text-white hover:text-github-green transition-colors">
              SK
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 lg:gap-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">
                Skills
              </a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#publications" className="text-gray-300 hover:text-white transition-colors">
                Publications
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-github-bg border-t border-gray-800"
            >
              <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
                <a
                  href="#about"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                >
                  About
                </a>
                <a
                  href="#skills"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                >
                  Projects
                </a>
                <a
                  href="#publications"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                >
                  Publications
                </a>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Header / About Me */}
      <section id="about" className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        <motion.div {...fadeIn}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SHAHAD KURUNGADAN
          </h1>
          <div className="text-base md:text-lg text-gray-400 mb-8 flex flex-wrap gap-3">
            <span>Bengaluru, India</span>
            <span>⋄</span>
            <a href="tel:+918714230350" className="hover:text-github-blue transition-colors">+91 8714230350</a>
            <span>⋄</span>
            <a href="mailto:shahadkurungadan7@gmail.com" className="hover:text-github-blue transition-colors">shahadkurungadan7@gmail.com</a>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-github-green mb-8">
            Embedded Systems Engineer
          </h2>
          <div className="text-lg md:text-xl leading-relaxed text-gray-300 space-y-4">
            <p>
              I&apos;m an embedded systems engineer with a B.Tech in Computer Science, specializing in IoT and low-level systems.
            </p>
            <p>
              My work focuses on systems programming in C/C++, binary serialization, and bit-level manipulation. I build tools that interact directly with hardware and raw data streams.
            </p>
            <p>
              I&apos;m experienced with Linux development environments, build systems like Make, and hardware-software interfacing. Currently strengthening my skills in Embedded Linux and OS internals through Emertxe ECEP training.
            </p>
            <p>
              Over the past months, I&apos;ve delivered 15+ rigorous systems projects—from LSB steganography to binary parsers—each one pushing my understanding of how computers work at the fundamental level.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Technical Skills Matrix */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Technical Skills Matrix</h2>
          <div className="grid grid-cols-1 gap-6">
            {/* Microcontroller & Firmware */}
            <div className="border border-gray-700 bg-gray-900/50 p-6">
              <h3 className="text-xl font-semibold text-github-green mb-4">
                Microcontroller & Firmware
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-gray-300">Bitwise Logic</div>
                <div className="text-gray-300">Register Masking</div>
                <div className="text-gray-300">GPIO Control</div>
                <div className="text-gray-300">LSB Algorithms</div>
              </div>
              <div className="mt-4 text-sm text-github-blue">
                Proof: LSB Steganography Tool
              </div>
            </div>

            {/* Systems & Linux */}
            <div className="border border-gray-700 bg-gray-900/50 p-6">
              <h3 className="text-xl font-semibold text-github-green mb-4">
                Systems & Linux
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-gray-300">POSIX File I/O</div>
                <div className="text-gray-300">Binary Streams</div>
                <div className="text-gray-300">Shell Scripting (Bash)</div>
                <div className="text-gray-300">Makefiles</div>
                <div className="text-gray-300">Hex Analysis</div>
              </div>
              <div className="mt-4 text-sm text-github-blue">
                Proof: Hex Dump Viewer
              </div>
            </div>

            {/* Software Architecture */}
            <div className="border border-gray-700 bg-gray-900/50 p-6">
              <h3 className="text-xl font-semibold text-github-green mb-4">
                Software Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-gray-300">Serialization</div>
                <div className="text-gray-300">Custom Libraries</div>
                <div className="text-gray-300">Binary Parsing (ID3v2)</div>
                <div className="text-gray-300">Lossless Codecs</div>
              </div>
              <div className="mt-4 text-sm text-github-blue">
                Proof: MP3 Tag Reader & RLE Compressor
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Engineering Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Featured Engineering Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project 1 - LSB Steganography Tool */}
            <div className="border border-gray-700 bg-gray-900/50 p-6 hover:border-github-green transition-colors">
              <div className="flex items-start justify-between mb-3">
                <a 
                  href="https://github.com/KruBro/LSB_Stegenography" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-white hover:text-github-blue transition-colors flex items-center gap-2"
                >
                  LSB Steganography Tool
                  <ExternalLinkIcon />
                </a>
              </div>
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 bg-github-green/20 text-github-green px-3 py-1 text-xs font-medium border border-github-green/50">
                  <TestingBadgeIcon />
                  AUTOMATED TESTING
                </span>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-400 font-semibold mb-2">Technical Win:</p>
                <p className="text-gray-300 leading-relaxed">
                  Engineered a bit-level data-hiding utility using LSB substitution; utilized bitwise logic to embed secret payloads into 24-bit BMP pixel data while maintaining header integrity.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">C</span>
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">Bitwise Logic</span>
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">Binary Parsing</span>
              </div>
            </div>

            {/* Project 2 - MP3 Tag Reader & Editor */}
            <div className="border border-gray-700 bg-gray-900/50 p-6 hover:border-github-green transition-colors">
              <a 
                href="https://github.com/KruBro/MP3-Tag-Reader-Editor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-semibold text-white hover:text-github-blue transition-colors flex items-center gap-2 mb-4"
              >
                MP3 Tag Reader & Editor
                <ExternalLinkIcon />
              </a>
              <div className="mb-4">
                <p className="text-sm text-gray-400 font-semibold mb-2">Technical Win:</p>
                <p className="text-gray-300 leading-relaxed">
                  Developed a binary parser to handle ID3v2.3 tag headers, navigating variable-length frames and structure padding without external libraries.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">C</span>
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">ID3v2</span>
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">File I/O</span>
              </div>
            </div>

            {/* Project 3 - Binary RLE Compressor */}
            <div className="border border-gray-700 bg-gray-900/50 p-6 hover:border-github-green transition-colors">
              <a 
                href="https://github.com/KruBro/C-Depth-Mastery/tree/main/03-Files-and-Systems/12-Run-Length-Encoding" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-semibold text-white hover:text-github-blue transition-colors flex items-center gap-2 mb-4"
              >
                Binary RLE Compressor
                <ExternalLinkIcon />
              </a>
              <div className="mb-4">
                <p className="text-sm text-gray-400 font-semibold mb-2">Technical Win:</p>
                <p className="text-gray-300 leading-relaxed">
                  Implemented a lossless binary codec for raw data streams, serializing repeating byte sequences into [Count][Value] pairs to achieve significant file size reduction.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">C</span>
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">Compression</span>
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">Binary Streams</span>
              </div>
            </div>

            {/* Project 4 - Hex Dump Viewer */}
            <div className="border border-gray-700 bg-gray-900/50 p-6 hover:border-github-green transition-colors">
              <a 
                href="https://github.com/KruBro/C-Depth-Mastery/tree/main/03-Files-and-Systems/15-Hex-Dump-Viewer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-semibold text-white hover:text-github-blue transition-colors flex items-center gap-2 mb-4"
              >
                Hex Dump Viewer (hexvr)
                <ExternalLinkIcon />
              </a>
              <div className="mb-4">
                <p className="text-sm text-gray-400 font-semibold mb-2">Technical Win:</p>
                <p className="text-gray-300 leading-relaxed">
                  Built a binary-accurate inspection utility providing 16-byte aligned hexadecimal and ASCII views of raw file offsets.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">C</span>
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">Linux</span>
                <span className="text-xs bg-gray-800 text-github-blue px-2 py-1 border border-gray-700">Hex Analysis</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Publications */}
      <section id="publications" className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Publications</h2>
          <div className="space-y-4">
            <div className="border-l-2 border-github-green pl-4 py-2">
              <p className="text-gray-300 text-lg">
                Smart Water Management Technology — <span className="text-github-blue">IJIRT Journal, March 2025</span>
              </p>
            </div>
            <div className="border-l-2 border-github-green pl-4 py-2">
              <p className="text-gray-300 text-lg">
                An IoT-Based Smart Agriculture System — <span className="text-github-blue">IJIRT Journal, May 2025</span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Resume Download */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-3 bg-github-green hover:bg-github-green/80 text-white font-semibold px-8 py-4 text-lg border-2 border-github-green hover:border-white transition-all"
          >
            <DownloadIcon />
            Download Technical CV
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <a 
            href="mailto:shahadkurungadan7@gmail.com" 
            className="flex items-center gap-2 text-gray-300 hover:text-github-blue transition-colors"
          >
            <EmailIcon />
            shahadkurungadan7@gmail.com
          </a>
          <a 
            href="https://www.linkedin.com/in/shahad-kurungadan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-github-blue transition-colors"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <a 
            href="https://github.com/KruBro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-github-blue transition-colors"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </footer>
    </main>
  )
}
