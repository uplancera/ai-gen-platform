from celery import Celery

celery_app = Celery('worker', broker='redis://redis:6379/0', backend='redis://redis:6379/0')

@celery_app.task
def simulate_generation(job_id: str):
    return {"job_id": job_id, "status": "completed"}
