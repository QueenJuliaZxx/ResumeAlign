from typing import Optional
import io
import docx
import pdfplumber
from openai import OpenAI
import os
from app.models.types import ResumeData, Education, Experience, Project, Skills

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "dummy-key"))


async def parse_resume(text: Optional[str], file) -> ResumeData:
    if file:
        content = await file.read()
        if file.filename.endswith('.pdf'):
            text = extract_text_from_pdf(content)
        elif file.filename.endswith('.docx'):
            text = extract_text_from_docx(content)
    
    if text:
        return await parse_with_ai(text)
    
    raise ValueError("No text provided")


def extract_text_from_pdf(content: bytes) -> str:
    text = ""
    with pdfplumber.open(io.BytesIO(content)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text


def extract_text_from_docx(content: bytes) -> str:
    doc = docx.Document(io.BytesIO(content))
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text


async def parse_with_ai(text: str) -> ResumeData:
    prompt = f"""请从以下简历文本中提取结构化信息，返回JSON格式：
    {{
        "name": "姓名",
        "email": "邮箱",
        "phone": "电话",
        "education": [{{"school": "学校", "major": "专业", "degree": "学位", "duration": "时间"}}],
        "experience": [{{"company": "公司", "title": "职位", "duration": "时间", "highlights": ["工作亮点"]}}],
        "skills": {{"hard": ["硬技能"], "soft": ["软技能"]}},
        "projects": [{{"name": "项目名", "description": "描述", "technologies": ["技术"]}}],
        "summary": "个人简介"
    }}
    
    简历内容：
    {text[:3000]}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        data = eval(response.choices[0].message.content)
        
        return ResumeData(
            id=f"resume-{hash(text) % 100000}",
            name=data.get("name", ""),
            email=data.get("email", ""),
            phone=data.get("phone", ""),
            education=[Education(**e) for e in data.get("education", [])],
            experience=[Experience(**e) for e in data.get("experience", [])],
            skills=Skills(**data.get("skills", {"hard": [], "soft": []})),
            projects=[Project(**p) for p in data.get("projects", [])],
            summary=data.get("summary"),
            rawText=text
        )
    except Exception as e:
        return get_fallback_resume(text)


def get_fallback_resume(text: str) -> ResumeData:
    return ResumeData(
        id="resume-fallback",
        name="未识别",
        email="",
        phone="",
        education=[],
        experience=[],
        skills=Skills(hard=[], soft=[]),
        projects=[],
        summary="解析失败，请手动输入",
        rawText=text
    )
