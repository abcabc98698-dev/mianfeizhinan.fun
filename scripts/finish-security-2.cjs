const fs = require('fs');

let c2 = fs.readFileSync('security/payment-privacy-usdt.md', 'utf8');
c2 += `
### 6. USDT 支付链路实务建议
对于必须使用加密货币结算的用户，优先建议使用支持隐私保护的去中心化自托管钱包（如 MetaMask、Trust Wallet），并通过链上浏览器验证转账哈希。在付款完成后，妥善保管交易凭证截图，以便在遭遇网络纠纷时快速向平台客服提供不可篡改的付款证明。
`;
fs.writeFileSync('security/payment-privacy-usdt.md', c2, 'utf8');
console.log('payment-privacy-usdt.md now', c2.length);

let c3 = fs.readFileSync('security/mitm-ca-cert-risks.md', 'utf8');
c3 += `
### 6. 企业级零信任客户端准入规范
在跨国企业或高保密技术研发场景中，应当推行严格的端点安全基线检查（Endpoint Compliance Check）。通过自动化运维脚本，定期轮询员工设备中的根证书列表与本地网络代理状态。一旦发现未经企业 IT 部门签名的未知证书或异常的本地重定向端口，自动切断其对内部核心代码库与敏感生产系统的访问权限，将中间人威胁拦截在物理网络最外层。
`;
fs.writeFileSync('security/mitm-ca-cert-risks.md', c3, 'utf8');
console.log('mitm-ca-cert-risks.md now', c3.length);
