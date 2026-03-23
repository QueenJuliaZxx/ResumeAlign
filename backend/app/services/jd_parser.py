from openai import OpenAI
import os
from app.models.types import JDData, JDBasics

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "dummy-key"))


async def parse_jd(text: str) -> JDData:
    prompt = f"""请从以下职位描述（JD）中提取结构化信息，返回JSON格式：
    {{
        "basics": {{
            "title": "职位名称",
            "company": "公司名称",
            "salary": "薪资范围",
            "location": "工作地点",
            "experience": "经验要求"
        }},
        "hardSkills": ["硬技能列表"],
        "softSkills": ["软技能列表"],
        "businessRequirements": ["业务要求"],
        "coreResponsibilities": ["核心职责"],
        "hiddenRequirements": ["隐性需求/加分项"],
        "abilityWeights": {{
            "技术深度": 0.4,
            "业务理解": 0.3,
            "沟通协作": 0.2,
            "领导力": 0.1
        }}
    }}
    
    JD内容：
    {text[:3000]}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        data = eval(response.choices[0].message.content)
        
        return JDData(
            id=f"jd-{hash(text) % 100000}",
            basics=JDBasics(**data.get("basics", {})),
            hardSkills=data.get("hardSkills", []),
            softSkills=data.get("softSkills", []),
            businessRequirements=data.get("businessRequirements", []),
            coreResponsibilities=data.get("coreResponsibilities", []),
            hiddenRequirements=data.get("hiddenRequirements", []),
            abilityWeights=data.get("abilityWeights", {}),
            rawText=text
        )
    except Exception as e:
        return get_fallback_jd(text)


def get_fallback_jd(text: str) -> JDData:
    return JDData(
        id="jd-fallback",
        basics=JDBasics(
            title="职位名称",
            company="公司名称",
            salary="面议",
            location="未知",
            experience="未知"
        ),
        hardSkills=["未识别"],
        softSkills=["未识别"],
        businessRequirements=[],
        coreResponsibilities=[],
        hiddenRequirements=[],
        abilityWeights={},
        rawText=text
    )
