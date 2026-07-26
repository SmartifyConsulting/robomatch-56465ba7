import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, UserPlus, Check, X } from 'lucide-react'

interface FriendRequest {
  id: string
  name: string
  email: string
  avatar: string
  mutualFriends?: number
}

const mockRequests: FriendRequest[] = [
  {
    id: '1',
    name: 'James Wilson',
    email: 'james@example.com',
    avatar: 'J',
    mutualFriends: 3,
  },
  {
    id: '2',
    name: 'Alex Martinez',
    email: 'alex@example.com',
    avatar: 'A',
    mutualFriends: 1,
  },
  {
    id: '3',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    avatar: 'L',
  },
]

const suggestedUsers: FriendRequest[] = [
  {
    id: '4',
    name: 'Rachel Green',
    email: 'rachel@example.com',
    avatar: 'R',
    mutualFriends: 5,
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    avatar: 'M',
    mutualFriends: 2,
  },
]

export default function FriendRequests() {
  const navigate = useNavigate()
  const [requests, setRequests] = useState(mockRequests)
  const [suggested, setSuggested] = useState(suggestedUsers)

  const handleAccept = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id))
  }

  const handleDecline = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id))
  }

  const handleAddFriend = (id: string) => {
    setSuggested(suggested.filter((u) => u.id !== id))
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
        <h1 className="text-2xl font-serif font-bold text-ink">Friends</h1>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 max-w-2xl mx-auto w-full space-y-8 overflow-y-auto pb-8">
        {/* Pending requests */}
        {requests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-4">
              Friend Requests ({requests.length})
            </h2>
            <div className="space-y-3">
              {requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-4 flex items-start gap-4"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-warm-beige to-cream-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-charcoal font-bold text-lg">{request.avatar}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-ink">{request.name}</h3>
                    <p className="text-sm text-charcoal truncate">{request.email}</p>
                    {request.mutualFriends && (
                      <p className="text-xs text-muted mt-1">
                        {request.mutualFriends} mutual friend{request.mutualFriends > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAccept(request.id)}
                      className="btn btn-icon btn-primary"
                    >
                      <Check className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDecline(request.id)}
                      className="btn btn-icon btn-secondary"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Suggested friends */}
        {suggested.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-4">
              Suggested Friends
            </h2>
            <div className="space-y-3">
              {suggested.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="card p-4 flex items-start gap-4"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ink-blue-400 to-ink-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white font-bold text-lg">{user.avatar}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-ink">{user.name}</h3>
                    <p className="text-sm text-charcoal truncate">{user.email}</p>
                    {user.mutualFriends && (
                      <p className="text-xs text-muted mt-1">
                        {user.mutualFriends} mutual friend{user.mutualFriends > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  {/* Action */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddFriend(user.id)}
                    className="btn btn-icon btn-primary flex-shrink-0"
                  >
                    <UserPlus className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {requests.length === 0 && suggested.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-cream-300 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-charcoal" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-ink mb-2">All set!</h2>
            <p className="text-charcoal">No pending requests or suggestions</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
