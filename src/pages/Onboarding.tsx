import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Pen, MessageSquare, Users } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Welcome to Ink',
    description: 'Experience messaging like receiving handwritten letters.',
    icon: Pen,
    color: 'from-ink-blue-500 to-ink-blue-700',
  },
  {
    id: 2,
    title: 'Your Handwriting',
    description: 'Create your unique handwriting that appears in every message.',
    icon: MessageSquare,
    color: 'from-warm-beige to-cream-400',
  },
  {
    id: 3,
    title: 'Connect & Share',
    description: 'Exchange beautiful handwritten messages with friends.',
    icon: Users,
    color: 'from-ink-blue-400 to-ink-blue-600',
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/create-handwriting')
    }
  }

  const handleSkip = () => {
    navigate('/home')
  }

  const step = steps[currentStep]
  const Icon = step.icon

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-off-white px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 w-full flex justify-between items-center px-6"
      >
        <h2 className="text-2xl font-serif font-bold text-ink">Ink</h2>
        <button
          onClick={handleSkip}
          className="text-charcoal hover:text-ink-blue-900 font-medium transition-colors"
        >
          Skip
        </button>
      </motion.div>

      {/* Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <div className={`w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-serif font-bold text-ink mb-4">{step.title}</h1>

        {/* Description */}
        <p className="text-lg text-charcoal mb-8 leading-relaxed">{step.description}</p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-12">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                scale: index === currentStep ? 1.2 : 1,
                backgroundColor: index === currentStep ? '#1E3A5F' : '#E9E6DA',
              }}
              className="w-2 h-2 rounded-full transition-all"
            />
          ))}
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md space-y-3 absolute bottom-8"
      >
        <button
          onClick={handleNext}
          className="w-full btn btn-primary flex items-center justify-center gap-2"
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}
