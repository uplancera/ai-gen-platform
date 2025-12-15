'use client';

import { useState } from 'react';
import { JobForm } from '../components/job-form';
import { JobStatus } from '../components/job-status';

export default function HomePage() {
  const [jobId, setJobId] = useState('');

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: 32 }}>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>AI Image Generation Platform</h1>
      <p style={{ color: '#b7c0d1', marginBottom: 24 }}>
        A personal-project starter with FastAPI, Celery, Redis, PostgreSQL, MinIO, and Next.js.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <JobForm onCreated={setJobId} />
        <div>
          {jobId ? <JobStatus jobId={jobId} /> : <div style={{ padding: 20, border: '1px dashed #32415f', borderRadius: 16 }}>Submit a prompt to start a job.</div>}
        </div>
      </div>
    </main>
  );
}
