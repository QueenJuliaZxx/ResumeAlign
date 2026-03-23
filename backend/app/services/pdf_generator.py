from fastapi import BackgroundTasks
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
import os
from datetime import datetime


async def generate_pdf_report(report_type: str, data: dict, background_tasks: BackgroundTasks) -> str:
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"report_{report_type}_{timestamp}.pdf"
    filepath = os.path.join("reports", filename)
    
    os.makedirs("reports", exist_ok=True)
    
    if report_type == "comparison":
        doc = SimpleDocTemplate(filepath, pagesize=A4)
        story = build_comparison_report(data)
        doc.build(story)
    else:
        doc = SimpleDocTemplate(filepath, pagesize=A4)
        story = build_interview_report(data)
        doc.build(story)
    
    return f"/reports/{filename}"


def build_comparison_report(data: dict):
    styles = getSampleStyleSheet()
    story = []
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30
    )
    
    story.append(Paragraph("简历-JD对比分析报告", title_style))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph(f"匹配度: {data.get('matchScore', 0)}%", styles['Heading2']))
    story.append(Spacer(1, 0.3*cm))
    
    story.append(Paragraph("匹配亮点", styles['Heading3']))
    for h in data.get('highlights', []):
        story.append(Paragraph(f"• {h}", styles['BodyText']))
    story.append(Spacer(1, 0.3*cm))
    
    story.append(Paragraph("差距分析", styles['Heading3']))
    for gap in data.get('gaps', []):
        story.append(Paragraph(
            f"• {gap.get('requirement', '')} (差距: {gap.get('gapLevel', '')})",
            styles['BodyText']
        ))
    story.append(Paragraph(f"现状: {gap.get('current', '')}", styles['BodyText']))
    story.append(Spacer(1, 0.3*cm))
    
    story.append(Paragraph("ATS关键词", styles['Heading3']))
    keywords = ", ".join(data.get('atsKeywords', []))
    story.append(Paragraph(keywords, styles['BodyText']))
    
    return story


def build_interview_report(data: dict):
    styles = getSampleStyleSheet()
    story = []
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30
    )
    
    story.append(Paragraph("面试准备指导", title_style))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph("高频面试题", styles['Heading3']))
    for q in data.get('questions', []):
        story.append(Paragraph(f"Q: {q.get('question', '')}", styles['BodyText']))
        story.append(Paragraph(f"类型: {q.get('type', '')} | 考察: {q.get('focus', '')}", styles['BodyText']))
        story.append(Spacer(1, 0.2*cm))
    story.append(Spacer(1, 0.3*cm))
    
    story.append(Paragraph("备战重点", styles['Heading3']))
    for point in data.get('preparationPoints', []):
        story.append(Paragraph(f"• {point}", styles['BodyText']))
    
    return story
