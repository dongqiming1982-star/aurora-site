import React, { useEffect, useState } from 'react';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft, 
  Coffee, 
  Cpu, 
  Globe, 
  Monitor, 
  Network, 
  Send, 
  Server, 
  Shield, 
  Zap, 
  MousePointer2, 
  XCircle, 
  Check,
  Target,
  Power,
  X,
  Menu,
  MapPin,
  Settings,
  Clock,
  Car,
  Box,
  Wrench,
  Wifi,
  Mail,
  Camera
} from 'lucide-react';

// 页面类型定义
type Page = 'home' | 'solution' | 'careers';

// 枫叶图标组件
const MapleLeaf = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12,2L13,5L16,4L15,7L18,7L16,9L19,12L16,13L17,16L14,15L14,18L12,17L10,18L10,15L7,16L8,13L5,12L8,9L6,7L9,7L8,4L11,5L12,2Z" />
  </svg>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 路由跳转
  const goToPage = (p: Page) => { 
    setCurrentPage(p);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0); 
  };
  
  // 锚点跳转
  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') { 
      goToPage('home'); 
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120); 
    }
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // 通用特性卡片组件
  const FeatureCard = ({ title, desc, note, icon: Icon, dark = false }: any) => (
    <div className={`p-10 rounded-[40px] ${dark ? 'bg-white/5 border border-white/10 text-center' : 'bg-red-50/30 border border-red-100 flex flex-col hover:shadow-2xl'} transition-all duration-500`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shrink-0 ${dark ? 'text-red-400' : 'bg-red-600 text-white'}`}>
        <Icon className={dark ? "w-10 h-10" : "w-7 h-7"} />
      </div>
      <h3 className={`font-black mb-4 tracking-tight ${dark ? 'text-xl' : 'text-2xl'}`}>{title}</h3>
      <p className={`${dark ? 'text-white/30 text-sm' : 'text-black/50 text-sm'} font-bold leading-relaxed mb-6`}>{desc}</p>
      {!dark && note && <div className="mt-auto pt-6 border-t border-red-100 text-red-800 font-black italic text-sm">👉 {note}</div>}
    </div>
  );

  const pricingPlans = [
    { name: 'TikTok 直播专机', tagline: '稳定推流 · 独享本地环境', price: '699', unit: '/月', currency: 'CA$', features: ['1 台独立 Mac 真机', '独立静态住宅 IP', '独享 ISP 网络线路', '适合直播与长期运营', '基础远程运维支持'] },
    { name: '跨境账号专机', tagline: '高价值账号长期运营', price: '1,997', unit: '/月起', currency: 'CA$', features: ['3 台物理 Mac 真机', '3 个独立静态住宅 IP', '设备 / 网络 / 账号分离', '迁移与环境配置支持', '优先级技术响应'], highlight: true },
    { name: '矩阵定制方案', tagline: '多节点私有物理集群', price: '定制', unit: '', currency: '', features: ['按需求定制节点规模', '定制化住宅 IP 资源', '指定区域与 ISP 可评估', '独立运维交付方案', '企业级响应支持'] }
  ];

  // --- 首页内容 ---
  const HomePage = () => (
    <>
      <section className="pt-40 sm:pt-56 pb-24 px-4 sm:px-6 text-center relative">
        <div className="max-w-7xl mx-auto z-10">
          <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-red-50 border border-red-100 shadow-sm text-[11px] font-black uppercase tracking-[0.2em] text-[#4a1010] mb-10">
            <span className="italic">Physically Dedicated</span><span className="w-px h-3 bg-red-200" /><span>真实设备 · 真实网络</span>
          </div>
          <h1 className="text-[44px] sm:text-7xl md:text-[88px] font-black tracking-[-0.07em] leading-[1.1] sm:leading-[0.95] mb-10">加拿大本地 Mac 真机<br/><span className="text-red-600">用真实设备 做真实业务</span></h1>
          <div className="mt-8 max-w-4xl mx-auto space-y-8 px-4">
            <p className="text-xl sm:text-3xl leading-relaxed text-black/70 font-bold">专为 {['TikTok 美区直播', '跨境账号运营', '支付后台远程运维'].map((s, i) => <React.Fragment key={i}><span className="text-[#1d1d1f] underline decoration-red-400 decoration-4 underline-offset-8">{s}</span>{i < 2 ? '、' : ''}</React.Fragment>)} 设计</p>
            <div className="py-8 border-y border-black/5 mt-12"><p className="text-lg sm:text-2xl text-red-700 font-black mb-4">非虚拟机 · 非代理 · 非数据中心 IP</p><p className="text-md sm:text-lg text-black/40 font-bold leading-relaxed">每个环境 = 一台在加拿大本地运行的真实 Mac 硬件 + 一条独立本地 ISP 网络 + 一个独立静态住宅 IP<br/>从设备、网络、IP 三个底层维度，降低因虚拟化环境、代理链路或数据中心 IP 标记带来的环境不确定性</p></div>
          </div>
          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6 items-center px-4">
            <button onClick={() => scrollToAnchor('contact')} className="group px-14 py-7 rounded-2xl bg-[#0a192f] text-white font-black shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.03] transition-all text-2xl w-full sm:w-auto">锁定物理机位 <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition"/></button>
            <button onClick={() => goToPage('solution')} className="px-14 py-7 rounded-2xl bg-white border border-black/10 font-black text-2xl w-full sm:w-auto hover:bg-black/5 transition-all">查看架构方案</button>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 bg-[#0a192f] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-400/20 text-red-400 font-black text-xs uppercase mb-8"><Coffee className="w-4 h-4"/> 形象化理解我们的服务</div>
            <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-[1.1]">这不只是个 IP<br/><span className="text-red-400">而是“加拿大物理工位”</span></h2>
            <p className="text-xl sm:text-2xl text-red-100/60 font-bold">你可以理解为：你在加拿大有一个固定工位，那里有一台真实的 Mac，插着当地网线。<br/><span className="text-red-300">你只是在远程操作这台设备。</span></p>
          </div>
          <div className="flex-1 w-full bg-black/20 backdrop-blur-xl rounded-[40px] p-8 sm:p-12 border border-white/10">
            <ul className="space-y-8">
              {[
                { t: '真实的显示终端', d: '由 Mac 物理显卡渲染的图形信号', I: Monitor },
                { t: '真实的硬件指纹', d: '唯一的 Apple 芯片序列号', I: Cpu },
                { t: '真实的网络画像', d: '本地 ISP 住宅宽带环境', I: Globe }
              ].map((item, i) => (
                <li key={i} className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 shadow-lg"><item.I className="w-6 h-6 text-white"/></div>
                  <div><h4 className="font-black text-xl mb-1">{item.t}</h4><p className="text-white/40 font-bold text-sm">{item.d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 bg-white border-y border-black/5"><div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {[
          ['降低底层环境关联风险', '每个环境都是独立 Mac 物理实体，拥有真实的硬件堆栈。', '环境真实性与一致性', Shield],
          ['本地 ISP 住宅网络', '加拿大本地宽带接入，非数据中心批量 IP。信任度极高。', '住宅级纯净 IP 链路', Network],
          ['长期稳定运营', '不做高频换 IP，不共享环境。适合高价值账号与直播。', '建立稳定的设备权属', Activity]
        ].map(([t, d, n, I]: any, i) => <FeatureCard key={i} title={t} desc={d} note={n} icon={I} />)}
      </div></section>

      <section className="py-24 px-4 sm:px-6 bg-[#fbfbfd]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20"><h2 className="text-4xl sm:text-6xl font-black italic uppercase">底层差异对比</h2><p className="text-black/40 font-bold text-lg mt-4">为什么“真机环境”是目前最稳妥的跨境业务解决方案？</p></div>
          <div className="overflow-x-auto bg-white rounded-[40px] border border-black/5 shadow-xl">
            <table className="w-full min-w-[800px] border-collapse">
              <thead><tr className="bg-black/5"><th className="py-8 px-8 text-left text-xs font-black uppercase text-black/40">对比维度</th><th className="py-8 px-8 text-center bg-[#0a192f] text-white font-black italic text-xl">Aurora 物理真机</th><th className="py-8 px-8 text-center text-black/60 font-black italic text-xl">传统虚拟化/代理</th></tr></thead>
              <tbody className="divide-y divide-black/5">{[
                ['硬件指纹', '原生 Apple 芯片序列号、显卡、真实传感器参数。', '由代码模拟生成的虚拟指纹，易被风控穿透。'],
                ['IP 属性', '加拿大本地 ISP 住宅静态/拨号 IP，信任度高。', '数据中心机房 IP 段，已被标记为高风险。'],
                ['环境隔离', '物理级硬件隔离，独立的硬件物理地址。', '同一物理服务器下的虚拟机，底层可能关联。'],
                ['图形渲染', '独立显卡真实渲染输出，符合原生特征。', '软件模拟渲染，在驱动扫描中显示为虚拟。'],
                ['交付周期', '涉及物理上架，需 12-24 小时交付。', '自动化秒级创建，权属极其廉价且不稳定。']
              ].map(([l, p, v], i) => (
                <tr key={i} className="hover:bg-red-50/20 transition-colors">
                  <td className="py-10 px-8 font-black text-xl">{l}</td>
                  <td className="py-10 px-8 bg-red-50/30 text-red-900 font-bold"><div className="flex gap-4"><Check className="w-5 h-5 text-red-600 shrink-0 mt-1"/><span>{p}</span></div></td>
                  <td className="py-10 px-8 text-black/40 font-bold"><div className="flex gap-4"><XCircle className="w-5 h-5 text-black/20 shrink-0 mt-1"/><span>{v}</span></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div>
              <div className="inline-flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-widest mb-4">
                <Camera className="w-4 h-4" /> Proof of Physicality
              </div>
              <h2 className="text-4xl sm:text-6xl font-black italic uppercase leading-[1.1]">物理基础设施实拍</h2>
            </div>
            <p className="text-lg text-black/40 font-bold max-w-md leading-snug">
              眼见为实。我们拒绝使用任何网图或渲染图。以下展示均为我们在加拿大机房的真实物理资产与运行状态。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "现场机架设备",
                tag: "Hardware Infrastructure",
                desc: "位于卡尔加里 NW区住户家中的物理机架，Mac 硬件整齐上架，确保散热与供电冗余。",
                img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop"
              },
              {
                title: "真机操作环境",
                tag: "Native OS Environment",
                desc: "每一路远程流均来自物理显卡渲染，通过专用采集与低延迟传输协议，还原 1:1 真实触感。",
                img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2030&auto=format&fit=crop"
              },
              {
                title: "专业运维实拍",
                tag: "Field Operations",
                desc: "本地运维团队 24/7 待命。从网线插拔到硬件升级，我们提供物理层面的最后一道安全防线。",
                img: "https://images.unsplash.com/photo-1581092921461-7d1568637344?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((item, i) => (
              <div key={i} className="group relative flex flex-col bg-[#fbfbfd] rounded-[48px] overflow-hidden border border-black/5 hover:shadow-3xl transition-all duration-700">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[10px] font-black text-white uppercase tracking-widest">
                    {item.tag}
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                  <p className="text-black/40 font-bold text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-tighter">
                    <CheckCircle2 className="w-4 h-4" /> 资产经实名核验
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-32 px-4 bg-[#fbfbfd]"><div className="max-w-7xl mx-auto text-center">
        <div className="mb-20"><h2 className="text-4xl sm:text-6xl font-black uppercase italic mb-6">物理资源分配</h2><div className="inline-block py-3 px-10 bg-[#0a192f] text-white rounded-full font-black text-xl mb-6">每个机位 = 独立硬件 + 独立宽带 + 专属远程通道</div><p className="text-black/40 font-bold text-lg max-w-2xl mx-auto">这不是廉价的代理 IP 分发，而是为了业务长期稳定性投入的物理基础设施。</p></div>
        <div className="grid md:grid-cols-3 gap-10">{pricingPlans.map((p) => (
          <div key={p.name} className={`relative flex flex-col p-10 sm:p-14 transition-all duration-700 ${p.highlight ? 'bg-[#0a192f] text-white rounded-[60px] shadow-3xl z-20 md:scale-105' : 'bg-white rounded-[60px] border border-black/5'}`}>
            {p.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-red-600 text-white text-xs font-black uppercase">Recommended</div>}
            <div className="text-center mb-10"><h3 className="text-3xl font-black mb-4">{p.name}</h3><p className={`text-sm font-black uppercase tracking-widest ${p.highlight ? 'text-red-200/70' : 'text-black/30'}`}>{p.tagline}</p></div>
            <div className="text-center mb-12 flex items-baseline justify-center">{p.currency && <span className="text-2xl font-black mr-1">{p.currency}</span>}<span className="text-5xl sm:text-7xl font-black tracking-tighter">{p.price}</span>{p.unit && <span className="text-sm font-bold opacity-60 ml-1">{p.unit}</span>}</div>
            <div className="space-y-7 mb-14 text-left flex-grow">{p.features.map(f => <div key={f} className="flex gap-5 items-center"><div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${p.highlight ? 'bg-red-500 text-white' : 'bg-red-600 text-white'}`}><CheckCircle2 className="w-4 h-4"/></div><span className="text-lg font-bold">{f}</span></div>)}</div>
            <button onClick={() => scrollToAnchor('contact')} className={`w-full py-6 rounded-3xl font-black text-xl transition-all ${p.highlight ? 'bg-white text-[#0a192f] hover:bg-red-50' : 'bg-black/5 hover:bg-black/10'}`}>{p.price === '定制' ? '申请架构方案' : '锁定物理机位'}</button>
          </div>
        ))}</div>
      </div></section>
    </>
  );

  // --- 架构方案内容 ---
  const SolutionPage = () => {
    const resultCards = [
      { title: '独立设备', desc: '每个环境对应一台真实 Mac，不是云服务器虚拟实例，不共享底层系统。', icon: Cpu },
      { title: '独立网络', desc: '每台设备绑定独立本地网络身份，不走代理池，不使用批量数据中心 IP。', icon: Network },
      { title: '物理可维护', desc: '出现异常时，可从设备、电源、网络、远程访问四个层面排查和处理。', icon: Shield },
    ];

    const topologySteps = [
      { label: '远程接入层', title: '全球节点接入', desc: '通过专有的加密通道远程登录，仅传输画面信号，不改变环境特征。', icon: MousePointer2, color: 'bg-blue-600' },
      { label: '逻辑隔离层', title: '网络链路网关', desc: '物理级硬件路由器隔离，确保每台 Mac 拥有独立的内网环境与网关指纹。', icon: Server, color: 'bg-slate-700' },
      { label: '物理硬件层', title: 'Mac 真机集群', desc: '位于加拿大本地机房的物理 Mac mini，使用原生 macOS 硬件堆栈。', icon: Monitor, color: 'bg-red-600' },
      { label: '最终出口层', title: '本地住宅 ISP', desc: '连接至当地住宅宽带 ISP，出口 IP 与当地普通居民家庭网络无异。', icon: Globe, color: 'bg-slate-900' },
    ];

    return (
      <div className="bg-white pt-32 sm:pt-48 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => goToPage('home')} className="group flex items-center gap-3 text-black/40 hover:text-black font-black mb-16 transition-all">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1"/> 返回首页
          </button>
          <div className="mb-24">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 font-black text-[10px] uppercase mb-8"><Shield className="w-4 h-4" /> 物理隔离架构方案</div>
            <h1 className="text-5xl sm:text-8xl font-black tracking-tight mb-10 italic uppercase leading-[1.1]">加拿大本地<br /><span className="text-red-600">物理节点架构</span></h1>
            <p className="text-2xl text-black/45 font-bold max-w-xl">为高价值跨境业务提供真正意义上的物理环境隔离。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-24">{resultCards.map((card, i) => (
            <div key={i} className="p-10 rounded-[40px] bg-[#fbfbfd] border border-black/5 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-white text-red-700 flex items-center justify-center mb-8 shadow-sm"><card.icon className="w-7 h-7" /></div>
              <h3 className="font-black text-2xl mb-4">{card.title}</h3>
              <p className="text-black/50 font-bold leading-relaxed">{card.desc}</p>
            </div>
          ))}</div>
          <section className="py-24 border-t border-black/5">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div><h2 className="text-3xl sm:text-5xl font-black uppercase italic mb-4">底层交付拓扑</h2><p className="text-black/40 font-bold">每一层都为环境的真实性与稳定性负责</p></div>
              <div className="flex items-center gap-4 text-xs font-black uppercase text-black/30"><span className="flex items-center gap-2"><Target className="w-4 h-4"/> 独立部署</span><span className="w-px h-3 bg-black/10" /><span className="flex items-center gap-2"><Power className="w-4 h-4"/> 物理上架</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">{topologySteps.map((step, i) => (
              <div key={i} className="p-8 rounded-[40px] bg-[#fbfbfd] border border-black/5">
                <div className={`w-12 h-12 rounded-2xl ${step.color} text-white flex items-center justify-center mb-8 shadow-lg`}><step.icon className="w-6 h-6" /></div>
                <div className="text-[10px] font-black uppercase text-red-600 mb-2 tracking-widest">{step.label}</div>
                <h4 className="text-xl font-black mb-4">{step.title}</h4>
                <p className="text-sm text-black/40 font-bold leading-relaxed">{step.desc}</p>
              </div>
            ))}</div>
          </section>
          <section className="py-24 border-t border-black/5">
            <div className="max-w-4xl">
              <h2 className="text-4xl sm:text-6xl font-black mb-12">关于“真实性”的坚持</h2>
              <div className="space-y-8">
                <p className="text-xl sm:text-2xl font-bold leading-relaxed text-black/60">在风控技术日益精进的今天，软件层面的“模拟”已经越来越难通过深度硬件特征检测。</p>
                <div className="flex flex-wrap gap-4 text-2xl sm:text-3xl font-black text-red-600"><span>设备</span><span className="text-black/20">+</span><span>网络</span><span className="text-black/20">+</span><span>使用轨迹</span></div>
                <p className="text-lg text-black/40 font-bold">我们的目标不是承诺“绕过风控”，而是尽量减少底层环境的不确定性，让业务建立在真实、稳定、可维护的基础之上。</p>
              </div>
            </div>
          </section>
          <section className="mt-12 p-12 sm:p-20 rounded-[60px] bg-[#0a192f] text-white text-center">
            <h2 className="text-4xl sm:text-6xl font-black mb-8">我们不是在帮你“换 IP”</h2>
            <p className="text-xl sm:text-2xl text-red-300 font-black mb-12">我们是在帮你建立一个长期可用的真实远程环境</p>
            <button onClick={() => scrollToAnchor('contact')} className="px-12 py-6 bg-white text-[#0a192f] font-black rounded-3xl text-xl hover:scale-105 transition-all">申请物理机位</button>
          </section>
        </div>
      </div>
    );
  };

  // --- 招聘页面内容 ---
  const CareersPage = () => {
    const locations = [
      { city: 'Calgary, AB', status: 'Current Priority', desc: '当前优先建立现场响应能力' },
      { city: 'Regina, SK', status: 'Future Network', desc: '根据节点部署计划开放合作' },
      { city: 'Moose Jaw, SK', status: 'Future Network', desc: '可先提交合作意向' },
    ];

    const tasks = [
      '协助完成 Mac 真机设备的上架、联网与初始化配置。',
      '在设备出现硬件或网络异常时，提供快速的现场排查与重启服务。',
      '定期对机位环境进行基础巡检（散热、电源稳定性等）。',
      '根据业务扩展需求，协助进行本地住宅宽带的链路调试。',
    ];

    const benefits = [
      { title: '极低时耗', desc: '多数任务为一次性部署或按需响应，不占用大块时间。', icon: Clock },
      { title: '灵活薪酬', desc: '提供具有竞争力的按次/按小时服务报酬。', icon: Settings },
      { title: '技术前沿', desc: '接触跨境基础设施的最前沿交付形态。', icon: Wifi },
    ];

    return (
      <div className="bg-white pt-32 sm:pt-48 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => goToPage('home')} className="group flex items-center gap-3 text-black/40 hover:text-black font-black mb-16 transition-all">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1"/> 返回首页
          </button>
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 font-black text-[10px] uppercase mb-8"><MapleLeaf className="w-4 h-4" /> Western Canada Ops Network</div>
              <h1 className="text-5xl sm:text-8xl font-black tracking-tight mb-10 italic uppercase leading-[1.1]">加入我们的<br /><span className="text-red-600">现场运维网络</span></h1>
              <p className="text-2xl text-black/45 font-bold">我们在寻找位于加拿大西部的现场合作伙伴，共同维护真实的物理机位基础设施。</p>
            </div>
            <div className="bg-[#0a192f] p-10 rounded-[40px] text-white flex-shrink-0">
              <div className="text-red-400 font-black text-sm uppercase mb-4 tracking-widest italic">Open Positions</div>
              <div className="text-4xl font-black mb-2">现场兼职运维</div>
              <div className="text-white/40 font-bold">Field Operations Specialist</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3"><MapPin className="text-red-600" /> 目标城市</h2>
                <div className="space-y-4">{locations.map((loc, i) => (
                  <div key={i} className="p-8 rounded-[30px] bg-[#fbfbfd] border border-black/5 flex items-center justify-between">
                    <div><div className="text-xl font-black mb-1">{loc.city}</div><div className="text-black/40 font-bold text-sm">{loc.desc}</div></div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${loc.status === 'Current Priority' ? 'bg-red-600 text-white' : 'bg-black/5 text-black/30'}`}>{loc.status}</div>
                  </div>
                ))}</div>
              </section>
              <section>
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3"><Wrench className="text-red-600" /> 协作职责</h2>
                <div className="grid gap-4">{tasks.map((task, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl border border-black/5 items-start">
                    <CheckCircle2 className="w-6 h-6 text-red-600 shrink-0 mt-0.5" /><span className="font-bold text-black/60">{task}</span>
                  </div>
                ))}</div>
              </section>
            </div>
            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3"><Box className="text-red-600" /> 合作要求</h2>
                <div className="p-10 rounded-[40px] bg-[#0a192f] text-white space-y-8">
                  {[
                    { t: '居住在上述城市', d: '能够在接到响应请求后，于约定时间内到达机位现场。', i: MapPin },
                    { t: '有基础硬件经验', d: '了解 Mac 电脑基础操作，熟悉路由器与网络拨号配置。', i: Server },
                    { t: '具备交通工具', d: '拥有合法驾驶执照和可靠的车辆，方便在城市内移动。', i: Car },
                  ].map((req, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0"><req.i className="w-6 h-6 text-red-400" /></div>
                      <div><h4 className="font-black text-xl mb-1">{req.t}</h4><p className="text-white/40 font-bold text-sm leading-relaxed">{req.d}</p></div>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3"><Activity className="text-red-600" /> 合作权益</h2>
                <div className="grid gap-6">{benefits.map((b, i) => (
                  <div key={i} className="p-8 rounded-[30px] bg-[#fbfbfd] border border-black/5 flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center shrink-0 shadow-sm"><b.icon className="w-6 h-6" /></div>
                    <div><h4 className="font-black text-xl mb-1">{b.title}</h4><p className="text-black/40 font-bold text-sm">{b.desc}</p></div>
                  </div>
                ))}</div>
              </section>
            </div>
          </div>
          <section className="p-10 sm:p-20 rounded-[60px] bg-[#fbfbfd] border border-black/10 relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl sm:text-6xl font-black mb-8 leading-tight italic uppercase">开启合作<br /><span className="text-red-600">Start Operation</span></h3>
                <p className="text-xl text-black/40 font-bold mb-8 leading-relaxed">我们重视每一位现场合作伙伴。如果你居住在上述城市且对建立真实的物理节点基础设施感兴趣，请联系我们。</p>
                <a href="mailto:careers@aurorasitesolutions.ca" className="inline-flex items-center gap-4 px-12 py-6 bg-[#0a192f] text-white font-black rounded-3xl text-xl hover:shadow-2xl transition-all group">提交合作意向 <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></a>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-[40px] p-8 border border-black/5 shadow-sm">
                  <h4 className="text-xl font-black mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-red-600" /> 为什么需要现场运维？</h4>
                  <p className="text-black/50 font-bold leading-relaxed">我们的服务不是纯软件代理，而是依赖真实本地设备和可维护的物理基础设施。现场运维合作网络，是保证设备长期稳定的重要组成部分。</p>
                </div>
                <div className="bg-white rounded-[40px] p-8 border border-black/5 shadow-sm">
                  <h4 className="text-xl font-black mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-red-600" /> 联系方式</h4>
                  <p className="text-black/50 font-bold mb-5">请发送简历、所在城市、交通方式、可响应时间，以及你熟悉的硬件/网络经验。</p>
                  <a href="mailto:careers@aurorasitesolutions.ca" className="text-red-700 font-black underline underline-offset-4">careers@aurorasitesolutions.ca</a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <footer className="mt-24 py-12 text-center text-[10px] text-black/20 font-black border-t border-black/5 uppercase tracking-[0.3em] leading-relaxed">
          © 2026 AURORA SITE SOLUTIONS LTD. · Field Operations Network · Western Canada
        </footer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-red-200 overflow-x-hidden">
      {/* 导航栏 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl py-3 border-b border-black/5' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div onClick={() => goToPage('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-[#0a192f] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 fill-current"/>
            </div>
            <div className="leading-tight">
              <div className="font-black tracking-tight text-sm sm:text-lg">AURORA SITE SOLUTIONS</div>
              <div className="hidden sm:block text-[10px] uppercase text-black/40 font-bold italic">Calgary Physical Node Ops</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-black/60">
            {[['首页', 'home'], ['架构方案', 'solution'], ['加入我们', 'careers']].map(([l, p]: any) => (
              <button 
                key={p} 
                onClick={() => goToPage(p)} 
                className={`hover:text-red-600 transition-colors ${currentPage === p ? 'text-red-600' : ''}`}
              >
                {l}
              </button>
            ))}
            <button onClick={() => scrollToAnchor('pricing')} className="hover:text-red-600">资费说明</button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center"
              aria-label="打开导航菜单"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => scrollToAnchor('contact')}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-[#0a192f] text-white text-sm font-black hover:shadow-xl hover:scale-105 transition-all"
            >
              开始部署
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-2xl">
            <div className="px-4 py-4 space-y-2 text-sm font-black">
              <button
                onClick={() => goToPage('home')}
                className={`w-full text-left px-4 py-4 rounded-2xl ${currentPage === 'home' ? 'bg-red-50 text-red-600' : 'text-black/70'}`}
              >
                首页
              </button>

              <button
                onClick={() => goToPage('solution')}
                className={`w-full text-left px-4 py-4 rounded-2xl ${currentPage === 'solution' ? 'bg-red-50 text-red-600' : 'text-black/70'}`}
              >
                架构方案
              </button>

              <button
                onClick={() => scrollToAnchor('pricing')}
                className="w-full text-left px-4 py-4 rounded-2xl text-black/70"
              >
                资费说明
              </button>

              <button
                onClick={() => goToPage('careers')}
                className={`w-full text-left px-4 py-4 rounded-2xl ${currentPage === 'careers' ? 'bg-red-50 text-red-600' : 'text-black/70'}`}
              >
                加入我们
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'solution' && <SolutionPage />}
        {currentPage === 'careers' && <CareersPage />}

        {/* 联系表单区块 */}
        {currentPage !== 'careers' && (
          <section id="contact" className="py-32 px-4 sm:px-6 bg-[#0a192f]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20 text-white">
                <h2 className="text-5xl sm:text-7xl font-black italic uppercase mb-8">部署您的专属物理节点</h2>
                <p className="text-xl text-white/40 font-bold max-w-2xl mx-auto">我们将根据您的业务场景、目标 IP 区域和设备规模，提供针对性的物理交付方案。</p>
              </div>
              <div className="bg-[#fbfbfd] rounded-[60px] p-8 sm:p-20 shadow-3xl">
                {!formSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid sm:grid-cols-2 gap-10">
                      {[['称呼 / Name', '您的称呼'], ['联系方式', 'Telegram / 微信 / Email']].map(([l, p]) => (
                        <div key={l} className="space-y-4">
                          <label className="text-xs font-black uppercase text-black/30 ml-4 italic">{l}</label>
                          <input required placeholder={p} className="w-full rounded-3xl bg-black/5 px-8 py-7 outline-none focus:bg-white border-2 border-transparent focus:border-red-500/20 transition-all font-black text-xl" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase text-black/30 ml-4 italic">业务场景需求</label>
                      <textarea required rows={4} placeholder="例如：TikTok 美区直播、Stripe 运营环境..." className="w-full rounded-3xl bg-black/5 px-8 py-7 outline-none focus:bg-white border-2 border-transparent focus:border-red-500/20 transition-all resize-none font-black text-xl" />
                    </div>
                    <button type="submit" className="w-full py-8 rounded-3xl bg-[#0a192f] text-white font-black text-2xl flex items-center justify-center gap-4 hover:shadow-3xl transition-all group">
                      提交部署申请 <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                ) : (
                  <div className="py-32 text-center">
                    <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-10"><CheckCircle2 className="w-16 h-16 text-[#0a192f]" /></div>
                    <h2 className="text-4xl font-black mb-6">申请已提交确认</h2>
                    <p className="text-red-800 font-bold">我们将尽快确认交付细节。</p>
                    <button onClick={() => setFormSubmitted(false)} className="mt-12 text-[#0a192f] font-black underline underline-offset-8 uppercase">重新提交</button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {currentPage !== 'careers' && (
        <footer className="py-20 px-6 text-center border-t border-black/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-left">
              <p className="text-[10px] text-black/40 font-black uppercase tracking-[0.3em] mb-2 leading-relaxed">© 2026 AURORA SITE SOLUTIONS LTD. · 加拿大本地物理节点 · 专属 Mac 真机环境</p>
              <p className="text-[9px] text-black/20 font-bold uppercase tracking-[0.2em]">CALGARY, ALBERTA PHYSICAL INFRASTRUCTURE · 具体节点区域以交付确认为准</p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-black/5 flex items-center justify-center"><Shield className="w-4 h-4 text-black/20" /></div>
              <div className="w-8 h-8 rounded bg-black/5 flex items-center justify-center"><Globe className="w-4 h-4 text-black/20" /></div>
            </div>
          </div>
        </footer>
      )}

      <style>{`
        html { scroll-behavior: smooth; }
        .shadow-3xl { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.12); }
        ::selection { background: #dc2626; color: white; }
      `}</style>
    </div>
  );
}