import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, MessageSquare, UserPlus, CheckCircle, Trash2 } from 'lucide-react'

interface Notification {
  id: string
  type: 'message' | 'friend-request' | 'friend-accepted'
  title: string
  description: string
  timestamp: Date
  isRead: boolean
  avatar?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'Sarah Anderson',
    description: 'You have a new message: "Beautiful weather today..."',
    timestamp: new Date(Date.now() - 5 * 60000),
    isRead: false,
    avatar: 'S',
  },
  {
    id: '2',
    type: 'friend-request',
    title: 'James Wilson',
    description: 'Sent you a friend request',
    timestamp: new Date(Date.now() - 30 * 60000),
    isRead: false,
    avatar: 'J',
  },
  {
    id: '3',
    type: 'friend-accepted',
    title: 'Emily Chen',
    description: 'Accepted your friend request',
    timestamp: new Date(Date.now() - 2 * 3600000),
    isRead: true,
    avatar: 'E',
  },
]

export default function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageSquare
      case 'friend-request':
        return UserPlus
      case 'friend-accepted':
        return CheckCircle
      default:
        return MessageSquare
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-off-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-icon btn-ghost"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-serif font-bold text-ink">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-ink-blue-900">
                {unreadCount} new notification{unreadCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 max-w-2xl mx-auto w-full">
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-cream-300 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-charcoal" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-ink mb-2">All caught up!</h2>
            <p className="text-charcoal">No new notifications</p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification, index) => {
              const Icon = getIcon(notification.type)
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card p-4 flex items-start gap-4 hover:shadow-md transition-all cursor-pointer ${
                    !notification.isRead ? 'ring-2 ring-ink-blue-400' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ink-blue-400 to-ink-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white font-bold text-sm">
                      {notification.avatar}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-ink">{notification.title}</h3>
                    <p className="text-sm text-charcoal truncate">{notification.description}</p>
                    <p className="text-xs text-muted mt-1">{formatTime(notification.timestamp)}</p>
                  </div>

                  {/* Actions */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(notification.id)}
                    className="btn btn-icon btn-ghost flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
