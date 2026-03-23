# ResumeAlign - AI智能求职系统

## 1. 概念与愿景

**ResumeAlign** 是一款面向求职者的AI驱动求职辅助平台，以"精准匹配、高效求职"为核心理念。通过AI技术实现从简历解析、岗位匹配、JD深度分析到面试指导的全流程闭环，帮助求职者在竞争激烈的就业市场中脱颖而出。

产品调性：**专业可信**、**高效务实**、**简洁直观**。界面设计追求"功能即美学"，让复杂的数据处理呈现为清晰的视觉语言。

## 2. 设计语言

### 美学方向
采用**数据仪表盘风格**，融合现代SaaS产品设计理念。大量使用卡片式布局展示结构化数据，辅以进度条、雷达图等可视化元素。整体呈现专业、可靠、高效的视觉感受。

### 色彩系统
```
Primary:     #6366F1 (Indigo-500) - 主要操作、强调
Secondary:   #10B981 (Emerald-500) - 成功状态、匹配度高
Accent:      #F59E0B (Amber-500) - 警示、重点标注
Danger:      #EF4444 (Red-500) - 差距大、需改进
Background:  #F8FAFC (Slate-50) - 页面背景
Surface:     #FFFFFF - 卡片背景
Text-Primary:#1E293B (Slate-800)
Text-Secondary:#64748B (Slate-500)
Border:      #E2E8F0 (Slate-200)
```

### 字体
- 标题: Inter, -apple-system, sans-serif (Weight: 600-700)
- 正文: Inter, -apple-system, sans-serif (Weight: 400-500)
- 代码/数据: JetBrains Mono, monospace

### 间距系统
- 基础单位: 4px
- 页面边距: 24px (mobile) / 48px (desktop)
- 卡片间距: 16px
- 卡片内边距: 24px
- 组件间距: 12px

### 动效哲学
- **状态反馈**: 按钮悬停、加载中状态 (150ms ease-out)
- **页面切换**: 淡入淡出 (200ms ease-in-out)
- **数据加载**: 骨架屏占位
- **结果展示**: 依次渐显 (stagger 50ms)

### 视觉资产
- 图标库: Lucide React (线性风格，2px描边)
- 插图: 简约线条插画为主
- 图表: Ant Design Charts / Recharts

## 3. 布局与结构

### 整体架构
```
┌─────────────────────────────────────────┐
│  Header (固定)                           │
│  Logo | 导航 | 用户状态                  │
├─────────────────────────────────────────┤
│                                         │
│  Main Content Area                      │
│  (根据页面类型动态布局)                   │
│                                         │
├─────────────────────────────────────────┤
│  Footer (可选)                           │
└─────────────────────────────────────────┘
```

### 页面类型
1. **首页**: 3列功能入口 + 快速流程引导
2. **解析页**: 左侧输入/上传区 + 右侧实时预览区
3. **对比页**: 左简历右JD + 底部对比结果
4. **报告页**: 卡片瀑布流 + 导出工具栏

### 响应式策略
- Desktop (>1024px): 多列布局，侧边面板
- Tablet (768-1024px): 双列自适应
- Mobile (<768px): 单列堆叠，底部工具栏

## 4. 功能与交互

### 4.1 首页 (/)
**功能**: 快速入口 + 流程引导
**元素**:
- Hero区域: 产品标语 + 主CTA按钮
- 三大核心功能卡片(简历解析/JD解析/对比分析)
- 快速流程示意(3步完成)
- 最近分析记录(如有)

**交互**:
- 点击功能卡片 → 跳转对应页面
- 主CTA → 进入简历上传页
- hover卡片 → 轻微上浮 + 阴影加深

### 4.2 简历上传页 (/resume/upload)
**功能**: 简历上传 + 基础信息提取
**元素**:
- 拖拽上传区(支持PDF/DOCX)
- 或文本粘贴区
- 上传进度条
- 解析后简历预览卡片

**交互**:
- 拖拽文件 → 显示预览 + 自动解析
- 粘贴文本 → 实时解析
- 点击"开始解析" → 显示loading → 结果展示

### 4.3 JD解析页 (/jd/parser)
**功能**: JD智能解析
**元素**:
- 文本输入区(支持粘贴或导入)
- 一键从匹配岗位导入
- 解析结果卡片组:
  - 基础信息卡片
  - 技能要求卡片(硬技能/软技能)
  - 核心职责卡片
  - 隐性需求卡片
  - 能力权重雷达图

**交互**:
- 粘贴JD → 自动解析(300ms debounce)
- 点击"一键匹配" → 跳转岗位匹配页
- 点击"开始对比" → 保存JD + 跳转对比页

### 4.4 对比分析页 (/compare)
**功能**: 简历-JD深度对比
**元素**:
- 左侧: 简历结构化信息
- 右侧: JD结构化信息
- 底部: 对比分析结果
  - 匹配分(0-100) + 环形进度图
  - 匹配亮点列表(绿色)
  - 差距分析列表(红色/橙色)
  - ATS关键词优化建议
  - STAR法则重构建议

**交互**:
- 查看某项差距 → 高亮对应简历内容
- 点击"生成面试题" → 跳转面试指导页
- 点击"导出PDF" → 生成并下载报告

### 4.5 面试指导页 (/interview)
**功能**: 面试准备指导
**元素**:
- 高频面试题卡片列表(分技术面/HR面)
- 应答框架模板
- 短板应对话术
- 备战重点清单

**交互**:
- 点击题目 → 展开参考答案提示
- 点击"导出全部" → 导出面试准备PDF

### 4.6 岗位匹配页 (/match)
**功能**: AI岗位匹配抓取
**元素**:
- 搜索条件表单(城市/薪资/经验/岗位)
- 或上传简历自动提取意向
- 匹配岗位列表(卡片式)
  - 岗位基本信息
  - 匹配度评分
  - 一键解析JD

**交互**:
- 填写条件 → 实时搜索(500ms debounce)
- 点击岗位卡片 → 查看详情/一键解析JD
- 点击"批量导入" → 选择多个岗位对比

## 5. 组件清单

### 通用组件
| 组件 | 状态 | 说明 |
|------|------|------|
| Button | default/hover/active/disabled/loading | 主按钮、次按钮、幽灵按钮 |
| Card | default/hover/selected | 通用卡片容器 |
| Input | default/focus/error/disabled | 文本输入框 |
| TextArea | default/focus/error | 多行文本输入 |
| Progress | - | 环形/线性进度 |
| Tag | skill/gap/strong | 技能标签/差距标签/优势标签 |
| Badge | - | 数字徽章 |
| Tooltip | - | 悬浮提示 |
| Modal | - | 模态框 |
| Toast | success/error/warning/info | 消息提示 |

### 业务组件
| 组件 | 说明 |
|------|------|
| ResumeCard | 简历预览卡片 |
| JDCard | JD预览卡片 |
| MatchCard | 匹配结果卡片(含评分) |
| ComparisonResult | 对比结果展示 |
| RadarChart | 能力权重雷达图 |
| SkillTag | 技能标签(可点击) |
| QuestionCard | 面试题卡片 |
| AnswerFramework | 应答框架模板 |

## 6. 技术方案

### 前端 (React 18 + TypeScript)
```
frontend/
├── src/
│   ├── components/       # 通用组件
│   │   ├── ui/          # 基础UI组件
│   │   └── business/    # 业务组件
│   ├── pages/           # 页面组件
│   ├── hooks/           # 自定义Hooks
│   ├── store/           # Zustand状态管理
│   ├── services/        # API服务层
│   ├── types/           # TypeScript类型定义
│   ├── utils/           # 工具函数
│   └── styles/          # 全局样式
├── public/
└── index.html
```

### 状态管理 (Zustand)
```typescript
interface AppState {
  resume: ResumeData | null;
  jd: JDData | null;
  comparison: ComparisonResult | null;
  interview: InterviewGuide | null;
  setResume: (data: ResumeData) => void;
  setJD: (data: JDData) => void;
  // ...
}
```

### API服务层
```typescript
// 简历解析
POST /api/resume/parse
Body: { file?: File, text?: string }
Response: ResumeData

// JD解析
POST /api/jd/parse
Body: { text: string }
Response: JDData

// 对比分析
POST /api/compare
Body: { resume: ResumeData, jd: JDData }
Response: ComparisonResult

// 面试指导
POST /api/interview/generate
Body: { comparison: ComparisonResult, resume: ResumeData, jd: JDData }
Response: InterviewGuide

// 岗位匹配
POST /api/match/jobs
Body: { filters: JobFilters }
Response: { jobs: Job[], total: number }

// PDF导出
POST /api/report/generate
Body: { type: 'comparison' | 'interview', data: any }
Response: { url: string }
```

### 后端 (FastAPI)
```
backend/
├── app/
│   ├── main.py           # 应用入口
│   ├── api/              # API路由
│   │   ├── resume.py
│   │   ├── jd.py
│   │   ├── compare.py
│   │   ├── interview.py
│   │   └── match.py
│   ├── services/        # 业务逻辑
│   ├── models/          # 数据模型
│   └── utils/           # 工具函数
├── requirements.txt
└── .env.example
```

### 数据模型
```typescript
interface ResumeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: Education[];
  experience: Experience[];
  skills: { hard: string[], soft: string[] };
  projects: Project[];
  summary?: string;
}

interface JDData {
  id: string;
  basics: {
    title: string;
    company: string;
    salary: string;
    location: string;
    experience: string;
  };
  hardSkills: string[];
  softSkills: string[];
  businessRequirements: string[];
  coreResponsibilities: string[];
  hiddenRequirements: string[];
  abilityWeights: Record<string, number>;
}

interface ComparisonResult {
  matchScore: number;
  highlights: string[];
  strengths: string[];
  weaknesses: string[];
  gaps: GapAnalysis[];
  atsKeywords: string[];
  starSuggestions: string[];
}

interface InterviewGuide {
  questions: InterviewQuestion[];
  frameworks: Record<string, string>;
  weakResponses: WeakResponse[];
  preparationPoints: string[];
}
```

## 7. 页面路由

| 路径 | 页面 | 访问权限 |
|------|------|---------|
| / | 首页 | 公开 |
| /resume/upload | 简历上传 | 公开 |
| /jd/parser | JD解析 | 公开 |
| /compare | 简历-JD对比 | 需要简历+JD |
| /interview | 面试指导 | 需要对比结果 |
| /match | 岗位匹配 | 公开 |

## 8. 隐私与合规

### 隐私保护
- 简历文件仅在本地处理，原始文件不上传服务器
- 仅传输结构化提取后的JSON数据
- 提供清晰的数据使用说明和隐私政策
- 支持用户删除所有存储数据

### 合规要求
- 不抓取招聘平台非公开数据
- 不生成虚假简历内容
- 不代写简历，仅提供优化建议
- 遵守各平台robots.txt规则
