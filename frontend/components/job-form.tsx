'use client';

import { useState } from 'react';
import { createImageJob } from '../lib/api';

export function JobForm({ onCreated }: { onCreated: (jobId: string) => void }) {
  const [prompt, setPrompt] = useState('a futuristic city skyline at sunset');
  const [style, setStyle] = useState('photorealistic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await createImageJob({ prompt, style, width: 1024, height: 1024, num_images: 1, steps: 30, guidance_scale: 7.5 });
      onCreated(result.job_id);
    } catch (err) {
      setError('Could not queue generation job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 12, padding: 20, border: '1px solid #23304a', borderRadius: 16, background: '#121a2b' }}>
      <div>
        <label>Prompt</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} style={{ width: '100%', marginTop: 8, borderRadius: 8, padding: 12 }} />
      </div>
      <div>
        <label>Style</label>
        <input value={style} onChange={(e) => setStyle(e.target.value)} style={{ width: '100%', marginTop: 8, borderRadius: 8, padding: 12 }} />
      </div>
      <button type="submit" disabled={loading} style={{ padding: '12px 16px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
        {loading ? 'Queueing...' : 'Generate'}
      </button>
      {error ? <div style={{ color: '#ff9ca3' }}>{error}</div> : null}
    </form>
  );
}
