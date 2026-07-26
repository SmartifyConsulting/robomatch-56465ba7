# Ink - Handwritten Messaging UI

> Every message written from the heart.

A premium, emotion-driven messaging application that brings back the feeling of receiving handwritten letters. This is not another WhatsApp clone—it's designed to make users slow down and enjoy conversations through beautiful, minimal, elegant design.

## Vision

Ink reimagines digital messaging by creating an intimate, nostalgic experience. Each user has their own handwriting style, and messages automatically appear in the sender's handwriting, transforming conversations into exchanges of handwritten letters on a desk.

### Design Philosophy

- **Minimal** - No visual clutter, every element has purpose
- **Elegant** - Premium quality, Apple-level refinement
- **Premium** - Warm, expensive feeling through generous whitespace and typography
- **Human** - Handwritten elements, emotional connection
- **Calm** - Soft animations, no urgency or productivity focus
- **Emotion over Productivity** - Designed for savoring conversations

## Project Structure

```
ink-messaging-ui/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── chat/            # Chat-specific components
│   │   ├── navigation/      # Navigation components
│   │   └── common/          # Shared components
│   ├── pages/               # Full-screen page components
│   ├── layouts/             # Layout wrappers
│   ├── styles/              # Global styles and animations
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── data/                # Mock/placeholder data
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # React entry point
│   └── index.css            # Tailwind and global styles
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3 with custom design system
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: Lucide React
- **UI Primitives**: Radix UI

## Getting Started

### Installation

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to start developing.

### Build

```bash
npm run build
```

## Design System

### Color Palette

| Purpose | Color | Value |
|---------|-------|-------|
| Primary | Ink Blue | #1E3A5F |
| Background | Off-white | #FAFAF8 |
| Text | Ink | #1A1A1A |
| Accent | Warm Beige | #D4C4B0 |

### Typography

- **Display**: Serif (Fraunces)
- **Body**: Sans-serif (Inter)
- **Handwriting**: Caveat, Indie Flower

### Spacing

8px base unit: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### Shadows

Soft, premium shadows for paper-like elevation effects.

## Screens

1. **Splash** - Animated branding
2. **Onboarding** - Feature introduction
3. **Create Handwriting** - User handwriting setup
4. **Handwriting Preview** - Pen color customization
5. **Home** - Conversation list as envelope stacks
6. **Chat** - Message thread with handwritten styling
7. **Profile** - User profile and handwriting showcase
8. **Settings** - User preferences
9. **Notifications** - Notification feed
10. **Friend Requests** - Friend management
11. **404** - Error page

## Features

- ✨ Smooth animations with Framer Motion
- 🌙 Dark mode support
- 📱 Mobile-responsive design
- ♿ Accessibility-first approach
- 🎨 Premium design system
- 🔤 Custom handwriting fonts
- 💬 Message styling like paper notes
- 🎯 Focus states on all interactive elements

## Accessibility

- WCAG AA compliant contrast ratios
- 44x44px minimum touch targets
- Focus states on all elements
- Semantic HTML
- ARIA labels
- Reduced motion support

## Development

```bash
# Start dev server
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

## Design Inspiration

- Apple ecosystem quality
- Notion's elegant design
- Arc Browser's modern aesthetic
- Linear's refined UI

## Future Roadmap

- Backend integration with Supabase
- Real-time messaging
- Voice messages
- Image sharing
- Typing indicators
- Message reactions
- Conversation search
- User authentication

---

**Built with ❤️ for emotional, handwritten messaging**
