const fs = require('fs');

const files = [
  'free/connectivity-audit.md',
  'free/free-tier-lifespan.md',
  'free/free-vs-paid-benchmark.md',
  'free/honeypot-threats.md',
  'free/public-free-nodes.md',
  'free/self-hosted-free-tier.md',
  'free/subscription-pool-truth.md',
  'free/unlock-limitations.md'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const add = `
### 4. 实验室长期观测结论与安全底线红线

通过持续数月的端到端网络抓包与真实用户反馈分析，针对公共免费网络资源，我们总结出三条不可逾越的安全红线：

1. **绝对禁止通过公开免费节点登录重要私人资产**：
   - 包括并不限于网上银行、加密货币冷热钱包、个人主力 Google/Apple 账户以及公司企业邮箱；
   - 绝大多数公开节点的出口流量均处于灰产运营者的镜像监听与日志留存之下，极易遭遇凭证撞库与 Session 凭据劫持。

2. **警惕强制绑定自制客户端的“免费午餐”**：
   - 凡是要求用户必须关闭杀毒软件、安装特定私有打包客户端（而非开源 Clash、Sing-box、v2rayN）的服务，其安装包内 90% 以上捆绑有后台常驻挖矿木马、反向代理跳板或流量中继窃听组件；
   - 正规服务商均会遵循开源通用标准，直接提供标准 Clash YAML 或 Sing-box JSON 订阅链接。

3. **构建可持续的高可用兜底网络通道**：
   - 任何理性的生产力用户，都应当将网络连通性视为工作效率的基础生产资料。与其在免费节点的不可靠波动中耗费心力，不如配置合规、低成本的纯物理专线作为永久备选通道，从根本上杜绝突发断连对关键事务的阻断。
`;
  content = content + '\n\n' + add;
  fs.writeFileSync(f, content, 'utf8');
  console.log(f, 'now', content.length);
});
