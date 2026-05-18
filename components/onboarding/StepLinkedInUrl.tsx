'use client'
import { useState } from 'react'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

const LINKEDIN_RE = /linkedin\.com\/in\//i

export default function StepLinkedInUrl({ state, dispatch }: Props) {
  const [url, setUrl]         = useState(state.linkedinUrl)
  const [touched, setTouched] = useState(false)

  const isValid   = LINKEDIN_RE.test(url)
  const showError = touched && url.length > 0 && !isValid

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">
          Paste your LinkedIn URL
        </h1>
        <p className="font-mono text-sm text-cv-subtle">
          We'll import your experience, education and skills.
        </p>
      </div>

      <div>
        <input
          type="url"
          placeholder="https://linkedin.com/in/yourname"
          value={url}
          onChange={e => { setUrl(e.target.value); setTouched(false) }}
          onBlur={() => setTouched(true)}
          className="w-full border rounded-md px-4 py-3 bg-white font-mono text-sm focus:outline-none transition-colors"
          style={{ borderColor: showError ? '#c0392b' : 'rgba(45,106,45,0.2)' }}
        />
        {showError && (
          <p className="font-mono text-xs mt-1" style={{ color: '#c0392b' }}>
            Must be a linkedin.com/in/ URL
          </p>
        )}
      </div>

      <button
        disabled={!isValid}
        onClick={() => {
          dispatch({ type: 'SET_LINKEDIN_URL', url })
          dispatch({ type: 'SET_STEP', step: 'photo' })
        }}
        className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  )
}
