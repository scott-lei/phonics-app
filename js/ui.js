/**
 * ui.js —— 通用界面小工具：DOM 构建、吐司提示、发音按钮、可点击单词条
 */

import { isSupported, speak, getLastError, explainError } from './speech.js';

const SPEAKER_SVG =
  '<svg class="ico" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">' +
  '<path d="M4 9.5v5h3.2L11.5 18V6L7.2 9.5H4z" fill="currentColor"/>' +
  '<path d="M14.6 9.2a4.2 4.2 0 0 1 0 5.6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>' +
  '<path d="M17 6.8a7.2 7.2 0 0 1 0 10.4" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/>' +
  '</svg>';

export const SPEAKER_ICON = SPEAKER_SVG;

/**
 * 创建元素的极简封装
 * h('div', { class: 'x', text: 'hi', onclick: fn }, child1, child2)
 */
export function h(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const key of Object.keys(attrs)) {
      const value = attrs[key];
      if (value == null || value === false) continue;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key === 'html') node.innerHTML = value;
      else if (key === 'style' && typeof value === 'object') Object.assign(node.style, value);
      else if (key === 'dataset' && typeof value === 'object') Object.assign(node.dataset, value);
      else if (key.startsWith('on') && typeof value === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (value === true) node.setAttribute(key, '');
      else node.setAttribute(key, String(value));
    }
  }
  appendChildren(node, children);
  return node;
}

function appendChildren(node, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false || child === true) continue;
    node.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
  }
}

export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function svgIcon(svgString) {
  const span = document.createElement('span');
  span.className = 'ico-wrap';
  span.innerHTML = svgString;
  return span;
}

/* ------------------------------ 吐司提示 ------------------------------ */

let toastTimer = null;

export function toast(message, duration = 2200) {
  const host = document.getElementById('toast-host');
  if (!host) return;
  clear(host);
  const tip = h('div', { class: 'toast', text: message });
  host.appendChild(tip);
  requestAnimationFrame(() => tip.classList.add('is-in'));
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    tip.classList.remove('is-in');
    setTimeout(() => tip.remove(), 240);
  }, duration);
}

/* ------------------------------ 发音状态 ------------------------------ */

let activeNode = null;

function releaseActive() {
  if (activeNode) {
    activeNode.classList.remove('is-speaking');
    activeNode.disabled = false;
    const label = activeNode.querySelector('.js-label');
    if (label && activeNode.dataset.restLabel) label.textContent = activeNode.dataset.restLabel;
    activeNode = null;
  }
}

function acquire(node) {
  if (activeNode && activeNode !== node) releaseActive();
  activeNode = node;
  node.classList.add('is-speaking');
  node.disabled = true;
  const label = node.querySelector('.js-label');
  if (label) {
    if (!node.dataset.restLabel) node.dataset.restLabel = label.textContent;
    label.textContent = node.dataset.playingLabel || '播放中…';
  }
}

/** 播完之后把按钮恢复原状（无论成功失败都要恢复，否则按钮会一直卡在「播放中…」） */
function release(node) {
  node.classList.remove('is-speaking');
  node.disabled = false;
  const label = node.querySelector('.js-label');
  if (label && node.dataset.restLabel) label.textContent = node.dataset.restLabel;
  if (activeNode === node) activeNode = null;
}

/** 朗读失败时给出人能看懂的提示 */
function reportFailure() {
  const code = getLastError();
  toast(code ? '发音失败：' + explainError(code) : '发音失败，请点右上角「发音自检」查看原因');
}

/**
 * 通用发音主按钮
 * @param {string} text 要朗读的内容
 * @param {{label?:string, onStateChange?:Function, variants?:string[]}} [options]
 */
export function audioButton(text, options = {}) {
  const { label = '听发音', className = '', variants = [] } = options;
  const btn = h(
    'button',
    {
      class: 'btn btn--audio ' + className,
      type: 'button',
      dataset: { playingLabel: options.playingLabel || '播放中…' }
    },
    svgIcon(SPEAKER_SVG),
    h('span', { class: 'js-label', text: label })
  );
  variants.forEach((v) => btn.classList.add(v));

  btn.addEventListener('click', async () => {
    if (!isSupported()) {
      toast('当前浏览器不支持语音播放');
      return;
    }
    acquire(btn);
    if (typeof options.onStateChange === 'function') options.onStateChange(true);
    let ok = false;
    try {
      ok = await speak(text, options.speakOptions || {});
    } finally {
      release(btn);
      if (typeof options.onStateChange === 'function') options.onStateChange(false);
    }
    if (!ok) reportFailure();
  });

  return btn;
}

/** 给任意元素绑定「点击即朗读」 */
export function bindSpeak(node, text, speakOptions) {
  node.classList.add('is-clickable');
  node.addEventListener('click', async (event) => {
    event.stopPropagation();
    if (!isSupported()) {
      toast('当前浏览器不支持语音播放');
      return;
    }
    if (node.classList.contains('is-speaking')) return;
    acquire(node);
    let ok = false;
    try {
      ok = await speak(text, speakOptions || {});
    } finally {
      release(node);
    }
    if (!ok) reportFailure();
  });
  return node;
}

/* ------------------------------ 小部件 ------------------------------ */

export function badge(text, kind) {
  return h('span', { class: 'badge' + (kind ? ' badge--' + kind : ''), text });
}

/** 例词条：点击即朗读 */
export function wordChip(entry, options = {}) {
  const chip = h(
    'button',
    { class: 'word-chip', type: 'button', title: entry.word + ' ' + (entry.ipa || '') },
    h(
      'span',
      { class: 'word-chip__main' },
      h('span', { class: 'word-chip__word', text: entry.word }),
      entry.ipa ? h('span', { class: 'word-chip__ipa', text: entry.ipa }) : null
    ),
    options.showZh !== false && entry.zh
      ? h('span', { class: 'word-chip__zh', text: entry.zh })
      : null
  );
  bindSpeak(chip, entry.word);
  return chip;
}

export function sectionHeader(title, subtitle, count) {
  return h(
    'div',
    { class: 'section-head' },
    h(
      'div',
      { class: 'section-head__left' },
      h('h2', { class: 'section-head__title', text: title }),
      subtitle ? h('span', { class: 'section-head__sub', text: subtitle }) : null
    ),
    count != null ? h('span', { class: 'section-head__count', text: count + ' 个' }) : null
  );
}

export function emptyHint(text) {
  return h('p', { class: 'empty-hint', text });
}
