from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.services.job_matcher import search_jobs
from app.models.types import Job, JobFilters

router = APIRouter()


class JobSearchRequest(BaseModel):
    filters: JobFilters


@router.post("/jobs")
async def search_jobs_api(request: JobSearchRequest):
    jobs, total = await search_jobs(request.filters)
    return {"jobs": jobs, "total": total}
