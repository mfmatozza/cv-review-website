export type Step =
  | 'auth'
  | 'has-cv'
  | 'upload-cv'
  | 'has-linkedin'
  | 'linkedin-url'
  | 'questionnaire'
  | 'photo'
  | 'done'

export type OnboardingPath = 'upload' | 'linkedin' | 'questionnaire' | null

export type ExperienceEntry = {
  company: string
  role: string
  startDate: string
  endDate: string
  isPresent: boolean
  bullets: string[]
}

export type EducationEntry = {
  institution: string
  degree: string
  startDate: string
  endDate: string
}

export type ProfileData = {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
}

export type OnboardingState = {
  step: Step
  path: OnboardingPath
  cvFile: File | null
  linkedinUrl: string
  profile: ProfileData
  photoFile: File | null
  photoCropArea: { x: number; y: number; width: number; height: number } | null
}

export type OnboardingAction =
  | { type: 'SET_STEP'; step: Step; path?: OnboardingPath }
  | { type: 'SET_CV_FILE'; file: File }
  | { type: 'SET_LINKEDIN_URL'; url: string }
  | { type: 'SET_PROFILE'; profile: ProfileData }
  | { type: 'SET_PHOTO'; file: File; cropArea: { x: number; y: number; width: number; height: number } }
