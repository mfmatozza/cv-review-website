import ChoiceCard from './ChoiceCard'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

export default function StepHasLinkedIn({ dispatch }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">
          Do you have a LinkedIn profile?
        </h1>
        <p className="font-mono text-sm text-cv-subtle">
          We'll import your experience, education and skills automatically.
        </p>
      </div>
      <div className="flex gap-4">
        <ChoiceCard
          label="Yes"
          description="Paste a URL and we'll pull in your data."
          onClick={() => dispatch({ type: 'SET_STEP', step: 'linkedin-url', path: 'linkedin' })}
        />
        <ChoiceCard
          label="No"
          description="I'll fill in my details with a short questionnaire."
          onClick={() => dispatch({ type: 'SET_STEP', step: 'questionnaire', path: 'questionnaire' })}
        />
      </div>
    </div>
  )
}
