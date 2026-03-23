from openai import OpenAI
import os
from app.models.types import ResumeData, JDData, ComparisonResult, GapAnalysis

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "dummy-key"))


async def compare_resume_jd(resume: ResumeData, jd: JDData) -> ComparisonResult:
    prompt = f"""请对比分析以下简历与职位描述的匹配程度，返回JSON格式：
    {{
        "matchScore": 85,
        "highlights": ["匹配亮点1", "匹配亮点2"],
        "strengths": ["优势1", "优势2"],
        "weaknesses": ["劣势1", "劣势2"],
        "gaps": [
            {{"requirement": "岗位要求", "current": "简历现状", "gapLevel": "low/medium/high"}}
        ],
        "atsKeywords": ["ATS关键词1", "关键词2"],
        "starSuggestions": [
            {{"context": "项目名称", "situation": "情境", "task": "任务", "action": "行动", "result": "结果"}}
        ],
        "optimizationSuggestions": ["优化建议1", "建议2"]
    }}
    
    简历信息：
    - 姓名: {resume.name}
    - 技能: {resume.skills.hard + resume.skills.soft}
    - 经历: {[f"{e.title}@{e.company}" for e in resume.experience]}
    - 项目: {[p.name for p in resume.projects]}
    - 简介: {resume.summary}
    
    JD信息：
    - 职位: {jd.basics.title}
    - 公司: {jd.basics.company}
    - 硬技能: {jd.hardSkills}
    - 软技能: {jd.softSkills}
    - 核心职责: {jd.coreResponsibilities}
    - 隐性需求: {jd.hiddenRequirements}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        data = eval(response.choices[0].message.content)
        
        return ComparisonResult(
            matchScore=data.get("matchScore", 50),
            highlights=data.get("highlights", []),
            strengths=data.get("strengths", []),
            weaknesses=data.get("weaknesses", []),
            gaps=[GapAnalysis(**g) for g in data.get("gaps", [])],
            atsKeywords=data.get("atsKeywords", []),
            starSuggestions=data.get("starSuggestions", []),
            optimizationSuggestions=data.get("optimizationSuggestions", [])
        )
    except Exception as e:
        return get_fallback_comparison(resume, jd)


def get_fallback_comparison(resume: ResumeData, jd: JDData) -> ComparisonResult:
    resume_skills = set(s.lower() for s in resume.skills.hard)
    jd_skills = set(s.lower() for s in jd.hardSkills)
    
    matched = len(resume_skills & jd_skills)
    total = len(jd_skills) if jd_skills else 1
    score = min(100, int(matched / total * 100 + 30))
    
    return ComparisonResult(
        matchScore=score,
        highlights=[f"简历包含{len(resume.experience)}段工作经历"],
        strengths=["具备相关经验"],
        weaknesses=["部分技能可能不匹配"],
        gaps=[],
        atsKeywords=jd.hardSkills[:5],
        starSuggestions=[],
        optimizationSuggestions=["建议突出相关技能", "建议量化工作成果"]
    )
