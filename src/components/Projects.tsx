import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Phone, Database, FileText, Image, BarChart3,
  Github, ChevronRight, Workflow
} from 'lucide-react'
import ProjectModal from './ProjectModal'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  icon: typeof Phone
  iconColor: string
  category: 'voice-ai' | 'automation' | 'data-pipeline' | 'ai-tool'
  stats: { label: string; value: string }[]
  image?: string
  images?: string[]
  imagePlaceholder: string
  featured?: boolean
  features?: string[]
  detailedDescription?: string
}

const projects: Project[] = [
  {
    id: 'ratecut',
    title: 'RateCut',
    subtitle: 'Enterprise AI Voice Agent System',
    description: 'Full-stack AI voice agent platform for a mortgage company, automating inbound/outbound calling across three distinct scenarios: database reactivation, new lead engagement, and inbound support. Features intelligent lead qualification with 90%+ accuracy and bi-directional CRM synchronization.',
    tech: ['Retell AI', 'n8n', 'GoHighLevel', 'Zapier', 'BNTouch CRM'],
    icon: Phone,
    iconColor: '#00ff88',
    category: 'voice-ai',
    stats: [
      { label: 'Lead Accuracy', value: '90%+' },
      { label: 'Scenarios', value: '3' },
      { label: 'CRM Sync', value: 'Real-time' }
    ],
    image: '/images/RateCut - Architecture Diagram.png',
    images: [
      '/images/RateCut - Architecture Diagram.png',
      '/images/RateCut-Voice Engine.png',
      '/images/RateCut-DB Reactivation.png',
      '/images/RateCut-Get Contact Details.png',
      '/images/RateCut-Make Phone Call From Retell.png',
      '/images/RateCut-Post Call Analysis.png'
    ],
    imagePlaceholder: 'RateCut Architecture Diagram - Voice Agent Flow',
    featured: true,
    features: [
      'Multi-scenario voice agent handling database reactivation, new leads, and inbound support',
      '90%+ lead qualification accuracy with intelligent conversation flows',
      'Bi-directional CRM synchronization with GoHighLevel and BNTouch',
      'Automated appointment booking and calendar integration',
      'Real-time data extraction and field population',
      'Scalable n8n workflow orchestration handling 1000+ calls monthly'
    ],
    detailedDescription: 'A comprehensive AI voice agent platform built for RateCut mortgage company, automating their entire calling operations across multiple scenarios. The system intelligently qualifies leads, extracts critical information, and seamlessly integrates with their CRM ecosystem to streamline mortgage application processes.'
  },
  {
    id: 'firstchase',
    title: 'FirstChase Financial',
    subtitle: 'AI Voice Agent Solution',
    description: 'AI voice agent system for financial services handling inbound and outbound customer calls. Features intelligent lead qualification workflows with automated data extraction, CRM synchronization, and dynamic calendar integration for appointment booking.',
    tech: ['Retell AI', 'n8n', 'GoHighLevel', 'REST APIs'],
    icon: Phone,
    iconColor: '#ff6b35',
    category: 'voice-ai',
    stats: [
      { label: 'Call Types', value: 'In/Out' },
      { label: 'Calendar', value: 'Dynamic' },
      { label: 'Handoff', value: 'Seamless' }
    ],
    image: '/images/FirstChaseFinancial-VoiceBot Dashboard.png',
    images: ['/images/FirstChaseFinancial-VoiceBot Dashboard.png'],
    imagePlaceholder: 'FirstChase Voice Agent Dashboard',
    featured: true,
    features: [
      'Intelligent inbound and outbound call handling for financial services',
      'Automated lead qualification with dynamic conversation routing',
      'Real-time CRM data extraction and synchronization',
      'Dynamic calendar integration for appointment scheduling',
      'Seamless human handoff with context preservation',
      'Custom workflows built on n8n for maximum flexibility'
    ],
    detailedDescription: 'An AI-powered voice agent solution for FirstChase Financial, streamlining their customer engagement process. The system handles both inbound inquiries and outbound lead nurturing, automatically qualifying leads and booking appointments while maintaining seamless integration with their existing CRM infrastructure.'
  },
  {
    id: 'cherry-river',
    title: 'Cherry River',
    subtitle: 'Autonomous COO Operations Engine',
    description: 'Autonomous business operations system for a premium liquor distributor, automating inventory monitoring, sales forecasting, and supply chain management. Processes 26MB+ of data weekly with intelligent stock rupture detection and automated territory-based alerts.',
    tech: ['Python', 'Selenium', 'Supabase', 'n8n', 'GitHub Actions'],
    icon: Database,
    iconColor: '#00d9ff',
    category: 'data-pipeline',
    stats: [
      { label: 'Weekly Data', value: '26MB+' },
      { label: 'Alert Speed', value: '<24h' },
      { label: 'Materials', value: '25+' }
    ],
    image: '/images/COOCockpit.PNG',
    images: ['/images/COOCockpit.PNG', '/images/COOCockpitProduction Planning .png'],
    imagePlaceholder: 'COO Cockpit Dashboard Screenshot',
    featured: true,
    features: [
      'Autonomous inventory monitoring across 25+ premium liquor products',
      'Intelligent stock rupture detection with predictive analytics',
      'Automated sales forecasting based on historical data patterns',
      'Territory-based alert system with <24h response time',
      'Weekly processing of 26MB+ data with 100% automation',
      'CI/CD pipeline via GitHub Actions for scheduled data processing',
      'Supabase integration for real-time data warehousing'
    ],
    detailedDescription: 'A comprehensive autonomous operations engine built for Cherry River, a premium liquor distributor. The system acts as a virtual COO, continuously monitoring inventory levels, predicting stock shortages, and alerting stakeholders before issues arise. Processes massive datasets weekly to provide actionable intelligence for supply chain optimization.'
  },
  {
    id: 'ma-hub',
    title: 'M&A Intelligence Hub',
    subtitle: 'FDSS Hackathon 2025 - S&P Global',
    description: 'AI-powered document analysis system built for the FDSS Fast Hackathon 2025 (sponsored by S&P Global). Achieves 95%+ accuracy in M&A document classification with automated ingestion from Google Drive and hierarchical taxonomy for IT/Technology documents.',
    tech: ['Claude AI', 'n8n', 'Supabase', 'Google Drive API'],
    icon: FileText,
    iconColor: '#00ff88',
    category: 'ai-tool',
    stats: [
      { label: 'Accuracy', value: '95%+' },
      { label: 'Categories', value: '10+' },
      { label: 'Time Saved', value: '95%' }
    ],
    imagePlaceholder: 'M&A Hub Dashboard with AI Demo',
  },
  {
    id: 'bulk-image',
    title: 'Bulk Product Image Editor',
    subtitle: 'AI-Powered Ghost Mannequin Effect',
    description: 'Automated image processing pipeline using Make.com to handle bulk product photography edits. Integrates Gemini AI Vision to apply Ghost Mannequin Effect, transforming flat-lay images into professional 3D product shots at 4K resolution.',
    tech: ['Make.com', 'Gemini AI', 'Dropbox API', 'Image Processing'],
    icon: Image,
    iconColor: '#ff6b35',
    category: 'automation',
    stats: [
      { label: 'Resolution', value: '4K' },
      { label: 'Processing', value: 'Auto' },
      { label: 'Trigger', value: 'On Upload' }
    ],
    image: '/images/Bulk Product Image Editor Workflow.png',
    imagePlaceholder: 'Make.com Workflow + Before/After Images',
  },
  {
    id: 'digital-survey',
    title: 'Digital Survey Workflow',
    subtitle: 'Industrial Estimation System',
    description: 'Mobile-first field data collection app for industrial insulation jacket manufacturing, replacing a 3-year-old manual survey process. Features rules-based decision engine with auto-classification of jacket complexity based on asset type, dimensions, and site conditions.',
    tech: ['React', 'TypeScript', 'PostgreSQL', 'Mobile-First'],
    icon: Workflow,
    iconColor: '#00d9ff',
    category: 'automation',
    stats: [
      { label: 'Asset Types', value: '4+' },
      { label: 'Calculations', value: 'Auto' },
      { label: 'Platform', value: 'Mobile' }
    ],
    imagePlaceholder: 'Mobile App Survey Interface',
  },
  {
    id: 'financial-analysis',
    title: 'Company Financial Analysis Engine',
    subtitle: 'SEC Data Pipeline',
    description: 'End-to-end stock analysis automation evaluating companies across 8 financial signals including 10-K analysis, insider trading, Beneish M-Score, and patent activity. Generates Financial Health scores with Buy/Sell/Hold recommendations.',
    tech: ['n8n', 'SEC API', 'REST APIs', 'Data Analysis'],
    icon: BarChart3,
    iconColor: '#00ff88',
    category: 'data-pipeline',
    stats: [
      { label: 'Signals', value: '8' },
      { label: 'Sources', value: 'SEC+' },
      { label: 'Output', value: 'Scores' }
    ],
    imagePlaceholder: 'Financial Analysis Dashboard',
  },
]

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'voice-ai', label: 'Voice AI' },
  { id: 'automation', label: 'Automation' },
  { id: 'data-pipeline', label: 'Data Pipelines' },
  { id: 'ai-tool', label: 'AI Tools' },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showSpark, setShowSpark] = useState(false)
  const [sparkColor, setSparkColor] = useState('#00ff88')

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const toggleExpanded = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const handleProjectClick = (project: Project) => {
    if (project.features && project.features.length > 0) {
      // Trigger spark animation
      setSparkColor(project.iconColor)
      setShowSpark(true)

      // Show modal after spark animation
      setTimeout(() => {
        setSelectedProject(project)
        setShowSpark(false)
      }, 800)
    }
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  return (
    <section id="projects" className="section-anchor relative py-40 md:py-48 bg-[#0a0a0a]">
      {/* Background Elements */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.08]" />

      <div className="relative section-shell">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <span className="text-[#ff6b35] text-sm font-medium uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
            <span className="text-white">Mission </span>
            <span className="gradient-text">Archives</span>
          </h2>
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            Production-ready automation systems deployed for clients across mortgage,
            logistics, food & beverage, and financial services industries.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#00ff88] text-[#0d0d0d]'
                  : 'bg-[#141414] text-gray-300/80 hover:text-white border border-[#2a2a2a] hover:border-[#00ff88]/25'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          {filteredProjects.map((project, index) => {
            const hasExpandedView = project.features && project.features.length > 0
            const electricClass = hasExpandedView
              ? project.iconColor === '#00ff88'
                ? 'electric-glow-green'
                : project.iconColor === '#ff6b35'
                ? 'electric-glow-orange'
                : 'electric-glow-cyan'
              : ''

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => hasExpandedView && handleProjectClick(project)}
                className={`group relative h-full bg-[#141414] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#00ff88]/25 transition-all card-hover flex flex-col ${electricClass}`}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-[#ff6b35]/20 border border-[#ff6b35]/50 rounded text-[#ff6b35] text-xs font-medium">
                    {hasExpandedView ? 'Interactive ⚡' : 'Featured'}
                  </div>
                )}

              {/* Image Area */}
              <div className="relative h-52 overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="project-image-placeholder w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                    <project.icon className="w-12 h-12 opacity-30" style={{ color: project.iconColor }} />
                    <span className="text-center text-xs">{project.imagePlaceholder}</span>
                  </div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                
                {/* Icon Badge */}
                <div 
                  className="absolute bottom-4 left-4 p-2 rounded-lg"
                  style={{ backgroundColor: `${project.iconColor}20`, border: `1px solid ${project.iconColor}40` }}
                >
                  <project.icon className="w-5 h-5" style={{ color: project.iconColor }} />
                </div>
              </div>

              {/* Content */}
              <div className="p-7 md:p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{project.subtitle}</p>
                <div className="mb-5">
                  <p className={`text-sm text-gray-400 leading-normal ${!expandedProjects.has(project.id) ? 'clamp-4' : ''}`}>
                    {project.description}
                  </p>
                  {project.description.length > 180 && (
                    <button
                      onClick={() => toggleExpanded(project.id)}
                      className="text-xs mt-2 font-medium transition-colors"
                      style={{ color: project.iconColor }}
                    >
                      {expandedProjects.has(project.id) ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>

                {/* Stats */}
                <div className="flex gap-5 mb-6">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-base font-bold mb-0.5" style={{ color: project.iconColor }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span 
                      key={tech}
                      className="px-2.5 py-1 text-xs bg-[#1a1a1a] text-gray-300 rounded border border-[#2a2a2a]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2.5 py-1 text-xs bg-[#1a1a1a] text-gray-500 rounded border border-[#2a2a2a]">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm text-[#00ff88] hover:underline"
                  >
                    Discuss this project <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )
        })}
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/ahmedali1199"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 border border-[#00ff88]/50 text-[#00ff88] rounded-lg hover:bg-[#00ff88]/10 transition-colors"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
          </a>
        </motion.div>
      </div>

      {/* Electric Spark Animation */}
      {showSpark && (
        <div
          className="spark-trail"
          style={{
            background: `radial-gradient(circle, ${sparkColor} 0%, transparent 70%)`,
            boxShadow: `0 0 60px ${sparkColor}, 0 0 100px ${sparkColor}40`
          }}
        />
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
