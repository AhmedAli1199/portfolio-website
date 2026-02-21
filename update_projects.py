import re

with open('src/components/Projects.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start of categories
start_idx = content.find('const categories = [')

new_content = content[:start_idx] + '''const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'voice-ai', label: 'Voice AI' },
  { id: 'automation', label: 'Automation' },
  { id: 'data-pipeline', label: 'Data Pipelines' },
  { id: 'ai-tool', label: 'AI Tools' },
]

const nodePositions = [
  { x: 1000, y: 600 }, // 0: Center
  { x: 1400, y: 400 }, // 1: TR
  { x: 600, y: 400 },  // 2: TL
  { x: 1300, y: 900 }, // 3: BR
  { x: 700, y: 900 },  // 4: BL
  { x: 1700, y: 700 }, // 5: FR
  { x: 300, y: 700 },  // 6: FL
  { x: 1000, y: 200 }, // 7: TC
]

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 5], [3, 5],
  [2, 6], [4, 6],
  [1, 7], [2, 7],
  [1, 3], [2, 4]
]

export default function Projects() {
  const ref = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
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

        {/* Star Map Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          ref={containerRef}
          className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] cursor-grab active:cursor-grabbing shadow-2xl"
        >
          {/* Inner Draggable Area */}
          <motion.div 
            drag 
            dragConstraints={containerRef}
            dragElastic={0.1}
            initial={{ x: -400, y: -250 }}
            className="absolute w-[2000px] h-[1200px]"
          >
            {/* Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map(([startIdx, endIdx], i) => {
                const start = filteredProjects[startIdx] ? nodePositions[startIdx] : null;
                const end = filteredProjects[endIdx] ? nodePositions[endIdx] : null;
                if (!start || !end) return null;
                
                const startColor = filteredProjects[startIdx].iconColor;
                const endColor = filteredProjects[endIdx].iconColor;

                return (
                  <g key={i}>
                    <defs>
                      <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={startColor} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={endColor} stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                    <motion.line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke={`url(#grad-${i})`}
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                    />
                  </g>
                )
              })}
            </svg>

            {/* Nodes */}
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                const pos = nodePositions[index];
                if (!pos) return null;
                
                const isHovered = hoveredProject === project.id;
                const hasExpandedView = project.features && project.features.length > 0;

                return (
                  <motion.div
                    key={project.id}
                    layoutId={`project-${project.id}`}
                    className="absolute"
                    style={{ left: pos.x, top: pos.y }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.1 }}
                  >
                    {/* Node Core */}
                    <div 
                      className="relative w-8 h-8 -ml-4 -mt-4 rounded-full cursor-pointer z-20 flex items-center justify-center group"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => hasExpandedView && handleProjectClick(project)}
                    >
                      {/* Outer Glow */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                        style={{ backgroundColor: project.iconColor, filter: 'blur(10px)' }}
                      />
                      {/* Inner Core */}
                      <div 
                        className="w-3 h-3 rounded-full relative z-10"
                        style={{ backgroundColor: project.iconColor, boxShadow: `0 0 15px ${project.iconColor}` }}
                      />
                      {/* Ping Animation */}
                      <div 
                        className="absolute inset-0 rounded-full animate-ping opacity-40"
                        style={{ backgroundColor: project.iconColor, animationDuration: '3s' }}
                      />
                    </div>

                    {/* Node Label (Always visible) */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-mono text-white/70 pointer-events-none">
                      {project.title}
                    </div>

                    {/* Hover Card */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#2a2a2a] rounded-xl overflow-hidden z-50 shadow-2xl pointer-events-none"
                          style={{ boxShadow: `0 20px 40px -10px ${project.iconColor}30` }}
                        >
                          <div className="h-1 w-full" style={{ backgroundColor: project.iconColor }} />
                          
                          {project.image && (
                            <div className="h-28 w-full overflow-hidden relative">
                              <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-70" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                            </div>
                          )}

                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <project.icon className="w-4 h-4" style={{ color: project.iconColor }} />
                              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{project.category}</span>
                            </div>
                            <h4 className="text-base font-bold text-white mb-1">{project.title}</h4>
                            <p className="text-xs text-gray-400 line-clamp-2 mb-3">{project.description}</p>
                            
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {project.tech.slice(0, 3).map(t => (
                                <span key={t} className="text-[9px] px-1.5 py-0.5 bg-white/5 rounded text-gray-300 border border-white/10">
                                  {t}
                                </span>
                              ))}
                            </div>

                            {hasExpandedView && (
                              <div className="text-xs font-medium flex items-center gap-1 mt-2" style={{ color: project.iconColor }}>
                                <span>Initialize Briefing</span>
                                <ChevronRight className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* UI Overlay */}
          <div className="absolute bottom-6 left-6 pointer-events-none z-30">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <MousePointerClick className="w-4 h-4 text-[#00ff88]" />
              <span>Drag to explore • Hover/Click nodes for details</span>
            </div>
          </div>
        </motion.div>

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
'''

with open('src/components/Projects.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated Projects.tsx")
