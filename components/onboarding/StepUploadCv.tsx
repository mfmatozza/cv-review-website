'use client'
import { useState, useRef } from 'react'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

export default function StepUploadCv({ state, dispatch }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.name.match(/\.(pdf|docx)$/i)) return
    dispatch({ type: 'SET_CV_FILE', file })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">Upload your CV</h1>
        <p className="font-mono text-sm text-cv-subtle">
          PDF or Word document. We'll pre-fill your details.
        </p>
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200"
        style={{
          borderColor: isDragging || state.cvFile ? '#2d6a2d' : 'rgba(45,106,45,0.3)',
          background: isDragging ? 'rgba(45,106,45,0.05)' : state.cvFile ? 'rgba(45,106,45,0.03)' : 'white',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />
        {state.cvFile ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-cv-green text-2xl">✓</span>
            <span className="font-mono text-sm font-bold text-cv-green">{state.cvFile.name}</span>
            <span className="font-mono text-xs text-cv-subtle">
              {(state.cvFile.size / 1024).toFixed(0)} KB · click to change
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-3xl text-cv-subtle">↑</span>
            <span className="font-mono text-sm text-cv-forest">Drop your CV here or click to browse</span>
            <span className="font-mono text-xs text-cv-subtle">PDF or DOCX · max 10 MB</span>
          </div>
        )}
      </div>

      <button
        disabled={!state.cvFile}
        onClick={() => dispatch({ type: 'SET_STEP', step: 'photo' })}
        className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  )
}
