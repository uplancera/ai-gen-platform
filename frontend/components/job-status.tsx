'use client';

import { useEffect, useState } from 'react';
import { fetchJob } from '../lib/api';

export function JobStatus({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const load = async () => {
      try {
        const data = await fetchJob(jobId);
        setJob(data);
        if (data.status === 'completed' || data.status === 'failed') {
          if (interval) clearInterval(interval);
        }
      } catch (err) {
        setError('Failed to load job.');
      }
    };

    load();
    interval = setInterval(load, 2000);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [jobId]);

  if (error) return <div>{error}</div>;
  if (!job) return <div>Loading job...</div>;

  const imageUrl = job.output_urls?.images?.[0]?.url;

  return (
    <div style={{ padding: 20, border: '1px solid #23304a', borderRadius: 16, background: '#121a2b' }}>
      <div><strong>Status:</strong> {job.status}</div>
      <div><strong>Progress:</strong> {job.progress}%</div>
      <div><strong>Prompt:</strong> {job.prompt}</div>
      {job.error_message ? <div style={{ color: '#ff9ca3' }}>{job.error_message}</div> : null}
      {imageUrl ? (
        <div style={{ marginTop: 16 }}>
          <img src={imageUrl} alt="generated" style={{ maxWidth: '100%', borderRadius: 12 }} />
        </div>
      ) : null}
    </div>
  );
}
