'use client'
import { useState } from 'react'
import type { OnboardingState, OnboardingAction, ExperienceEntry, EducationEntry, ProfileData } from './types'

type Props = { state: OnboardingState; dispatch: React.Dispatch<OnboardingAction> }

const INPUT = "w-full border rounded-md px-3 py-2.5 bg-white font-mono text-sm focus:outline-none transition-colors"
const STYLE = { borderColor: 'rgba(45,106,45,0.2)' }
const EMPTY_EXP: ExperienceEntry = { company: '', role: '', startDate: '', endDate: '', isPresent: false, bullets: [''] }
const EMPTY_EDU: EducationEntry  = { institution: '', degree: '', startDate: '', endDate: '' }

export default function StepQuestionnaire({ state, dispatch }: Props) {
  const [profile, setProfile] = useState<ProfileData>(state.profile)
  const [skillInput, setSkillInput] = useState('')

  const set = <K extends keyof ProfileData>(key: K, val: ProfileData[K]) =>
    setProfile(p => ({ ...p, [key]: val }))

  const updateExp = (i: number, patch: Partial<ExperienceEntry>) =>
    setProfile(p => ({ ...p, experience: p.experience.map((e, idx) => idx === i ? { ...e, ...patch } : e) }))

  const updateExpBullet = (ei: number, bi: number, val: string) =>
    setProfile(p => ({
      ...p,
      experience: p.experience.map((e, i) =>
        i === ei ? { ...e, bullets: e.bullets.map((b, j) => j === bi ? val : b) } : e
      ),
    }))

  const updateEdu = (i: number, patch: Partial<EducationEntry>) =>
    setProfile(p => ({ ...p, education: p.education.map((e, idx) => idx === i ? { ...e, ...patch } : e) }))

  const addSkill = (raw: string) => {
    const skill = raw.trim().replace(/,$/, '')
    if (!skill || profile.skills.includes(skill)) return
    setProfile(p => ({ ...p, skills: [...p.skills, skill] }))
    setSkillInput('')
  }

  const canContinue = profile.firstName && profile.lastName && profile.title && profile.experience[0]?.company

  return (
    <div className="flex flex-col gap-8 pb-8">
      <div>
        <h1 className="font-serif font-black text-cv-forest text-3xl mb-2">Tell us about yourself</h1>
        <p className="font-mono text-sm text-cv-subtle">Fill in as much as you like — you can edit everything later.</p>
      </div>

      {/* Personal */}
      <Section>Personal</Section>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="First name *" value={profile.firstName} onChange={e => set('firstName', e.target.value)} className={INPUT} style={STYLE} />
          <input placeholder="Last name *"  value={profile.lastName}  onChange={e => set('lastName',  e.target.value)} className={INPUT} style={STYLE} />
        </div>
        <input placeholder="Job title *" value={profile.title} onChange={e => set('title', e.target.value)} className={INPUT} style={STYLE} />
        <div className="grid grid-cols-2 gap-3">
          <input type="email" placeholder="Email"  value={profile.email} onChange={e => set('email', e.target.value)} className={INPUT} style={STYLE} />
          <input             placeholder="Phone"  value={profile.phone} onChange={e => set('phone', e.target.value)} className={INPUT} style={STYLE} />
        </div>
        <input placeholder="Location (e.g. London, UK)" value={profile.location} onChange={e => set('location', e.target.value)} className={INPUT} style={STYLE} />
        <textarea placeholder="Summary (optional)" value={profile.summary} onChange={e => set('summary', e.target.value)} rows={3} className={INPUT + ' resize-none'} style={STYLE} />
      </div>

      {/* Experience */}
      <Section>Experience</Section>
      {profile.experience.map((exp, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 rounded-lg" style={{ background: 'rgba(45,106,45,0.04)', border: '1px solid rgba(45,106,45,0.1)' }}>
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-cv-subtle">Role {i + 1}</span>
            {i > 0 && (
              <button onClick={() => setProfile(p => ({ ...p, experience: p.experience.filter((_, idx) => idx !== i) }))}
                className="font-mono text-xs text-red-500 hover:underline">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Company *" value={exp.company} onChange={e => updateExp(i, { company: e.target.value })} className={INPUT} style={STYLE} />
            <input placeholder="Role"      value={exp.role}    onChange={e => updateExp(i, { role:    e.target.value })} className={INPUT} style={STYLE} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Start (e.g. Jan 2022)" value={exp.startDate} onChange={e => updateExp(i, { startDate: e.target.value })} className={INPUT} style={STYLE} />
            {!exp.isPresent && (
              <input placeholder="End date" value={exp.endDate} onChange={e => updateExp(i, { endDate: e.target.value })} className={INPUT} style={STYLE} />
            )}
          </div>
          <label className="flex items-center gap-2 font-mono text-sm text-cv-subtle cursor-pointer">
            <input type="checkbox" checked={exp.isPresent} onChange={e => updateExp(i, { isPresent: e.target.checked, endDate: '' })} className="accent-green-700" />
            Currently working here
          </label>
          <div className="flex flex-col gap-2">
            {exp.bullets.map((b, j) => (
              <div key={j} className="flex gap-2 items-center">
                <span className="font-mono text-cv-subtle">·</span>
                <input placeholder="What did you achieve? Be specific." value={b} onChange={e => updateExpBullet(i, j, e.target.value)} className={INPUT + ' flex-1'} style={STYLE} />
                {j > 0 && (
                  <button onClick={() => setProfile(p => ({ ...p, experience: p.experience.map((e, ei) => ei !== i ? e : { ...e, bullets: e.bullets.filter((_, bi) => bi !== j) }) }))}
                    className="font-mono text-cv-subtle hover:text-red-500 text-sm">×</button>
                )}
              </div>
            ))}
            <button onClick={() => updateExp(i, { bullets: [...exp.bullets, ''] })} className="font-mono text-xs text-cv-green hover:underline self-start">
              + Add bullet
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => setProfile(p => ({ ...p, experience: [...p.experience, { ...EMPTY_EXP }] }))}
        className="font-mono text-sm text-cv-green hover:underline self-start">
        + Add another role
      </button>

      {/* Education */}
      <Section>Education</Section>
      {profile.education.map((edu, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 rounded-lg" style={{ background: 'rgba(45,106,45,0.04)', border: '1px solid rgba(45,106,45,0.1)' }}>
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-cv-subtle">Degree {i + 1}</span>
            {i > 0 && (
              <button onClick={() => setProfile(p => ({ ...p, education: p.education.filter((_, idx) => idx !== i) }))}
                className="font-mono text-xs text-red-500 hover:underline">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Institution" value={edu.institution} onChange={e => updateEdu(i, { institution: e.target.value })} className={INPUT} style={STYLE} />
            <input placeholder="Degree"      value={edu.degree}      onChange={e => updateEdu(i, { degree:      e.target.value })} className={INPUT} style={STYLE} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Start year" value={edu.startDate} onChange={e => updateEdu(i, { startDate: e.target.value })} className={INPUT} style={STYLE} />
            <input placeholder="End year"   value={edu.endDate}   onChange={e => updateEdu(i, { endDate:   e.target.value })} className={INPUT} style={STYLE} />
          </div>
        </div>
      ))}
      <button onClick={() => setProfile(p => ({ ...p, education: [...p.education, { ...EMPTY_EDU }] }))}
        className="font-mono text-sm text-cv-green hover:underline self-start">
        + Add another degree
      </button>

      {/* Skills */}
      <Section>Skills</Section>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            placeholder="Type a skill and press Enter"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(skillInput) } }}
            className={INPUT + ' flex-1'}
            style={STYLE}
          />
          <button onClick={() => addSkill(skillInput)} className="font-mono text-sm px-4 py-2 border rounded-md text-cv-green hover:bg-cv-green/5 transition-colors" style={{ borderColor: 'rgba(45,106,45,0.2)' }}>
            Add
          </button>
        </div>
        {profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <span key={skill} className="font-mono text-sm px-3 py-1 rounded-full flex items-center gap-2" style={{ background: 'rgba(45,106,45,0.1)', color: '#2d6a2d' }}>
                {skill}
                <button onClick={() => setProfile(p => ({ ...p, skills: p.skills.filter(s => s !== skill) }))} className="hover:text-red-500 font-bold">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        disabled={!canContinue}
        onClick={() => { dispatch({ type: 'SET_PROFILE', profile }); dispatch({ type: 'SET_STEP', step: 'photo' }) }}
        className="font-mono font-bold px-6 py-3 bg-cv-green text-cv-cream rounded-md hover:bg-cv-green-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono font-bold text-cv-green uppercase tracking-wider pb-1.5" style={{ fontSize: '11px', letterSpacing: '2px', borderBottom: '1px solid rgba(45,106,45,0.15)' }}>
      {children}
    </h2>
  )
}
