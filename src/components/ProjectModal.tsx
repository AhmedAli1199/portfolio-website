import { motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  detailedDescription?: string
  tech: string[]
  icon: any
  iconColor: string
  stats: { label: string; value: string }[]
  images?: string[]
  features?: string[]
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasMultipleImages = project.images && project.images.length > 1

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0f0f0f] rounded-2xl border-2 shadow-2xl"
        style={{ borderColor: project.iconColor }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 p-3 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-white/50 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="p-8 md:p-12">
          <div className="flex items-start gap-4 mb-6">
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: `${project.iconColor}20`,
                border: `2px solid ${project.iconColor}60`
              }}
            >
              <project.icon className="w-8 h-8" style={{ color: project.iconColor }} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-lg text-gray-400">{project.subtitle}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            {project.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: project.iconColor }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Images Carousel */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <div className="relative rounded-xl overflow-hidden border border-[#2a2a2a]">
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto max-h-[500px] object-contain bg-[#141414]"
                />

                {/* Image Navigation */}
                {hasMultipleImages && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className="w-3 h-3 rounded-full transition-all"
                        style={{
                          backgroundColor: currentImageIndex === index ? project.iconColor : '#2a2a2a'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Arrow Navigation */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : project.images!.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev < project.images!.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
            <p className="text-gray-400 leading-relaxed">
              {project.detailedDescription || project.description}
            </p>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Key Features & Highlights</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-[#141414] rounded-lg border border-[#2a2a2a]"
                  >
                    <div
                      className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: project.iconColor }}
                    />
                    <p className="text-sm text-gray-300 leading-relaxed">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm bg-[#141414] text-gray-300 rounded-lg border border-[#2a2a2a] hover:border-opacity-50 transition-colors"
                  style={{ borderColor: `${project.iconColor}40` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-6 border-t border-[#2a2a2a]">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: `${project.iconColor}20`,
                color: project.iconColor,
                border: `2px solid ${project.iconColor}`
              }}
            >
              <ExternalLink className="w-5 h-5" />
              Discuss This Project
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
