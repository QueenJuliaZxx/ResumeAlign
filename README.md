# ResumeAlign - AI 智能简历匹配平台

基于 AI 的简历分析与岗位匹配平台，帮助求职者优化简历、提升面试表现。

## 功能特性

- 📄 **简历解析** - 支持 PDF/Word 格式简历自动解析
- 📋 **JD 解析** - 职位描述关键信息提取
- 🎯 **智能匹配** - 简历与岗位匹配度分析
- 💡 **面试指南** - AI 生成面试问题和回答策略
- 🔍 **关键词优化** - ATS 友好度分析

## 技术栈

**前端**: React + TypeScript + Vite + TailwindCSS + Zustand

**后端**: FastAPI + Python

## 项目结构

```
ResumeAlign/
├── frontend/          # React 前端
│   ├── src/
│   │   ├── pages/     # 页面组件
│   │   ├── components/# UI 组件
│   │   ├── services/  # API 服务
│   │   ├── store/     # 状态管理
│   │   └── types/     # 类型定义
│   └── package.json
├── backend/           # FastAPI 后端
│   ├── app/
│   │   ├── api/       # API 路由
│   │   ├── models/    # 数据模型
│   │   └── services/  # 业务逻辑
│   └── requirements.txt
└── README.md
```

## 快速启动

### 1. 启动后端

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 启动前端

```bash
cd frontend
npm install
npm run dev
```

### 3. 访问项目

- 前端地址: http://localhost:5173
- 后端地址: http://localhost:8000
- API 文档: http://localhost:8000/docs

## 默认测试账号

- 邮箱: 15640657621@163.com
- 密码: Zxx995958657

## 页面说明

| 路径 | 说明 |
|------|------|
| `/` | 首页 |
| `/login` | 登录 |
| `/register` | 注册 |
| `/profile` | 个人资料 |
| `/resume/upload` | 简历上传解析 |
| `/jd/parser` | JD 解析 |
| `/compare` | 简历 JD 对比 |
| `/interview` | 面试指南 |
| `/match` | 岗位匹配 |

## 环境变量

### 后端 (.env)

```
SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-key
```

### 前端

前端默认连接 `http://localhost:8000`，如需修改请编辑 `frontend/src/services/api.ts`
