import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chain import generate_content
from dotenv import load_dotenv

load_dotenv()
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "ContentForge-v1"

app = FastAPI(title="ContentForge AI API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    topic: str
    channel_info: str = "General"
    platform: str = "YouTube"
    tone: str = "Edgy & FOMO"
    length: str = "Medium (5 min)"

class GenerateResponse(BaseModel):
    result: str
    topic: str
    channel_info: str
    platform: str
    tone: str
    length: str

@app.get("/")
def root():
    return {"status": "ContentForge AI running", "version": "2.0.0"}

@app.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    if not req.topic.strip():
        raise HTTPException(status_code=400, detail="Topic nu poate fi gol.")
    try:
        result = generate_content(req.topic, req.channel_info, req.platform, req.tone, req.length)
        return GenerateResponse(
            result=result,
            topic=req.topic,
            channel_info=req.channel_info,
            platform=req.platform,
            tone=req.tone,
            length=req.length
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
