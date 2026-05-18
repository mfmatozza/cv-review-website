'use client'
import { useReducer, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { OnboardingState, OnboardingAction } from '@/components/onboarding/types'
import ProgressBar       from '@/components/onboarding/ProgressBar'
import StepAuth          from '@/components/onboarding/StepAuth'
import StepHasCv         from '@/components/onboarding/StepHasCv'
import StepUploadCv      from '@/components/onboarding/StepUploadCv'
import StepHasLinkedIn   from '@/components/onboarding/StepHasLinkedIn'
import StepLinkedInUrl   from '@/components/onboarding/StepLinkedInUrl'
import StepQuestionnaire from '@/components/onboarding/StepQuestionnaire'
import StepPhoto         from '@/components/onboarding/StepPhoto'

const INITIAL: OnboardingState = {
  step: 'auth',
  path: null,
  cvFile: null,
  linkedinUrl: '',
  profile: {
    firstName: '', lastName: '', title: '', email: '', phone: '',
    location: '', summary: '',
    experience: [{ company: '', role: '', startDate: '', endDate: '', isPresent: false, bullets: [''] }],
    education:  [{ institution: '', degree: '', startDate: '', endDate: '' }],
    skills: [],
  },
  photoFile: null,
  photoCropArea: null,
}

function reducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step, ...(action.path ? { path: action.path } : {}) }
    case 'SET_CV_FILE':
      return { ...state, cvFile: action.file }
    case 'SET_LINKEDIN_URL':
      return { ...state, linkedinUrl: action.url }
    case 'SET_PROFILE':
      return { ...state, profile: action.profile }
    case 'SET_PHOTO':
      return { ...state, photoFile: action.file, photoCropArea: action.cropArea }
    default:
      return state
  }
}

function getProgress(state: OnboardingState): { current: number; total: number } {
  const { step, path } = state
  const isUpload = path === 'upload'
  if (step === 'auth')          return { current: 1, total: isUpload ? 4 : 5 }
  if (step === 'has-cv')        return { current: 2, total: isUpload ? 4 : 5 }
  if (step === 'upload-cv')     return { current: 3, total: 4 }
  if (step === 'has-linkedin')  return { current: 3, total: 5 }
  if (step === 'linkedin-url')  return { current: 4, total: 5 }
  if (step === 'questionnaire') return { current: 4, total: 5 }
  if (step === 'photo')         return { current: isUpload ? 4 : 5, total: isUpload ? 4 : 5 }
  return { current: 1, total: 4 }
}

export default function OnboardingPage() {
  const [state, dispatch] = useReducer(reducer, INITIAL)
  const router = useRouter()

  useEffect(() => {
    if (state.step === 'done') router.push('/editor')
  }, [state.step, router])

  const { current, total } = getProgress(state)

  const renderStep = () => {
    switch (state.step) {
      case 'auth':          return <StepAuth          state={state} dispatch={dispatch} />
      case 'has-cv':        return <StepHasCv         state={state} dispatch={dispatch} />
      case 'upload-cv':     return <StepUploadCv      state={state} dispatch={dispatch} />
      case 'has-linkedin':  return <StepHasLinkedIn   state={state} dispatch={dispatch} />
      case 'linkedin-url':  return <StepLinkedInUrl   state={state} dispatch={dispatch} />
      case 'questionnaire': return <StepQuestionnaire state={state} dispatch={dispatch} />
      case 'photo':         return <StepPhoto         state={state} dispatch={dispatch} />
      default: return null
    }
  }

  if (state.step === 'done') return null

  return (
    <>
      <ProgressBar current={current} total={total} />
      <div className="min-h-screen bg-cv-cream flex items-start justify-center pt-16 pb-16 px-4">
        <div className="w-full max-w-lg">
          {renderStep()}
        </div>
      </div>
    </>
  )
}
