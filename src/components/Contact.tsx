import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Send, Mail, Phone, MapPin, Linkedin, Github, 
  ExternalLink, Clock
} from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ahmedaps2004@gmail.com',
    href: 'mailto:ahmedaps2004@gmail.com',
    color: '#00ff88'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 317 150 6828',
    href: 'tel:+923171506828',
    color: '#ff6b35'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Rawalpindi, Pakistan',
    href: '#',
    color: '#00d9ff'
  }
]

const socials = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ahmed-ali-3a93a8289',
    color: '#0077b5'
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/ahmedali1199',
    color: '#ffffff'
  },
  {
    icon: ExternalLink,
    label: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~01a2116abb2bdae246?mp_source=share',
    color: '#14a800'
  }
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(formState.subject.trim())
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    )
    window.location.href = `mailto:ahmedaps2004@gmail.com?subject=${subject}&body=${body}`
    setFormState({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="section-anchor relative py-40 md:py-48 bg-[#0d0d0d]">
      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      <div className="relative section-shell">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <span className="text-[#00ff88] text-sm font-medium uppercase tracking-widest">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
            <span className="text-white">Open </span>
            <span className="gradient-text">Channel</span>
          </h2>
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss AI automation solutions?
            I'm always open to new opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-7 p-8 md:p-10 rounded-2xl bg-[#141414] border border-[#2a2a2a]">
              <div className="grid md:grid-cols-2 gap-7">
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Name</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-5 py-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-[#00ff88]/70 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-5 py-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-[#00ff88]/70 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">Subject</label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  required
                  className="w-full px-5 py-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-[#00ff88]/70 focus:outline-none transition-colors"
                  placeholder="Project inquiry, collaboration, etc."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-5 py-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-[#00ff88]/70 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2.5 px-7 py-4 bg-[#00ff88] text-[#0d0d0d] rounded-lg font-semibold hover:bg-[#00ff88]/90 transition-colors glow-green"
              >
                <Send className="w-5 h-5" />
                Send Email
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Response Time */}
            <div className="p-7 bg-[#141414] rounded-2xl border border-[#2a2a2a]">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#00ff88]" />
                <h3 className="text-lg font-semibold text-white">Quick Response</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                I typically respond within 24 hours. For urgent projects,
                feel free to reach out via WhatsApp or LinkedIn.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-5">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-5 p-5 bg-[#141414] rounded-2xl border border-[#2a2a2a] hover:border-opacity-50 transition-all group"
                  style={{ '--hover-color': item.color } as React.CSSProperties}
                >
                  <div
                    className="p-3.5 rounded-lg"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-[#00ff88] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-500 mb-5">Connect with me</p>
              <div className="flex flex-wrap gap-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-2.5 px-5 py-3.5 bg-[#141414] border border-[#2a2a2a] rounded-lg hover:border-[#00ff88]/25 transition-colors"
                  >
                    <social.icon className="w-5 h-5" style={{ color: social.color }} />
                    <span className="text-sm text-gray-300">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 bg-[#00ff88]/10 border border-[#00ff88]/25 rounded-2xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2 h-2 bg-[#00ff88] rounded-full pulse-glow" />
                <span className="text-[#00ff88] font-medium">Available for Projects</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Currently accepting new clients for AI automation, voice agent development,
                and workflow orchestration projects.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
