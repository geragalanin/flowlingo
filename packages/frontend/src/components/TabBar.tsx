import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, BookText, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'

type Tab = {
  to: string
  label: string
  icon: React.ReactNode
}

export function TabBar(): JSX.Element {
  const { pathname } = useLocation()

  const tabs: Tab[] = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/words', label: 'Words', icon: <BookText size={20} /> },
    { to: '/account', label: 'Account', icon: <UserRound size={20} /> }
  ]

  const containerVariants = {
    hidden: { y: 100 },
    visible: {
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 25
      }
    }
  }

  return (
    <motion.nav
      className="tabbar-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Shadow element that extends below screen */}
      <div className="tabbar-shadow" aria-hidden="true" />
      
      <div className="tabbar" aria-label="Bottom navigation">
        {tabs.map((t) => {
          const active = pathname === t.to
          return (
            <Link
              key={t.to}
              to={t.to}
              className="tab-btn-wrapper"
              aria-label={t.label}
            >
              <motion.div
                className={`tab-btn${active ? ' active' : ''}`}
                variants={itemVariants}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: active ? 1 : 1.05 }}
                animate={{
                  scale: active ? 1.08 : 1
                }}
                transition={{
                  type: 'spring' as const,
                  stiffness: 400,
                  damping: 20
                }}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                {t.icon}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
