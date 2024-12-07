// GitHub 加速节点列表
const proxyNodes = [
    'gh.tryxd.cn',
    'gitproxy.click',
    'blfrp.cn',
    'gh-proxy.ygxz.in',
    'ghp.keleyaa.com',
    'hub.gitmirror.com',
    'gh.nxnow.top',
    'github.xxlab.tech',
    'proxy.yaoyaoling.net',
    'github.moeyy.xyz',
    'ghp.miaostay.com',
    'ghp.arslantu.xyz',
    'fastgit.cc',
    'github.limoruirui.com',
    'gh.api.99988866.xyz',
    'ghproxy.xiaopa.cc',
    'ghpr.cc',
    'github.7boe.top',
    'gh.zwy.me',
    'ghproxy.cn',
    'gh.idayer.com',
    'github.tmby.shop',
    'git.speed-ssr.tech',
    'git.886.be',
    'gh.pylas.xyz',
    'gh.monlor.com',
    'gh-proxy.com',
    'github.ednovas.xyz',
    'gh.jasonzeng.dev',
    'gh.6yit.com',
    'moran233.xyz',
    'cccccccccccccccccccccccccccccccccccccccccccccccccccc.cc',
    'gh.xxooo.cf',
    'ghproxy.imciel.com',
    'gitproxy.mrhjx.cn',
    'gh.chaoyi996.com',
    'ghp.ml1.one',
    'ghproxy.1888866.xyz',
    'gh-proxy.llyke.com',
    'ghproxy.cianogame.top',
    'ghproxy.cnproxy.top',
    'ghproxy.cc',
    'ghp.ci',
    'mirror.ghproxy.com',
    'gh.xx9527.cn',
    'ghproxy.net',
    'gh.qninq.cn',
    'gp.zkitefly.eu.org',
    'gh.llkk.cc',
    'ghp.p3terx.com',
    'gh.hlg.us.kg',
    'git.669966.xyz',
    'gh.cache.cloudns.org',
    'gh.catmak.name',
    'githubapi.jjchizha.com',
    'gh.ddlc.top',
    'git.40609891.xyz',
    'ql.133.info',
    'gh.sixyin.com'
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

window.onload = async () => {
  const select = document.getElementById('proxySelect');
  // 先填充所有节点
  select.innerHTML = proxyNodes.map(node => `
    <option value="${node}">${node}</option>
  `).join('');
  
  // 然后进行测速
  const results = await testAllNodes();
  // 更新节点延迟信息
  select.innerHTML = results.map(result => `
    <option value="${result.node}">${result.node} - ${result.latency}ms</option>
  `).join('');
};