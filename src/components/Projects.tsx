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
    image: '/images/FDSS-Website.png',
    images: [
      '/images/FDSS-Website.png',
      '/images/FDSS-n8n workflow.png',
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
    id: 'immigration-finder',
    title: 'Immigration Finder AI',
    subtitle: 'GHL + n8n Lead Intake Pipeline',
    description: 'End-to-end immigration lead qualification system combining GoHighLevel CRM with an n8n AI pipeline. Intake forms feed into an automated assessment that classifies visa pathways, scores lead eligibility, and routes qualified prospects to the right attorney workflow.',
    tech: ['GoHighLevel', 'n8n', 'AI Pipeline', 'CRM Automation'],
    icon: Workflow,
    iconColor: '#00d9ff',
    category: 'automation',
    stats: [
      { label: 'Lead Routes', value: 'Auto' },
      { label: 'Pipeline', value: 'AI' },
      { label: 'CRM', value: 'GHL' }
    ],
    image: '/images/ImmigrationFinder-System Overview.png',
    images: [
      '/images/ImmigrationFinder-System Overview.png',
      '/images/ImmigrationFinder-Lead Intake Form.png',
      '/images/ImmigrationFinder-AI Pipeline GHL.png',
    ],
    imagePlaceholder: 'Immigration Finder System Overview',
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
    image: '/images/Financial analysis n8n complete workflow.png',
    images: [
      '/images/Financial analysis n8n complete workflow.png',
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showSpark, setShowSpark] = useState(false)
  const [sparkColor, setSparkColor] = useState('#00ff88')

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const handleProjectClick = (project: Project) => {
    if (project.features && project.features.length > 0) {
      setSparkColor(project.iconColor)
      setShowSpark(true)
      setTimeout(() => {
        setSelectedProject(project)
        setShowSpark(false)
      }, 800)
    }
  }

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
    <section id="projects" className="section-anchor relative py-32 md:py-48 bg-[#0a0a0a]">
      {/* Background Elements */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.08]" />

      <div className="relative section-shell">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
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
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 md:mb-24"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#00ff88] text-[#0d0d0d]'
                  : 'bg-[#141414] text-gray-300/80 hover:text-white border border-[#2a2a2a] hover:border-[#00ff88]/25'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col gap-8 md:gap-0">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const hasExpandedView = project.features && project.features.length > 0;
              
              // Calculate dynamic top position for the sticky effect
              // This ensures cards stack nicely on top of each other
              const stickyTop = `calc(15vh + ${index * 30}px)`;

              return (
                <motion.div
                  key={project.id}
                  layoutId={`project-${project.id}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="md:sticky w-full"
                  style={{ top: stickyTop, zIndex: index }}
                >
                  <div 
                    className="w-full bg-[#141414] rounded-2xl md:rounded-3xl overflow-hidden border border-[#2a2a2a] shadow-2xl flex flex-col md:flex-row group transition-colors duration-500 hover:border-white/20"
                    style={{ 
                      boxShadow: `0 -10px 40px -20px ${project.iconColor}20`,
                      // Slight scale down for cards underneath to create depth
                      transform: `scale(${1 - (filteredProjects.length - 1 - index) * 0.02})`,
                      transformOrigin: 'top center'
                    }}
                  >
                    {/* Image Section (Top on mobile, Left on desktop) */}
                    <div className="w-full md:w-5/12 h-64 md:h-auto relative overflow-hidden shrink-0 bg-[#0a0a0a]">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
                          <project.icon className="w-16 h-16 opacity-20" style={{ color: project.iconColor }} />
                          <span className="text-center text-sm text-gray-500">{project.imagePlaceholder}</span>
                        </div>
                      )}
                      
                      {/* Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#141414]" />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 px-3 py-1.5 bg-[#ff6b35]/20 border border-[#ff6b35]/50 rounded-md text-[#ff6b35] text-xs font-bold tracking-wide uppercase backdrop-blur-md">
                          {hasExpandedView ? 'Interactive ⚡' : 'Featured'}
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-10 flex-1 flex flex-col justify-center relative">
                      {/* Large Background Icon */}
                      <project.icon 
                        className="absolute right-10 bottom-10 w-48 h-48 opacity-[0.03] pointer-events-none transform -rotate-12" 
                        style={{ color: project.iconColor }} 
                      />

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="p-2.5 rounded-xl backdrop-blur-sm"
                            style={{ backgroundColor: `${project.iconColor}15`, border: `1px solid ${project.iconColor}30` }}
                          >
                            <project.icon className="w-5 h-5" style={{ color: project.iconColor }} />
                          </div>
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                            {project.category.replace('-', ' ')}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-base md:text-lg text-gray-400 mb-6 font-medium">{project.subtitle}</p>
                        
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8 max-w-2xl">
                          {project.description}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {project.stats.map((stat) => (
                            <div key={stat.label} className="bg-[#0a0a0a] rounded-xl p-3 md:p-4 border border-[#2a2a2a]">
                              <div className="text-lg md:text-xl font-bold mb-1" style={{ color: project.iconColor }}>
                                {stat.value}
                              </div>
                              <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-medium">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-auto pt-6 border-t border-[#2a2a2a]">
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 4).map((tech) => (
                              <span 
                                key={tech}
                                className="px-2.5 py-1 text-xs bg-[#1a1a1a] text-gray-300 rounded-md border border-[#2a2a2a]"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 4 && (
                              <span className="px-2.5 py-1 text-xs bg-[#1a1a1a] text-gray-500 rounded-md border border-[#2a2a2a]">
                                +{project.tech.length - 4}
                              </span>
                            )}
                          </div>

                          {/* Action Button */}
                          {hasExpandedView && (
                            <button
                              onClick={() => handleProjectClick(project)}
                              className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full md:w-auto shrink-0"
                              style={{ 
                                backgroundColor: `${project.iconColor}15`,
                                color: project.iconColor,
                                border: `1px solid ${project.iconColor}30`
                              }}
                            >
                              <span>Initialize Briefing</span>
                              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-24 md:mt-32"
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
