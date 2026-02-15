import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

interface Experience {
  id: string
  company: string
  role: string
  type: string
  location: string
  period: string
  current?: boolean
  highlights: string[]
  color: string
}

const experiences: Experience[] = [
  {
    id: 'xcorre',
    company: 'Xcorre',
    role: 'AI Automation Engineer',
    type: 'Contract',
    location: 'Remote',
    period: 'Sep 2025 – Present',
    current: true,
    highlights: [
      'Architected and deployed 15+ production automation systems for clients across mortgage, logistics, food & beverage, and emergency services industries',
      'Designed AI voice agent systems using Retell AI and LangChain, handling 1000+ automated calls monthly',
      'Built enterprise data pipelines achieving 95% reduction in manual data processing time',
      'Developed automated alert systems with intelligent escalation workflows'
    ],
    color: '#00ff88'
  },
  {
    id: 'trilles',
    company: 'Trilles AI',
    role: 'AI Automation Engineer',
    type: 'Freelance / Project-Based',
    location: 'Remote',
    period: 'Oct 2025 – Present',
    current: true,
    highlights: [
      'Created custom WhatsApp-based conversational AI platforms using Meta Business API and GPT-4',
      'Built autonomous business operations systems automating inventory monitoring and sales forecasting',
      'Deployed CI/CD pipelines via GitHub Actions for scheduled data processing'
    ],
    color: '#ff6b35'
  },
  {
    id: 'ttc',
    company: 'TTC (Tashi Tech Corp)',
    role: 'AI Automation Intern',
    type: 'Internship',
    location: 'Remote',
    period: 'Jul 2025 – Sep 2025',
    highlights: [
      'Developed automation workflows using n8n and Make.com for CRM integrations',
      'Assisted in building AI-powered document analysis and classification systems',
      'Contributed to voice agent development projects with Retell AI integrations'
    ],
    color: '#00d9ff'
  },
  {
    id: 'upwork',
    company: 'Upwork',
    role: 'Freelance AI Developer',
    type: 'Freelance',
    location: 'Remote',
    period: '2024 – Present',
    current: true,
    highlights: [
      'Delivered AI tools evaluation and REST API development for international clients',
      'Managed end-to-end project lifecycle with comprehensive documentation',
      'Maintained 5-star ratings with consistent quality delivery'
    ],
    color: '#00ff88'
  }
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-anchor relative py-24 md:py-36 bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.08]" />

      <div className="relative section-shell max-w-6xl">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#ff6b35] text-sm font-medium uppercase tracking-widest">
            Career Path
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6">
            <span className="text-white">Mission </span>
            <span className="gradient-text-orange">Log</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12">
          {/* Timeline Line */}
          <div className="absolute left-2 md:left-4 top-0 bottom-0 w-px bg-[#2a2a2a]" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="relative mb-14 last:mb-0"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-5 w-4 h-4 rounded-full border-2 ${exp.current ? 'pulse-glow' : ''}`}
                style={{
                  backgroundColor: exp.color,
                  borderColor: exp.color
                }}
              />

              {/* Card */}
              <motion.div
                className="p-7 md:p-9 bg-[#141414] rounded-2xl border transition-all hover:translate-y-[-2px]"
                style={{ borderColor: `${exp.color}30` }}
                whileHover={{ scale: 1.01 }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start gap-2 mb-4">
                  {exp.current && (
                    <span
                      className="px-2.5 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: `${exp.color}20`, color: exp.color }}
                    >
                      Current
                    </span>
                  )}
                  <span className="px-2.5 py-1 bg-[#2a2a2a] rounded text-xs text-gray-400">
                    {exp.type}
                  </span>
                </div>

                {/* Company & Role */}
                <h3 className="text-xl font-bold text-white mb-2">{exp.company}</h3>
                <p className="font-medium mb-5" style={{ color: exp.color }}>{exp.role}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400 leading-normal">
                      <span className="mt-1 flex-shrink-0" style={{ color: exp.color }}>▸</span>
                      <span className="leading-6">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-xl font-bold text-center text-white mb-10 flex items-center justify-center gap-2">
            <Briefcase className="w-5 h-5 text-[#00ff88]" />
            Education
          </h3>

          <div className="max-w-3xl mx-auto p-7 md:p-9 bg-[#1a1a1a] rounded-xl border border-[#00ff88]/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Bachelor of Science in Computer Science
                </h4>
                <p className="text-[#00ff88] mb-2 leading-normal">
                  National University of Computer and Emerging Sciences (FAST-NUCES)
                </p>
                <p className="text-sm text-gray-400">
                  Islamabad, Pakistan
                </p>
              </div>
              <div className="text-left md:text-right flex-shrink-0">
                <div className="text-2xl font-bold text-[#00ff88]">3.64</div>
                <div className="text-sm text-gray-400 mt-1">CGPA</div>
                <div className="text-sm text-gray-500 mt-1">2022 – 2026</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
              <p className="text-sm text-gray-400 leading-normal">
                <span className="text-gray-300 font-medium">Relevant Coursework:</span> Machine Learning, Deep Learning,
                Data Structures, Algorithms, NLP
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
