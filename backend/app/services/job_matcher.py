from typing import List
from app.models.types import Job, JobFilters

MOCK_JOBS = [
    Job(
        id="job-001",
        title="推荐系统算法专家",
        company="美团",
        location="北京",
        salary="60-90K·15薪",
        experience="5年以上",
        tags=["推荐系统", "机器学习", "大数据"],
        matchScore=92,
        url="https://example.com/job/1",
        postedDate="3天前"
    ),
    Job(
        id="job-002",
        title="高级推荐算法工程师",
        company="快手",
        location="北京",
        salary="50-80K·16薪",
        experience="3-5年",
        tags=["推荐系统", "深度学习", "算法优化"],
        matchScore=88,
        url="https://example.com/job/2",
        postedDate="1周前"
    ),
    Job(
        id="job-003",
        title="算法工程师-用户增长",
        company="拼多多",
        location="上海",
        salary="55-85K·14薪",
        experience="3-5年",
        tags=["用户增长", "算法", "数据分析"],
        matchScore=75,
        url="https://example.com/job/3",
        postedDate="2周前"
    ),
    Job(
        id="job-004",
        title="资深推荐算法工程师",
        company="小红书",
        location="上海",
        salary="50-75K·15薪",
        experience="4年以上",
        tags=["推荐系统", "内容推荐", "NLP"],
        matchScore=82,
        url="https://example.com/job/4",
        postedDate="5天前"
    ),
    Job(
        id="job-005",
        title="机器学习平台工程师",
        company="蚂蚁集团",
        location="杭州",
        salary="45-70K·16薪",
        experience="3-5年",
        tags=["机器学习平台", "系统架构", "分布式"],
        matchScore=68,
        url="https://example.com/job/5",
        postedDate="1个月前"
    ),
]


async def search_jobs(filters: JobFilters) -> tuple[List[Job], int]:
    results = MOCK_JOBS.copy()
    
    if filters.keyword:
        keyword = filters.keyword.lower()
        results = [
            job for job in results
            if keyword in job.title.lower() or
               keyword in job.company.lower() or
               any(keyword in tag.lower() for tag in job.tags)
        ]
    
    if filters.city:
        results = [job for job in results if filters.city in job.location]
    
    if filters.experience:
        results = [job for job in results if filters.experience in job.experience]
    
    results.sort(key=lambda x: x.matchScore or 0, reverse=True)
    
    return results, len(results)
