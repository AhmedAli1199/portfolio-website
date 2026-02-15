import { Terminal, Heart, ArrowUp, Linkedin, Github, Mail, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="section-shell">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="#home" className="flex items-center gap-2.5 text-xl font-bold">
              <Terminal className="w-6 h-6 text-[#00ff88]" />
              <span className="gradient-text">Ahmed.Ali</span>
            </a>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Ahmed Ali. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-7 text-sm text-gray-400">
            <a href="#about" className="hover:text-[#00ff88] transition-colors">About</a>
            <a href="#projects" className="hover:text-[#00ff88] transition-colors">Projects</a>
            <a href="#skills" className="hover:text-[#00ff88] transition-colors">Skills</a>
            <a href="#experience" className="hover:text-[#00ff88] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[#00ff88] transition-colors">Contact</a>
            <a href="#home" className="inline-flex items-center gap-2 hover:text-[#00ff88] transition-colors">
              Back to top <ArrowUp className="w-4 h-4" />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com/in/ahmed-ali-3a93a8289"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-gray-400 hover:text-[#0077b5] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/ahmedali1199"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01a2116abb2bdae246?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-gray-400 hover:text-[#14a800] transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="mailto:ahmedaps2004@gmail.com"
              className="p-2.5 text-gray-400 hover:text-[#00ff88] transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Made with Love */}
        <div className="mt-10 pt-8 border-t border-[#1a1a1a] text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1.5">
            Built with <Heart className="w-4 h-4 text-[#ff6b35] fill-[#ff6b35]" /> using
            <span className="text-[#00ff88]">React</span>,
            <span className="text-[#00d9ff]">Three.js</span> &
            <span className="text-[#ff6b35]">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
