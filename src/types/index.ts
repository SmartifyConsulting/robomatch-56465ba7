/* User-related types */
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  handwritingFont: HandwritingStyle
  penColor: string
  signature?: string
  memberSince: Date
  writingStyle: 'casual' | 'formal' | 'playful'
  bio?: string
}

export interface HandwritingStyle {
  id: string
  userId: string
  fontFamily: string
  baseUrl?: string // URL to the generated font if applicable
  letterSpacing: number
  lineHeight: number
  slant: number
  size: number
  weight: 'light' | 'regular' | 'bold'
}

/* Conversation-related types */
export interface Conversation {
  id: string
  participants: User[]
  lastMessage?: Message
  lastMessageAt: Date
  createdAt: Date
  unreadCount: number
  isArchived: boolean
  isPinned: boolean
  customName?: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  sender: User
  content: string
  timestamp: Date
  isRead: boolean
  reactions: Reaction[]
  editedAt?: Date
  attachments: Attachment[]
  status: 'sending' | 'sent' | 'delivered' | 'read'
}

export interface Reaction {
  id: string
  messageId: string
  userId: string
  emoji: string
  createdAt: Date
}

export interface Attachment {
  id: string
  messageId: string
  type: 'image' | 'voice' | 'document'
  url: string
  name: string
  size: number
  mimeType: string
}

/* Notification types */
export interface Notification {
  id: string
  userId: string
  type: 'message' | 'friend-request' | 'friend-accepted' | 'typing'
  title: string
  description?: string
  relatedUserId?: string
  relatedConversationId?: string
  isRead: boolean
  createdAt: Date
}

/* Friend request types */
export interface FriendRequest {
  id: string
  senderId: string
  sender: User
  recipientId: string
  status: 'pending' | 'accepted' | 'declined'
  createdAt: Date
  respondedAt?: Date
}

/* Settings types */
export interface UserSettings {
  userId: string
  theme: 'light' | 'dark' | 'system'
  notificationsEnabled: boolean
  soundEnabled: boolean
  privacyLevel: 'public' | 'friends' | 'private'
  showOnlineStatus: boolean
  allowReadReceipts: boolean
}

/* Pagination types */
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

/* Component prop types */
export interface OnboardingStep {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  actionLabel: string
}

/* Typing indicator state */
export interface TypingIndicator {
  conversationId: string
  userId: string
  isTyping: boolean
}
