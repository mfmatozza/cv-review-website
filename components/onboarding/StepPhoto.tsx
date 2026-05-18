'use client'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import { getCroppedImg } from '@/lib/cropImage'
import type { OnboardingState, OnboardingAction } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

export default function StepPhoto({ dispatch }: Props) {
  const [imageSrc, setImageSrc]                 = useState<string | null>(null)
  const [crop, setCrop]                          = useState({ x: 0, y: 0 })
  const [zoom, setZoom]                          = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [processing, setProcessing]             = useState(false)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageSrc(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleDone = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    setProcessing(true)
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels)
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' })
      dispatch({ type: 'SET_PHOTO', file, cropArea: croppedAreaPixels })
    } finally {
      setProcessing(false)
    }
    dispatch({ type: 'SET_STEP', step: 'done' })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">Add a profile photo</h1>
        <p className="font-mono text-sm text-cv-subtle">Shows top-left on your CV. Square or portrait works best.</p>
      </div>

      {!imageSrc ? (
        <label
          className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 hover:bg-cv-green/5"
          style={{ borderColor: 'rgba(45,106,45,0.3)', background: 'white' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#2d6a2d')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(45,106,45,0.3)')}
        >
          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          <div className="font-mono text-3xl text-cv-subtle mb-2">+</div>
          <div className="font-mono text-sm text-cv-forest">Choose a photo</div>
          <div className="font-mono text-xs text-cv-subtle mt-1">JPG, PNG or WEBP</div>
        </label>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="relative rounded-xl overflow-hidden" style={{ height: '300px' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cv-subtle w-10">Zoom</span>
            <input
              type="range" min={1} max={3} step={0.01}
              value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              className="flex-1 accent-green-700"
            />
          </div>
          <button
            onClick={() => setImageSrc(null)}
            className="font-mono text-xs text-cv-subtle hover:text-cv-green self-start"
          >
            ← Choose a different photo
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          disabled={!imageSrc || !croppedAreaPixels || processing}
          onClick={handleDone}
          className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : 'Done, build my CV →'}
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_STEP', step: 'done' })}
          className="font-mono text-sm text-cv-subtle hover:text-cv-green transition-colors text-center"
        >
          Skip for now →
        </button>
      </div>
    </div>
  )
}
