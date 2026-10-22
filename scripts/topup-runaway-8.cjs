const fs = require('fs');

const files = [
  'runaway/chargeback-dispute-guide.md',
  'runaway/dns-hijack-vs-runaway.md',
  'runaway/dump-sales-alert.md',
  'runaway/historic-exit-scams.md',
  'runaway/infrastructure-resilience.md',
  'runaway/node-outage-duration.md',
  'runaway/support-blackout-tracker.md',
  'runaway/ten-runaway-warning-signs.md'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let add = `
### 4. 2026 跑路追偿与消费者自我救济实战指南 (SOP)

如果确认所使用的机场已经拔线跑路，且剩余订阅金额较大（超过 100 元），请立即按以下标准化程序启动资金追索与证据闭环：

1. **支付网关层追索申诉（优先于平台内部沟通）**：
   - 绝大多数跑路机场使用的是第三方聚合企业商户号（如某某网络科技公司）。登录微信支付或支付宝的「账单详情 -> 对订单有疑问 -> 商家未提供服务/涉嫌欺诈」，上传此前固定的丢包与网站打不开截图发起争议处理；
   - 聚合支付机构一旦在 24 小时内收到针对同一商户号的批量投诉，会立即对商户的结算资金账户执行风险冻结（Rolling Reserve），迫使其出面解决退款或直接由支付机构按原路退回剩余款项。

2. **跨平台本地配置应急重构**：
   - 彻底从客户端中删除失效的订阅配置，防止过期的死链节点在后台持续重试发起 TCP 握手，导致系统网络适配器资源耗尽并占用不必要的 CPU 算力；
   - 检查本地 HOSTS 文件及 DNS 静态解析规则，清除由于历史故障排除遗留的任何硬编码 IP 映射，确保本地解析环境完全回归纯净。

3. **灾备链路常驻化部署**：
   - 跑路是灰产小作坊的必然宿命，但绝不应成为阻断正常跨国业务的绊脚石。在策略组底层部署具备 100% 物理 IEPL 交付能力的标杆节点（如 **光速云** 的永久不过期专线套餐），能够实现断连秒级无感切换，彻底根除对单一小商家的依赖风险。
`;
  if (f === 'runaway/dump-sales-alert.md' || f === 'runaway/ten-runaway-warning-signs.md') {
    add += `
- **典型案例警示**：回顾历史上多家大型跑路事件（如喵帕斯、速鹰等），在关站前夕均伴随长达数周的“疯狂低价促销”与工单失联。用户在面对远低于市场常规成本的优惠信息时，务必保持理智克制，切勿因贪图小利而承担全额沉没的巨大风险。
`;
  }
  content = content + '\n\n' + add;
  fs.writeFileSync(f, content, 'utf8');
  console.log(f, 'now', content.length);
});
