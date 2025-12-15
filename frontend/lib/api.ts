const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export type CreateJobPayload = {
  prompt: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_images?: number;
  steps?: number;
  guidance_scale?: number;
  style?: string;
};

export async function createImageJob(payload: CreateJobPayload) {
  const response = await fetch(`${API_URL}/generate/image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create job');
  }

  return response.json();
}

export async function fetchJob(jobId: string) {
  const response = await fetch(`${API_URL}/jobs/${jobId}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch job');
  }
  return response.json();
}

export async function fetchJobs() {
  const response = await fetch(`${API_URL}/jobs`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
}
