'use client'
import { useState } from 'react'
import { createJob } from '../lib/api'

export function JobForm() {
  const [prompt, setPrompt] = useState('')
  const [job, setJob] = useState<any>(null)

  return (
    <div>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={async () => setJob(await createJob(prompt))}>Generate</button>
      {job && <pre>{JSON.stringify(job, null, 2)}</pre>}
    </div>
  )
}
