import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Award, Code2, Cpu } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'AI Automation Expert',
    description: 'Specializing in n8n, Make.com, and Zapier for enterprise workflow orchestration'
  },
  {
    icon: Cpu,
    title: 'Voice AI Architect',
    description: 'Building intelligent voice agents with Retell AI handling 1000+ monthly calls'
  },
  {
    icon: GraduationCap,
    title: 'CS @ FAST-NUCES',
    description: 'Bachelor\'s in Computer Science with 3.64 CGPA, graduating 2026'
  },
  {
    icon: Award,
    title: 'Certified Professional',
    description: '10+ certifications in AI/ML from IBM, Coursera, and DataCamp'
  }
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-anchor relative py-40 md:py-48 bg-[#0d0d0d]">
      {/* Blueprint Grid */}
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
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
            <span className="text-white">Command </span>
            <span className="gradient-text-orange">Center</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Glow background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 via-transparent to-[#ff6b35]/10 rounded-2xl blur-2xl" />

              <div className="relative rounded-2xl bg-[#141414] border border-[#2a2a2a] overflow-hidden group">
                <div className="aspect-square relative overflow-hidden">
                  {/* Image */}
                  <img
                    src="/images/Headshot_professional.png"
                    alt="Ahmed Ali - AI Automation Engineer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay gradient for better theme integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-transparent to-transparent" />

                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#00ff88]/40" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#ff6b35]/40" />
                </div>

                <div className="px-6 py-5 border-t border-[#2a2a2a] bg-[#0f0f0f]">
                  <div className="text-sm text-gray-400 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-[#00ff88] rounded-full pulse-glow" />
                    Voice AI • Automation • Data Pipelines
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Turning Complex Workflows into
              <span className="text-[#00ff88]"> Intelligent Systems</span>
            </h3>

            <p className="text-gray-400 mb-7 leading-relaxed">
              I'm a results-driven AI Automation Engineer specializing in designing and deploying
              end-to-end intelligent automation systems. My expertise spans conversational AI voice
              agents, multi-platform workflow orchestration, and enterprise data pipelines.
            </p>

            <p className="text-gray-400 mb-10 leading-relaxed">
              With a proven track record of delivering production-ready solutions, I've helped
              businesses across mortgage, logistics, food & beverage, and emergency services
              industries automate their operations and reduce manual processing by up to 95%.
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-7">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-[#141414]/60 border border-[#2a2a2a] hover:border-[#00ff88]/25 transition-colors group"
                >
                  <item.icon className="w-7 h-7 text-[#00ff88] mb-4" />
                  <h4 className="font-semibold text-white text-base mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Resume Button */}
            <motion.a
              href="/Ahmed_Ali_Resume.pdf"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 mt-12 px-7 py-4 bg-[#141414] border border-[#00ff88]/60 text-[#00ff88] rounded-lg font-medium hover:bg-[#00ff88]/10 transition-colors"
            >
              Download Resume
              <span className="text-xs opacity-60">PDF</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
