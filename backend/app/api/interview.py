from fastapi import APIRouter
from pydantic import BaseModel
from app.services.interview import generate_interview_guide
from app.models.types import InterviewGuide, ResumeData, JDData, ComparisonResult

router = APIRouter()


class InterviewRequest(BaseModel):
    resume: ResumeData
    jd: JDData
    comparison: ComparisonResult


@router.post("/generate", response_model=InterviewGuide)
async def generate_interview_api(request: InterviewRequest):
    result = await generate_interview_guide(request.resume, request.jd, request.comparison)
    return result
