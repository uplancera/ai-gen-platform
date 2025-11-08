export async function createJob(prompt: string) {
  const res = await fetch('http://localhost:8000/api/jobs', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ prompt, kind: 'image' }),
  })
  return res.json()
}
