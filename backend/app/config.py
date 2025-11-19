import os

class Settings:
    api_title = os.getenv('API_TITLE', 'AI Gen Platform')
    redis_url = os.getenv('REDIS_URL', 'redis://redis:6379/0')

settings = Settings()
