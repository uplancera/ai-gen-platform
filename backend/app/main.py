from fastapi import FastAPI

app = FastAPI(title="AI Gen Platform")

@app.get('/health')
def health():
    return {'status': 'ok'}
