from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from uuid import uuid4
from app.config import settings

app = FastAPI(title=settings.api_title)
JOBS = {}

class JobIn(BaseModel):
    prompt: str
    kind: str = "image"

@app.get('/health')
def health():
    return {'status': 'ok', 'service': 'backend'}

@app.post('/api/jobs')
def create_job(job: JobIn):
    job_id = str(uuid4())
    JOBS[job_id] = {"id": job_id, "status": "queued", "prompt": job.prompt, "kind": job.kind, "progress": 0}
    return JOBS[job_id]

@app.get('/api/jobs/{job_id}')
def get_job(job_id: str):
    if job_id not in JOBS:
        raise HTTPException(status_code=404, detail='Job not found')
    return JOBS[job_id]
