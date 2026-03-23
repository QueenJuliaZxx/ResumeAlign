from pydantic import BaseModel
from typing import List, Optional


class Education(BaseModel):
    school: str
    major: str
    degree: str
    duration: str


class Experience(BaseModel):
    company: str
    title: str
    duration: str
    highlights: List[str]


class Project(BaseModel):
    name: str
    description: str
    technologies: List[str]


class Skills(BaseModel):
    hard: List[str]
    soft: List[str]


class ResumeData(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    education: List[Education]
    experience: List[Experience]
    skills: Skills
    projects: List[Project]
    summary: Optional[str] = None
    rawText: Optional[str] = None


class JDBasics(BaseModel):
    title: str
    company: str
    salary: str
    location: str
    experience: str


class JDData(BaseModel):
    id: str
    basics: JDBasics
    hardSkills: List[str]
    softSkills: List[str]
    businessRequirements: List[str]
    coreResponsibilities: List[str]
    hiddenRequirements: List[str]
    abilityWeights: dict
    rawText: Optional[str] = None


class GapAnalysis(BaseModel):
    requirement: str
    current: str
    gapLevel: str


class ComparisonResult(BaseModel):
    matchScore: float
    highlights: List[str]
    strengths: List[str]
    weaknesses: List[str]
    gaps: List[GapAnalysis]
    atsKeywords: List[str]
    starSuggestions: List[dict]
    optimizationSuggestions: List[str]


class InterviewQuestion(BaseModel):
    question: str
    type: str
    focus: str
    sampleAnswer: Optional[str] = None


class WeakResponse(BaseModel):
    weakness: str
    response: str


class InterviewGuide(BaseModel):
    questions: List[InterviewQuestion]
    frameworks: dict
    weakResponses: List[WeakResponse]
    preparationPoints: List[str]


class Job(BaseModel):
    id: str
    title: str
    company: str
    location: str
    salary: str
    experience: str
    tags: List[str]
    matchScore: Optional[float] = None
    url: str
    postedDate: str


class JobFilters(BaseModel):
    keyword: Optional[str] = None
    city: Optional[str] = None
    salaryMin: Optional[int] = None
    salaryMax: Optional[int] = None
    experience: Optional[str] = None
    jobType: Optional[str] = None
