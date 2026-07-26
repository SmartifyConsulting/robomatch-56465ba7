import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Mic, Camera, ChevronLeft, MoreVertical } from 'lucide-react'
import { useTextInput, useMessages } from '../hooks'
import { mockConversations, mockMessages } from '../data/mockData'

export default function Chat() {
  const navigate = useNavigate()
  const { conversationId } = useParams()
  const { text, setText, reset } = useTextInput()
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [localMessages, setLocalMessages] = useState(mockMessages)

  const conversation = mockConversations.find((c) => c.id === conversationId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [localMessages])

  const handleSend = async () => {
    if (!text.trim() || !conversation) return

    setIsSending(true)

    // Create a new message
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId: conversation.id,
      senderId: 'current-user',
      sender: {
        id: 'current-user',
        name: 'You',
        email: 'you@example.com',
        handwritingFont: {
          id: 'font-1',
          userId: 'current-user',
          fontFamily: 'Caveat',
          letterSpacing: 0,
          lineHeight: 1.5,
          slant: 0,
          size: 16,
          weight: 'regular' as const,
        },
        penColor: '#1E3A5F',
        memberSince: new Date(),
        writingStyle: 'casual' as const,
      },
      content: text,
      timestamp: new Date(),
      isRead: true,
      reactions: [],
      attachments: [],
      status: 'sent' as const,
    }

    setLocalMessages([...localMessages, newMessage])
    reset()
    setIsSending(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!conversation) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-off-white">
        <div className="text-center">
          <p className="text-charcoal mb-4">Conversation not found</p>
          <button
            onClick={() => navigate('/home')}
            className="btn btn-primary"
          >
            Back to Conversations
          </button>
        </div>
      </div>
    )
  }

  const conversationMessages = localMessages.filter(
    (m) => m.conversationId === conversationId
  )

  return (
    <div className="h-screen w-full flex flex-col bg-off-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-4 bg-white border-b border-cream-200 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="btn btn-icon btn-ghost"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-semibold text-ink">
              {conversation.customName || conversation.participants
                .map((p) => p.name)
                .join(', ')}
            </h2>
            <p className="text-xs text-charcoal">Active now</p>
          </div>
        </div>
        <button className="btn btn-icon btn-ghost">
          <MoreVertical className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {conversationMessages.map((message, index) => {
            const isFromMe = message.senderId === 'current-user'
            const sender = message.sender

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.05,
                }}
                className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
              >
                {/* Message bubble - styled as handwritten note */}
                <div
                  className={`max-w-xs lg:max-w-md relative ${isFromMe ? '' : 'flex gap-2'}`}
                >
                  {/* Avatar for received messages */}
                  {!isFromMe && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warm-beige to-cream-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                      <span className="text-xs font-bold text-charcoal">
                        {sender.name[0]}
                      </span>
                    </div>
                  )}

                  {/* Message card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className={`p-4 rounded-lg shadow-card transition-all duration-300 ${
                      isFromMe
                        ? 'bg-ink-blue-50 text-ink-blue-900 rounded-br-none'
                        : 'bg-white text-charcoal rounded-bl-none'
                    }`}
                  >
                    {/* Sender name for group chats */}
                    {!isFromMe && conversation.participants.length > 2 && (
                      <p className="text-xs font-semibold text-ink-blue-900 mb-1">
                        {sender.name}
                      </p>
                    )}

                    {/* Message content in their handwriting */}
                    <p
                      className={`font-handwriting text-lg leading-relaxed break-words ${
                        isFromMe ? 'text-ink-blue-900' : 'text-ink'
                      }`}
                      style={{ color: isFromMe ? '#1E3A5F' : sender.penColor || '#1A1A1A' }}
                    >
                      {message.content}
                    </p>

                    {/* Timestamp */}
                    <p
                      className={`text-xs mt-2 ${
                        isFromMe ? 'text-ink-blue-700/60' : 'text-charcoal/60'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </motion.div>

                  {/* Message tail for visual enhancement */}
                  {isFromMe && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-ink-blue-50 rounded-br-lg" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Typing indicator placeholder */}
        {isSending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end"
          >
            <div className="flex items-end gap-2 px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    className="w-2 h-2 rounded-full bg-ink-blue-500"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-cream-200 bg-white p-4"
      >
        <div className="flex items-end gap-2">
          {/* Action buttons */}
          <div className="flex gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-icon btn-ghost"
            >
              <Paperclip className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-icon btn-ghost"
            >
              <Camera className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-icon btn-ghost"
            >
              <Mic className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Input field */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write your message..."
            className="input flex-1 resize-none max-h-24 font-handwriting text-base"
            rows={1}
          />

          {/* Send button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!text.trim() || isSending}
            className={`btn btn-icon ${
              text.trim() && !isSending
                ? 'btn-primary hover:scale-110'
                : 'bg-cream-300 text-charcoal cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
