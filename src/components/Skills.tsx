import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Award, ExternalLink } from 'lucide-react'

// ─── Curated skill list – grouped by category ────────────────────────────────
const allSkills = [
  // AI & LLM (green)
  { name: 'OpenAI GPT',      level: 95, category: 'AI & LLM',         color: '#00ff88' },
  { name: 'Claude',          level: 90, category: 'AI & LLM',         color: '#00ff88' },
  { name: 'Retell AI',       level: 95, category: 'AI & LLM',         color: '#00ff88' },
  { name: 'Vapi',            level: 85, category: 'AI & LLM',         color: '#00ff88' },
  { name: 'LangChain',       level: 88, category: 'AI & LLM',         color: '#00ff88' },
  { name: 'ElevenLabs',      level: 82, category: 'AI & LLM',         color: '#00ff88' },
  { name: 'Groq / Llama',    level: 85, category: 'AI & LLM',         color: '#00ff88' },
  // Automation (orange)
  { name: 'n8n',             level: 98, category: 'Automation',        color: '#ff6b35' },
  { name: 'Make.com',        level: 92, category: 'Automation',        color: '#ff6b35' },
  { name: 'Zapier',          level: 90, category: 'Automation',        color: '#ff6b35' },
  { name: 'GitHub Actions',  level: 85, category: 'Automation',        color: '#ff6b35' },
  { name: 'Webhooks',        level: 90, category: 'Automation',        color: '#ff6b35' },
  // Programming (cyan)
  { name: 'Python',          level: 92, category: 'Programming',       color: '#00d9ff' },
  { name: 'REST APIs',       level: 95, category: 'Programming',       color: '#00d9ff' },
  { name: 'JavaScript',      level: 90, category: 'Programming',       color: '#00d9ff' },
  { name: 'TypeScript',      level: 88, category: 'Programming',       color: '#00d9ff' },
  { name: 'SQL',             level: 85, category: 'Programming',       color: '#00d9ff' },
  // Databases & Cloud (green)
  { name: 'Supabase',        level: 90, category: 'Databases & Cloud', color: '#00ff88' },
  { name: 'PostgreSQL',      level: 88, category: 'Databases & Cloud', color: '#00ff88' },
  { name: 'Vercel',          level: 85, category: 'Databases & Cloud', color: '#00ff88' },
  { name: 'Firebase',        level: 78, category: 'Databases & Cloud', color: '#00ff88' },
  { name: 'Docker',          level: 75, category: 'Databases & Cloud', color: '#00ff88' },
  // CRM & Biz Tools (orange)
  { name: 'GoHighLevel',     level: 92, category: 'CRM & Biz Tools',   color: '#ff6b35' },
  { name: 'Retool',          level: 82, category: 'CRM & Biz Tools',   color: '#ff6b35' },
  { name: 'HubSpot',         level: 78, category: 'CRM & Biz Tools',   color: '#ff6b35' },
  { name: 'Airtable',        level: 80, category: 'CRM & Biz Tools',   color: '#ff6b35' },
  // Web & APIs (cyan)
  { name: 'React / Next.js', level: 85, category: 'Web & APIs',        color: '#00d9ff' },
  { name: 'WhatsApp API',    level: 90, category: 'Web & APIs',        color: '#00d9ff' },
  { name: 'Selenium',        level: 88, category: 'Web & APIs',        color: '#00d9ff' },
  { name: 'FastAPI',         level: 80, category: 'Web & APIs',        color: '#00d9ff' },
  { name: 'Twilio',          level: 82, category: 'Web & APIs',        color: '#00d9ff' },
]

const categoryFilters = [
  'All Skills',
  'AI & LLM',
  'Automation',
  'Programming',
  'Databases & Cloud',
  'CRM & Biz Tools',
  'Web & APIs',
]

const filterColors: Record<string, string> = {
  'AI & LLM':          '#00ff88',
  'Automation':        '#ff6b35',
  'Programming':       '#00d9ff',
  'Databases & Cloud': '#00ff88',
  'CRM & Biz Tools':   '#ff6b35',
  'Web & APIs':        '#00d9ff',
}

function getBubbleSize(level: number): number {
  const min = 68, max = 136
  return Math.round(min + ((level - 70) / 30) * (max - min))
}

const certificates = [
  { name: 'Deep Learning & Neural Networks',      issuer: 'IBM',      file: '/certificates/certificate_Pytorch_Intro.pdf',               color: '#00ff88' },
  { name: 'Intermediate Deep Learning (PyTorch)', issuer: 'DataCamp', file: '/certificates/certificate_Intermediate_Pytorch_.pdf',       color: '#ff6b35' },
  { name: 'Introduction to PyTorch',              issuer: 'Coursera', file: '/certificates/Intro to Pytorch Coursera Certificate.pdf',    color: '#00d9ff' },
  { name: 'Supervised Learning',                  issuer: 'DataCamp', file: '/certificates/supervised_learning_certificate.pdf',         color: '#00ff88' },
  { name: 'Unsupervised Learning',                issuer: 'DataCamp', file: '/certificates/certificate_Unsupervised_learning.pdf',       color: '#ff6b35' },
  { name: 'Natural Language Processing',          issuer: 'DataCamp', file: '/certificates/NLP_Intro certificate.pdf',                  color: '#00d9ff' },
  { name: 'Sentiment Analysis',                   issuer: 'DataCamp', file: '/certificates/Sentiment_Anlaysis Certificate.pdf',         color: '#00ff88' },
  { name: 'HuggingFace Transformers',             issuer: 'DataCamp', file: '/certificates/certificate_HuggingFace.pdf',                color: '#ff6b35' },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('All Skills')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const visible = activeFilter === 'All Skills'
    ? allSkills
    : allSkills.filter(s => s.category === activeFilter)

  return (
    <section id="skills" className="section-anchor relative py-40 md:py-48 bg-[#0d0d0d]">
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      <div className="relative section-shell">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="text-[#00d9ff] text-sm font-medium uppercase tracking-widest">Technical Arsenal</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
            <span className="text-white">System </span>
            <span className="gradient-text">Capabilities</span>
          </h2>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
        >
          {categoryFilters.map((label) => {
            const col = filterColors[label] ?? '#00ff88'
            const isActive = activeFilter === label
            return (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                className="px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border"
                style={{
                  backgroundColor: isActive ? `${col}20` : 'transparent',
                  borderColor:     isActive ? col : '#2a2a2a',
                  color:           isActive ? col : '#9ca3af',
                  boxShadow:       isActive ? `0 0 14px ${col}30` : 'none',
                }}
              >
                {label}
              </button>
            )
          })}
        </motion.div>

        {/* ── Bubble Grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-full rounded-2xl border border-white/[0.07] bg-[#0a0a0a]/60 px-6 py-10 md:px-10 md:py-14"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full opacity-[0.04]"
              style={{ background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)' }}
            />
          </div>

          <AnimatePresence mode="popLayout">
            <div className="flex flex-wrap justify-center items-center gap-5 md:gap-7">
              {visible.map((skill, i) => {
                const size = getBubbleSize(skill.level)
                const isHov = hoveredSkill === skill.name
                const driftDuration = 3 + (i % 7) * 0.45
                const driftAmount  = 4 + (i % 4)

                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18, delay: i * 0.03 }}
                    style={{ width: size, height: size, flexShrink: 0 }}
                  >
                    {/* Drift wrapper */}
                    <motion.div
                      className="w-full h-full"
                      animate={{ y: [0, -driftAmount, 0, driftAmount, 0] }}
                      transition={{
                        duration: driftDuration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: (i * 0.22) % driftDuration,
                      }}
                    >
                      {/* Bubble */}
                      <motion.div
                        className="w-full h-full rounded-full flex items-center justify-center cursor-pointer relative select-none"
                        animate={{ scale: isHov ? 1.18 : 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        onTouchStart={() => setHoveredSkill(p => p === skill.name ? null : skill.name)}
                        style={{
                          backgroundColor: `${skill.color}10`,
                          border: `1.5px solid ${skill.color}${isHov ? '80' : '30'}`,
                          boxShadow: isHov
                            ? `0 0 30px ${skill.color}55, 0 0 60px ${skill.color}20, inset 0 0 20px ${skill.color}08`
                            : `0 0 10px ${skill.color}18`,
                        }}
                      >
                        {/* Proficiency ring */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="47" fill="none" stroke={skill.color} strokeWidth="1.5" strokeOpacity="0.12" />
                          <motion.circle
                            cx="50" cy="50" r="47"
                            fill="none"
                            stroke={skill.color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 47}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 47 }}
                            animate={isInView ? { strokeDashoffset: 2 * Math.PI * 47 * (1 - skill.level / 100) } : {}}
                            transition={{ duration: 1.2, delay: 0.5 + i * 0.03, ease: 'easeOut' }}
                            transform="rotate(-90 50 50)"
                            strokeOpacity={isHov ? 0.9 : 0.5}
                          />
                        </svg>

                        {/* Label / level */}
                        <div className="relative z-10 text-center px-2">
                          <AnimatePresence mode="wait">
                            {isHov ? (
                              <motion.div
                                key="hov"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.15 }}
                                className="flex flex-col items-center gap-0.5"
                              >
                                <span
                                  className="font-bold leading-tight text-center"
                                  style={{
                                    color: skill.color,
                                    fontSize: size < 90 ? '8px' : size < 110 ? '10px' : '12px',
                                  }}
                                >
                                  {skill.name}
                                </span>
                                <span
                                  className="font-mono font-bold"
                                  style={{
                                    color: skill.color,
                                    fontSize: size < 90 ? '10px' : size < 110 ? '12px' : '15px',
                                  }}
                                >
                                  {skill.level}%
                                </span>
                              </motion.div>
                            ) : (
                              <motion.span
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: size >= 85 ? 0.7 : 0 }}
                                exit={{ opacity: 0 }}
                                className="text-white font-medium leading-tight text-center block"
                                style={{ fontSize: size < 100 ? '8px' : size < 118 ? '10px' : '11px' }}
                              >
                                {skill.name}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </AnimatePresence>
        </motion.div>

        {/* Mobile hint */}
        <p className="text-center text-xs text-gray-600 mt-3 md:hidden">Tap a bubble to inspect it</p>

        {/* ── Certifications ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 md:mt-32"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#00ff88]" />
              <h3 className="text-2xl font-bold text-white">Certifications & Training</h3>
            </div>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">Click any certificate to view the full credential</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <motion.a
                key={cert.name}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.08 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="group relative p-6 bg-[#141414] rounded-xl border border-[#2a2a2a] transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: cert.color }} />
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
                >
                  <Award className="w-6 h-6" style={{ color: cert.color }} />
                </div>
                <div className="relative">
                  <h4 className="text-sm font-semibold text-white mb-2 leading-snug">{cert.name}</h4>
                  <p className="text-xs text-gray-500 mb-3">{cert.issuer}</p>
                  <div className="flex items-center gap-1.5 text-xs group-hover:text-white transition-colors" style={{ color: cert.color }}>
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-5"
                  style={{ background: `linear-gradient(135deg, transparent 50%, ${cert.color} 50%)` }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
