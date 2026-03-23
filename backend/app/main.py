from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import resume, jd, compare, interview, match, report

app = FastAPI(
    title="ResumeAlign API",
    description="AI智能求职辅助平台 API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router, prefix="/api/resume", tags=["简历解析"])
app.include_router(jd.router, prefix="/api/jd", tags=["JD解析"])
app.include_router(compare.router, prefix="/api/compare", tags=["对比分析"])
app.include_router(interview.router, prefix="/api/interview", tags=["面试指导"])
app.include_router(match.router, prefix="/api/match", tags=["岗位匹配"])
app.include_router(report.router, prefix="/api/report", tags=["报告导出"])


@app.get("/")
async def root():
    return {"message": "ResumeAlign API", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
