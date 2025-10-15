import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Words.css'

type Word = {
  id: string
  text: string
  translation: string
  repetitions: number
  status: 'new' | 'studying' | 'learned'
}

const INITIAL_WORDS: Word[] = [
  // New
  { id: 'w1', text: 'Head', translation: 'hode', repetitions: 0, status: 'new' },
  { id: 'w2', text: 'Week', translation: 'uke', repetitions: 0, status: 'new' },
  { id: 'w3', text: 'Today', translation: 'i dag', repetitions: 0, status: 'new' },

  // Studying
  { id: 'w4', text: 'Stomach', translation: 'mage', repetitions: 2, status: 'studying' },
  { id: 'w5', text: 'Police Officer', translation: 'politibetjent', repetitions: 1, status: 'studying' },
  { id: 'w6', text: 'Chicken', translation: 'kylling', repetitions: 3, status: 'studying' },

  // Learned
  { id: 'w7', text: 'Engineer', translation: 'ingeniør', repetitions: 5, status: 'learned' },
  { id: 'w8', text: 'Beef', translation: 'storfe', repetitions: 4, status: 'learned' },

  { id: 'w9', text: 'Year', translation: 'år', repetitions: 0, status: 'new' },
  { id: 'w10', text: 'March', translation: 'mars', repetitions: 2, status: 'studying' },
  { id: 'w11', text: 'Eight', translation: 'åtte', repetitions: 4, status: 'learned' },
  { id: 'w12', text: 'Coffee', translation: 'kaffe', repetitions: 1, status: 'studying' },
  { id: 'w13', text: 'Story', translation: 'historie', repetitions: 0, status: 'new' },
  { id: 'w14', text: 'Mistake', translation: 'feil', repetitions: 3, status: 'studying' },
]

// Simple rectangular items; no polygon shapes

export function Words(): JSX.Element {
  const [words, setWords] = useState<Word[]>(INITIAL_WORDS)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activePulse, setActivePulse] = useState<{ id: string; color: 'success' | 'danger' } | null>(null)

  const { newWords, studyingWords, learnedWords } = useMemo(() => {
    const nw = words.filter(w => w.status === 'new')
    const st = words.filter(w => w.status === 'studying')
    const ld = words.filter(w => w.status === 'learned')
    return { newWords: nw, studyingWords: st, learnedWords: ld }
  }, [words])

  const onWordTap = (id: string) => {
    const tapped = words.find(w => w.id === id)
    if (!tapped) return
    // increment repetitions always
    setWords(prev => prev.map(w => w.id === id ? { ...w, repetitions: w.repetitions + 1 } : w))

    if (tapped.status === 'studying') {
      setActivePulse({ id, color: 'success' })
      setWords(prev => prev.map(w => w.id === id ? { ...w, status: 'learned' } : w))
    } else if (tapped.status === 'learned') {
      setActivePulse({ id, color: 'danger' })
      setWords(prev => prev.map(w => w.id === id ? { ...w, status: 'studying' } : w))
    } else {
      setActivePulse(null)
    }

    setActiveId(id)
    setTimeout(() => { setActiveId(null); setActivePulse(null) }, 500)
  }

  

  return (
    <div className="content">
      <div className="page-header">
        <div className="page-title">Words</div>
      </div>

      <Section title="New" count={newWords.length}>
        <WordField words={newWords} activeId={activeId} activePulse={activePulse} onTap={onWordTap} />
      </Section>

      <Section title="Studying" count={studyingWords.length}>
        <WordField words={studyingWords} activeId={activeId} activePulse={activePulse} onTap={onWordTap} />
      </Section>

      <Section title="Learned" count={learnedWords.length}>
        <WordField words={learnedWords} activeId={activeId} activePulse={activePulse} onTap={onWordTap} />
      </Section>

      
    </div>
  )
}

function Section(props: { title: string; count: number; children: React.ReactNode }): JSX.Element {
  const { title, count, children } = props
  return (
    <div className="section">
      <div className="row" style={{ margin: '10px 0' }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ color: 'var(--color-text-muted)' }}>({count})</div>
      </div>
      {children}
    </div>
  )
}

function WordField(props: {
  words: Word[]
  activeId: string | null
  activePulse: { id: string; color: 'success' | 'danger' } | null
  onTap: (id: string) => void
}): JSX.Element {
  const { words, activeId, activePulse, onTap } = props

  return (
    <div className="word-list">
      {words.map((w) => {
        const isActive = activeId === w.id
        const pulseColor = activePulse && activePulse.id === w.id ? activePulse.color : null
        const rowClass = `word-row${w.status === 'learned' ? ' learned' : ''}`
        return (
          <motion.button
            key={w.id}
            className={rowClass}
            onClick={() => onTap(w.id)}
            whileTap={{ scale: 0.992 }}
            whileHover={{ scale: 1.004 }}
            transition={{ type: 'tween', duration: 0.18, ease: 'easeOut' }}
          >
            <div className="word-title">{w.text}</div>
            <div className="word-sub" style={{ color: 'var(--color-text-muted)' }}>{w.translation}</div>
            <AnimatePresence>
              {isActive && pulseColor && (
                <motion.div
                  className={`pulse ${pulseColor}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
