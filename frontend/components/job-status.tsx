'use client'
export function JobStatus({ job }: { job: any }) {
  if (!job) return null
  return <pre>{JSON.stringify(job, null, 2)}</pre>
}
