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

// 测试单个节点的延迟
async function testNode(node) {
  const startTime = Date.now();
  try {
    const response = await fetch(`https://${node}`, {
      mode: 'no-cors',  // 由于跨域限制，使用no-cors模式
      timeout: 5000     // 5秒超时
    });
    const endTime = Date.now();
    return {
      node: node,
      latency: endTime - startTime,
      status: 'success'
    };
  } catch (error) {
    return {
      node: node,
      latency: 99999,  // 失败时设置一个很大的延迟值
      status: 'failed'
    };
  }
}

// 测试所有节点
async function testAllNodes() {
  const progressSpan = document.getElementById('testProgress');
  const testButton = document.querySelector('.test-btn');
  const originalButtonText = testButton.textContent;
  
  try {
    testButton.disabled = true;  // 测试时禁用按钮
    
    // 并行测试所有节点，但添加进度追踪
    let completedTests = 0;
    const totalTests = proxyNodes.length;
    
    const promises = proxyNodes.map(node => 
      testNode(node).then(result => {
        completedTests++;
        const progress = Math.round((completedTests / totalTests) * 100);
        progressSpan.textContent = `测试中... ${progress}%`;
        return result;
      })
    );
    
    const results = await Promise.all(promises);
    
    // 按延迟排序
    const sortedResults = results.sort((a, b) => a.latency - b.latency);
    
    progressSpan.textContent = '测试完成';
    setTimeout(() => {
      progressSpan.textContent = '';  // 2秒后清除"测试完成"文字
    }, 2000);
    
    return sortedResults;
  } catch (error) {
    progressSpan.textContent = '测试失败';
    console.error('测试出错:', error);
    return [];
  } finally {
    testButton.disabled = false;  // 恢复按钮可用状态
  }
}

// 修改页面加载时的处理代码
window.onload = async () => {
  const results = await testAllNodes();
  const select = document.getElementById('proxySelect');
  select.innerHTML = results.map(result => `
    <option value="${result.node}">${result.node} - ${result.latency}ms</option>
  `).join('');
};

// 修改测试按钮点击事件处理
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('test-btn')) {
    testAllNodes().then(results => {
      const select = document.getElementById('proxySelect');
      select.innerHTML = results.map(result => `
        <option value="${result.node}">${result.node} - ${result.latency}ms</option>
      `).join('');
    });
  }
  if (e.target.classList.contains('reaction-btn')) {
    window.open('https://github.com/Eternity-Sky/Github_Proxy/issues', '_blank');
  }
  // ... 其他代码保持不变
});

</```rewritten_file>