# AI-Powered Image & Video Generation Platform

A personal-project starter based on the architecture we discussed: FastAPI + Celery + Redis + PostgreSQL + MinIO + Next.js.

This is a **working MVP scaffold** for a private/internal generative media platform. It includes:

- FastAPI backend with job APIs
- Celery worker for async generation jobs
- PostgreSQL metadata storage
- Redis queue + cache
- MinIO object storage
- Next.js frontend for prompt submission and job polling
- Docker Compose for local development

## What is implemented

- Create image generation jobs
- Poll job status
- List recent jobs
- Async worker pipeline
- Local "mock generation" mode that creates placeholder images without GPU setup
- Optional hooks for real Diffusers-based generation
- WebSocket-ready backend structure

## What is not fully production complete

- Full auth / RBAC
- Real billing / quotas
- Full moderation pipeline
- Real GPU autoscaling / Kubernetes deployment
- Video generation worker implementation beyond scaffold

## Quick start

### 1) Copy env files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### 2) Start locally

```bash
docker compose up --build
```

Services:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- MinIO Console: http://localhost:9001

### 3) Create a job

Use the web UI or call:

```bash
curl -X POST http://localhost:8000/api/v1/generate/image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "a futuristic city skyline at sunset",
    "negative_prompt": "blurry, distorted",
    "width": 1024,
    "height": 1024,
    "num_images": 1,
    "steps": 30,
    "guidance_scale": 7.5,
    "style": "photorealistic"
  }'
```

## Real model integration

The worker is configured to support two modes:

- `GENERATION_BACKEND=mock` for local development
- `GENERATION_BACKEND=diffusers` for real inference

To connect a real model, update:

- `backend/app/services/generation.py`
- `backend/app/tasks/generate.py`

You can start with `StableDiffusionXLPipeline` and later add:

- ControlNet
- IP-Adapter
- LoRA loading
- AnimateDiff / video generation

## Suggested next steps

1. Add auth with Clerk / NextAuth / Supabase Auth
2. Add NSFW moderation on prompts and outputs
3. Add S3 signed URLs
4. Add WebSocket progress updates
5. Replace mock generation with SDXL inference on GPU
6. Add job prioritization / rate limiting / quotas
7. Deploy to AWS or RunPod + managed Postgres

## Folder structure

```text
ai-gen-platform/
  backend/
  frontend/
  docker-compose.yml
```

