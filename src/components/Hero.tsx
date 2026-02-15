import { motion } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import Scene3D from './Scene3D'

const stats = [
  { value: '15+', label: 'Production Systems' },
  { value: '95%', label: 'Accuracy Rate' },
  { value: '1000+', label: 'Automated Calls' },
  { value: '5★', label: 'Client Rating' },
]

export default function Hero() {
  return (
    <section id="home" className="section-anchor relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-20 z-0" />
      
      {/* Content */}
      <div className="relative z-20 section-shell py-32 md:py-36 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-10"
        >
          <span className="w-2 h-2 bg-[#00ff88] rounded-full pulse-glow" />
          <span className="text-[#00ff88] text-sm font-medium">Available for Projects</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="text-white">I'm </span>
          <span className="gradient-text text-glow-green">Ahmed Ali</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-7"
        >
          <span className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="font-medium text-gray-200">AI Automation Engineer</span>
            <span className="text-gray-600">•</span>
            <span className="font-medium text-gray-200">Voice Agent Architect</span>
            <span className="text-gray-600">•</span>
            <span className="font-medium text-gray-200">Workflow Designer</span>
          </span>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-gray-400 mb-10"
        >
          <MapPin className="w-4 h-4" />
          Rawalpindi, Pakistan
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Building intelligent automation systems that reduce operational costs by
          <span className="text-[#00ff88] font-semibold"> 95%</span>.
          Specializing in AI voice agents, enterprise workflow orchestration, and
          conversational AI platforms.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-5 mb-20"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-[#00ff88] text-[#0d0d0d] rounded-lg font-semibold hover:bg-[#00ff88]/90 transition-colors glow-green"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border border-[#ff6b35] text-[#ff6b35] rounded-lg font-semibold hover:bg-[#ff6b35]/10 transition-colors"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="p-7 md:p-8 rounded-2xl bg-[#141414]/70 border border-[#2a2a2a] hover:border-[#00ff88]/35 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text stat-value mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-[#00ff88]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
