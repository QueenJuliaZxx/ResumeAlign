import type { ResumeData, JDData, ComparisonResult, InterviewGuide, Job } from '../types';

export const mockResume: ResumeData = {
  id: 'resume-001',
  name: '张明',
  email: 'zhangming@example.com',
  phone: '138-0013-8000',
  education: [
    {
      school: '清华大学',
      major: '计算机科学与技术',
      degree: '硕士',
      duration: '2018-2021',
    },
    {
      school: '北京邮电大学',
      major: '软件工程',
      degree: '学士',
      duration: '2014-2018',
    },
  ],
  experience: [
    {
      company: '字节跳动',
      title: '高级算法工程师',
      duration: '2021-至今',
      highlights: [
        '负责抖音推荐系统优化，用户停留时长提升15%',
        '设计并实现实时特征工程系统，日处理数据量10亿+',
        '主导AB测试平台建设，支持100+实验并行运行',
        '团队技术分享，主导算法工程化最佳实践',
      ],
    },
    {
      company: '阿里巴巴',
      title: '算法工程师',
      duration: '2019-2021',
      highlights: [
        '参与淘宝搜索排序优化，GMV提升8%',
        '开发商品相似度计算模块，应用至多个业务线',
      ],
    },
    {
      company: '腾讯',
      title: '实习算法工程师',
      duration: '2018-2019',
      highlights: [
        '微信看一看推荐系统特征工程',
        '用户画像标签体系建设',
      ],
    },
  ],
  skills: {
    hard: ['Python', 'C++', 'TensorFlow', 'PyTorch', 'SQL', 'Spark', 'Flink', 'Redis', 'Kafka'],
    soft: ['沟通能力', '团队协作', '问题解决', '自驱力'],
  },
  projects: [
    {
      name: '抖音推荐系统2.0',
      description: '基于深度学习的短视频推荐系统，实现用户兴趣精准预测',
      technologies: ['TensorFlow', 'Parameter Server', 'Redis', 'Kafka'],
    },
    {
      name: '实时特征计算平台',
      description: '高性能实时特征工程系统，支持毫秒级特征更新',
      technologies: ['Flink', 'Kafka', 'Redis', 'HBase'],
    },
  ],
  summary: '6年推荐系统算法经验，专注于大规模机器学习系统设计与实现',
};

export const mockJD: JDData = {
  id: 'jd-001',
  basics: {
    title: '推荐系统算法专家',
    company: '某头部互联网公司',
    salary: '50-80K·16薪',
    location: '北京',
    experience: '5年以上',
  },
  hardSkills: [
    '扎实的机器学习理论基础',
    '深度学习推荐系统（CTR/CVR）',
    '大规模分布式系统设计',
    'Python/C++/Java开发',
    '熟悉TensorFlow/PyTorch',
    'SQL及大数据处理（Spark/Flink）',
  ],
  softSkills: [
    '优秀的逻辑思维和表达能力',
    '良好的团队协作能力',
    '较强的自驱力和学习能力',
    '抗压能力强',
  ],
  businessRequirements: [
    '推荐系统全链路优化经验',
    '用户增长/留存指标优化经验',
    '数据驱动决策能力',
  ],
  coreResponsibilities: [
    '负责推荐系统核心算法研发',
    '优化推荐模型效果和系统性能',
    '设计并实现用户画像和特征工程',
    '推动算法技术在业务中的应用落地',
  ],
  hiddenRequirements: [
    '有从0到1搭建推荐系统经验优先',
    '有开源项目贡献经验优先',
    '有顶会论文发表经验优先',
  ],
  abilityWeights: {
    '技术深度': 0.4,
    '业务理解': 0.3,
    '系统设计': 0.2,
    '沟通协作': 0.1,
  },
};

export const mockComparison: ComparisonResult = {
  matchScore: 85,
  highlights: [
    '6年推荐系统经验，与岗位要求高度匹配',
    '抖音推荐系统实战经验，熟悉业界最佳实践',
    '具备大规模分布式系统设计能力',
    '主导AB测试平台建设，数据驱动能力强',
  ],
  strengths: [
    '推荐系统实战经验丰富，有完整的项目闭环经验',
    '技术栈与岗位要求高度匹配（TensorFlow、Spark、Flink）',
    '有大型系统架构设计经验',
    '具备良好的技术输出和团队分享能力',
  ],
  weaknesses: [
    '缺乏顶会论文发表经验',
    '没有从0到1搭建推荐系统的完整经验',
  ],
  gaps: [
    { requirement: '从0到1搭建推荐系统', current: '参与优化现有系统', gapLevel: 'medium' },
    { requirement: '顶会论文发表', current: '无相关经验', gapLevel: 'high' },
    { requirement: '开源项目贡献', current: '无相关记录', gapLevel: 'medium' },
  ],
  atsKeywords: [
    '推荐系统', '个性化推荐', 'CTR/CVR', '深度学习', '特征工程',
    'AB测试', '用户增长', '分布式系统', '机器学习平台', '召回排序',
  ],
  starSuggestions: [
    {
      context: '抖音推荐系统优化项目',
      situation: '抖音日活3亿，推荐系统面临用户粘性提升瓶颈',
      task: '需要优化推荐模型，提升用户停留时长',
      action: '设计并实现了基于Transformer的多兴趣序列模型，引入实时特征更新机制',
      result: '用户停留时长提升15%，DAU提升5%',
    },
  ],
  optimizationSuggestions: [
    '在项目经历中突出「从0到1」的贡献点',
    '量化每一项工作的业务价值',
    '补充大数据处理量的具体数字',
    '增加系统设计相关描述',
  ],
};

export const mockInterview: InterviewGuide = {
  questions: [
    {
      question: '请详细介绍你负责的抖音推荐系统优化项目，包括技术架构和你的核心贡献',
      type: 'technical',
      focus: '推荐系统架构、算法设计能力',
    },
    {
      question: '如何解决推荐系统中的冷启动问题？',
      type: 'technical',
      focus: '算法深度理解',
    },
    {
      question: '你设计的实时特征工程系统是如何保证低延迟和高可用的？',
      type: 'technical',
      focus: '系统设计能力',
    },
    {
      question: '在AB测试中如何确定实验结果的统计显著性？遇到过实验结果不显著的情况怎么处理？',
      type: 'technical',
      focus: '数据分析和问题解决能力',
    },
    {
      question: '请描述一个你主导的项目中遇到的最大技术挑战，以及你是如何解决的',
      type: 'behavioral',
      focus: '问题解决能力和技术判断力',
    },
    {
      question: '你为什么考虑新的机会？对这个岗位有什么期望？',
      type: 'hr',
      focus: '职业规划和动机',
    },
  ],
  frameworks: {
    '项目介绍': 'STAR法则 + 数据量化',
    '技术深度': '背景 → 技术选型 → 实现细节 → 效果验证',
    '系统设计': '需求分析 → 架构设计 → 关键技术点 → 扩展性考虑',
    '问题解决': '问题定义 → 原因分析 → 解决方案 → 结果评估',
  },
  weakResponses: [
    {
      weakness: '没有从0到1搭建推荐系统的经验',
      response: '虽然没有独立从0搭建，但通过参与抖音推荐系统2.0项目，我完整经历了系统重构的全过程，包括需求分析、架构设计、算法实现和上线优化。在这个过程中，我主导了核心排序模型的升级，从0.18版本迭代到0.22版本，这个升级本质上是一次系统的重新设计和实现。',
    },
    {
      weakness: '没有顶会论文发表',
      response: '我的优势在于工程落地能力。我主导的实时特征工程系统已经在抖音生产环境稳定运行2年多，日处理数据量达到10亿+。我认为技术价值的最终体现是解决实际问题，我更倾向于将精力放在能产生实际业务价值的项目上。',
    },
  ],
  preparationPoints: [
    '推荐系统核心算法：DIN、DIEN、DSIN等序列模型原理',
    '深度学习框架：TensorFlow Parameter Server架构',
    '特征工程：用户行为序列处理、实时特征计算',
    'AB测试：统计显著性、流量分配、指标选择',
    '系统设计：分布式训练、在线预估、特征存储',
  ],
};

export const mockJobs: Job[] = [
  {
    id: 'job-001',
    title: '推荐系统算法专家',
    company: '美团',
    location: '北京',
    salary: '60-90K·15薪',
    experience: '5年以上',
    tags: ['推荐系统', '机器学习', '大数据'],
    matchScore: 92,
    url: '#',
    postedDate: '3天前',
  },
  {
    id: 'job-002',
    title: '高级推荐算法工程师',
    company: '快手',
    location: '北京',
    salary: '50-80K·16薪',
    experience: '3-5年',
    tags: ['推荐系统', '深度学习', '算法优化'],
    matchScore: 88,
    url: '#',
    postedDate: '1周前',
  },
  {
    id: 'job-003',
    title: '算法工程师-用户增长',
    company: '拼多多',
    location: '上海',
    salary: '55-85K·14薪',
    experience: '3-5年',
    tags: ['用户增长', '算法', '数据分析'],
    matchScore: 75,
    url: '#',
    postedDate: '2周前',
  },
  {
    id: 'job-004',
    title: '资深推荐算法工程师',
    company: '小红书',
    location: '上海',
    salary: '50-75K·15薪',
    experience: '4年以上',
    tags: ['推荐系统', '内容推荐', 'NLP'],
    matchScore: 82,
    url: '#',
    postedDate: '5天前',
  },
  {
    id: 'job-005',
    title: '机器学习平台工程师',
    company: '蚂蚁集团',
    location: '杭州',
    salary: '45-70K·16薪',
    experience: '3-5年',
    tags: ['机器学习平台', '系统架构', '分布式'],
    matchScore: 68,
    url: '#',
    postedDate: '1个月前',
  },
];
