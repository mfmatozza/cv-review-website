import ChoiceCard from './ChoiceCard'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

export default function StepHasCv({ dispatch }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">
          Do you already have a CV?
        </h1>
        <p className="font-mono text-sm text-cv-subtle">We'll use it to pre-fill your details.</p>
      </div>
      <div className="flex gap-4">
        <ChoiceCard
          label="Yes"
          description="I have a PDF or Word CV ready to upload."
          onClick={() => dispatch({ type: 'SET_STEP', step: 'upload-cv', path: 'upload' })}
        />
        <ChoiceCard
          label="No"
          description="I'll import from LinkedIn or fill things in manually."
          onClick={() => dispatch({ type: 'SET_STEP', step: 'has-linkedin' })}
        />
      </div>
    </div>
  )
}
