import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Moon, Bell, Lock, Info, LogOut } from 'lucide-react'
import { useTheme, useUserPreferences } from '../hooks'

export default function Settings() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { preferences, updatePreference } = useUserPreferences()

  const sections = [
    {
      title: 'Display',
      items: [
        {
          label: 'Dark Mode',
          icon: Moon,
          type: 'toggle',
          value: theme === 'dark',
          onChange: toggleTheme,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          label: 'Enable Notifications',
          type: 'toggle',
          value: preferences.notificationsEnabled,
          onChange: () =>
            updatePreference('notificationsEnabled', !preferences.notificationsEnabled),
        },
        {
          label: 'Sound',
          type: 'toggle',
          value: preferences.soundEnabled,
          onChange: () => updatePreference('soundEnabled', !preferences.soundEnabled),
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
        {
          label: 'Show Online Status',
          type: 'toggle',
          value: preferences.showOnlineStatus,
          onChange: () =>
            updatePreference('showOnlineStatus', !preferences.showOnlineStatus),
        },
        {
          label: 'Allow Read Receipts',
          type: 'toggle',
          value: preferences.allowReadReceipts,
          onChange: () =>
            updatePreference('allowReadReceipts', !preferences.allowReadReceipts),
        },
      ],
    },
  ]

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
        <h1 className="text-2xl font-serif font-bold text-ink">Settings</h1>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 max-w-2xl mx-auto w-full space-y-8">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-3">
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon || null
                return (
                  <div key={itemIndex} className="card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {Icon && <Icon className="w-5 h-5 text-ink-blue-900" />}
                      <label className="font-medium text-ink cursor-pointer">
                        {item.label}
                      </label>
                    </div>
                    {item.type === 'toggle' && (
                      <motion.button
                        onClick={item.onChange}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.value ? 'bg-ink-blue-900' : 'bg-cream-300'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.span
                          initial={false}
                          animate={{
                            x: item.value ? 24 : 4,
                          }}
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                          className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
                        />
                      </motion.button>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-3">
            About
          </h2>
          <div className="space-y-2">
            <div className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-ink-blue-900" />
                <div>
                  <p className="font-medium text-ink">Version</p>
                  <p className="text-sm text-charcoal">1.0.0</p>
                </div>
              </div>
            </div>
            <button className="card p-4 w-full text-left hover:bg-cream-100 transition-colors flex items-center gap-3">
              <Info className="w-5 h-5 text-ink-blue-900" />
              <div>
                <p className="font-medium text-ink">Privacy Policy</p>
              </div>
            </button>
            <button className="card p-4 w-full text-left hover:bg-cream-100 transition-colors flex items-center gap-3">
              <Info className="w-5 h-5 text-ink-blue-900" />
              <div>
                <p className="font-medium text-ink">Terms of Service</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full btn btn-secondary flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 mt-8"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </div>
    </div>
  )
}
