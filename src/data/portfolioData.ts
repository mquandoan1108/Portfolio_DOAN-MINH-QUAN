import { Project, Experience, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Doan Minh Quan',
  title: {
    vi: 'Business Quality Control Manager & Data Analyst',
    en: 'Business Quality Control Manager & Data Analyst',
  },
  tagline: {
    vi: 'Tối ưu hóa quy trình vận hành và kiểm soát chất lượng kinh doanh dựa trên phân tích dữ liệu thực chiến.',
    en: 'Optimizing operational workflows and business quality control powered by actionable data analytics.',
  },
  bio: {
    vi: 'Chuyên gia quản lý chất lượng và phân tích dữ liệu với nền tảng sâu rộng trong vận hành chuỗi cung ứng, đội xe logistics và hàng không. Kinh nghiệm thiết lập khung kiểm soát kinh doanh, xây dựng hệ thống báo cáo Power BI tự động, giảm 12% lãng phí vận hành và nâng cao tỷ suất lợi nhuận hợp đồng thương mại.',
    en: 'Quality control and business analytics professional with a strong track record across supply chain operations, fleet logistics, and aviation. Experienced in designing business control frameworks, building automated Power BI intelligence systems, slashing operational waste by 12%, and safeguarding commercial contract margins.',
  },
  email: 'doanminhquan1108@gmail.com',
  phone: '+84 848 209 339',
  phoneDisplay: '(+84) 848 209 339',
  linkedin: 'http://www.linkedin.com/in/quandoan1108',
  linkedinHandle: 'quandoan1108',
  location: {
    vi: 'TP. Hồ Chí Minh, Việt Nam',
    en: 'Ho Chi Minh City, Vietnam',
  },
  heroImage: '/src/assets/images/hero_portrait_1791794365492.jpg',
  stats: [
    {
      value: '99.65%',
      label: {
        vi: 'SLA & KPI Hoàn thành Đội xe',
        en: 'Fleet SLA & KPI Fulfillment',
      },
      subtext: {
        vi: 'Kết nối mạng lưới liên tỉnh',
        en: 'Inter-provincial network dispatch',
      },
    },
    {
      value: '-12%',
      label: {
        vi: 'Lãng phí vận hành cắt giảm',
        en: 'Operational Waste Reduced',
      },
      subtext: {
        vi: 'Nhờ hệ thống cảnh báo BI tự động',
        en: 'Via automated BI alert systems',
      },
    },
    {
      value: '+4%',
      label: {
        vi: 'Biên lợi nhuận dự án mới',
        en: 'Initial Profit Margin Boost',
      },
      subtext: {
        vi: 'Thẩm định P&L trước khi ký kết',
        en: 'Pre-signing P&L risk modeling',
      },
    },
    {
      value: '15',
      label: {
        vi: 'Chi nhánh tỉnh điều phối',
        en: 'Provincial Hubs Coordinated',
      },
      subtext: {
        vi: 'Mạng lưới Cross-docking toàn diện',
        en: 'Full-scale cross-docking matrix',
      },
    },
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: {
      vi: 'Business Quality Control Manager',
      en: 'Business Quality Control Manager',
    },
    company: 'Viettel Logistics',
    location: 'TP. Hồ Chí Minh',
    period: {
      vi: '04/2025 – Hiện tại',
      en: 'Apr 2025 – Present',
    },
    isCurrent: true,
    highlights: {
      vi: [
        'Cố vấn chiến lược cho Ban Giám đốc trong việc định hình chiến lược lợi nhuận, tái cơ cấu và điều phối đội xe thương mại.',
        'Thiết lập hệ thống kiểm soát chất lượng dữ liệu chuyến xe, tự động phát hiện các điểm nghẽn hiệu suất và đề xuất kịch bản cải thiện theo thời gian thực.',
        'Xây dựng Dashboard Business Intelligence (Power BI) tự động tích hợp hệ thống cảnh báo sớm, giúp cắt giảm 12% lãng phí chi phí vận hành.',
        'Thẩm định hồ sơ doanh thu/chi phí khách hàng (P&L Simulation) trước khi ký kết hợp đồng thương mại, giúp nâng cao 4% biên lợi nhuận ban đầu.',
      ],
      en: [
        'Strategic advisor to the Executive Board on profitability optimization, fleet restructuring, and commercial asset allocation.',
        'Designed data-driven trip audit mechanisms, identifying operational bottlenecks and recommending instant corrective protocols.',
        'Engineered automated Power BI executive dashboards with bottleneck alert engines, driving a 12% reduction in operational waste.',
        'Conducted pre-deal financial feasibility and P&L simulations for commercial client contracts, boosting initial gross margin by 4%.',
      ],
    },
    coreSkills: ['Business Intelligence', 'Power BI', 'P&L Modeling', 'Operational Quality Control', 'Executive Reporting', 'Fleet Strategy'],
    metrics: [
      {
        value: '-12%',
        label: { vi: 'Lãng phí chi phí vận hành', en: 'Operational waste reduction' },
      },
      {
        value: '+4%',
        label: { vi: 'Biên lợi nhuận hợp đồng mới', en: 'New deal profit margin boost' },
      },
    ],
  },
  {
    id: 'exp-2',
    role: {
      vi: 'Fleet Team Leader',
      en: 'Fleet Team Leader',
    },
    company: 'Viettel Logistics',
    location: 'TP. Hồ Chí Minh',
    period: {
      vi: '04/2024 – 04/2025',
      en: 'Apr 2024 – Apr 2025',
    },
    highlights: {
      vi: [
        'Chỉ huy điều phối và giám sát vận hành kết nối chéo (cross-docking) giữa 15 chi nhánh tỉnh với lưu lượng hàng hóa cao.',
        'Đạt tỷ lệ hoàn thành KPI đội xe xuất sắc 99.65% (bao gồm chỉ số kết nối đúng giờ, định mức sử dụng tài sản xe và cam kết chất lượng dịch vụ SLA).',
        'Kiểm soát nghiêm ngặt định mức nhiên liệu và năng suất nhân sự tài xế, giúp tối ưu hóa 7% tổng ngân sách vận hành đội xe.',
        'Tái thiết kế lộ trình vận chuyển (Route Optimization) nhằm loại bỏ tuyến trùng lặp, nâng cao 5% doanh thu vận tải trên từng tuyến.',
      ],
      en: [
        'Led and synchronized cross-docking logistics networks interconnecting 15 provincial distribution branches at high freight volumes.',
        'Achieved outstanding 99.65% fleet KPI achievement rate (on-time line-haul dispatch, asset utilization rates, and client SLA compliance).',
        'Enforced strict fuel consumption controls and driver crew allocation algorithms, optimizing 7% of overall operational expenditure.',
        'Pioneered line-haul route restructuring, successfully eliminating transit deadheads and lifting route-specific gross revenue by 5%.',
      ],
    },
    coreSkills: ['Fleet Dispatch', 'Cross-docking', 'Route Optimization', 'SLA Governance', 'Cost Accounting', 'Fuel Auditing'],
    metrics: [
      {
        value: '99.65%',
        label: { vi: 'Chỉ số SLA & KPI đạt chuẩn', en: 'Fleet KPI & SLA attainment' },
      },
      {
        value: '-7%',
        label: { vi: 'Ngân sách vận hành tiết kiệm', en: 'Operating budget savings' },
      },
      {
        value: '+5%',
        label: { vi: 'Doanh thu tuyến tăng trưởng', en: 'Route revenue growth' },
      },
    ],
  },
  {
    id: 'exp-3',
    role: {
      vi: 'Airline Ground Operations Collaborator',
      en: 'Airline Ground Operations Collaborator',
    },
    company: 'Saigon Ground Services (SAGS)',
    location: 'TP. Hồ Chí Minh (Sân bay Quốc tế Tân Sơn Nhất)',
    period: {
      vi: '07/2022 – 04/2024',
      en: 'Jul 2022 – Apr 2024',
    },
    highlights: {
      vi: [
        'Tham gia kiểm toán và giám sát việc tuân thủ quy trình phục vụ hành khách theo tiêu chuẩn an toàn hàng không quốc tế (IATA/FAA).',
        'Điều phối dòng hành khách mật độ cao tại nhà ga quốc tế/quốc nội trong các khung giờ cao điểm và giai đoạn lễ tết.',
        'Phối hợp nhịp nhàng với đại diện các hãng hàng không giải quyết sự cố phát sinh, xử lý tình huống trễ chuyến và ngoại lệ dịch vụ.',
      ],
      en: [
        'Audited and verified operational adherence to stringent international aviation passenger handling standards (IATA / CAAV).',
        'Coordinated high-density passenger flows across terminal gates during peak transit windows and seasonal surge periods.',
        'Collaborated with global airline representatives to handle flight delay contingencies, baggage escalations, and passenger resolution.',
      ],
    },
    coreSkills: ['Aviation Ground Handling', 'SOP Quality Audit', 'Exception Management', 'Crisis Resolution', 'Service Quality Standards'],
    metrics: [
      {
        value: '100%',
        label: { vi: 'Tuân thủ tiêu chuẩn an toàn bay', en: 'Aviation safety adherence' },
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-looker-ops',
    title: {
      vi: 'Hệ Thống Theo Dõi Tài Chính Vận Hành & Khắc Phục Điểm Nghẽn Lợi Nhuận (Looker Studio)',
      en: 'Operational Finance & Profitability Tracking Intelligence (Looker Studio)',
    },
    category: 'operations',
    categoryLabel: {
      vi: 'Vận Hành & Phân Tích Chi Phí (Looker Studio)',
      en: 'Operations Analytics & Cost Governance',
    },
    summary: {
      vi: 'Hợp nhất 5 nguồn dữ liệu Excel thô lên Google Looker Studio, theo dõi tài chính và vận hành thời gian thực của 110 xe, bóc tách 4 nguyên nhân gốc rễ gây hao hụt lợi nhuận.',
      en: 'Consolidated 5 raw Excel data streams into Google Looker Studio to track real-time operations across 110 fleet vehicles, isolating 4 root causes of operational inefficiency.',
    },
    description: {
      vi: 'Xây dựng hệ thống Dashboard hàng ngày (Daily Tracking Dashboard) tại Phòng Vận hành Kinh doanh (CNKT3), giám sát đa chiều: Doanh thu - Chi phí - Lợi nhuận theo mã khách hàng (MKH), tần suất phục vụ, chi phí xăng dầu/lương lái/vé cầu đường, và số km xe chạy rỗng theo từng chủng loại phương tiện (CONT, 8T, 5T, 2T).',
      en: 'Engineered a daily tracking dashboard in Looker Studio for Branch Operations (CNKT3), monitoring multi-dimensional metrics: Revenue, Costs, and Profit margins per customer code (MKH), trip frequency, fuel and driver payroll expenditure, and empty-km deadheads across vehicle types (CONT, 8T, 5T, 2T).',
    },
    tools: [
      'Google Looker Studio',
      '5x Excel Data Pipelines',
      'Data Cleansing & ETL',
      'Logistics P&L Modeling',
      'Root Cause Analysis (RCA)',
      'Fleet Telemetry',
    ],
    metrics: [
      { label: { vi: 'Quy mô đội xe giám sát', en: 'Fleet Scope' }, value: { vi: '110 Xe đa tải trọng', en: '110 Multi-ton Trucks' } },
      { label: { vi: 'Nguồn dữ liệu hợp nhất', en: 'Data Sources' }, value: { vi: '5 Tệp Excel thô', en: '5 Raw Excel Files' } },
      { label: { vi: 'Tần suất giám sát', en: 'Tracking Cadence' }, value: { vi: 'Hàng ngày', en: 'Daily' } },
    ],
    challenge: {
      vi: '1. Situation & Task: Ban quản trị cần theo dõi dữ liệu tài chính lũy kế song song với dữ liệu vận hành theo thời gian thực nhằm phát hiện các đột biến chi phí bất thường, nhận diện khách hàng không sinh lời và tối ưu hóa hiệu suất đội xe. Dữ liệu thô phân tán tại 5 tệp Excel riêng lẻ, gây khó khăn cho việc đánh giá tần suất dịch vụ, chi phí trên từng mã khách hàng (MKH) và các chuyến xe đang chạy theo từng loại phương tiện.',
      en: '1. Situation & Task: Objective to track cumulative corporate financial data alongside real-time operational data to detect unusual cost spikes, identify unprofitable customer codes, and optimize overall fleet performance. Key focus areas spanned revenue, service costs, profitability, and trip frequency across vehicle types, with raw records fragmented across 5 disparate Excel files.',
    },
    solution: {
      vi: '2. Action: Tổng hợp và làm sạch nghiêm ngặt dữ liệu thô từ 5 nguồn Excel độc lập. Tích hợp tập dữ liệu vào Google Looker Studio để xây dựng Dashboard theo dõi hàng ngày (Daily Tracking Dashboard) với các phân hệ: Chi phí tổng thể (Dầu - Vé - Lương), Khách hàng phân phối & Km rỗng, Chuyến xe đang kết nối, và Bóc tách chi tiết theo loại xe (CONT, 8T, 5813T, 2T).',
      en: '2. Action: Consolidated and rigorously cleaned raw records from 5 separate Excel sources. Integrated the unified dataset into Google Looker Studio to engineer a dynamic daily tracking dashboard featuring automated insights, empty-km diagnostics, active trip connection times, and granular fleet segmentation (CONT, 8T, 5T, 2T).',
    },
    impact: {
      vi: '3. Results & Root Cause Analysis: Cung cấp góc nhìn minh bạch tức thì cho ban lãnh đạo và chỉ ra 4 nguyên nhân cốt lõi gây sụt giảm hiệu quả vận hành: (1) Pricing Deficits: Đơn giá cước thấp hơn chi phí thực tế; (2) High Cost Baselines: Định mức chi phí nội bộ còn cao; (3) Scale Imbalance: Mô hình sinh lời có quy mô nhỏ hơn mô hình thua lỗ; (4) Resource Wasted & Opportunity Costs: Lãng phí km rỗng không tạo doanh thu.',
      en: '3. Results & Root Cause Analysis: Delivered instantaneous executive transparency and diagnosed four root causes of margin leakage: (1) Pricing Deficits (service rates lower than true operating expenses); (2) High Cost Baselines (elevated internal benchmarks); (3) Scale Imbalance (profitable services operating at sub-scale); (4) Resource Waste & Opportunity Costs (excess empty kilometers and unmonetized transit legs).',
    },
    keyFindings: [
      {
        title: {
          vi: '1. Thâm hụt đơn giá dịch vụ (Pricing Deficits)',
          en: '1. Pricing Deficits',
        },
        detail: {
          vi: 'Đơn giá dịch vụ hiện tại thấp hơn chi phí vận hành thực tế (nhiên liệu, vé cầu đường, lương lái, bốc xếp), dẫn đến lỗ lũy kế theo thời gian vận tải.',
          en: 'Service pricing is currently lower than actual operating costs, resulting in cumulative losses over time.',
        },
        action: {
          vi: 'Hành động yêu cầu: Khẩn trương rà soát toàn diện bảng giá cước dịch vụ và đàm phán lại mức giá cơ sở với khách hàng.',
          en: 'Action required: Comprehensive service pricing review and baseline contract rate renegotiation.',
        },
      },
      {
        title: {
          vi: '2. Định mức chi phí nội bộ cao (High Cost Baselines)',
          en: '2. High Cost Baselines',
        },
        detail: {
          vi: 'Các định mức chi phí nội bộ (tiêu hao xăng dầu, nhân sự, phí bốc xếp) vẫn ở mức cao, gây cản trở mục tiêu tối ưu hóa chi phí vận hành tối đa.',
          en: 'Internal cost standards remain elevated, hindering maximum expense optimization across fleet routes.',
        },
        action: {
          vi: 'Hành động yêu cầu: Siết chặt và tái đánh giá lại các quy chuẩn, định mức chi phí nội bộ trên từng loại xe.',
          en: 'Action required: Tighten and re-evaluate internal cost standards and consumption benchmarks.',
        },
      },
      {
        title: {
          vi: '3. Mất cân đối quy mô mô hình (Scale Imbalance)',
          en: '3. Scale Imbalance',
        },
        detail: {
          vi: 'Mô hình dịch vụ sinh lời đang hoạt động ở quy mô nhỏ hơn đáng kể so với mô hình dịch vụ đang chịu lỗ.',
          en: 'The profitable business model operates on a smaller scale than the loss-making model.',
        },
        action: {
          vi: 'Hành động yêu cầu: Tăng tốc mở rộng quy mô các mô hình và tuyến dịch vụ có lợi nhuận để cải thiện biên lợi nhuận gộp toàn diện.',
          en: 'Action required: Scale up profitable logistics models and high-margin lanes to boost overall company margins.',
        },
      },
      {
        title: {
          vi: '4. Lãng phí tài nguyên & Chi phí cơ hội (Resource Wasted & Opportunity Costs)',
          en: '4. Resource Wasted & Opportunity Costs',
        },
        detail: {
          vi: 'Xảy ra các khoản chi phí lãng phí và vận hành kém hiệu quả (như số km xe chạy rỗng cao, thời gian chờ quay đầu) mà không tạo ra doanh thu bù đắp.',
          en: 'Operational inefficiencies and wasted expenses (elevated empty kilometers) occur without generating offsetting revenues.',
        },
        action: {
          vi: 'Hành động yêu cầu: Đảm bảo năng lực tạo doanh thu xuyên suốt toàn bộ quy trình vận hành và hạn chế tối đa các chuyến chạy rỗng.',
          en: 'Action required: Ensure revenue generation across the entire operational workflow and eliminate redundant deadheads.',
        },
      },
    ],
    image: '/src/assets/images/project_looker_vhkd_1791796308125.jpg',
    featured: true,
  },
  {
    id: 'proj-3',
    title: {
      vi: 'Logistics Fleet Dispatch & Network Route Optimization',
      en: 'Logistics Fleet Dispatch & Network Route Optimization',
    },
    category: 'operations',
    categoryLabel: {
      vi: 'Vận hành Logistics & Định tuyến',
      en: 'Logistics & Route Operations',
    },
    summary: {
      vi: 'Mô hình hóa dữ liệu di chuyển và kết nối chéo giữa 15 tỉnh thành, tối ưu hóa định tuyến nhằm triệt tiêu các chuyến xe rỗng và nâng cao tỷ lệ lấp đầy tải trọng.',
      en: 'Network route modeling across 15 provincial distribution hubs, optimizing transit trajectories to eliminate deadhead runs and maximize payload fill rates.',
    },
    description: {
      vi: 'Phân tích dữ liệu GPS chuyến xe, giờ chạy liên tỉnh và lịch trình chuyển tải kho bãi để thiết kế lại ma trận kết nối cross-docking. Kết hợp thuật toán tối ưu hóa tuyến đường giúp giảm thời gian quay đầu xe và tiết kiệm định mức nhiên liệu.',
      en: 'Analyzed GPS telemetry logs, transit schedules, and hub dwell times to reconfigure cross-docking routing matrices. Applied route heuristic modeling to cut vehicle turnaround times and curtail diesel burn.',
    },
    tools: ['Python', 'Fleet Telemetry', 'Route Optimization', 'Excel Solver', 'SLA Framework'],
    metrics: [
      { label: { vi: 'Độ phủ mạng lưới', en: 'Network Hubs' }, value: { vi: '15 Chi nhánh tỉnh', en: '15 Provincial Hubs' } },
      { label: { vi: 'SLA Cam kết', en: 'On-time SLA' }, value: { vi: '99.65% Đạt chuẩn', en: '99.65% SLA Rate' } },
      { label: { vi: 'Tiết kiệm chi phí', en: 'Fuel Optimization' }, value: { vi: '7% Ngân sách', en: '7% Cost Saved' } },
    ],
    challenge: {
      vi: 'Lịch trình xuất bến bị xung đột giờ cao điểm, tỷ lệ xe chạy rỗng chiều về cao làm giảm biên lợi nhuận gộp trên từng cây số vận tải.',
      en: 'Line-haul departure conflicts during urban congestion hours and elevated return deadhead mileage severely eroded profit per freight kilometer.',
    },
    solution: {
      vi: 'Phân bổ lại khung giờ kết nối chéo ban đêm và kết hợp ghép chuyến hàng liên tỉnh hai chiều, kiểm soát KPI tài sản xe theo thời gian thực.',
      en: 'Shifted line-haul connection windows to off-peak night corridors, matched two-way backhaul freight loads, and monitored asset productivity live.',
    },
    impact: {
      vi: 'Đạt tỷ lệ hoàn thành KPI 99.65%, tăng 5% doanh thu vận tải trên từng tuyến huyết mạch và tiết giảm 7% ngân sách vận hành.',
      en: 'Attained a 99.65% SLA rating, grew core line-haul route revenues by 5%, and trimmed operating expenses by 7%.',
    },
    image: '/src/assets/images/project_logistics_route_1791794404484.jpg',
    featured: true,
  },
  {
    id: 'proj-1',
    title: {
      vi: 'Business Performance & P&L Executive Dashboard',
      en: 'Business Performance & P&L Executive Dashboard',
    },
    category: 'powerbi',
    categoryLabel: {
      vi: 'Power BI & Tài chính Vận hành',
      en: 'Power BI & Operational Finance',
    },
    summary: {
      vi: 'Báo cáo tài chính kinh doanh tự động hóa giúp Ban Giám đốc theo dõi đa chiều Doanh thu, Chi phí, Biên lợi nhuận và phát hiện tức thì các điểm nghẽn dòng tiền.',
      en: 'Automated executive financial reporting suite empowering leadership to monitor Revenue, OPEX, and Net Margin while isolating cash drain bottlenecks in real time.',
    },
    description: {
      vi: 'Dự án xây dựng mô hình dữ liệu tài chính hợp nhất từ nhiều nguồn dữ liệu vận hành. Bằng việc xây dựng các thước đo DAX nâng cao và trực quan hóa P&L Waterfall, hệ thống cung cấp góc nhìn tức thời về hiệu quả kinh doanh theo từng chi nhánh, tuyến vận chuyển và khách hàng trọng điểm.',
      en: 'Architected a consolidated financial data model pulling from multi-branch ERP databases. Leveraging advanced DAX measures and P&L Waterfall visualizations, this tool gives leadership instantaneous visibility into profit margins across routes, regional hubs, and enterprise accounts.',
    },
    tools: ['Power BI', 'DAX', 'Power Query', 'Financial P&L Modeling', 'Data Cleansing'],
    metrics: [
      { label: { vi: 'Chu kỳ lập báo cáo', en: 'Reporting Cycle' }, value: { vi: 'Tự động 100%', en: '100% Automated' } },
      { label: { vi: 'Phát hiện rò rỉ chi phí', en: 'Cost Leak Detection' }, value: { vi: '-12% Lãng phí', en: '-12% Waste' } },
      { label: { vi: 'Tần suất cập nhật', en: 'Refresh Cadence' }, value: { vi: 'Hàng ngày', en: 'Daily' } },
    ],
    challenge: {
      vi: 'Dữ liệu doanh thu và chi phí vận hành phân tán ở nhiều hệ thống chi nhánh rời rạc, mất nhiều ngày để tổng hợp báo cáo thủ công và khó phát hiện sai lệch chi phí nhiên liệu/phí cầu đường.',
      en: 'Operational cost and revenue data was fragmented across provincial siloed databases, taking days of manual spreadsheet crunching while missing subtle fleet fuel and toll fee leaks.',
    },
    solution: {
      vi: 'Chuẩn hóa quy trình ETL bằng Power Query, xây dựng Data Warehouse thu nhỏ với cấu trúc Star Schema, thiết lập hệ thống KPI thẻ điểm và cảnh báo tự động khi chi phí vượt định mức.',
      en: 'Standardized ETL pipelines in Power Query, engineered a Star Schema data model, and established dynamic KPI cards with conditional alert thresholds when line-haul costs breached budgets.',
    },
    impact: {
      vi: 'Giảm 80% thời gian tổng hợp báo cáo tháng, giúp phát hiện sớm các chuyến xe âm biên lợi nhuận để điều chỉnh giá thầu hoặc định tuyến kịp thời.',
      en: 'Cut monthly reporting synthesis time by 80%, providing early visibility into unprofitable freight lanes to renegotiate contract rates or adjust routing proactively.',
    },
    image: '/src/assets/images/project_bi_performance_1711536390647.jpg',
    featured: true,
  },
  {
    id: 'proj-2',
    title: {
      vi: 'HR Employee Attrition & Retention Analytics',
      en: 'HR Employee Attrition & Retention Analytics',
    },
    category: 'powerbi',
    categoryLabel: {
      vi: 'Power BI & Nhân sự',
      en: 'Power BI & People Analytics',
    },
    summary: {
      vi: 'Phân tích đa biến dữ liệu nhân sự nhằm giải mã nguyên nhân biến động lao động, xác định phòng ban có nguy cơ nghỉ việc cao và đề xuất chiến lược giữ chân nhân tài.',
      en: 'Multivariate people analytics model decoding the root causes of employee turnover, identifying flight-risk departments, and driving data-backed talent retention strategies.',
    },
    description: {
      vi: 'Nghiên cứu bộ dữ liệu nhân sự toàn diện bao gồm độ tuổi, mức lương, thời gian gắn bó, điểm số hài lòng công việc và khối lượng công việc ngoài giờ. Thiết kế Dashboard trực quan với các chỉ số Attrition Rate theo phòng ban và mô hình dự báo rủi ro.',
      en: 'Investigated a comprehensive workforce dataset including tenure, compensation bands, satisfaction indexes, overtime loads, and job role tiers. Built an intuitive dashboard isolating turnover correlation factors and flight-risk patterns.',
    },
    tools: ['Power BI', 'DAX Measures', 'Correlation Analysis', 'HR Data Modeling', 'Interactive Slicers'],
    metrics: [
      { label: { vi: 'Tổng số nhân sự', en: 'Total Employees' }, value: { vi: '1,470 Nhân sự', en: '1,470 Employees' } },
      { label: { vi: 'Tỷ lệ biến động', en: 'Attrition Rate' }, value: { vi: '16% (237 ca)', en: '16% (237 Cases)' } },
      { label: { vi: 'Điểm hài lòng TB', en: 'Avg Satisfaction' }, value: { vi: '2.81 / 4.0 Điểm', en: '2.81 / 4.0 Score' } },
    ],
    challenge: {
      vi: 'Tỷ lệ nghỉ việc cao ở đội ngũ tài xế và nhân sự điều phối hiện trường gây gián đoạn chuỗi cung ứng, nhưng ban quản trị thiếu cơ sở dữ liệu để tìm ra căn nguyên thực sự.',
      en: 'Spikes in driver and field dispatch crew turnover created delivery bottlenecks, but leadership lacked quantitative diagnostics to trace root causes.',
    },
    solution: {
      vi: 'Phân đoạn nhân khẩu học kết hợp ma trận mức độ hài lòng và khối lượng làm thêm giờ, xác định chính xác điểm gãy thời gian (tháng thứ 6 và năm thứ 2) cùng nhóm đãi ngộ chưa cạnh tranh.',
      en: 'Mapped demographic cohorts against overtime ratios and work-life balance scores, locating turnover inflection points (month 6 and year 2) and compensation misalignments.',
    },
    impact: {
      vi: 'Cung cấp cơ sở định lượng để phòng Nhân sự điều chỉnh chính sách phụ cấp chuyến xe và lịch trình nghỉ ngơi, giảm tỷ lệ nghỉ việc đột ngột.',
      en: 'Supplied actionable insights for HR and fleet directors to restructure driver shift allowances and rest schedules, stabilizing operational crew retention.',
    },
    image: '/src/assets/images/regenerated_image_1791804066294.png',
    featured: true,
  },
  {
    id: 'proj-5',
    title: {
      vi: 'Supermarket Sales & Customer Basket Behavior Analysis',
      en: 'Supermarket Sales & Customer Basket Behavior Analysis',
    },
    category: 'python',
    categoryLabel: {
      vi: 'Python & Phân tích Hành vi Mua hàng',
      en: 'Python & Retail Customer Insights',
    },
    summary: {
      vi: 'Phân tích hành vi tiêu dùng chuỗi siêu thị, tìm ra các nhóm sản phẩm bán kèm (Affinity Analysis) và tối ưu hóa quản lý hàng tồn kho.',
      en: 'Deep-dive into supermarket consumer transaction behavior, extracting cross-sell product affinities and optimizing inventory stocking levels.',
    },
    description: {
      vi: 'Sử dụng kỹ thuật phân tích giỏ hàng và phân nhóm khách hàng (RFM concepts) để đánh giá doanh số theo từng danh mục hàng hóa, giờ mua sắm cao điểm và phương thức thanh toán.',
      en: 'Utilized market basket analysis and RFM customer segmentation heuristics to evaluate sales velocities across product categories, peak checkout hours, and preferred payment channels.',
    },
    tools: ['Python', 'Power BI', 'Market Basket Analysis', 'Customer Segmentation', 'Inventory Analytics'],
    metrics: [
      { label: { vi: 'Khối lượng đơn hàng', en: 'Transaction Records' }, value: { vi: 'Hàng chục ngàn SKU', en: '10,000+ SKUs' } },
      { label: { vi: 'Ứng dụng', en: 'Application' }, value: { vi: 'Xếp đặt & Khuyến mãi', en: 'Merchandising' } },
      { label: { vi: 'Kết quả', en: 'Outcome' }, value: { vi: 'Tối ưu tồn kho', en: 'Stock Optimized' } },
    ],
    challenge: {
      vi: 'Các chương trình khuyến mãi bán lẻ thường bị dàn trải, gây lãng phí chi phí marketing mà không gia tăng kích thước giỏ hàng trung bình.',
      en: 'Promotional discounts were broadly blanketed across sluggish items without lifting average transaction values or gross margins.',
    },
    solution: {
      vi: 'Khám phá dữ liệu bán hàng theo phân khúc, xác định các cặp sản phẩm có độ tin cậy kết hợp cao để xây dựng combo khuyến mãi mục tiêu.',
      en: 'Isolated high-lift product bundles using associative rules, guiding targeted bundle packaging and strategic shelf-space placement.',
    },
    impact: {
      vi: 'Đề xuất giải pháp tăng 14% tỷ lệ mua kèm và giảm tỷ lệ tồn kho quá hạn của các mặt hàng tiêu dùng nhanh.',
      en: 'Recommended strategic cross-sell combos projected to boost cross-category attachment by 14% while lowering perishable stock write-offs.',
    },
    image: '/src/assets/images/project_bi_dashboard_1791794379618.jpg',
  },
  {
    id: 'proj-4',
    title: {
      vi: 'COVID-19 Global Socioeconomic Impact & GDP EDA',
      en: 'COVID-19 Global Socioeconomic Impact & GDP EDA',
    },
    category: 'python',
    categoryLabel: {
      vi: 'Python Analytics & Thống kê',
      en: 'Python Analytics & Econometrics',
    },
    summary: {
      vi: 'Khai phá dữ liệu (EDA) quy mô lớn từ Our World in Data, đánh giá mức độ tương quan giữa các chính sách giãn cách xã hội và biến động GDP toàn cầu.',
      en: 'Large-scale Exploratory Data Analysis (EDA) on Our World in Data, evaluating quantitative correlations between lockdown stringency and global GDP contraction.',
    },
    description: {
      vi: 'Ứng dụng Python (Pandas, NumPy, Matplotlib, Seaborn) xử lý tập dữ liệu hàng triệu bản ghi, xử lý giá trị khuyết thiếu và ngoại lai. Xây dựng ma trận tương quan và biểu đồ hồi quy chứng minh tác động phi tuyến tính giữa hạn chế đi lại và tốc độ suy giảm kinh tế.',
      en: 'Employed Python (Pandas, NumPy, Matplotlib, Seaborn) to clean millions of country-level records, handling outliers and missing longitudinal data. Built correlation heatmaps and regression models examining non-linear macroeconomic shocks.',
    },
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Statistical Modeling'],
    metrics: [
      { label: { vi: 'Dữ liệu phân tích', en: 'Data Source' }, value: 'Our World in Data' },
      { label: { vi: 'Phạm vi quốc gia', en: 'Geographic Scope' }, value: { vi: '180+ Quốc gia', en: '180+ Countries' } },
      { label: { vi: 'Phương pháp', en: 'Technique' }, value: { vi: 'EDA & Hồi quy', en: 'EDA & Regression' } },
    ],
    challenge: {
      vi: 'Tập dữ liệu thô toàn cầu có độ nhiễu cao, sai lệch định dạng giữa các quốc gia và nhiều khoảng trống dữ liệu theo chu kỳ thời gian.',
      en: 'Raw global public datasets suffered from severe temporal gaps, regional reporting variances, and heterogeneous indicator definitions.',
    },
    solution: {
      vi: 'Xây dựng pipeline làm sạch dữ liệu tự động, nội suy chuỗi thời gian hợp lý và chuẩn hóa các chỉ số Stringency Index theo thang đo đồng nhất.',
      en: 'Constructed automated data cleaning pipelines, applied robust time-series interpolation, and standardized the government Stringency Index scale.',
    },
    impact: {
      vi: 'Tạo báo cáo phân tích tương quan khoa học, phục vụ nghiên cứu tác động rủi ro hệ thống đến chuỗi cung ứng thương mại quốc tế.',
      en: 'Delivered rigorous empirical evidence explaining how macro containment measures disrupted international shipping lanes and manufacturing resilience.',
    },
    image: '/src/assets/images/regenerated_image_1791802665500.png',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: {
      vi: 'Chuyên Môn Quản Lý & Vận Hành Chuỗi Cung Ứng',
      en: 'Operations Management & Supply Chain Governance',
    },
    skills: [
      {
        name: 'Logistics & Fleet Operations',
        level: {
          vi: 'Chuyên sâu',
          en: 'Mastered',
        },
        context: {
          vi: 'Điều phối đội xe liên tỉnh, quản lý kết nối 15 chi nhánh, SLA 99.65%.',
          en: 'Line-haul fleet dispatch across 15 provincial hubs with 99.65% SLA.',
        },
      },
      {
        name: 'Business Quality Control Frameworks',
        level: {
          vi: 'Chuyên sâu',
          en: 'Mastered',
        },
        context: {
          vi: 'Thiết lập quy chuẩn kiểm soát rủi ro, kiểm toán quy trình và khắc phục sai lệch.',
          en: 'Designing risk audit frameworks, operational tolerances, and corrective actions.',
        },
      },
      {
        name: 'Cost Optimization & P&L Management',
        level: {
          vi: 'Nâng cao',
          en: 'Advanced',
        },
        context: {
          vi: 'Thẩm định hồ sơ doanh thu/chi phí khách hàng, tối ưu hóa 12% lãng phí vận hành.',
          en: 'Contract feasibility P&L simulations and 12% operational waste cut.',
        },
      },
      {
        name: 'Route Planning & Network Design',
        level: {
          vi: 'Nâng cao',
          en: 'Advanced',
        },
        context: {
          vi: 'Tái cấu trúc tuyến đường vận tải, triệt tiêu xe chạy rỗng, tăng 5% doanh thu tuyến.',
          en: 'Line-haul restructuring, backhaul pairing, and deadhead elimination.',
        },
      },
    ],
  },
  {
    title: {
      vi: 'Công Cụ Dữ Liệu & Business Intelligence',
      en: 'Data Analytics & Business Intelligence Tools',
    },
    skills: [
      {
        name: 'Microsoft Power BI & DAX',
        level: {
          vi: 'Chuyên sâu',
          en: 'Expert',
        },
        context: {
          vi: 'Mô hình hóa dữ liệu Star Schema, viết DAX phức tạp, phát triển Dashboard tự động.',
          en: 'Star Schema modeling, advanced DAX measures, automated KPI dashboards.',
        },
      },
      {
        name: 'Python (Pandas, NumPy, Seaborn) & SQL',
        level: {
          vi: 'Sơ cấp',
          en: 'Elementary',
        },
        context: {
          vi: 'Khai phá dữ liệu (EDA), phân tích tương quan và xử lý dữ liệu lớn (ETL).',
          en: 'Exploratory Data Analysis (EDA), econometric correlation, and data wrangling.',
        },
      },
      {
        name: 'Advanced Excel & Power Query',
        level: {
          vi: 'Chuyên sâu',
          en: 'Expert',
        },
        context: {
          vi: 'Mô hình hóa tài chính P&L, tự động hóa luồng dữ liệu bảng biểu nhiều nguồn.',
          en: 'Financial modeling, Power Query automation, and multi-source auditing.',
        },
      },
      {
        name: 'Google Looker Studio & Data Visualization',
        level: {
          vi: 'Nâng cao',
          en: 'Advanced',
        },
        context: {
          vi: 'Thiết kế báo cáo trực quan cho ban lãnh đạo với trải nghiệm tương tác mượt mà.',
          en: 'Executive reporting suites and interactive telemetry views for leadership.',
        },
      },
    ],
  },
  {
    title: {
      vi: 'Phương Pháp Luận & Năng Lực Cốt Lõi',
      en: 'Analytical Methodologies & Leadership',
    },
    skills: [
      {
        name: 'Exploratory Data Analysis (EDA)',
        level: {
          vi: 'Chuyên sâu',
          en: 'Expert',
        },
        context: {
          vi: 'Nhận diện mẫu hình dữ liệu bất thường và biến dữ liệu thô thành quyết định kinh doanh.',
          en: 'Isolating anomalies, pattern recognition, and translating numbers to strategy.',
        },
      },
      {
        name: 'Root Cause Analysis (5 Whys / Fishbone)',
        level: {
          vi: 'Chuyên sâu',
          en: 'Expert',
        },
        context: {
          vi: 'Tìm nguyên nhân gốc rễ của sự cố phát sinh vận hành và chậm trễ SLA.',
          en: 'Pinpointing systemic root causes behind delivery delays and cost spikes.',
        },
      },
      {
        name: 'Aviation Ground Handling Standards',
        level: {
          vi: 'Đã chứng nhận',
          en: 'Certified',
        },
        context: {
          vi: 'Nắm vững quy chuẩn an toàn hàng không IATA, kiểm toán chất lượng dịch vụ hành khách.',
          en: 'IATA-grade passenger handling compliance and contingency management.',
        },
      },
      {
        name: 'Cross-functional Leadership',
        level: {
          vi: 'Nâng cao',
          en: 'Advanced',
        },
        context: {
          vi: 'Cầu nối giữa Ban Giám đốc, đội ngũ tài xế hiện trường và các phòng ban đối tác.',
          en: 'Bridging executive leadership, field crews, and external client partners.',
        },
      },
    ],
  },
];

export const EDUCATION_DATA = {
  degree: {
    vi: 'Cử nhân Quản lý Cảng Hàng Không',
    en: 'Bachelor of Airport Management',
  },
  institution: {
    vi: 'Học viện Hàng không Việt Nam (VAA)',
    en: 'Vietnam Aviation Academy (VAA)',
  },
  period: '2019 – 2023',
  gpa: '3.2 / 4.0',
  description: {
    vi: 'Được đào tạo bài bản về quản trị vận hành ga cảng, quy trình an toàn hàng không quốc tế, chuỗi cung ứng logistics hàng không và phương pháp phân tích tối ưu hóa nguồn lực vận tải.',
    en: 'Rigorous academic training in terminal operations management, international aviation safety protocols, air cargo logistics networks, and quantitative transportation resource optimization.',
  },
  highlights: [
    {
      vi: 'GPA Tốt nghiệp: 3.2 / 4.0 (Xếp loại Khá)',
      en: 'Graduation GPA: 3.2 / 4.0 (Good)',
    },
    {
      vi: 'Khóa luận & Đề án: Tối ưu hóa quy trình điều phối hành khách và tài sản mặt đất',
      en: 'Capstone Project: Optimization of Terminal Passenger Flow and Ground Asset Allocation',
    },
    {
      vi: 'Chứng chỉ bổ trợ: Power BI Data Analyst, Lean Logistics & Process Improvement',
      en: 'Supporting Certifications: Power BI Data Analyst, Lean Logistics & Process Improvement',
    },
  ],
};
