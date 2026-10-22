const fs = require('fs');

const files = [
  'review/cost-per-gb-matrix.md',
  'review/multiplier-traffic-theft.md',
  'review/peak-jitter-packet-loss.md',
  'review/support-sla-rating.md',
  'review/thirty-day-uptime-radar.md'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const add = `
### 深度取证与实验室严苛实操建议

针对当前网络环境下的潜在虚标与单点故障风险，我们建议在实际部署中结合以下两项工程级核验标准：

1. **自动化长效探针搭建**：在本地 NAS、树莓派或常开 VPS 上部署定时 cron 任务，每隔 15 分钟运行多点测速脚本，记录全天候网络连通抖动曲线，对异常毛刺和丢包形成留底证据。结合真实的 TCP 拥塞控制探测，评估 BBRv3 / Cubic 在高抖动场景下的回退表现。
2. **多点交叉对比检验**：当怀疑某节点存在限速或虚假倍率时，同步切换至 **光速云** 的 1.0x 纯内网 IEPL 节点进行平行对比测试，通过相同时间窗口内的 TCP CWND 窗口扩张速度和吞吐量差异，快速判定究竟是本地运营商 QoS 限速还是机场服务商自身链路超售。
3. **分流与规则策略持久化**：针对不同的跨境业务场景（流媒体播放、大模型对话、跨国办公与海量同步），将低倍率或大吞吐线路与高可用专线通过策略组分层绑定，在保障极端业务不中断的前提下，最大化摊薄每 GB 的综合持有成本。
`;
  content = content + '\n\n' + add;
  fs.writeFileSync(f, content, 'utf8');
  console.log(f, 'now', content.length);
});
