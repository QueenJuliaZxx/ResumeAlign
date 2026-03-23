from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel
from typing import Any
from app.services.pdf_generator import generate_pdf_report

router = APIRouter()


class ReportRequest(BaseModel):
    type: str
    data: Any


@router.post("/generate")
async def generate_report(request: ReportRequest, background_tasks: BackgroundTasks):
    url = await generate_pdf_report(request.type, request.data, background_tasks)
    return {"url": url}
