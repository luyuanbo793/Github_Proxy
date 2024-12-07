// GitHub 加速节点列表
const proxyNodes = [
  'gitproxy.click',
  'ghp.arslantu.xyz',
  'ghproxy.imciel.com',
  'gh.monlor.com',
  'gitproxy.mrhjx.cn',
  'blfrp.cn',
  'github.tmby.shop',
  'gh.tryxd.cn',
  'moran233.xyz',
  'fastgit.cc',
  'github.limoruirui.com',
  'gh.jasonzeng.dev',
  'git.speed-ssr.tech',
  'gh-proxy.com',
  'gh.xx9527.cn',
  'gh.zwy.me',
  'github.xxlab.tech',
  'gh.idayer.com',
  'gh.cache.cloudns.org',
  'ghp.miaostay.com',
  'ghpr.cc',
  'github.7boe.top',
  'gh.nxnow.top',
  'hub.gitmirror.com',
  'gh.pylas.xyz',
  'gh-proxy.ygxz.in',
  'gh.llkk.cc',
  'gh.chaoyi996.com',
  'ghp.ci',
  'githubapi.jjchizha.com',
  'gh-proxy.llyke.com',
  'ql.133.info',
  'ghproxy.cn',
  'gh.6yit.com',
  'ghp.keleyaa.com',
  'ghproxy.net',
  'ghproxy.xiaopa.cc',
  'gh.xxooo.cf',
  'ghproxy.cc',
  'gh.catmak.name',
  'git.669966.xyz',
  'gh.api.99988866.xyz',
  'gh.sixyin.com',
  'proxy.yaoyaoling.net',
  'gh.hlg.us.kg',
  'ghproxy.cnproxy.top',
  'git.40609891.xyz',
  'github.ednovas.xyz',
  'ghp.ml1.one',
  'gp.zkitefly.eu.org',
  'git.886.be',
  'ghp.p3terx.com',
  'gh.qninq.cn',
  'cccccccccccccccccccccccccccccccccccccccccccccccccccc.cc',
  'ghproxy.cianogame.top',
  'ghproxy.1888866.xyz',
  'mirror.ghproxy.com'
];

// 测试单个节点速度
async function testNode(node) {
  const startTime = Date.now();
  try {
    const response = await fetch(`https://${node}/`);
    if (response.ok) {
      const endTime = Date.now();
      return {
        node,
        latency: endTime - startTime,
        status: '成功'
      };
    }
  } catch (error) {
    console.error(`测试节点 ${node} 失败:`, error);
  }
  return {
    node,
    latency: Infinity,
    status: '失败'
  };
}

// 测试所有节点
async function testAllNodes() {
  const select = document.getElementById('proxySelect');
  const testBtn = document.querySelector('.test-btn');
  testBtn.disabled = true;
  testBtn.textContent = '测速中...';
  
  const results = [];
  for (const node of proxyNodes) {
    const result = await testNode(node);
    results.push(result);
    // 实时更新下拉框
    select.innerHTML = results.map(r => `
      <option value="${r.node}">${r.node} - ${r.status === '成功' ? r.latency + 'ms' : '失败'}</option>
    `).join('') + proxyNodes.slice(results.length).map(n => `
      <option value="${n}">${n} - 等待测速...</option>
    `).join('');
  }
  
  // 排序并更新最终结果
  const sortedResults = results.sort((a, b) => a.latency - b.latency);
  select.innerHTML = sortedResults.map(result => `
    <option value="${result.node}">${result.node} - ${result.status === '成功' ? result.latency + 'ms' : '失败'}</option>
  `).join('');
  
  // 自动选择最快的节点
  const fastestNode = sortedResults.find(r => r.status === '成功');
  if (fastestNode) {
    select.value = fastestNode.node;
    const notice = document.createElement('div');
    notice.className = 'speed-notice';
    notice.textContent = `已自动选择最快节点: ${fastestNode.node} (${fastestNode.latency}ms)`;
    select.parentNode.appendChild(notice);
    
    // 3秒后移除提示
    setTimeout(() => notice.remove(), 3000);
  }
  
  testBtn.disabled = false;
  testBtn.textContent = '在线节点检测';
  
  return sortedResults;
}

// 页面加载时自动测速
window.onload = async () => {
  const select = document.getElementById('proxySelect');
  // 先填充所有节点
  select.innerHTML = proxyNodes.map(node => `
    <option value="${node}">${node}</option>
  `).join('');
  
  // 然后进行测速
  await testAllNodes();
};