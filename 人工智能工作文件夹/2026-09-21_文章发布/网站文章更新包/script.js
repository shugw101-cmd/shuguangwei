const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const searchInput = document.querySelector("#site-search-input");
const searchResults = document.querySelector("#site-search-results");
const searchForm = document.querySelector(".site-search-form");

const searchPages = [
{
  "title": "法院一定会按照医疗损害鉴定的参与度判决吗？",
  "category": "医疗损害鉴定 · 鉴定结果与异议",
  "url": "medical-appraisal/court-participation-ratio.html",
  "summary": "鉴定意见中的参与度并不等同于法院最终确定的责任比例。应当审查数字背后的事实和专业分析，并结合全案证据理解责任判断。",
  "keywords": "医疗损害鉴定 参与度 原因力 责任比例 法院 重新鉴定 条件 书面异议 质证 鉴定人出庭"
},
{
  "title": "法院不同意重新鉴定，还有其他办法吗？",
  "category": "医疗损害鉴定 · 重新鉴定与程序",
  "url": "medical-appraisal/reappraisal-refused.html",
  "summary": "法院没有同意重新鉴定，并不意味着必须完整接受鉴定意见。围绕具体疑问，还可以通过解释、出庭质证及全案证据审查等方式解决。",
  "keywords": "医疗损害鉴定 参与度 原因力 责任比例 法院 重新鉴定 条件 书面异议 质证 鉴定人出庭"
},
{
  "title": "什么情况下可以申请医疗损害重新鉴定？",
  "category": "医疗损害鉴定 · 重新鉴定与程序",
  "url": "medical-appraisal/reappraisal-conditions.html",
  "summary": "对鉴定结果不满意，并不当然构成重新鉴定的理由。先审查资格、程序和依据等具体问题，再判断能否通过解释、补充或者质证解决。",
  "keywords": "医疗损害鉴定 参与度 原因力 责任比例 法院 重新鉴定 条件 书面异议 质证 鉴定人出庭"
},
{
  "title": "医疗损害鉴定中的“参与度”是什么意思？",
  "category": "医疗损害鉴定 · 原因力与参与度",
  "url": "medical-appraisal/participation-meaning.html",
  "summary": "参与度主要回答医方过错对损害后果起了多大作用。比百分比更重要的是，理解患者自身因素、医疗过错和其他因素如何共同影响损害结果。",
  "keywords": "医疗损害鉴定 参与度 原因力 责任比例 法院 重新鉴定 条件 书面异议 质证 鉴定人出庭"
},
{
  "title": "对医疗损害鉴定意见有异议，第一步应该做什么？",
  "category": "医疗损害鉴定 · 鉴定结果与异议",
  "url": "medical-appraisal/objection-first-step.html",
  "summary": "“我不同意”，和“这份鉴定意见存在什么问题”，是两件不同的事情。把病历和鉴定意见放在一起，从事实、医学判断、因果关系和原因力大小入手，重新梳理诊疗时间线，再考虑异议与重新鉴定程序。",
  "keywords": "鉴定意见 异议 第一步 病历 事实 医学判断 因果关系 原因力 诊疗时间线 书面异议 重新鉴定"
},
  {
  "title": "真实案例：医疗损害鉴定已经作出，结果不满意，还有办法吗？——一个从40%到60%的真实案件",
  "category": "医疗损害鉴定 · 真实案例",
  "url": "medical-appraisal/case-40-to-60.html",
  "summary": "医疗损害鉴定已经作出，并不意味着结果就一定无法改变。不是因为患者“觉得40%太低”，而是要看这份鉴定意见的事实基础、医学判断和推理过程，究竟有没有值得质疑的地方。",
  "keywords": "医疗损害鉴定 真实案例 原因力 参与度 鉴定人出庭 重新鉴定"
},
  {
  "title": "对医疗损害鉴定结果不满意，怎么办？",
  "category": "医疗损害鉴定 · 鉴定结果与异议",
  "url": "medical-appraisal/result-disagreement.html",
  "summary": "医疗损害鉴定结果对患方不利，并不意味着案件一定没有继续争取的空间。但首先需要明确一点：“对结果不满意”和“鉴定意见存在可以质疑的问题”不是一回事。真正需要审查的通常是鉴定意见的依据和推理过程。",
  "keywords": "医疗损害鉴定 结果异议 参与度 原因力 鉴定人出庭 重新鉴定"
},
  {
    title: "医疗损害鉴定",
    category: "医疗纠纷知识库",
    url: "medical-appraisal/",
    summary: "按鉴定结果异议、重新鉴定、鉴定人出庭、原因力与诊疗过错查找专题选题。",
    keywords: "医疗损害鉴定 鉴定异议 参与度 原因力 重新鉴定 鉴定人出庭"
  },
  {
    title: "为什么要做“医疗纠纷案件初步评估”？",
    category: "初步评估说明",
    url: "articles/initial-assessment.html",
    summary: "判断医疗过错可能、继续处理必要和最合适的处理路径。",
    keywords: "医疗纠纷 初步评估 医院责任 过错 鉴定 路径"
  },
  {
    title: "发生医疗纠纷后，患方记住这 3 点很重要",
    category: "患方维权指引",
    url: "articles/three-points.html",
    summary: "病历封存、尸检判断、保持理性，是医疗维权早期的基础。",
    keywords: "患方 维权 病历 封存 尸检 医闹 私了 社交媒体"
  },
  {
    title: "患方怀疑医院的病历不真实，怎么办？",
    category: "患方维权指引",
    url: "articles/no-assessment-no-litigation.html",
    summary: "区分病历瑕疵、篡改和伪造，通过封存、质证、鉴定与法律规则处理。",
    keywords: "病历 不真实 造假 篡改 伪造 质证 鉴定"
  },
  {
    title: "医疗纠纷案件初步评估",
    category: "服务产品",
    url: "products/initial-assessment.html",
    summary: "初步评估不是承诺胜诉或赔偿金额，而是帮助看清事实、证据、风险和下一步路径。",
    keywords: "产品 评估 病历 诊疗经过 医疗纠纷 风险 路径"
  },
  {
    title: "服务产品目录",
    category: "产品目录",
    url: "products.html",
    summary: "查看医疗纠纷案件初步评估等服务产品。",
    keywords: "产品目录 服务产品 初步评估"
  },
  {
    title: "医疗健康法律服务",
    category: "服务领域",
    url: "services.html",
    summary: "围绕医疗纠纷处理、医疗机构风险防控和医患沟通场景提供法律服务。",
    keywords: "服务 医疗纠纷 医疗机构 风险防控 医患沟通 合规 养老 医药"
  },
  {
    title: "医疗纠纷案件代理",
    category: "服务详情",
    url: "services/medical-disputes.html",
    summary: "围绕医学事实、证据组织、责任判断和程序路径提供医疗纠纷法律支持。",
    keywords: "医疗纠纷 代理 医疗损害 医疗事故 证据 鉴定"
  },
  {
    title: "医疗机构法律顾问",
    category: "服务详情",
    url: "services/hospital-counsel.html",
    summary: "为医院、诊所、医科院校等主体提供日常法律顾问、风险防控和纠纷预防。",
    keywords: "医疗机构 法律顾问 医院 诊所 风险防控"
  },
  {
    title: "医疗风险与医患沟通顾问",
    category: "服务详情",
    url: "services/risk-communication.html",
    summary: "围绕医疗风险识别、沟通方案、争议预防和纠纷早期处理提供支持。",
    keywords: "医疗风险 医患沟通 纠纷预防 风险顾问"
  },
  {
    title: "医药与药事合规",
    category: "服务详情",
    url: "services/pharma-compliance.html",
    summary: "围绕药品生产经营合规、合同与制度审查、监管应对和争议解决提供法律支持。",
    keywords: "医药 药事 合规 药品 监管 合同"
  },
  {
    title: "养老健康产业法律服务",
    category: "服务详情",
    url: "services/elderly-care.html",
    summary: "为养老机构及健康服务主体提供运营合规、服务合同、风险管理和争议处理支持。",
    keywords: "养老 健康 产业 法律服务 运营合规 服务合同"
  },
  {
    title: "关于舒广伟律师",
    category: "个人履历",
    url: "about.html",
    summary: "了解医疗临床实践、医疗行政管理、法律教学研究与律师实务背景。",
    keywords: "舒广伟 律师 履历 临床 管理 教学 法律"
  }
];

function renderSearchResults(query) {
  if (!searchResults) return;

  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    searchResults.innerHTML = "";
    return;
  }

  const matches = cleanQuery
    ? searchPages.filter((item) => `${item.title} ${item.category} ${item.summary} ${item.keywords}`.toLowerCase().includes(cleanQuery))
    : [];

  if (!matches.length) {
    searchResults.innerHTML = '<div class="search-empty">暂未找到匹配内容。可以换用“病历”“评估”“医疗纠纷”等关键词。</div>';
    return;
  }

  searchResults.innerHTML = matches.map((item) => `
    <a class="search-result" href="${item.url}">
      <small>${item.category}</small>
      <strong>${item.title}</strong>
      <p>${item.summary}</p>
    </a>
  `).join("");
}

if (searchInput && searchResults) {
  renderSearchResults("");

  searchInput.addEventListener("input", () => {
    renderSearchResults(searchInput.value);
  });
}

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderSearchResults(searchInput.value);
  });
}
