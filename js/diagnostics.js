/**
 * diagnostics.js —— 发音自检面板
 *
 * 作用：点一下就能看清「为什么没声音」
 *   - 浏览器是否支持、系统里到底装了几个语音
 *   - 当前口音匹配到了哪个发音人
 *   - 系统语音 / 在线发音 分别试音一次，结果是成功还是报什么错
 *   - 一键复制诊断报告（排查远程环境时很有用）
 *
 * 结构说明：面板骨架只建一次，render() 只刷新动态部分（提示 / 明细 / 语音列表），
 * 这样试音结果不会被后续刷新冲掉。
 */

import { diagnose, diagnoseText, test, getSource, listSources, explainError } from './speech.js';
import { h, clear, toast } from './ui.js';

let overlay = null;
let hosts = null;
let busy = false;

function row(label, value, kind) {
  return h(
    'div',
    { class: 'diag__row' },
    h('span', { class: 'diag__row-label', text: label }),
    h('span', { class: 'diag__row-value' + (kind ? ' is-' + kind : ''), text: String(value) })
  );
}

/** 根据自检结果给一段「怎么修」的建议 */
function adviceFor(data) {
  if (!data.systemSupported && !data.onlineSupported) {
    return '当前浏览器不支持任何发音方式。请改用最新版 Chrome / Edge / Safari 打开本页。';
  }
  if (data.source === 'online') {
    return '当前设置为「在线发音」：只要电脑能上网就会有声音，不受系统语音包影响。注意在线接口按词取音，整句会逐词连读。';
  }
  if (data.systemSupported && data.voiceCount === 0 && data.voicesSettled) {
    return '系统里没有找到任何语音包，这是「点发音没声音」最常见的原因。三个办法：① 顶部把「发音」切到「在线发音」或保持「自动」；② Windows 设置 → 时间和语言 → 语音 → 管理语音，安装英语语音包；③ 改用 Edge 浏览器打开（Edge 自带在线语音）。';
  }
  if (data.systemSupported && data.voiceCount > 0 && !/（无匹配）/.test(data.pickedVoice)) {
    return '系统语音看起来是正常的。若仍然没声音，请检查：电脑是否静音、浏览器标签页是否被静音、音量合成器里浏览器音量是否为 0。也可以点「测试在线发音」确认是系统语音的问题还是整个环境的问题。';
  }
  if (data.systemSupported && data.voiceCount > 0) {
    return '系统装了语音包，但没有匹配当前口音的英文发音人。切到「美音」再试，或把「发音」设为「在线发音」。';
  }
  return '可以点下面的按钮分别试音，看哪条通道正常。';
}

/** 只刷新动态区域 */
function render() {
  if (!hosts) return;
  const data = diagnose();
  clear(hosts.alert);
  clear(hosts.rows);
  clear(hosts.details);

  const hasProblem =
    !data.systemSupported || (data.voicesSettled && data.voiceCount === 0) || data.lastResult === false;
  if (hasProblem) {
    hosts.alert.appendChild(h('p', { class: 'diag__alert', text: adviceFor(data) }));
  }

  const sourceLabel = listSources().find((s) => s.key === data.source);
  const voiceLine = data.voiceCount
    ? data.voiceCount + ' 个' + (data.voicesSettled ? '' : '（仍在加载…）')
    : data.systemSupported
      ? data.voicesSettled
        ? '0 个 —— 系统没有语音包'
        : '正在检测…'
      : '不支持';

  hosts.rows.appendChild(
    h(
      'div',
      { class: 'diag__list' },
      row('浏览器支持系统语音', data.systemSupported ? '是' : '否', data.systemSupported ? 'ok' : 'bad'),
      row('系统语音数量', voiceLine, data.voiceCount > 0 ? 'ok' : 'bad'),
      row('匹配当前口音的发音人', data.pickedVoice, /（无匹配）/.test(data.pickedVoice) ? 'bad' : 'ok'),
      row('口音 / 语速', data.accent + ' / ' + data.rate + '×'),
      row('发音来源', (sourceLabel ? sourceLabel.label : data.source) + '（' + getSource() + '）'),
      row('在线发音通道', data.onlineSupported ? '可用' : '不可用', data.onlineSupported ? 'ok' : 'bad'),
      row('在线地址示例', data.onlineUrlSample),
      row(
        '最近一次播放',
        data.lastResult === null
          ? '尚未播放'
          : data.lastResult
            ? '成功'
            : '失败' + (data.lastError ? '：' + explainError(data.lastError) : ''),
        data.lastResult === null ? '' : data.lastResult ? 'ok' : 'bad'
      ),
      row('在线兜底次数', String(data.fallbackCount)),
      row('协议 / 安全上下文', data.protocol + ' / ' + data.secureContext)
    )
  );

  if (data.englishVoices.length) {
    hosts.details.appendChild(
      h(
        'details',
        { class: 'diag__details' },
        h('summary', { text: '查看全部英文语音（' + data.englishVoices.length + '）' }),
        h(
          'ul',
          { class: 'diag__voices' },
          data.englishVoices.map((v) =>
            h('li', { text: v.name + ' · ' + v.lang + (v.local ? ' · 本地' : ' · 在线') })
          )
        )
      )
    );
  }
}

export function openDiagnostics() {
  if (overlay && overlay.isConnected) {
    render();
    return;
  }

  const close = () => {
    if (overlay) overlay.remove();
    overlay = null;
    hosts = null;
    document.removeEventListener('keydown', onKey);
  };

  function onKey(event) {
    if (event.key === 'Escape') close();
  }

  const alertHost = h('div', { class: 'diag__alerts' });
  const rowsHost = h('div', {});
  const detailsHost = h('div', {});
  const report = h('pre', { class: 'diag__report' });
  report.textContent = '点下面的按钮试音，结果会显示在这里。\n\n' + diagnoseText();

  const testSystemBtn = h('button', { class: 'btn btn--ghost', type: 'button', text: '测试系统语音' });
  const testOnlineBtn = h('button', { class: 'btn btn--ghost', type: 'button', text: '测试在线发音' });
  const copyBtn = h('button', { class: 'btn btn--ghost', type: 'button', text: '复制诊断信息' });

  async function runTest(kind, btn) {
    if (busy) return;
    busy = true;
    btn.disabled = true;
    const rest = btn.textContent;
    btn.textContent = '试音中…';
    report.textContent = '正在测试' + (kind === 'system' ? '系统语音' : '在线发音') + '…';
    try {
      const r = await test(kind);
      report.textContent =
        diagnoseText() +
        '\n\n=== 试音结果（' +
        (kind === 'system' ? '系统语音' : '在线发音') +
        '）===\n结果   : ' +
        (r.ok ? '成功，可以听到声音' : '失败') +
        '\n耗时   : ' +
        r.ms +
        ' ms' +
        (r.error ? '\n错误码 : ' + r.error + '（' + r.errorText + '）' : '');
    } finally {
      busy = false;
      btn.disabled = false;
      btn.textContent = rest;
      if (hosts) render();
    }
  }

  testSystemBtn.addEventListener('click', () => runTest('system', testSystemBtn));
  testOnlineBtn.addEventListener('click', () => runTest('online', testOnlineBtn));
  copyBtn.addEventListener('click', async () => {
    const text = report.textContent;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        toast('诊断信息已复制到剪贴板');
        return;
      }
    } catch (err) {
      /* 走下面的兜底 */
    }
    try {
      const range = document.createRange();
      range.selectNodeContents(report);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      toast('已选中报告内容，请按 Ctrl+C 复制');
    } catch (err) {
      toast('复制失败，请手动选择报告文字');
    }
  });

  const bodyHost = h(
    'div',
    { class: 'diag__body' },
    alertHost,
    rowsHost,
    detailsHost,
    h('div', { class: 'diag__actions' }, testSystemBtn, testOnlineBtn, copyBtn),
    report
  );

  const panel = h(
    'div',
    { class: 'diag__panel', role: 'dialog', 'aria-modal': 'true', 'aria-label': '发音自检' },
    h(
      'div',
      { class: 'diag__head' },
      h('h3', { class: 'diag__title', text: '发音自检' }),
      h('button', { class: 'diag__close', type: 'button', text: '关闭', onclick: close })
    ),
    bodyHost
  );

  overlay = h('div', { class: 'diag', id: 'diag-overlay' }, panel);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener('keydown', onKey);

  hosts = { alert: alertHost, rows: rowsHost, details: detailsHost };
  document.body.appendChild(overlay);
  render();
}
