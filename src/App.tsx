import { useEffect, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

type Lang = 'en' | 'zh'

function upsertMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

function applyAuroraSeo(lang: Lang) {
  const title = 'Aurora Site Solutions | Local Digital Systems'
  const description = 'Aurora Site Solutions operates lightweight local digital systems in Calgary, including Clearout YYC.'
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  document.title = title
  upsertMeta('description', description)
  upsertMetaProperty('og:title', title)
  upsertMetaProperty('og:description', description)
  upsertMetaProperty('og:type', 'website')
  upsertMetaProperty('og:url', 'https://www.aurorasitesolutions.com/')
  upsertCanonical('https://www.aurorasitesolutions.com/')
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = window.localStorage.getItem('aurora_lang')
      return saved === 'zh' || saved === 'en' ? saved : 'en'
    } catch {
      return 'en'
    }
  })

  const setPreferredLang = (next: Lang) => {
    try {
      window.localStorage.setItem('aurora_lang', next)
    } catch {
      // Keep site usable if localStorage is unavailable.
    }
    setLang(next)
  }

  useEffect(() => {
    applyAuroraSeo(lang)
  }, [lang])

  return <AuroraOperatorSite lang={lang} setLang={setPreferredLang} />
}

function AuroraOperatorSite({ lang, setLang }: { lang: Lang; setLang: (v: Lang) => void }) {
  return <div className="min-h-screen bg-[#faf7ef] text-slate-950">
    <header className="border-b border-black/5 bg-[#faf7ef]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <button className="flex items-center gap-3 text-left" aria-label="Aurora Site Solutions home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white"><Sparkles size={19}/></span>
          <span><b className="block tracking-tight">Aurora Site Solutions</b><span className="hidden text-xs text-slate-500 sm:block">Local digital systems · Calgary</span></span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-black/10">{lang === 'en' ? '中文' : 'EN'}</button>
          <a href="https://clearout.aurorasitesolutions.com" className="rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800">Clearout YYC</a>
        </div>
      </div>
    </header>
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-75 [background:radial-gradient(circle_at_12%_12%,#fee2e2,transparent_28%),radial-gradient(circle_at_90%_20%,#dcfce7,transparent_25%),radial-gradient(circle_at_50%_100%,#dbeafe,transparent_30%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_.9fr] lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-red-800 ring-1 ring-red-900/10"><Sparkles size={16}/>{lang === 'zh' ? '本地数字化项目运营方' : 'Local digital platform operator'}</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{lang === 'zh' ? 'Aurora Site Solutions 运营 Calgary 本地服务线索系统。' : 'Aurora Site Solutions operates lightweight local lead systems in Calgary.'}</h1>
            <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">{lang === 'zh' ? '我们构建和运营面向本地服务行业的轻量数字系统。Clearout YYC 是旗下 Calgary 普通清运需求分发项目。' : 'We build and operate lightweight digital systems for local service categories. Clearout YYC is our Calgary junk removal request platform.'}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="https://clearout.aurorasitesolutions.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 font-semibold text-white hover:bg-red-700">{lang === 'zh' ? '访问 Clearout YYC' : 'Visit Clearout YYC'}<ArrowRight size={18}/></a><a href="mailto:contact@aurorasitesolutions.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold ring-1 ring-black/10 hover:bg-red-50">contact@aurorasitesolutions.com</a></div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">{lang === 'zh' ? '当前项目' : 'Current project'}</p><h2 className="mt-3 text-3xl font-semibold">Clearout YYC</h2><p className="mt-3 text-sm leading-6 text-slate-600">{lang === 'zh' ? 'Calgary 普通垃圾清运需求分发平台。客户免费提交需求，最多 3 个本地服务商可能联系客户。' : 'A Calgary junk removal request platform. Customers submit one free request and up to 3 local providers may contact them.'}</p><a href="https://clearout.aurorasitesolutions.com" className="mt-6 inline-flex rounded-full bg-red-700 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800">{lang === 'zh' ? '打开子站' : 'Open subsite'}</a></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10"><div className="grid gap-5 md:grid-cols-3">{[
        [lang === 'zh' ? '母品牌' : 'Operator brand', lang === 'zh' ? 'Aurora 负责项目运营、网站和数字系统。' : 'Aurora operates the project, website, and digital system.'],
        [lang === 'zh' ? '子品牌' : 'Sub-brand', lang === 'zh' ? 'Clearout YYC 面向客户和本地清运服务商。' : 'Clearout YYC faces customers and local junk removal providers.'],
        [lang === 'zh' ? '边界清楚' : 'Clear boundaries', lang === 'zh' ? 'Clearout YYC 是需求分发平台，不是清运公司。' : 'Clearout YYC is a request platform, not a junk removal company.'],
      ].map(([title, body]) => <div key={title} className="rounded-[1.7rem] bg-white p-6 shadow-sm ring-1 ring-black/5"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{body}</p></div>)}</div></section>
    </main>
    <footer className="border-t border-black/5 bg-white px-5 py-8 sm:px-8 lg:px-10"><div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} Aurora Site Solutions</p><p>{lang === 'zh' ? '运营项目：Clearout YYC' : 'Operating project: Clearout YYC'}</p></div></footer>
  </div>
}
