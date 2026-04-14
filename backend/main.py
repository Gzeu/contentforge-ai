import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chain import generate_content
from dotenv import load_dotenv

load_dotenv()

os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "ContentForge-v1"

app = FastAPI(title="ContentForge AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerateRequest(BaseModel):
    topic: str
    channel_info: str = "Crypto, EGLD, AI Agents, Trading"


class GenerateResponse(BaseModel):
    result: str
    topic: str
    channel_info: str


@app.get("/")
def root():
    return {"status": "ContentForge AI running", "version": "1.0.0"}


@app.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    if not req.topic.strip():
        raise HTTPException(status_code=400, detail="Topic nu poate fi gol.")
    try:
        result = generate_content(req.topic, req.channel_info)
        return GenerateResponse(result=result, topic=req.topic, channel_info=req.channel_info)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
