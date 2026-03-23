from openai import OpenAI
import os
from app.models.types import ResumeData, JDData, ComparisonResult, InterviewGuide, InterviewQuestion, WeakResponse

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "dummy-key"))


async def generate_interview_guide(resume: ResumeData, jd: JDData, comparison: ComparisonResult) -> InterviewGuide:
    prompt = f"""基于以下简历与JD对比分析，生成个性化面试指导，返回JSON格式：
    {{
        "questions": [
            {{"question": "面试题", "type": "technical/behavioral/hr", "focus": "考察点", "sampleAnswer": "参考答案"}}
        ],
        "frameworks": {{
            "项目介绍": "STAR法则 + 数据量化",
            "技术深度": "背景 → 技术选型 → 实现细节 → 效果验证",
            "问题解决": "问题定义 → 原因分析 → 解决方案 → 结果评估"
        }},
        "weakResponses": [
            {{"weakness": "短板", "response": "应对话术"}}
        ],
        "preparationPoints": ["备战重点1", "重点2"]
    }}
    
    简历信息：
    - 姓名: {resume.name}
    - 技能: {resume.skills.hard}
    - 经历: {[f"{e.title}@{e.company}: {e.highlights}" for e in resume.experience]}
    
    JD信息：
    - 职位: {jd.basics.title}
    - 核心职责: {jd.coreResponsibilities}
    - 技术要求: {jd.hardSkills}
    
    对比分析：
    - 匹配分: {comparison.matchScore}
    - 差距: {[f"{g.requirement}({g.gapLevel})" for g in comparison.gaps]}
    - 优势: {comparison.strengths}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        data = eval(response.choices[0].message.content)
        
        return InterviewGuide(
            questions=[InterviewQuestion(**q) for q in data.get("questions", [])],
            frameworks=data.get("frameworks", {}),
            weakResponses=[WeakResponse(**w) for w in data.get("weakResponses", [])],
            preparationPoints=data.get("preparationPoints", [])
        )
    except Exception as e:
        return get_fallback_interview(jd, comparison)


def get_fallback_interview(jd: JDData, comparison: ComparisonResult) -> InterviewGuide:
    questions = []
    
    for skill in jd.hardSkills[:3]:
        questions.append(
            InterviewQuestion(
                question=f"请介绍你使用{skill}的经验",
                type="technical",
                focus=f"{skill}技能掌握"
            )
        )
    
    questions.append(
        InterviewQuestion(
            question="请介绍一个你主导的项目",
            type="behavioral",
            focus="项目经验"
        )
    )
    
    questions.append(
        InterviewQuestion(
            question="你为什么对这个岗位感兴趣？",
            type="hr",
            focus="求职动机"
        )
    )
    
    weak_responses = [
        WeakResponse(
            weakness=w,
            response=f"虽然我在{w}方面经验有限，但我有很强的学习能力，已经开始学习相关知识"
        )
        for w in comparison.weaknesses[:2]
    ]
    
    return InterviewGuide(
        questions=questions,
        frameworks={
            "项目介绍": "STAR法则 + 数据量化",
            "技术问题": "原理 → 实现 → 优化"
        },
        weakResponses=weak_responses,
        preparationPoints=["核心技术点", "项目经验梳理"]
    )
