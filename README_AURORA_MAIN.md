# Aurora Site Solutions 主站独立包

这个包是从当前混用项目里的 Aurora 主站界面抽出来的独立静态站。

它只做：

- Aurora Site Solutions 母品牌展示
- Clearout YYC 项目介绍
- 按钮跳转到 `https://clearout.aurorasitesolutions.com`

它不做：

- Supabase
- Stripe
- Twilio
- Clearout 客户表单
- 工人抢单系统

## 本地测试

```bash
npm install
npm run build
npm run dev
```

## 部署建议

GitHub 仓库：`dongqiming1982-star/aurora-site`
Vercel 项目名：`aurora-site`
绑定域名：

- `www.aurorasitesolutions.com`
- `aurorasitesolutions.com`

Clearout 子站继续留在：

- `clearout.aurorasitesolutions.com`
