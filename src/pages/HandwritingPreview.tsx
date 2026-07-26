import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Edit2, Palette } from 'lucide-react'

const penColors = [
  { name: 'Classic Black', color: '#1A1A1A' },
  { name: 'Ink Blue', color: '#1E3A5F' },
  { name: 'Charcoal', color: '#2D2D2D' },
  { name: 'Navy', color: '#0F1F3C' },
  { name: 'Brown', color: '#6B4423' },
  { name: 'Deep Purple', color: '#4A1E4E' },
]

export default function HandwritingPreview() {
  const navigate = useNavigate()
  const [selectedColor, setSelectedColor] = useState(0)
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      navigate('/home')
    }, 800)
  }

  const handleEdit = () => {
    navigate('/create-handwriting')
  }

  const color = penColors[selectedColor]

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-cream-50 to-off-white px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-serif font-bold text-ink mb-2">Your Handwriting</h1>
        <p className="text-charcoal">This is how your messages will appear</p>
      </motion.div>

      {/* Preview area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 w-full max-w-2xl mx-auto flex flex-col items-center justify-center mb-12"
      >
        {/* Preview card */}
        <div className="w-full card rounded-2xl p-12 shadow-xl mb-8 text-center">
          <p
            className="text-5xl leading-relaxed mb-6 font-handwriting"
            style={{ color: color.color }}
          >
            The quick brown fox jumps over the lazy dog
          </p>
          <p
            className="text-4xl font-handwriting"
            style={{ color: color.color }}
          >
            1234567890 !@#$%^&*
          </p>
        </div>

        {/* Pen color selector */}
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-ink-blue-900" />
            <h3 className="font-semibold text-ink">Pen Color</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {penColors.map((pc, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedColor(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 card text-center cursor-pointer transition-all ${
                  selectedColor === index ? 'ring-2 ring-ink-blue-900' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-6 h-6 rounded-full shadow-sm"
                    style={{ backgroundColor: pc.color }}
                  />
                  <span className="text-sm font-medium text-charcoal">{pc.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md mx-auto flex gap-3 pb-8"
      >
        <button
          onClick={handleEdit}
          className="flex-1 btn btn-secondary flex items-center justify-center gap-2"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={handleConfirm}
          disabled={isConfirming}
          className="flex-1 btn btn-primary flex items-center justify-center gap-2 relative overflow-hidden"
        >
          {isConfirming ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <Check className="w-5 h-5" />
            </motion.div>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Confirm
            </>
          )}
        </button>
      </motion.div>
    </div>
  )
}
