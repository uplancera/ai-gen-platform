from fastapi import FastAPI
from pydantic import BaseModel
from uuid import uuid4

app = FastAPI(title="AI Gen Platform")
JOBS = {}

class JobIn(BaseModel):
    prompt: str
    kind: str = "image"

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.post('/api/jobs')
def create_job(job: JobIn):
    job_id = str(uuid4())
    JOBS[job_id] = {"id": job_id, "status": "queued", "prompt": job.prompt, "kind": job.kind}
    return JOBS[job_id]

@app.get('/api/jobs/{job_id}')
def get_job(job_id: str):
    return JOBS[job_id]
