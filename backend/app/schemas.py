from pydantic import BaseModel

class GenerateRequest(BaseModel):
    prompt: str
    negative_prompt: str | None = None
    width: int = 1024
    height: int = 1024
    kind: str = 'image'
