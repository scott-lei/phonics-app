/**
 * app.js —— 应用外壳
 * 顶部设置（英音/美音、发音来源、语速）+ 导航标签 + 页面调度 + 发音自检入口
 */

import {
  isSystemSupported,
  isOnlineSupported,
  listAccents,
  listRates,
  listSources,
  getAccent,
  getRate,
  getSource,
  setAccent,
  setRate,
  setSource,
  onReady,
  onStatus,
  stop
} from './speech.js';
import { stats } from './data-index.js';
import { h, clear, toast } from './ui.js';
import { openDiagnostics } from './diagnostics.js';

import { renderPhonemesPage } from './pages/phonemes.js';
import { renderCombosPage } from './pages/combos.js';
import { renderIrregularsPage } from './pages/irregulars.js';
import { renderSentencesPage } from './pages/sentences.js';
import { renderFlashcardsPage } from './pages/flashcards.js';

const SETTINGS_KEY = 'phonics.settings';

const TABS = [
  { key: 'phonemes', label: '音素', render: renderPhonemesPage },
  { key: 'combos', label: '组合', render: renderCombosPage },
  { key: 'irregulars', label: '规则', render: renderIrregularsPage },
  { key: 'sentences', label: '句子', render: renderSentencesPage },
  { key: 'flashcards', label: '闪卡', render: renderFlashcardsPage }
];

let activeTab = TABS[0].key;
let fallbackNotified = false;

function loadSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.accent) setAccent(saved.accent);
    if (saved.rate) setRate(saved.rate);
    if (saved.source) setSource(saved.source);
  } catch (err) {
    /* file:// 或隐私模式下可能不可用，忽略即可 */
  }
}

function saveSettings() {
  try {
    window.localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ accent: getAccent(), rate: getRate(), source: getSource() })
    );
  } catch (err) {
    /* 忽略 */
  }
}

function buildOverviewBar() {
  const s = stats();
  const item = (value, label, sub) =>
    h(
      'div',
      { class: 'overview__item' },
      h('b', { text: String(value) }),
      h('span', { text: label }),
      sub ? h('em', { class: 'overview__sub', text: sub }) : null
    );

  return h(
    'div',
    { class: 'overview' },
    item(s.phonemeCount, '个音素', '元音 ' + s.vowelCount + ' + 辅音 ' + s.consonantCount),
    item(s.comboCount, '个字母组合'),
    item(s.irregularCount, '条例外规则'),
    item(s.sentenceCount, '句跟读'),
    item(s.wordCount, '个闪卡单词')
  );
}

function renderActiveTab() {
  const main = document.getElementById('main');
  const tab = TABS.find((t) => t.key === activeTab) || TABS[0];

  stop();
  clear(main);
  main.appendChild(buildOverviewBar());

  const host = h('div', { class: 'page-host' });
  main.appendChild(host);
  tab.render(host);

  window.scrollTo({ top: 0, behavior: 'auto' });
}

function buildTabs() {
  const nav = document.getElementById('tabs');
  clear(nav);

  for (const tab of TABS) {
    const btn = h('button', {
      class: 'tab' + (tab.key === activeTab ? ' is-active' : ''),
      type: 'button',
      role: 'tab',
      text: tab.label,
      'aria-selected': String(tab.key === activeTab)
    });

    btn.addEventListener('click', () => {
      if (activeTab === tab.key) return;
      activeTab = tab.key;
      for (const other of nav.querySelectorAll('.tab')) {
        const on = other === btn;
        other.classList.toggle('is-active', on);
        other.setAttribute('aria-selected', String(on));
      }
      renderActiveTab();
    });

    nav.appendChild(btn);
  }
}

function buildSettings() {
  const accentHost = document.getElementById('accent-switch');
  clear(accentHost);

  for (const accent of listAccents()) {
    const btn = h('button', {
      class: 'segmented__item' + (accent.key === getAccent() ? ' is-active' : ''),
      type: 'button',
      text: accent.label
    });

    btn.addEventListener('click', () => {
      setAccent(accent.key);
      for (const other of accentHost.querySelectorAll('.segmented__item')) {
        other.classList.toggle('is-active', other === btn);
      }
      saveSettings();
      toast('已切换为' + accent.label + '发音');
    });

    accentHost.appendChild(btn);
  }

  const sourceSelect = document.getElementById('source-select');
  clear(sourceSelect);

  for (const source of listSources()) {
    const option = h('option', { value: source.key, text: source.label, title: source.hint });
    if (source.key === getSource()) option.selected = true;
    sourceSelect.appendChild(option);
  }

  sourceSelect.addEventListener('change', () => {
    setSource(sourceSelect.value);
    saveSettings();
    updateBanner();
    if (sourceSelect.value === 'online') toast('已切换为在线发音（需要联网）');
  });

  const rateSelect = document.getElementById('rate-select');
  clear(rateSelect);

  for (const rate of listRates()) {
    const option = h('option', { value: String(rate.value), text: rate.label });
    if (Math.abs(rate.value - getRate()) < 0.001) option.selected = true;
    rateSelect.appendChild(option);
  }

  rateSelect.addEventListener('change', () => {
    setRate(Number(rateSelect.value));
    saveSettings();
  });

  const diagBtn = document.getElementById('diag-btn');
  if (diagBtn) diagBtn.addEventListener('click', openDiagnostics);
}

/**
 * 顶部提示条：只在「真的会影响发音」时出现
 * 语音列表是异步加载的，所以这里既在启动时判断，也在就绪回调里更新
 */
function updateBanner() {
  const banner = document.getElementById('support-banner');
  if (!banner) return;

  const sysOk = isSystemSupported();
  const onlineOk = isOnlineSupported();
  const source = getSource();

  const show = (strong, rest) => {
    banner.hidden = false;
    clear(banner);
    banner.appendChild(h('strong', { text: strong }));
    banner.appendChild(document.createTextNode(rest));
  };

  if (!sysOk && !onlineOk) {
    show(
      '当前浏览器不支持语音播放。',
      '浏览、翻卡、练习等功能仍可正常使用，但「听发音」按钮不会发声。建议使用最新版 Chrome、Edge 或 Safari。'
    );
    return;
  }

  if (source === 'online') {
    banner.hidden = true;
    return;
  }

  if (isSystemSupported()) {
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) {
      show(
        '未检测到系统语音包。',
        source === 'auto'
          ? '已自动启用在线发音兜底，点「听发音」仍能出声（整句为逐词连读，需要联网）；也可以点右上角「发音自检」查看详情或改用在线发音。'
          : '当前发音来源是「系统语音」，将不会发出声音。请在顶部把「发音」改为「在线发音」或「自动」。'
      );
      return;
    }
  }

  banner.hidden = true;
}

function init() {
  window.__phonicsBooted = true;
  loadSettings();
  updateBanner();
  buildSettings();
  buildTabs();
  renderActiveTab();

  // 语音列表到位后刷新提示条
  onReady(() => updateBanner());

  // 系统语音无声自动切到在线发音时，提示一次
  onStatus((type) => {
    if (type === 'fallback' && !fallbackNotified) {
      fallbackNotified = true;
      toast('系统语音没有发声，已自动改用在线发音');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
