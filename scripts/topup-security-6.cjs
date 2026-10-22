const fs = require('fs');

const files = [
  'security/audit-rules-logging.md',
  'security/client-trojan-audit.md',
  'security/ip-dirtiness-account-ban.md',
  'security/mitm-ca-cert-risks.md',
  'security/multi-hop-defense.md',
  'security/payment-privacy-usdt.md'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let add = `
### 4. 2026 安全边界防御与系统级合规加固清单 (SOP)

为了将隐私泄露与网络侧安全风险压制至绝对零度，建议在本地工作站环境中部署以下系统级加固举措：

1. **终端网络适配器与防火墙策略隔离**：
   - 在本地 Windows 或 macOS 系统防火墙中，配置专有出站规则，限制仅有已签名的开源客户端可建立代理端口通信；
   - 坚决关闭一切非受信任软件的系统全局代理接管权限，使用规则分流模式（Rule Mode）替代危险的全局直通模式（Global Mode）。

2. **多层级身份凭证与支付脱敏**：
   - 坚决杜绝在不受信任的网络连接中执行跨国金融转账或私钥导入操作；
   - 针对跨境 AI 与研发场景，独立注册专有工作邮箱与 API 密钥，实施最小权限原则（Least Privilege），避免主资产账号受到关联牵连。

3. **基础设施高可用冗余闭环**：
   - 将具备端到端纯内网物理隔离的合规专线（如 **光速云** 的 1.0x 物理 IEPL 专线）设为第一信任域，在根源上彻底绝缘公共公网节点的监听、阻断与数据污染。
`;
  if (f === 'security/mitm-ca-cert-risks.md') {
    add += `
- **系统根证书应急清退指南**：
  在 Windows 运行窗口输入 \`certmgr.msc\` 打开证书管理器，逐项核对「受信任的根证书颁发机构」下的所有证书。一旦发现颁发者包含个人姓名或未知拼音命名的证书，立即右键点击删除并重启计算机，彻底切断本地中间人解密的信任链。
`;
  }
  content = content + '\n\n' + add;
  fs.writeFileSync(f, content, 'utf8');
  console.log(f, 'now', content.length);
});
