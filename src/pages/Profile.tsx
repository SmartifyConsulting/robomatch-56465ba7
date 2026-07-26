import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Edit2, Copy, Calendar } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()

  const user = {
    id: 'user-1',
    name: 'Sarah Anderson',
    email: 'sarah@example.com',
    penColor: '#1E3A5F',
    memberSince: new Date('2024-01-15'),
    writingStyle: 'elegant',
    bio: 'Coffee lover & handwriting enthusiast ✨',
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-off-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-4 flex items-center gap-3"
      >
        <button
          onClick={() => navigate(-1)}
          className="btn btn-icon btn-ghost"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-serif font-bold text-ink">Profile</h1>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full space-y-8">
        {/* Avatar section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-ink-blue-500 to-ink-blue-900 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl font-bold text-white">{user.name[0]}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-ink mb-1">{user.name}</h2>
          <p className="text-charcoal mb-4">{user.email}</p>
          <p className="text-lg font-handwriting text-ink-blue-900">{user.bio}</p>
        </motion.div>

        {/* Handwriting sample */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-8 rounded-2xl"
        >
          <h3 className="font-semibold text-ink mb-4">Your Handwriting</h3>
          <div className="p-6 bg-white rounded-lg border border-cream-300 text-center">
            <p
              className="text-4xl font-handwriting leading-relaxed"
              style={{ color: user.penColor }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <button className="mt-4 btn btn-secondary w-full">
            Edit Handwriting
          </button>
        </motion.div>

        {/* Profile info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {/* Pen color */}
          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-charcoal">Favorite Pen Color</p>
              <p className="font-medium text-ink">Ink Blue</p>
            </div>
            <div
              className="w-8 h-8 rounded-full shadow-md"
              style={{ backgroundColor: user.penColor }}
            />
          </div>

          {/* Writing style */}
          <div className="card p-4">
            <p className="text-sm text-charcoal">Writing Style</p>
            <p className="font-medium text-ink capitalize">{user.writingStyle}</p>
          </div>

          {/* Member since */}
          <div className="card p-4 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-ink-blue-900" />
            <div>
              <p className="text-sm text-charcoal">Member Since</p>
              <p className="font-medium text-ink">{formatDate(user.memberSince)}</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 pt-4"
        >
          <button className="w-full btn btn-primary flex items-center justify-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
          <button className="w-full btn btn-secondary flex items-center justify-center gap-2">
            <Copy className="w-4 h-4" />
            Share Profile
          </button>
        </motion.div>
      </div>
    </div>
  )
}
