from fastapi import APIRouter
from pydantic import BaseModel
from app.services.comparison import compare_resume_jd
from app.models.types import ComparisonResult, ResumeData, JDData

router = APIRouter()


class CompareRequest(BaseModel):
    resume: ResumeData
    jd: JDData


@router.post("", response_model=ComparisonResult)
async def compare_api(request: CompareRequest):
    result = await compare_resume_jd(request.resume, request.jd)
    return result
