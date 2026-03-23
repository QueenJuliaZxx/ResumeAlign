from fastapi import APIRouter
from pydantic import BaseModel
from app.services.jd_parser import parse_jd
from app.models.types import JDData

router = APIRouter()


class JDParseRequest(BaseModel):
    text: str


@router.post("/parse", response_model=JDData)
async def parse_jd_api(request: JDParseRequest):
    result = await parse_jd(request.text)
    return result
