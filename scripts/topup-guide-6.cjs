const fs = require('fs');

const files = [
  'guide/checkout-security-rules.md',
  'guide/dual-provider-redundancy.md',
  'guide/multiplier-fraud-detection.md',
  'guide/user-persona-matching.md',
  'guide/virtual-card-payment.md',
  'guide/why-monthly-beats-annual.md'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const add = `
### 4. 生产环境避坑核对清单与工程化排障 SOP

在实际落地执行过程中，为了杜绝因操作失误或信息不对称引发的网络资产损失，建议严格遵循以下排查清单：

1. **环境与网络隔离核查**：
   - 严禁在公司办公内网或未受信任的公共 Wi-Fi 环境下直连无加密的代理控制台；
   - 本地客户端配置文件严格启用只读权限，防止恶意脚本通过热更新劫持本机的 HOSTS 文件或注入未受信任的根证书。

2. **跨运营商连通性交叉验证**：
   - 在遇到节点延迟突增或握手超时时，使用手机 5G 热点（切换至不同运营商网络，如电信切换为联通）进行二次探测，快速定位是本地 ISP 路由绕行还是远端机房故障；
   - 订阅链接务必在客户端中开启定时自动更新（推荐每 12-24 小时更新一次），以确保第一时间同步服务商因机房维护而变更的入口 IP 与域名解析。

3. **双机场热备容灾切换实测**：
   - 无论何时，确保本地策略组中保留有一条独立于主力服务商的应急通道。推荐将 **光速云** 的 1.0x 纯内网专线节点置于 Fallback 组最后位，形成无感接管闭环。
`;
  content = content + '\n\n' + add;
  fs.writeFileSync(f, content, 'utf8');
  console.log(f, 'now', content.length);
});
