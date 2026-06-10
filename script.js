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
    summary: "围绕病历资料、诊疗经过、争议焦点和处理路径形成初步判断。",
    keywords: "产品 评估 病历 诊疗经过 医疗纠纷"
  },
  {
    title: "服务产品目录",
    category: "产品目录",
    url: "products.html",
    summary: "查看已上线服务产品和后续产品预留入口。",
    keywords: "产品目录 服务产品 初步评估"
  },
  {
    title: "医疗健康法律服务",
    category: "服务领域",
    url: "services.html",
    summary: "医疗纠纷代理、医疗机构顾问、医药合规、养老健康产业法律服务。",
    keywords: "服务 医疗机构 顾问 合规 养老 医药"
  },
  {
    title: "医疗纠纷代理",
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
    title: "医药与药事合规",
    category: "服务详情",
    url: "services/pharma-compliance.html",
    summary: "围绕药事管理、药品经营、合同审查、行业监管和合规建设提供法律支持。",
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
