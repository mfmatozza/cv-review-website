'use client'
import { useState } from 'react'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

const INPUT = "w-full border rounded-md px-4 py-3 bg-white font-mono text-sm focus:outline-none transition-colors"

export default function StepAuth({ dispatch }: Props) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    if (password.length < 8) e.password = 'Password must be at least 8 characters'
    if (password !== confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    dispatch({ type: 'SET_STEP', step: 'has-cv' })
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 8 && password === confirm

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">Create your account</h1>
        <p className="font-mono text-sm text-cv-subtle">Your CV is saved to your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
            className={INPUT}
            style={{ borderColor: errors.email ? '#c0392b' : 'rgba(45,106,45,0.2)' }}
          />
          {errors.email && <p className="font-mono text-xs mt-1" style={{ color: '#c0392b' }}>{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }}
            className={INPUT}
            style={{ borderColor: errors.password ? '#c0392b' : 'rgba(45,106,45,0.2)' }}
          />
          {errors.password && <p className="font-mono text-xs mt-1" style={{ color: '#c0392b' }}>{errors.password}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={e => { setConfirm(e.target.value); setErrors(p => ({ ...p, confirm: undefined })) }}
            className={INPUT}
            style={{ borderColor: errors.confirm ? '#c0392b' : 'rgba(45,106,45,0.2)' }}
          />
          {errors.confirm && <p className="font-mono text-xs mt-1" style={{ color: '#c0392b' }}>{errors.confirm}</p>}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </form>

      <p className="font-mono text-sm text-center text-cv-subtle">
        Already have an account?{' '}
        <a href="/login" className="text-cv-green hover:underline">Sign in</a>
      </p>
    </div>
  )
}
