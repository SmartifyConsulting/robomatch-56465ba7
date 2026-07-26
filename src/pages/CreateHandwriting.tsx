import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Upload, Pen } from 'lucide-react'

const writingSteps = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789',
  "!@#$%^&*()_+-=[]{}';:,.<>?/",
]

export default function CreateHandwriting() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedMethod, setSelectedMethod] = useState<'draw' | 'upload' | null>(null)
  const [progress, setProgress] = useState(0)

  const handleMethodSelect = (method: 'draw' | 'upload') => {
    setSelectedMethod(method)
  }

  const handleNext = () => {
    if (currentStep < writingSteps.length - 1) {
      setProgress(((currentStep + 1) / writingSteps.length) * 100)
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/handwriting-preview')
    }
  }

  const handleSkip = () => {
    navigate('/home')
  }

  if (!selectedMethod) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-off-white px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center mb-12"
        >
          <h1 className="text-4xl font-serif font-bold text-ink mb-4">Create Your Handwriting</h1>
          <p className="text-lg text-charcoal">Choose how you'd like to capture your unique handwriting style.</p>
        </motion.div>

        <div className="w-full max-w-md grid grid-cols-1 gap-4">
          {/* Draw option */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => handleMethodSelect('draw')}
            className="p-8 card hover:shadow-lg transition-all duration-300 text-center group cursor-pointer"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-ink-blue-500 to-ink-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Pen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-ink mb-2">Draw Your Handwriting</h3>
            <p className="text-sm text-charcoal">Write on your screen to capture your natural handwriting.</p>
          </motion.button>

          {/* Upload option */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => handleMethodSelect('upload')}
            className="p-8 card hover:shadow-lg transition-all duration-300 text-center group cursor-pointer"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-warm-beige to-cream-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-ink mb-2">Upload Sample</h3>
            <p className="text-sm text-charcoal">Upload a photo of your handwriting to analyze.</p>
          </motion.button>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleSkip}
          className="mt-12 text-charcoal hover:text-ink-blue-900 font-medium transition-colors"
        >
          Skip for now
        </motion.button>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-off-white px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl font-serif font-bold text-ink mb-2">Write These Characters</h1>
        <p className="text-charcoal">Step {currentStep + 1} of {writingSteps.length}</p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-md mx-auto mb-12 h-1 bg-cream-300 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-ink-blue-500 to-ink-blue-700"
        />
      </div>

      {/* Writing area */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 max-w-2xl w-full mx-auto flex flex-col items-center justify-center"
      >
        {/* Characters to write */}
        <div className="mb-12 p-8 card rounded-2xl w-full text-center">
          <p className="text-6xl font-handwriting text-ink-blue-900 tracking-widest break-all">
            {writingSteps[currentStep]}
          </p>
        </div>

        {/* Canvas or upload area */}
        <div className="w-full aspect-video max-w-lg bg-white border-2 border-dashed border-cream-400 rounded-lg flex items-center justify-center text-center mb-8">
          <div>
            <Pen className="w-8 h-8 text-muted mx-auto mb-2 opacity-50" />
            <p className="text-charcoal font-medium">
              {selectedMethod === 'draw' ? 'Draw here' : 'Upload image'}
            </p>
            <p className="text-sm text-muted">
              {selectedMethod === 'draw'
                ? 'Use your mouse or touch to write'
                : 'Click to select a file'}
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-8">
          <p className="text-sm text-charcoal leading-relaxed">
            {selectedMethod === 'draw'
              ? 'Write naturally. This helps create a font that matches your unique style.'
              : 'Take a clear photo of your handwriting and upload it here.'}
          </p>
        </div>
      </motion.div>

      {/* Bottom buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md mx-auto flex gap-3 pb-8"
      >
        <button
          onClick={handleSkip}
          className="flex-1 btn btn-secondary"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="flex-1 btn btn-primary flex items-center justify-center gap-2"
        >
          {currentStep === writingSteps.length - 1 ? 'Continue' : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}
