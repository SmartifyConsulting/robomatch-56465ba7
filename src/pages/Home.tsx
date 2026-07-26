import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Settings, Bell, Users, Archive } from 'lucide-react'
import { mockConversations } from '../data/mockData'

export default function Home() {
  const navigate = useNavigate()
  const [conversations, setConversations] = useState(mockConversations)
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all')

  const filteredConversations = activeTab === 'unread'
    ? conversations.filter((c) => c.unreadCount > 0)
    : conversations

  const handleConversationClick = (conversationId: string) => {
    navigate(`/chat/${conversationId}`)
  }

  const handleNewConversation = () => {
    navigate('/friend-requests')
  }

  return (
    <div className="h-screen w-full flex flex-col bg-off-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink">Ink</h1>
          <p className="text-sm text-charcoal font-handwriting">Your messages await...</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/notifications')}
            className="btn btn-icon btn-ghost relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-ink-blue-500 rounded-full" />
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="btn btn-icon btn-ghost"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="px-6 flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            activeTab === 'all'
              ? 'bg-ink-blue-900 text-white'
              : 'bg-cream-200 text-charcoal hover:bg-cream-300'
          }`}
        >
          All Messages
        </button>
        <button
          onClick={() => setActiveTab('unread')}
          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
            activeTab === 'unread'
              ? 'bg-ink-blue-900 text-white'
              : 'bg-cream-200 text-charcoal hover:bg-cream-300'
          }`}
        >
          Unread
          {conversations.some((c) => c.unreadCount > 0) && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {conversations.reduce((acc, c) => acc + c.unreadCount, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {filteredConversations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col items-center justify-center text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-cream-300 flex items-center justify-center mb-4">
              <Archive className="w-8 h-8 text-charcoal" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-ink mb-2">No messages yet</h2>
            <p className="text-charcoal mb-8">Start a conversation with someone special</p>
            <button
              onClick={handleNewConversation}
              className="btn btn-primary"
            >
              + New Conversation
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3 pb-6">
            {filteredConversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleConversationClick(conversation.id)}
                className="cursor-pointer"
              >
                {/* Envelope/Letter Stack Card */}
                <div
                  className={`relative card p-4 shadow-card hover:shadow-lg transition-all duration-300 ${
                    conversation.unreadCount > 0 ? 'ring-2 ring-ink-blue-400' : ''
                  }`}
                >
                  {/* Raised indicator for unread */}
                  {conversation.unreadCount > 0 && (
                    <motion.div
                      animate={{ y: -2 }}
                      className="absolute -inset-1 bg-white/50 rounded-lg blur"
                    />
                  )}

                  <div className="relative flex items-start justify-between gap-4">
                    {/* Conversation info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {/* Avatar stack */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ink-blue-400 to-ink-blue-600 flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-sm">
                            {conversation.participants[0]?.name?.[0] || 'U'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink truncate">
                            {conversation.customName || conversation.participants
                              .map((p) => p.name)
                              .join(', ')}
                          </h3>
                          {conversation.lastMessage && (
                            <p className="text-xs text-charcoal font-handwriting truncate">
                              {conversation.lastMessage.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Time and unread badge */}
                    <div className="text-right flex flex-col items-end">
                      <p className="text-xs text-charcoal">
                        {conversation.lastMessageAt
                          ? new Date(conversation.lastMessageAt).toLocaleDateString(
                              'en-US',
                              { month: 'short', day: 'numeric' }
                            )
                          : ''}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-1 inline-block w-6 h-6 rounded-full bg-ink-blue-900 text-white text-xs font-bold flex items-center justify-center"
                        >
                          {conversation.unreadCount}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* New conversation button (floating) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNewConversation}
        className="fixed bottom-8 right-8 btn btn-primary rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-200 px-6 py-3 flex justify-around items-center">
        <button className="btn btn-ghost btn-icon">
          <Users className="w-5 h-5" />
        </button>
        <button className="btn btn-ghost btn-icon">
          <Bell className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate('/profile/me')}
          className="btn btn-ghost btn-icon"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-ink-blue-400 to-ink-blue-600" />
        </button>
      </div>
    </div>
  )
}
