from fastapi import APIRouter, UploadFile, File
from app.services.resume_parser import parse_resume
from app.models.types import ResumeData

router = APIRouter()


@router.post("/parse", response_model=ResumeData)
async def parse_resume_api(
    text: str = None,
    file: UploadFile = File(None)
):
    result = await parse_resume(text, file)
    return result
