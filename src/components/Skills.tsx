import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, ExternalLink } from 'lucide-react'

interface SkillCategory {
  title: string
  color: string
  skills: { name: string; level: number }[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & LLM Technologies',
    color: '#00ff88',
    skills: [
      { name: 'OpenAI GPT', level: 95 },
      { name: 'Claude (Anthropic)', level: 90 },
      { name: 'Groq/Llama', level: 85 },
      { name: 'Retell AI', level: 95 },
      { name: 'LangChain', level: 88 },
      { name: 'ElevenLabs TTS', level: 80 },
    ]
  },
  {
    title: 'Automation Platforms',
    color: '#ff6b35',
    skills: [
      { name: 'n8n (Advanced)', level: 98 },
      { name: 'Make.com', level: 92 },
      { name: 'Zapier', level: 90 },
      { name: 'GitHub Actions', level: 85 },
      { name: 'Coolify', level: 75 },
    ]
  },
  {
    title: 'Programming',
    color: '#00d9ff',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript', level: 90 },
      { name: 'SQL', level: 85 },
      { name: 'REST APIs', level: 95 },
    ]
  },
  {
    title: 'Databases & Cloud',
    color: '#00ff88',
    skills: [
      { name: 'Supabase/PostgreSQL', level: 90 },
      { name: 'MariaDB', level: 82 },
      { name: 'Firebase', level: 78 },
      { name: 'Vercel', level: 85 },
      { name: 'Docker', level: 75 },
    ]
  },
  {
    title: 'CRM & Business Tools',
    color: '#ff6b35',
    skills: [
      { name: 'GoHighLevel', level: 92 },
      { name: 'BNTouch', level: 88 },
      { name: 'Retool', level: 80 },
      { name: 'HubSpot', level: 75 },
      { name: 'Odoo', level: 70 },
    ]
  },
  {
    title: 'Web & APIs',
    color: '#00d9ff',
    skills: [
      { name: 'React/Next.js', level: 85 },
      { name: 'WhatsApp Business API', level: 90 },
      { name: 'Twilio', level: 82 },
      { name: 'Selenium', level: 88 },
      { name: 'FastAPI', level: 80 },
    ]
  },
]

const tools = [
  { name: 'n8n' },
  { name: 'Make.com' },
  { name: 'Zapier' },
  { name: 'Retell AI' },
  { name: 'OpenAI' },
  { name: 'Claude' },
  { name: 'Groq' },
  { name: 'LangChain' },
  { name: 'Supabase' },
  { name: 'GoHighLevel' },
  { name: 'Python' },
  { name: 'TypeScript' },
  { name: 'React' },
  { name: 'Docker' },
  { name: 'GitHub Actions' },
  { name: 'Selenium' },
]

interface Certificate {
  name: string
  issuer: string
  file: string
  color: string
}

const certificates: Certificate[] = [
  {
    name: 'Deep Learning & Neural Networks',
    issuer: 'IBM',
    file: '/certificates/certificate_Pytorch_Intro.pdf',
    color: '#00ff88'
  },
  {
    name: 'Intermediate Deep Learning with PyTorch',
    issuer: 'DataCamp',
    file: '/certificates/certificate_Intermediate_Pytorch_.pdf',
    color: '#ff6b35'
  },
  {
    name: 'Introduction to PyTorch',
    issuer: 'Coursera',
    file: '/certificates/Intro to Pytorch Coursera Certificate.pdf',
    color: '#00d9ff'
  },
  {
    name: 'Supervised Learning',
    issuer: 'DataCamp',
    file: '/certificates/supervised_learning_certificate.pdf',
    color: '#00ff88'
  },
  {
    name: 'Unsupervised Learning',
    issuer: 'DataCamp',
    file: '/certificates/certificate_Unsupervised_learning.pdf',
    color: '#ff6b35'
  },
  {
    name: 'Natural Language Processing',
    issuer: 'DataCamp',
    file: '/certificates/NLP_Intro certificate.pdf',
    color: '#00d9ff'
  },
  {
    name: 'Sentiment Analysis',
    issuer: 'DataCamp',
    file: '/certificates/Sentiment_Anlaysis Certificate.pdf',
    color: '#00ff88'
  },
  {
    name: 'HuggingFace Transformers',
    issuer: 'DataCamp',
    file: '/certificates/certificate_HuggingFace.pdf',
    color: '#ff6b35'
  }
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-anchor relative py-40 md:py-48 bg-[#0d0d0d]">
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
          <span className="text-[#00d9ff] text-sm font-medium uppercase tracking-widest">
            Technical Arsenal
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
            <span className="text-white">System </span>
            <span className="gradient-text">Capabilities</span>
          </h2>
        </motion.div>

        {/* Core Stack - Infinite Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 overflow-hidden"
        >
          <div className="relative">
            <div className="ticker-wrapper">
              <motion.div
                className="ticker-content"
                animate={{
                  x: [0, -100 + '%']
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear"
                  }
                }}
              >
                {[...tools, ...tools].map((tool, index) => (
                  <div
                    key={`${tool.name}-${index}`}
                    className="ticker-item px-4 py-2 bg-[#141414] border border-[#2a2a2a] rounded-full text-sm text-gray-300 hover:border-[#00ff88]/25 transition-colors whitespace-nowrap"
                  >
                    {tool.name}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * catIndex }}
              className="p-8 bg-[#141414]/60 rounded-2xl border border-[#2a2a2a] hover:border-opacity-50 transition-colors"
              style={{ '--hover-color': category.color } as React.CSSProperties}
            >
              <h3
                className="text-lg font-bold mb-6"
                style={{ color: category.color }}
              >
                {category.title}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 * catIndex + 0.05 * skillIndex }}
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-500">&nbsp;</span>
                    </div>
                    <div className="h-2.5 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#2a2a2a]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.2 * catIndex + 0.1 * skillIndex }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 md:mt-24"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#00ff88]" />
              <h3 className="text-2xl font-bold text-white">
                Certifications & Training
              </h3>
            </div>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Click any certificate to view the full credential
            </p>
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
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-6 bg-[#141414] rounded-xl border border-[#2a2a2a] hover:border-opacity-70 transition-all cursor-pointer overflow-hidden"
                style={{ '--cert-color': cert.color } as React.CSSProperties}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{ backgroundColor: cert.color }}
                />

                {/* Certificate Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
                >
                  <Award className="w-6 h-6" style={{ color: cert.color }} />
                </div>

                {/* Certificate Info */}
                <div className="relative">
                  <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">{cert.issuer}</p>

                  {/* View badge */}
                  <div className="flex items-center gap-1.5 text-xs group-hover:text-white transition-colors" style={{ color: cert.color }}>
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-5"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${cert.color} 50%)`
                  }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
