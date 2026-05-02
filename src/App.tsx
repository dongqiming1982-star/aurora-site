import { useState, useEffect } from 'react'
import {
  ArrowRight, CheckCircle2, Shield, Monitor, Globe2, Server,
  Lock, MapPin, Cpu, Mail, Menu, X, Network, Router,
  HardDrive, Wrench, Users, BriefcaseBusiness,
  ChevronRight, Activity, Wifi, Languages, ShoppingCart,
  CreditCard, Radio, Megaphone, Store, Headphones, Layers3,
  HomeIcon
} from 'lucide-react'

type Page = 'home' | 'architecture' | 'careers'
type Language = 'zh' | 'en'

const pagePath = (target: Page) => {
  if (target === 'architecture') return '/architecture'
  if (target === 'careers') return '/careers'
  return '/'
}

const pageFromPath = (): Page => {
  if (typeof window === 'undefined') return 'home'
  const path = window.location.pathname.toLowerCase()
  if (path.startsWith('/architecture')) return 'architecture'
  if (path.startsWith('/careers')) return 'careers'
  return 'home'
}

const translations = {
  zh: {
    nav: {
      home: '首页',
      arch: '技术架构',
      careers: '本地合作',
      pricing: '价格方案',
      cta: '申请部署'
    },
    hero: {
      tag: '独享 Mac mini · 住宅级本地网络 · 加拿大本地环境',
      title1: '真实设备.',
      title2: '真实身份.',
      title3: '为长效稳定而生。',
      desc: 'Aurora 将独享 Mac mini 物理设备部署在加拿大本地住宅、办公室或安全商业空间，配合独立静态 IP / 固定网络出口，为跨境电商、直播团队、广告后台、支付后台、代运营公司和远程员工提供长期稳定的一客一机操作环境。',
      punch: '不是共享代理，不是廉价 VPS，也不是机房代理池。Aurora 提供真实加拿大本地空间中的物理 Mac mini 设备，保持设备、网络和远程操作环境长期一致。',
      note: '设备部署城市将根据资源可用性和运营需求在加拿大境内分配。',
      card1: ['独享 Mac mini', '真实物理主机，非虚拟机，非共享。', Cpu],
      card2: ['住宅级本地网络', '部署于加拿大住宅、办公室或安全商业空间，非传统机房 VPS。', MapPin],
      card3: ['一客一机', '设备、网络与远程操作环境长期一致。', Lock],
      btn1: '申请部署',
      btn2: '技术架构'
    },
    liveNode: {
      title: '当前节点',
      loc: '加拿大 · 本地住宅 / 办公室 / 安全商业空间部署',
      device: '物理设备',
      deviceVal: '独享 Mac mini',
      net: '网络环境',
      netVal: '独立静态 IP / 住宅级固定网络出口',
      access: '接入方式',
      accessVal: '私有远程工作站',
      isolation: '隔离级别',
      isolationVal: '物理级环境隔离'
    },
    solution: {
      tag: '核心优势',
      title: '真实加拿大本地物理设备环境，而非机房 VPS 或共享代理池。',
      card1: ['独享 Mac mini', '每位客户分配一台独立加拿大 Mac mini 物理主机。无虚拟机层，无共享桌面环境。', Monitor],
      card2: ['住宅级本地网络', '设备部署于加拿大住宅、办公室或安全商业空间，配合独立静态 IP / 固定网络出口。', Network],
      card3: ['长期稳定运行', '基础状态监控、远程接入支持及必要时的加拿大本地物理维护。', Shield]
    },
    useCases: {
      tag: '适用场景',
      title: '覆盖多平台跨境后台、直播、电商和团队远程操作。',
      desc: '适用于 TikTok、Shopify、Amazon、Meta Ads、Google Ads、Stripe、PayPal、跨境电商后台、直播团队、代运营公司、客服系统和远程员工协作。',
      items: [
        ['TikTok / 直播电商', '用于 TikTok Shop、直播后台、商品管理、内容发布、素材准备和团队远程协作。', Radio],
        ['跨境电商店铺', '用于 Shopify、Amazon、WooCommerce 等店铺后台、订单处理、Listing 管理、库存系统和日常运营。', ShoppingCart],
        ['支付与商业后台', '用于 Stripe、PayPal、Shopify Payments 等支付和商业后台的日常管理环境。', CreditCard],
        ['广告后台管理', '用于 Meta Ads、Google Ads、TikTok Ads 等广告后台的日常管理和团队协作。', Megaphone],
        ['多平台环境一致性', '减少共享代理、廉价 VPS、机房代理池、多地多人操作带来的环境不一致问题。', Layers3],
        ['远程员工工作流', '员工可远程访问指定加拿大工作站，不必共享老板个人电脑或临时远程桌面。', Headphones],
        ['代运营 / 工作室', '适合代运营团队、直播工作室、跨境服务商和多项目团队进行分环境管理。', Users],
        ['新兴市场客户', '兼顾印度、东南亚、中东等市场客户，为其提供加拿大本地设备与网络操作基础。', Store]
      ]
    },
    compare: {
      title: '为什么不使用机房 VPS、共享代理或普通远程桌面？',
      desc: '跨境业务需要真实设备、固定网络和长期一致的本地操作环境，而不是拥挤的数据中心资源。',
      vps: '机房 VPS / 共享代理',
      vpsItems: ['数据中心或代理池资源', '共享或频繁变化的 IP 段', '虚拟化环境，设备身份弱', '多人混用，环境不一致'],
      aurora: 'Aurora 本地物理节点',
      auroraItems: ['加拿大住宅 / 办公室 / 安全商业空间部署', '独享 Mac mini 真实物理硬件', '独立静态 IP / 固定网络出口', '一客一机，长期稳定运行'],
      cta: '查看技术架构详情'
    },
    pricing: {
      tag: '方案定价',
      title: '为跨境团队配置一套稳定的加拿大本地独立设备环境。',
      desc: '加拿大本地物理工作站，月费简单透明。每套方案包含独享 Mac mini、独立静态 IP / 固定网络出口、私有远程访问、基础监控与本地维护协调。设备部署于加拿大住宅、办公室或安全商业空间，适合需要长期稳定后台操作环境的跨境电商、直播团队、广告团队和代运营公司。',
      planName: '专业物理节点 Dedicated Starter',
      price: 'CA$699',
      unit: '/ 月 + 适用税费（如有）',
      features: [
        '1 台独享 Mac mini 物理主机',
        '加拿大住宅 / 办公室 / 安全商业空间部署',
        '独立静态 IP / 固定网络出口（每台设备唯一分配）',
        '私有远程工作站访问',
        '基础状态监控与运维',
        '免设置费'
      ],
      cta: '立即申请'
    },
    archPage: {
      tag: '技术架构',
      title: '物理设备托管，',
      titleHighlight: '专为稳定远程操作打造。',
      desc: 'Aurora 提供部署于加拿大本地住宅、办公室或安全商业空间的专用 Mac mini 物理工作站，而非传统数据中心 VPS 或共享代理池。每个客户都拥有一客一机的硬件环境、独立静态 IP / 固定网络出口和私有远程接入流程，用于多平台后台操作、远程员工协作和长期跨境业务运营。',
      cards: [
        ['客户接入', '从您的所在地安全连接至专用工作站。', Monitor],
        ['专用硬件', '物理级 Apple 硬件，专机专用。', HardDrive],
        ['本地网络出口', '每位客户分配独立静态 IP / 固定网络出口，非共享。', Wifi],
        ['本地维护', '硬件故障时提供线下物理支持。', Wrench]
      ],
      flowTitle: '系统流程',
      flowSub: '本地、物理、隔离。',
      flowDesc: '我们避开共享虚拟机、数据中心 VPS 和拥挤代理池。目标是打造清晰、耐用、具有明确物理权属的加拿大本地运行环境。',
      flowSteps: [
        ['1', '客户远程连接', '通过私有工作站流程访问分配给您的 Mac mini。'],
        ['2', '设备在加拿大本地空间运行', '您的设备物理部署在加拿大住宅、办公室或安全商业空间，保持电力和网络常开。'],
        ['3', '使用独立网络出口', '每台设备配置独立静态 IP / 固定网络出口，不与其他客户共享。'],
        ['4', '线下支持保障', '若涉及硬件、电源或线路问题，本地技术人员可介入维护。']
      ],
      infraTitle: '像本地基础设施一样稳固，而非临时的机房替代方案。',
      infraCards: [
        ['硬件层', '独立 Mac mini，物理电源，物理布线，无共享桌面环境。', Cpu],
        ['网络层', '独立静态 IP / 住宅级固定网络出口，保持设备与业务环境的一致性。', Router],
        ['访问层', '远程工作站接入，确保与其它客户隔离。', Lock],
        ['监控层', '基础在线监测，物理故障时支持人工干预。', Activity],
        ['维护层', '本地技术员支持：重启、查线、换机及网络检查。', Wrench],
        ['扩展层', '随着业务增长，可增加独立的本地物理节点。', Server]
      ],
      boundaryTitle: '运营边界',
      boundaryDesc: 'Aurora 提供物理工作站基础设施及硬件维护。客户需对其账户、软件、平台操作及业务流程负全部责任。',
      boundaries: [
        'Aurora 仅提供基础设施服务，不用于规避平台规则、绕过风控或从事任何欺诈、滥用行为。',
        '所有使用行为必须遵守适用法律、平台政策及第三方服务条款。',
        '我们仅提供硬件托管与远程接入支持。',
        '不提供任何涉及僵尸流量、虚假互动或滥用平台的非法服务。',
        '每台设备均分配给唯一的客户环境。',
        '物理维护由加拿大本地技术人员执行。',
        '客户在使用托管工作站时，必须自行遵守适用法律、平台条款及第三方服务规则。'
      ]
    },
    careers: {
      tag: '加拿大本地合作机会',
      title: '加入我们的',
      titleHighlight: '本地节点支持网络。',
      desc: '我们正在建立覆盖加拿大多个城市的本地合作网络，包含现场维护助理与本地节点托管合作方两类角色，共同支持 Mac mini 物理设备的稳定运行。',
      cards: [
        ['现场维护助理', '按需上门，检查设备、重启、查线、拍照反馈。', Wrench],
        ['节点托管合作方', '提供安全、稳定的设备放置空间与持续电力条件。', HomeIcon],
        ['低参与合作', '无需参与客户业务，也无需接触任何客户账户。', Shield],
        ['长期合作', '适合住宅、办公室或安全商业空间。', BriefcaseBusiness]
      ],
      techTitle: '合作类型一：现场维护助理',
      techDesc: '适合有交通工具、责任心强、能够按步骤执行任务的人。工作内容以简单现场检查为主，不需要软件开发能力。',
      techTasks: [
        ['电源检查', '确认主机、路由器和适配器运行正常。'],
        ['布线巡查', '检查以太网线、电源线及设备摆放情况。'],
        ['简易重启', '根据指令手动重启主机或网络设备。'],
        ['拍照报告', '每次访问后发送清晰的照片或短视频反馈。'],
        ['设备更换', '在预先安排下，协助更换主机或路由器。']
      ],
      hostTitle: '合作类型二：本地节点托管合作方',
      hostDesc: '适合在加拿大拥有稳定住宅、办公室或安全商业空间的合作方。合作方仅提供基础环境支持，设备、网络连接与维护流程由 Aurora 统一管理。',
      hostTasks: [
        ['安全空间', '提供干燥、安全、稳定的设备放置空间。'],
        ['持续电力', '允许设备长期通电运行。'],
        ['基础配合', '在需要时协助确认设备状态或预约维护访问。'],
        ['无需提供网络', '网络连接由 Aurora 提供和统一管理，合作方无需提供或配置任何网络资源。'],
        ['不接触客户业务', '合作方无需登录、管理或使用任何客户账户或平台。']
      ],
      whoTitle: '我们要找的人',
      whoSub: '靠谱、稳定、低参与。',
      fitTitle: '基本要求',
      fitItems: [
        '位于加拿大主要城市或周边地区。',
        '有稳定住所、办公室或安全商业空间者优先。',
        '能提供持续电力和安全设备放置条件。',
        '能够按要求进行简单状态确认或预约配合。',
        '沟通清楚，响应及时，责任心强。',
        '尊重设备安全和客户隐私。'
      ],
      plusTitle: '加分项',
      plusItems: [
        '有基础电脑硬件或家庭网络经验。',
        '有办公室、仓储、物业、外勤或 IT 支持经验。',
        '有可靠交通工具。',
        '空间通风、干燥、可长期稳定放置设备。',
        '愿意长期合作。',
        '可配合多个设备或多个节点扩展者优先。'
      ],
      applyTitle: '对本地合作感兴趣？',
      applyDesc: '请发送您的姓名、所在城市、可合作类型、空间条件、可用时间及联系方式给我们。',
      applyForm: {
        name: '姓名',
        contact: '邮箱或手机号',
        area: '所在城市 / 区域',
        type: '合作类型：现场维护 / 节点托管 / 两者都可以',
        bio: '请说明空间条件、可用时间、交通工具及相关经验',
        submit: '提交申请',
        toast: '申请已收到。如果想更快获得回复，请同时发送邮件至 contact@aurorasitesolutions.com'
      }
    },
    privacy: {
      title: '隐私政策 Privacy Policy',
      effectiveDate: '生效日期：2026年5月2日',
      intro: '本隐私政策说明 AURORA SITE SOLUTIONS LTD. 如何根据加拿大适用的隐私法律，包括 Personal Information Protection and Electronic Documents Act (PIPEDA)、Alberta Personal Information Protection Act (PIPA) 以及其他适用法律，收集、使用、保存和保护您的个人信息。',
      sections: [
        {
          h: '1. 我们收集的信息',
          p: '当您通过联系表单或本地合作申请表提交信息时，我们可能会收集您的姓名、联系方式、所在城市或区域、业务需求说明、设备需求、合作类型、空间条件、可用时间及您主动提供的其他信息。'
        },
        {
          h: '2. 收集和使用目的',
          p: '我们仅将您的信息用于处理服务申请、回复咨询、确认设备资源、提供客户支持、评估本地合作申请、安排维护沟通以及履行与您相关的服务或合作事项。'
        },
        {
          h: '3. 同意与用途限制',
          p: '通过提交表单，您同意我们按照本政策处理您的个人信息。提交表单不代表您同意接收营销邮件；除非您另行明确同意，我们只会就本次咨询、申请、服务或合作事项与您联系。'
        },
        {
          h: '4. 第三方服务与数据处理',
          p: '我们可能使用第三方云服务、邮件服务、表单处理工具、支付服务或客户沟通工具来存储和处理提交信息。相关服务可能位于加拿大或其他司法管辖区，并可能受当地法律约束。'
        },
        {
          h: '5. 数据保存与保护',
          p: '我们仅在实现上述目的所需期间保存个人信息，并采取合理的技术和管理措施保护您的信息安全。我们不会向第三方出售或出租您的个人信息。'
        },
        {
          h: '6. 跨境传输',
          p: '在提供服务、处理付款、表单提交、邮件沟通或技术支持时，您的信息可能被传输、处理或存储在加拿大以外地区。我们会采取合理措施确保服务提供方按照适用隐私要求处理相关信息。'
        },
        {
          h: '7. 访问、更正与撤回同意',
          p: '您可以联系我们请求访问、更正或删除您的个人信息，也可以在适用法律允许范围内撤回同意。撤回同意可能影响我们继续处理您的申请或提供相关服务。'
        },
        {
          h: '8. 隐私负责人联系方式',
          p: '如有任何隐私相关问题，请联系 Aurora 隐私负责人：contact@aurorasitesolutions.com'
        }
      ],
      checkbox: '我已阅读并同意隐私政策，我知道我的信息将根据适用的加拿大隐私法律受到保护并仅用于处理此申请。',
      useCheckbox: '我确认我的预期用途符合适用法律、平台政策及第三方服务条款，不会用于欺诈、虚假互动、滥用平台或规避平台执行机制。'
    },
    contact: {
      title: '准备好建立你的加拿大本地独立设备环境了吗',
      desc: '请告知你的平台类型、设备数量、远程员工数量和偏好的联系方式。我们将确认资源情况并提供部署方案。',
      form: {
        name: '姓名',
        contact: '邮箱 / Telegram / 微信',
        message: '请描述你的平台类型、用途、设备数量和远程操作需求',
        submit: '提交申请'
      },
      successTitle: '申请已收悉。',
      successDesc: '我们将尽快审核您的需求并与您取得联系。',
      resend: '发送另一条申请'
    },
    footer: '© 2026 AURORA SITE SOLUTIONS LTD. · Canada-based infrastructure · Distributed physical workstation deployment'
  },
  en: {
    nav: {
      home: 'Home',
      arch: 'Architecture',
      careers: 'Local Partners',
      pricing: 'Pricing',
      cta: 'Request Setup'
    },
    hero: {
      tag: 'Dedicated Mac mini · Local Residential / Office Network · Private Workstation',
      title1: 'Real Devices.',
      title2: 'Real Identity.',
      title3: 'Built for Stability.',
      desc: 'Aurora hosts dedicated Mac mini workstations in local Canadian residential, office, or secure commercial sites, with dedicated static IP / fixed network access for cross-border e-commerce, live commerce, ad operations, payment dashboards, agencies, and remote teams.',
      punch: 'Not a datacenter VPS. Not a shared proxy pool. Not a random remote desktop. Aurora provides real Canadian physical workstations built for stable, long-term business operations.',
      note: 'Device location may vary across Canadian cities depending on availability and operational requirements.',
      card1: ['Dedicated Mac mini', 'Real physical hardware. Not virtual. Not shared.', Cpu],
      card2: ['Local residential-grade network', 'Hosted in Canadian residential, office, or secure commercial sites, not traditional datacenter VPS.', MapPin],
      card3: ['One client, one device', 'A consistent device, network, and remote operation environment.', Lock],
      btn1: 'Request Setup',
      btn2: 'Technical Architecture'
    },
    liveNode: {
      title: 'Live node',
      loc: 'Canada · Local residential / office / secure commercial sites',
      device: 'Device',
      deviceVal: 'Dedicated Mac mini',
      net: 'Network',
      netVal: 'Dedicated static IP / local fixed network access',
      access: 'Access',
      accessVal: 'Private remote workstation',
      isolation: 'Isolation',
      isolationVal: 'No shared environment'
    },
    solution: {
      tag: 'What you get',
      title: 'A real Canadian local device environment, not a datacenter VPS or shared proxy pool.',
      card1: ['Dedicated Mac mini', 'A physical Canadian Mac mini assigned to your operation. No shared VM layer, no shared desktop environment.', Monitor],
      card2: ['Local residential-grade network', 'Devices are hosted in Canadian residential, office, or secure commercial sites with dedicated static IP / fixed network access.', Network],
      card3: ['Long-term stability', 'Basic monitoring, remote access support, and Canadian physical maintenance when needed.', Shield]
    },
    useCases: {
      tag: 'Use Cases',
      title: 'Built for multi-platform backend operations, commerce, and remote teams.',
      desc: 'For TikTok, Shopify, Amazon, Meta Ads, Google Ads, Stripe, PayPal, e-commerce teams, agencies, customer support systems, and remote operators.',
      items: [
        ['TikTok / Live Commerce', 'Use a dedicated Canadian Mac mini environment for TikTok Shop, livestream preparation, dashboard access, product management, and remote team workflows.', Radio],
        ['Cross-border E-commerce', 'Manage Shopify, Amazon, WooCommerce, storefronts, orders, listings, inventory tools, customer service systems, and daily operations.', ShoppingCart],
        ['Payment & Business Dashboards', 'Use a stable business workstation for Stripe, PayPal, Shopify Payments, and other payment or business dashboard administration.', CreditCard],
        ['Ad Operations', 'Support daily management of Meta Ads, Google Ads, TikTok Ads, and other advertising dashboards for business teams.', Megaphone],
        ['Environment Consistency', 'Reduce inconsistency caused by shared proxies, cheap VPS setups, datacenter proxy pools, multiple operators, and mixed device access.', Layers3],
        ['Remote Staff Workflow', 'Let staff access a controlled Canadian workstation without sharing the owner’s personal computer or using random remote desktops.', Headphones],
        ['Agency / Studio Operations', 'Suitable for agencies, live commerce studios, cross-border service providers, and multi-project teams.', Users],
        ['Emerging-market Operators', 'Serve operators from Mainland China, India, Southeast Asia, the Middle East, and other markets that need a Canadian device environment.', Store]
      ]
    },
    compare: {
      title: 'Why not datacenter VPS, shared proxies, or random remote desktops?',
      desc: 'Cross-border operations need real devices, fixed networks, and a consistent local operating environment — not crowded datacenter resources.',
      vps: 'Datacenter VPS / shared proxy',
      vpsItems: ['Datacenter or proxy pool resources', 'Shared or changing IP ranges', 'Virtual environments with weak device identity', 'Mixed users and inconsistent access'],
      aurora: 'Aurora local physical node',
      auroraItems: ['Hosted in Canadian residential, office, or secure commercial sites', 'Real dedicated Mac mini hardware', 'Dedicated static IP / fixed network access', 'One client, one environment for long-term use'],
      cta: 'View technical architecture'
    },
    pricing: {
      tag: 'Pricing',
      title: 'One dedicated Canadian local device environment for your cross-border team.',
      desc: 'Simple monthly pricing for a dedicated physical workstation in Canada. Each plan includes a dedicated Mac mini, dedicated static IP / fixed network access, private remote access, basic monitoring, and local maintenance coordination. Devices are hosted in Canadian residential, office, or secure commercial sites for teams that need a stable long-term backend environment.',
      planName: 'Dedicated Starter',
      price: '$699 CAD',
      unit: '/ month + applicable taxes, if any',
      features: [
        '1 Dedicated Mac mini',
        'Hosted in a Canadian residential, office, or secure commercial site',
        'Dedicated static IP / fixed network access, one per device',
        'Private remote access environment',
        'Basic monitoring and support',
        'No setup fee'
      ],
      cta: 'Get Your Device'
    },
    archPage: {
      tag: 'Technical Architecture',
      title: 'Physical device hosting,',
      titleHighlight: 'built for stable remote operations.',
      desc: 'Aurora provides dedicated Mac mini workstations hosted in local Canadian residential, office, or secure commercial sites — not traditional datacenter VPS environments or shared proxy pools. Each client receives one physical device, dedicated static IP / fixed network access, and a private remote access workflow for multi-platform backend operations, remote staff workflows, and long-term cross-border business use.',
      cards: [
        ['Client Access', 'Secure remote connection from your own location.', Monitor],
        ['Dedicated Mac mini', 'Physical Apple hardware assigned to one client.', HardDrive],
        ['Local Network Access', 'Dedicated static IP / fixed network access for each client, not shared.', Wifi],
        ['Local Support', 'On-site maintenance when hardware requires attention.', Wrench]
      ],
      flowTitle: 'System Flow',
      flowSub: 'Local, physical, isolated.',
      flowDesc: 'The setup avoids shared virtual machines, datacenter VPS servers, and crowded proxy pools. The goal is a clean, durable Canadian local operating environment with clear ownership and predictable maintenance.',
      flowSteps: [
        ['1', 'Client connects remotely', 'You access the assigned Mac mini through a private remote workstation workflow.'],
        ['2', 'Mac mini runs inside a Canadian local site', 'Your assigned device remains physically deployed and powered in a Canadian residential, office, or secure commercial site.'],
        ['3', 'Use dedicated network access', 'Each device receives dedicated static IP / fixed network access, not shared with other clients.'],
        ['4', 'Support handles issues', 'If hardware, power, or cabling needs attention, local maintenance can be performed.']
      ],
      infraTitle: 'Designed like local infrastructure, not a temporary datacenter workaround.',
      infraCards: [
        ['Hardware Layer', 'Dedicated Apple Mac mini, physical power, physical cabling, no shared desktop environment.', Cpu],
        ['Network Layer', 'Dedicated static IP / local fixed network access for a consistent device and business environment.', Router],
        ['Access Layer', 'Remote workstation access for client operation, separated from other customers.', Lock],
        ['Monitoring Layer', 'Basic uptime awareness and manual intervention when physical troubleshooting is needed.', Activity],
        ['Maintenance Layer', 'Local technician support for reboot, cable check, device replacement, and network inspection.', Wrench],
        ['Expansion Layer', 'Additional devices can be added as separate local physical nodes when the operation grows.', Server]
      ],
      boundaryTitle: 'Operational boundaries',
      boundaryDesc: 'Aurora provides physical workstation infrastructure and maintenance. Customers are responsible for how they use their own accounts, software, platforms, and business workflows.',
      boundaries: [
        'Aurora provides infrastructure only. This service is not intended for bypassing platform restrictions, evading enforcement mechanisms, or engaging in fraudulent or abusive activities.',
        'All usage must comply with applicable laws, platform policies, and third-party service terms.',
        'We provide hardware hosting and remote workstation access.',
        'We do not sell bot traffic, fake engagement, or platform abuse services.',
        'Each device is assigned to one client environment.',
        'Physical maintenance is handled by local Canadian technicians.',
        'Customers must comply with all applicable laws, platform terms, and third-party service rules when using the hosted workstation.'
      ]
    },
    careers: {
      tag: 'Local Partnership Opportunities · Canada',
      title: 'Join our local',
      titleHighlight: 'node support network.',
      desc: 'We are building a distributed local partnership network across Canada, including field maintenance assistants and local node hosting partners to support stable Mac mini device operations.',
      cards: [
        ['Field Maintenance Assistant', 'On-demand visits, device checks, reboot, cable check, and photo reports.', Wrench],
        ['Node Hosting Partner', 'Provide safe device space and stable power conditions.', HomeIcon],
        ['Low-involvement role', 'No customer account access and no customer business operation required.', Shield],
        ['Long-term partnership', 'Suitable for residences, offices, or secure commercial spaces.', BriefcaseBusiness]
      ],
      techTitle: 'Partnership Type 1: Field Maintenance Assistant',
      techDesc: 'Suitable for responsible people with transportation who can follow step-by-step instructions. The work is practical on-site support, not software engineering.',
      techTasks: [
        ['Power check', 'Confirm Mac mini, router, and power adapter are running.'],
        ['Cable check', 'Inspect Ethernet, power cable, and device placement.'],
        ['Simple reboot', 'Restart Mac mini or router when instructed.'],
        ['Photo report', 'Send clear photos or short videos after each visit.'],
        ['Device swap', 'Replace a Mac mini or router if pre-arranged.']
      ],
      hostTitle: 'Partnership Type 2: Local Node Hosting Partner',
      hostDesc: 'Suitable for partners in Canada who have a stable residence, office, or secure commercial space. Partners only provide basic site conditions. Devices, network connectivity, and maintenance workflows are managed by Aurora.',
      hostTasks: [
        ['Safe space', 'Provide a dry, safe, and stable space for equipment placement.'],
        ['Stable power', 'Allow devices to remain powered for long-term operation.'],
        ['Basic assistance', 'Assist with simple status checks or scheduled maintenance access when needed.'],
        ['No internet required', 'Network connectivity is provided and managed by Aurora. Hosting partners are not required to supply or configure any internet connection.'],
        ['No customer operations', 'Partners do not log in, manage, or use any customer accounts or platforms.']
      ],
      whoTitle: 'Who we want',
      whoSub: 'Reliable, stable, low-involvement.',
      fitTitle: 'Good fit',
      fitItems: [
        'Located in or near a major Canadian city.',
        'Residence, office, or secure commercial space preferred.',
        'Able to provide stable power and safe device placement conditions.',
        'Able to assist with simple status checks or scheduled access when needed.',
        'Clear communication and reliable response.',
        'Respectful of device security and customer privacy.'
      ],
      plusTitle: 'Helpful but not required',
      plusItems: [
        'Basic computer hardware or home network experience.',
        'Office, storage, property, field service, or IT support experience.',
        'Reliable transportation.',
        'Dry, ventilated space suitable for long-term device placement.',
        'Willingness to work together long-term.',
        'Ability to support multiple devices or future node expansion.'
      ],
      applyTitle: 'Interested in local partnership?',
      applyDesc: 'Send us your name, city, preferred partnership type, site conditions, availability, and contact method.',
      applyForm: {
        name: 'Full name',
        contact: 'Email or phone',
        area: 'City / area',
        type: 'Partnership type: Field maintenance / Node hosting / Both',
        bio: 'Site conditions, availability, transportation, and relevant experience',
        submit: 'Submit Application',
        toast: 'Application received. Please also email contact@aurorasitesolutions.com'
      }
    },
    privacy: {
      title: 'Privacy Policy',
      effectiveDate: 'Effective Date: May 2, 2026',
      intro: "This Privacy Policy explains how AURORA SITE SOLUTIONS LTD. collects, uses, stores, and protects personal information under applicable Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA), Alberta's Personal Information Protection Act (PIPA), and other applicable laws.",
      sections: [
        {
          h: '1. Information We Collect',
          p: 'When you submit information through our contact form or local partnership application form, we may collect your name, contact details, city or area, business requirements, device requirements, partnership type, site conditions, availability, and any other information you choose to provide.'
        },
        {
          h: '2. Purpose of Collection and Use',
          p: 'We use your information only to process service requests, respond to inquiries, confirm device availability, provide customer support, evaluate local partnership applications, coordinate maintenance communications, and fulfill service or partnership matters related to you.'
        },
        {
          h: '3. Consent and Limited Use',
          p: 'By submitting a form, you consent to the processing of your personal information as described in this policy. Submitting a form does not mean you agree to receive marketing emails. Unless you separately provide express consent, we will only contact you regarding your inquiry, application, service, or partnership matter.'
        },
        {
          h: '4. Third-party Services and Data Processing',
          p: 'We may use third-party cloud services, email services, form processing tools, payment providers, or customer communication tools to store and process submitted information. These services may be located in Canada or other jurisdictions and may be subject to local laws.'
        },
        {
          h: '5. Data Retention and Protection',
          p: 'We retain personal information only for as long as necessary for the purposes described above and use reasonable technical and administrative safeguards to protect it. We do not sell or rent your personal information to third parties.'
        },
        {
          h: '6. Cross-border Transfers',
          p: 'When providing services, processing payments, handling form submissions, managing email communication, or providing technical support, your information may be transferred, processed, or stored outside Canada. We take reasonable steps to ensure service providers process information in accordance with applicable privacy requirements.'
        },
        {
          h: '7. Access, Correction, and Withdrawal of Consent',
          p: 'You may contact us to request access to, correction of, or deletion of your personal information. You may also withdraw consent where permitted by applicable law. Withdrawal of consent may affect our ability to process your application or provide related services.'
        },
        {
          h: '8. Privacy Officer Contact',
          p: 'For any privacy-related questions, please contact Aurora Privacy Officer at: contact@aurorasitesolutions.com'
        }
      ],
      checkbox: 'I have read and agree to the Privacy Policy. I understand my information is protected under applicable Canadian privacy laws and used only for this request.',
      useCheckbox: 'I confirm that my intended use complies with applicable laws, platform policies, and third-party service terms, and will not be used for fraud, fake engagement, platform abuse, or evading enforcement mechanisms.'
    },
    contact: {
      title: 'Ready to build your dedicated Canadian local device environment?',
      desc: 'Send your platform type, device count, remote staff needs, and preferred contact method. We will confirm availability.',
      form: {
        name: 'Name',
        contact: 'Email / Telegram / WeChat',
        message: 'Tell us your platforms, use case, device count, and remote access needs',
        submit: 'Submit Request'
      },
      successTitle: 'Request received.',
      successDesc: 'We will review your setup details and contact you shortly.',
      resend: 'Send another request'
    },
    footer: '© 2026 AURORA SITE SOLUTIONS LTD. · Canada-based infrastructure · Distributed physical workstation deployment'
  }
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [page, setPage] = useState<Page>(() => pageFromPath())

  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'
    const saved = localStorage.getItem('lang')
    if (saved === 'zh' || saved === 'en') return saved
    return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
  })

  const [privacyOpen, setPrivacyOpen] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const handlePopState = () => {
      setPage(pageFromPath())
      setMenuOpen(false)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const origin = window.location.origin
    const path = page === 'home' ? '/' : page === 'architecture' ? '/architecture' : '/careers'

    const seo = {
      zh: {
        home: {
          title: '加拿大独享Mac mini设备｜住宅级网络与跨境运营环境 | Aurora',
          description:
            'Aurora 提供加拿大本地住宅、办公室或安全商业空间部署的独享 Mac mini 物理工作站、独立静态 IP / 固定网络出口和私有远程访问环境，适用于 TikTok、Shopify、Amazon、广告后台、支付后台、代运营团队和跨境远程员工。'
        },
        architecture: {
          title: '加拿大本地物理工作站架构｜独享Mac mini与住宅级网络环境 | Aurora',
          description:
            '了解 Aurora 加拿大本地物理工作站架构：独享 Mac mini、住宅/办公室/安全商业空间部署、独立静态 IP / 固定网络出口、私有远程访问和本地维护协调。'
        },
        careers: {
          title: '加拿大本地节点合作｜现场维护与设备托管合作 | Aurora',
          description:
            'Aurora 招募加拿大本地合作方，包括现场维护助理和本地节点托管合作方，支持 Mac mini 物理设备稳定运行。'
        }
      },
      en: {
        home: {
          title: 'Dedicated Canadian Mac mini with Local Residential / Office Network | Aurora',
          description:
            'Aurora provides dedicated Canadian Mac mini workstations hosted in local residential, office, or secure commercial sites with dedicated static IP / fixed network access for TikTok, Shopify, Amazon, ads, payment dashboards, agencies, and remote teams.'
        },
        architecture: {
          title: 'Canada Local Physical Workstation Architecture | Dedicated Mac mini | Aurora',
          description:
            'Explore Aurora’s Canada-based physical workstation architecture: dedicated Mac mini devices hosted in residential, office, or secure commercial sites with dedicated static IP / fixed network access, remote workstation access, and local maintenance coordination.'
        },
        careers: {
          title: 'Canada Local Node Partners | Field Maintenance & Hosting | Aurora',
          description:
            'Aurora is building a local partner network in Canada for field maintenance assistants and local node hosting partners supporting dedicated Mac mini device operations.'
        }
      }
    }

    const current = (seo as any)[lang][page]
    document.title = current.title

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const setProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const setLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
      let tag = document.querySelector(selector) as HTMLLinkElement | null
      if (!tag) {
        tag = document.createElement('link')
        tag.setAttribute('rel', rel)
        if (hreflang) tag.setAttribute('hreflang', hreflang)
        document.head.appendChild(tag)
      }
      tag.setAttribute('href', href)
    }

    setMeta('description', current.description)
    setMeta(
      'keywords',
      lang === 'zh'
        ? '加拿大Mac mini,住宅级网络,独立静态IP,非机房VPS,非共享代理,加拿大本地设备,跨境电商设备,TikTok Shop,Shopify,Amazon,广告后台,支付后台,代运营团队,远程工作站'
        : 'dedicated Mac mini Canada,local residential office network,dedicated static IP Canada,not datacenter VPS,not shared proxy,cross-border operators,TikTok Shop,Shopify,Amazon,ads dashboard,payment dashboard,remote workstation,agency operations'
    )
    setMeta('robots', 'index, follow')
    setMeta('viewport', 'width=device-width, initial-scale=1')

    setProperty('og:title', current.title)
    setProperty('og:description', current.description)
    setProperty('og:type', 'website')
    setProperty('og:url', `${origin}${path}`)
    setProperty('og:site_name', 'Aurora Site Solutions')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', current.title)
    setMeta('twitter:description', current.description)

    setLink('canonical', `${origin}${path}`)
    setLink('alternate', `${origin}${path}?lang=zh`, 'zh')
    setLink('alternate', `${origin}${path}?lang=en`, 'en')
    setLink('alternate', `${origin}${path}`, 'x-default')

    const oldSchema = document.getElementById('aurora-schema')
    if (oldSchema) oldSchema.remove()

    const schema = document.createElement('script')
    schema.id = 'aurora-schema'
    schema.type = 'application/ld+json'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: lang === 'zh' ? '加拿大本地独享 Mac mini 物理工作站与住宅级网络环境' : 'Dedicated Canadian Mac mini Workstation with Local Residential / Office Network',
      provider: {
        '@type': 'Organization',
        name: 'AURORA SITE SOLUTIONS LTD.',
        url: origin
      },
      areaServed: ['Canada', 'China', 'Global'],
      serviceType:
        lang === 'zh'
          ? '加拿大本地物理工作站、住宅级网络环境、独立静态 IP、远程设备环境、多平台跨境后台运营环境'
          : 'Canada-based local physical workstation, residential and office network environment, dedicated static IP, remote device environment, multi-platform cross-border backend operation environment',
      description: current.description,
      offers: {
        '@type': 'Offer',
        price: '699',
        priceCurrency: 'CAD',
        availability: 'https://schema.org/InStock'
      }
    })
    document.head.appendChild(schema)
  }, [lang, page])

  const go = (target: Page) => {
    const nextPath = pagePath(target)
    setPage(target)
    setMenuOpen(false)

    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'zh' ? 'en' : 'zh'
      localStorage.setItem('lang', next)
      return next
    })
  }

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    if (page !== 'home') {
      setPage('home')

      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/')
      }

      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const togglePrivacy = () => setPrivacyOpen(!privacyOpen)

  return (
    <div className={`min-h-screen bg-[#F5F7F6] text-[#0d1b16] ${privacyOpen ? 'overflow-hidden' : ''}`}>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F5F7F6]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button onClick={() => go('home')} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A3D2E] text-white">
              <Monitor className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight">AURORA SITE SOLUTIONS</div>
              <div className="text-xs font-semibold text-black/45 uppercase tracking-wider">Canada-based infrastructure</div>
            </div>
          </button>

          <nav className="hidden items-center gap-6 text-sm font-bold text-black/65 md:flex">
            <button onClick={() => go('home')} className="hover:text-[#0A3D2E]">{t.nav.home}</button>
            <button onClick={() => go('architecture')} className="hover:text-[#0A3D2E]">{t.nav.arch}</button>
            <button onClick={() => go('careers')} className="hover:text-[#0A3D2E]">{t.nav.careers}</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-[#0A3D2E]">{t.nav.pricing}</button>
            <button onClick={toggleLang} className="flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-xs hover:bg-black/5">
              <Languages className="h-3.5 w-3.5" />
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <button onClick={() => scrollTo('contact')} className="rounded-full bg-[#0A3D2E] px-5 py-3 text-white hover:bg-[#D32F2F] transition-colors shadow-lg shadow-[#0A3D2E]/20">
              {t.nav.cta}
            </button>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button onClick={toggleLang} className="flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-xs">
              <Languages className="h-3.5 w-3.5" />
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mx-5 mb-4 rounded-3xl border border-black/5 bg-white p-4 shadow-xl md:hidden">
            <button onClick={() => go('home')} className="block w-full rounded-2xl px-4 py-4 text-left font-bold hover:bg-black/5">{t.nav.home}</button>
            <button onClick={() => go('architecture')} className="block w-full rounded-2xl px-4 py-4 text-left font-bold hover:bg-black/5">{t.nav.arch}</button>
            <button onClick={() => go('careers')} className="block w-full rounded-2xl px-4 py-4 text-left font-bold hover:bg-black/5">{t.nav.careers}</button>
            <button onClick={() => scrollTo('pricing')} className="block w-full rounded-2xl px-4 py-4 text-left font-bold hover:bg-black/5">{t.nav.pricing}</button>
            <button onClick={() => scrollTo('contact')} className="block w-full rounded-2xl px-4 py-4 text-left font-bold hover:bg-[#0A3D2E] hover:text-white transition-colors">{t.nav.cta}</button>
          </div>
        )}
      </header>

      {page === 'home' && <HomePage lang={lang} t={t} sent={sent} setSent={setSent} scrollTo={scrollTo} go={go} togglePrivacy={togglePrivacy} />}
      {page === 'architecture' && <ArchitecturePage t={t} scrollTo={scrollTo} />}
      {page === 'careers' && <CareersPage t={t} togglePrivacy={togglePrivacy} />}

      <footer className="border-t border-black/5 px-5 py-12 text-center bg-white">
        <div className="mb-6 flex justify-center space-x-6 text-xs font-bold uppercase tracking-widest text-black/35">
          <button onClick={togglePrivacy} className="hover:text-[#0A3D2E] transition-colors uppercase">{t.privacy.title}</button>
          <span className="opacity-20">|</span>
          <span>AURORA SITE SOLUTIONS LTD.</span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/25">{t.footer}</p>
      </footer>

      {privacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative h-full max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-[2.5rem] bg-white p-8 shadow-2xl md:p-12">
            <button onClick={togglePrivacy} className="sticky top-0 float-right flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7F6] text-black/40 hover:bg-black/5 hover:text-black">
              <X className="h-5 w-5" />
            </button>
            <div className="clear-both" />
            <h2 className="mb-2 text-3xl font-black tracking-tight">{t.privacy.title}</h2>
            <p className="mb-8 text-sm font-bold text-black/40">{t.privacy.effectiveDate}</p>
            <p className="mb-8 text-lg leading-relaxed text-black/70">{t.privacy.intro}</p>
            <div className="space-y-8">
              {t.privacy.sections.map((section: any, idx: number) => (
                <div key={idx}>
                  <h3 className="mb-3 text-xl font-black text-[#0A3D2E]">{section.h}</h3>
                  <p className="leading-7 text-black/60">{section.p}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 border-t border-black/5 pt-8 text-center">
              <button onClick={togglePrivacy} className="rounded-2xl bg-[#0A3D2E] px-8 py-3 font-bold text-white shadow-lg shadow-[#0A3D2E]/20 hover:bg-[#D32F2F]">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function HomePage({ lang, t, sent, setSent, scrollTo, go, togglePrivacy }: any) {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:pt-24">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D32F2F]/10 bg-white px-4 py-2 text-sm font-bold text-[#D32F2F] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#D32F2F]" />
            {t.hero.tag}
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[#07130f] md:text-7xl">
            {lang === 'zh' ? (
              <>
                加拿大独享 Mac mini 设备<br />
                <span className="text-[#0A3D2E]">住宅级网络 · 跨境运营环境</span>
              </>
            ) : (
              <>
                Dedicated Canadian Device Environments<br />
                <span className="text-[#0A3D2E]">with Local Residential / Office Network Access</span>
              </>
            )}
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-black/60">{t.hero.desc}</p>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-6 text-[#0A3D2E]">{t.hero.punch}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">{t.hero.note}</p>

          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[t.hero.card1, t.hero.card2, t.hero.card3].map(([title, desc, Icon]: any) => (
              <article key={title} className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
                <Icon className="mb-4 h-6 w-6 text-[#2F7D5B]" />
                <div className="font-black">{title}</div>
                <div className="mt-1 text-sm leading-5 text-black/50">{desc}</div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button aria-label={lang === 'zh' ? '申请加拿大独享 Mac mini 设备部署' : 'Request dedicated Mac mini setup in Canada'} onClick={() => scrollTo('contact')} className="group rounded-3xl bg-[#0A3D2E] px-9 py-5 text-lg font-black text-white shadow-2xl shadow-[#0A3D2E]/20 transition hover:scale-[1.02] hover:bg-[#D32F2F]">
              {t.hero.btn1} <ArrowRight className="ml-2 inline h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <button
              aria-label={lang === 'zh' ? '查看 Aurora 技术架构' : 'View Aurora technical architecture'}
              onClick={() => go('architecture')}
              className="rounded-3xl border border-black/10 bg-white px-9 py-5 text-lg font-black hover:bg-black/5"
            >
              {t.hero.btn2}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[3rem] bg-[#0A3D2E]/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[3rem] border border-white bg-white p-6 shadow-2xl">
            <div className="rounded-[2rem] bg-[#0B1411] p-7 text-white">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white/50">{t.liveNode.title}</div>
                  <div className="text-2xl font-black">{t.liveNode.loc}</div>
                </div>
                <Globe2 className="h-9 w-9 text-[#D32F2F]" />
              </div>
              <div className="mb-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-6 border border-white/5">
                <div className="mx-auto h-28 w-56 rounded-3xl bg-gradient-to-br from-[#f0f0f0] to-[#cccccc] shadow-2xl flex items-center justify-center">
                  <div className="text-xs font-black text-black/20 uppercase tracking-tighter">Aurora physical unit</div>
                </div>
                <div className="mx-auto mt-5 h-3 w-44 rounded-full bg-black/30" />
              </div>
              {[
                [t.liveNode.device, t.liveNode.deviceVal],
                [t.liveNode.net, t.liveNode.netVal],
                [t.liveNode.access, t.liveNode.accessVal],
                [t.liveNode.isolation, t.liveNode.isolationVal],
              ].map(([a, b]) => (
                <div key={a} className="flex justify-between border-t border-white/10 py-4 text-sm">
                  <span className="text-white/45">{a}</span>
                  <span className="font-bold">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#D32F2F]">{t.solution.tag}</div>
          <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">{t.solution.title}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[t.solution.card1, t.solution.card2, t.solution.card3].map(([title, desc, Icon]: any) => (
            <article key={title} className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-sm group hover:border-[#0A3D2E]/20 transition-colors">
              <Icon className="mb-8 h-9 w-9 text-[#2F7D5B]" />
              <h3 className="text-2xl font-black group-hover:text-[#0A3D2E] transition-colors">{title}</h3>
              <p className="mt-4 leading-7 text-black/55">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <UseCasesSection t={t} />

      <section id="compare" className="mx-auto max-w-7xl px-5 py-20">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#0B1411] p-6 text-white md:p-10 border border-white/5">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">{t.compare.title}</h2>
            <p className="mt-5 text-lg text-white/55">{t.compare.desc}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              [t.compare.vps, t.compare.vpsItems],
              [t.compare.aurora, t.compare.auroraItems],
            ].map(([title, items]: any) => (
              <article key={title} className={`rounded-[2rem] border p-7 ${title === t.compare.aurora ? 'border-[#2F7D5B]/30 bg-[#2F7D5B]/10' : 'border-white/10 bg-white/5'}`}>
                <h3 className="mb-6 text-2xl font-black">{title}</h3>
                {items.map((x: string) => (
                  <div key={x} className="flex items-center gap-3 border-t border-white/10 py-4">
                    <CheckCircle2 className={`h-5 w-5 ${title === t.compare.aurora ? 'text-[#2F7D5B]' : 'text-white/30'}`} />
                    <span className="font-semibold text-white/80">{x}</span>
                  </div>
                ))}
              </article>
            ))}
          </div>
          <button onClick={() => go('architecture')} className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-4 font-black text-[#0B1411] hover:bg-[#D32F2F] hover:text-white transition-all">
            {t.compare.cta} <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#D32F2F]">{t.pricing.tag}</div>
            <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">{t.pricing.title}</h2>
            <p className="mt-6 text-lg leading-8 text-black/55">{t.pricing.desc}</p>
          </div>
          <article className="rounded-[2.5rem] border-2 border-[#D32F2F]/10 bg-white p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-[#D32F2F]/5 rounded-bl-full -mr-10 -mt-10" />
            <div className="mb-6 inline-flex rounded-full bg-[#ffe5e5] px-4 py-2 text-sm font-black text-[#D32F2F]">{t.pricing.planName}</div>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black tracking-[-0.06em] text-[#D32F2F]">{t.pricing.price}</span>
              <span className="pb-3 text-lg font-bold text-black/50">{t.pricing.unit}</span>
            </div>
            <div className="mt-8 grid gap-4">
              {t.pricing.features.map((x: string) => (
                <div key={x} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2F7D5B]" />
                  <span className="font-semibold text-black/80">{x}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo('contact')} className="mt-9 w-full rounded-3xl bg-[#0A3D2E] py-5 text-lg font-black text-white hover:bg-[#D32F2F] shadow-xl shadow-[#0A3D2E]/20 transition-all">
              {t.pricing.cta}
            </button>
          </article>
        </div>
      </section>

      <ContactSection t={t} sent={sent} setSent={setSent} togglePrivacy={togglePrivacy} />
    </main>
  )
}

function UseCasesSection({ t }: any) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 bg-white rounded-[4rem] border border-black/5 shadow-sm">
      <div className="mb-12 max-w-4xl px-5">
        <div className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#D32F2F]">{t.useCases.tag}</div>
        <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">{t.useCases.title}</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-black/55">{t.useCases.desc}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 px-5">
        {t.useCases.items.map(([title, desc, Icon]: any) => (
          <article key={title} className="rounded-[2rem] border border-black/5 bg-[#F5F7F6] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-[#0A3D2E]/10">
            <Icon className="mb-6 h-8 w-8 text-[#2F7D5B]" />
            <h3 className="text-xl font-black">{title}</h3>
            <p className="mt-4 leading-7 text-black/55 text-sm">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ArchitecturePage({ t, scrollTo }: any) {
  const at = t.archPage
  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D32F2F]/10 bg-white px-4 py-2 text-sm font-bold text-[#D32F2F] shadow-sm">
            <Router className="h-4 w-4" />
            {at.tag}
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            {at.title}<br />
            <span className="text-[#0A3D2E]">{at.titleHighlight}</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-black/60">{at.desc}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-[3rem] bg-[#0B1411] p-6 text-white md:p-10 border border-white/5">
          <div className="grid gap-5 lg:grid-cols-4">
            {at.cards.map(([title, desc, Icon]: any) => (
              <article key={title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                <Icon className="mb-6 h-8 w-8 text-[#2F7D5B]" />
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-white/55">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#D32F2F]">{at.flowTitle}</div>
            <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">{at.flowSub}</h2>
            <p className="mt-6 text-lg leading-8 text-black/55">{at.flowDesc}</p>
          </div>
          <div className="rounded-[2.5rem] border border-black/5 bg-white p-6 shadow-xl md:p-8">
            {at.flowSteps.map(([num, title, desc]: any) => (
              <article key={num} className="flex gap-5 border-b border-black/5 py-6 last:border-b-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0A3D2E] font-black text-white">{num}</div>
                <div>
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-2 leading-7 text-black/55">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#D32F2F]">Infrastructure</div>
          <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">{at.infraTitle}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {at.infraCards.map(([title, desc, Icon]: any) => (
            <article key={title} className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-sm group hover:border-[#0A3D2E]/20 transition-colors">
              <Icon className="mb-6 h-8 w-8 text-[#2F7D5B]" />
              <h3 className="text-xl font-black group-hover:text-[#0A3D2E] transition-colors">{title}</h3>
              <p className="mt-3 leading-7 text-black/55">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[3rem] bg-white p-8 shadow-xl md:p-12 border border-black/5">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-4xl font-black tracking-[-0.04em]">{at.boundaryTitle}</h2>
              <p className="mt-5 leading-8 text-black/55">{at.boundaryDesc}</p>
            </div>
            <div className="grid gap-4">
              {at.boundaries.map((x: string) => (
                <div key={x} className="flex gap-3 rounded-2xl bg-[#F5F7F6] p-4 border border-black/5">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#2F7D5B]" />
                  <span className="font-semibold text-black/65">{x}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => scrollTo('contact')} className="mt-10 rounded-3xl bg-[#0A3D2E] px-8 py-5 text-lg font-black text-white hover:bg-[#D32F2F] transition-colors shadow-lg shadow-[#0A3D2E]/20">
            {t.nav.cta} <ArrowRight className="ml-2 inline h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  )
}

function CareersPage({ t, togglePrivacy }: any) {
  const ct = t.careers
  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D32F2F]/10 bg-white px-4 py-2 text-sm font-bold text-[#D32F2F] shadow-sm">
            <Users className="h-4 w-4" />
            {ct.tag}
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            {ct.title}<br />
            <span className="text-[#0A3D2E]">{ct.titleHighlight}</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-black/60">{ct.desc}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="grid gap-5 md:grid-cols-4">
          {ct.cards.map(([title, desc, Icon]: any) => (
            <article key={title} className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-sm hover:border-[#0A3D2E]/20 transition-colors">
              <Icon className="mb-6 h-8 w-8 text-[#2F7D5B]" />
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-black/55">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-[2.5rem] bg-white p-8 shadow-xl border border-black/5">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#D32F2F]">Type 1</div>
            <h2 className="text-4xl font-black tracking-[-0.04em]">{ct.techTitle}</h2>
            <p className="mt-5 leading-8 text-black/55">{ct.techDesc}</p>
            <div className="mt-8 grid gap-4">
              {ct.techTasks.map(([title, desc]: any) => (
                <div key={title} className="rounded-2xl bg-[#F5F7F6] p-5 border border-black/5">
                  <div className="font-black text-[#0A3D2E]">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-black/55">{desc}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.5rem] bg-[#0B1411] p-8 text-white shadow-2xl border border-white/5">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#D32F2F]">Type 2</div>
            <h2 className="text-4xl font-black tracking-[-0.04em]">{ct.hostTitle}</h2>
            <p className="mt-5 leading-8 text-white/60">{ct.hostDesc}</p>
            <div className="mt-8 grid gap-4">
              {ct.hostTasks.map(([title, desc]: any) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="font-black text-[#2F7D5B]">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/60">{desc}</div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#D32F2F]">{ct.whoSub}</div>
          <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">{ct.whoTitle}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-2xl font-black">{ct.fitTitle}</h3>
            {ct.fitItems.map((x: string) => (
              <div key={x} className="flex gap-3 border-t border-black/5 py-4">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#2F7D5B]" />
                <span className="font-semibold text-black/65">{x}</span>
              </div>
            ))}
          </article>
          <article className="rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-2xl font-black">{ct.plusTitle}</h3>
            {ct.plusItems.map((x: string) => (
              <div key={x} className="flex gap-3 border-t border-black/5 py-4">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#2F7D5B]" />
                <span className="font-semibold text-black/65">{x}</span>
              </div>
            ))}
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[3rem] bg-white p-8 shadow-xl md:p-12 border border-black/5">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#D32F2F]">Apply</div>
              <h2 className="text-4xl font-black tracking-[-0.04em]">{ct.applyTitle}</h2>
              <p className="mt-5 leading-8 text-black/55">{ct.applyDesc}</p>
              <div className="mt-8 rounded-[2rem] bg-[#F5F7F6] p-6 border border-black/5">
                <div className="flex items-center gap-3 font-black text-[#0A3D2E]">
                  <Mail className="h-5 w-5 text-[#2F7D5B]" />
                  contact@aurorasitesolutions.com
                </div>
                <p className="mt-3 text-sm leading-6 text-black/50 font-bold uppercase tracking-tighter">
                  Subject: Local Partnership Application
                </p>
              </div>
            </div>

            <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); alert(ct.applyForm.toast) }}>
              <input required placeholder={ct.applyForm.name} className="rounded-3xl border border-black/10 bg-[#F5F7F6] px-6 py-5 font-semibold outline-none focus:border-[#0A3D2E]" />
              <input required placeholder={ct.applyForm.contact} className="rounded-3xl border border-black/10 bg-[#F5F7F6] px-6 py-5 font-semibold outline-none focus:border-[#0A3D2E]" />
              <input required placeholder={ct.applyForm.area} className="rounded-3xl border border-black/10 bg-[#F5F7F6] px-6 py-5 font-semibold outline-none focus:border-[#0A3D2E]" />
              <input required placeholder={ct.applyForm.type} className="rounded-3xl border border-black/10 bg-[#F5F7F6] px-6 py-5 font-semibold outline-none focus:border-[#0A3D2E]" />
              <textarea required placeholder={ct.applyForm.bio} rows={5} className="rounded-3xl border border-black/10 bg-[#F5F7F6] px-6 py-5 font-semibold outline-none focus:border-[#0A3D2E]" />
              <div className="flex items-start gap-3 p-2">
                <input required type="checkbox" className="mt-1 h-4 w-4 shrink-0 rounded border-black/10 text-[#0A3D2E] focus:ring-[#0A3D2E]" />
                <label className="text-xs leading-normal text-black/40">
                  {t.privacy.checkbox}{' '}
                  <button type="button" onClick={togglePrivacy} className="font-bold text-[#0A3D2E] underline">
                    {t.privacy.title}
                  </button>
                </label>
              </div>
              <div className="flex items-start gap-3 p-2">
                <input required type="checkbox" className="mt-1 h-4 w-4 shrink-0 rounded border-black/10 text-[#0A3D2E] focus:ring-[#0A3D2E]" />
                <label className="text-xs leading-normal text-black/40">{t.privacy.useCheckbox}</label>
              </div>
              <button className="rounded-3xl bg-[#0A3D2E] px-8 py-5 text-lg font-black text-white hover:bg-[#D32F2F] shadow-lg shadow-[#0A3D2E]/20 transition-all">
                {ct.applyForm.submit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

function ContactSection({ t, sent, setSent, togglePrivacy }: any) {
  const ct = t.contact
  return (
    <section id="contact" className="px-5 py-24">
      <div className="mx-auto max-w-4xl rounded-[3rem] bg-[#0B1411] p-8 text-white shadow-2xl md:p-12 border border-white/5">
        {!sent ? (
          <>
            <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">
              {ct.title.split('?')[0]}<span className="text-[#D32F2F]">?</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">{ct.desc}</p>
            <form className="mt-10 grid gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <input required placeholder={ct.form.name} className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 font-semibold outline-none placeholder:text-white/40 focus:border-[#2F7D5B]/50 transition-colors" />
              <input required placeholder={ct.form.contact} className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 font-semibold outline-none placeholder:text-white/40 focus:border-[#2F7D5B]/50 transition-colors" />
              <textarea required placeholder={ct.form.message} rows={5} className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 font-semibold outline-none placeholder:text-white/40 focus:border-[#2F7D5B]/50 transition-colors" />
              <div className="flex items-start gap-3 px-2 py-4">
                <input required type="checkbox" className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 text-[#2F7D5B] focus:ring-[#2F7D5B]" />
                <label className="text-xs leading-normal text-white/50">
                  {t.privacy.checkbox}{' '}
                  <button type="button" onClick={togglePrivacy} className="font-bold text-white underline">
                    {t.privacy.title}
                  </button>
                </label>
              </div>
              <div className="flex items-start gap-3 px-2 py-4">
                <input required type="checkbox" className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 text-[#2F7D5B] focus:ring-[#2F7D5B]" />
                <label className="text-xs leading-normal text-white/50">{t.privacy.useCheckbox}</label>
              </div>
              <button className="rounded-3xl bg-[#0A3D2E] px-8 py-5 text-lg font-black text-white hover:bg-[#D32F2F] shadow-xl shadow-[#0A3D2E]/20 transition-all">
                {ct.form.submit}
              </button>
            </form>
            <div className="mt-8 flex items-center gap-3 text-white/40 text-sm font-bold uppercase tracking-widest">
              <Mail className="h-4 w-4 text-[#2F7D5B]" />
              <span>contact@aurorasitesolutions.com</span>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-[#2F7D5B]" />
            <h2 className="text-4xl font-black">{ct.successTitle}</h2>
            <p className="mt-4 text-white/65">{ct.successDesc}</p>
            <button onClick={() => setSent(false)} className="mt-8 font-black underline underline-offset-8 text-[#2F7D5B] hover:text-white transition-colors">
              {t.contact.resend}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}