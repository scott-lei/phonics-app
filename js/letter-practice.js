/**
 * letter-practice.js —— 「按拼写分类学单词」弹窗
 *
 * 同一个音往往有好几种拼写（比如 /iː/ 可以是 ee / ea / e / ie / ey）。
 * 这个弹窗把某个音素的练习词按拼写分组列出来，一组一组地练「字母 → 音」：
 * 有几个常见拼写，就分几组单词。
 */

import { letterGroupsOf } from './data-index.js';
import { h, wordChip } from './ui.js';

let practicePanel = null;
let currentKey = '';

function onKey(event) {
  if (event.key === 'Escape') closeLetterPractice();
}

export function closeLetterPractice() {
  if (practicePanel) practicePanel.remove();
  practicePanel = null;
  currentKey = '';
  document.removeEventListener('keydown', onKey);
}

/** 高亮某一组（点哪个拼写 chip 就亮哪一组） */
function focusGroup(letters) {
  if (!practicePanel || !letters) return;
  for (const node of practicePanel.querySelectorAll('.lp__group')) {
    node.classList.toggle('is-focus', node.dataset.letters === letters);
  }
}

function groupSection(phoneme, group, focused) {
  return h(
    'section',
    { class: 'lp__group' + (focused ? ' is-focus' : ''), dataset: { letters: group.letters } },
    h(
      'div',
      { class: 'lp__group-head' },
      h('span', { class: 'lp__letters', text: group.letters, title: group.letters.replace('_', ' + ') }),
      h('span', { class: 'lp__arrow', text: '都读 ' + phoneme.ipa }),
      h('span', { class: 'lp__count', text: group.words.length + ' 词' })
    ),
    h(
      'div',
      { class: 'lp__words' },
      group.words.map((word) => wordChip(word))
    )
  );
}

/**
 * 打开某个音素的分类练习弹窗
 * @param {object} phoneme 音素对象
 * @param {{letters?:string}} [options] letters 指定初始高亮的拼写组
 */
export function openLetterPractice(phoneme, options = {}) {
  if (!phoneme) return;
  const groups = letterGroupsOf(phoneme.id);
  if (!groups.length) return;

  // 同一个音素的面板已经开着，就只切换高亮，不重建
  if (practicePanel && practicePanel.isConnected && currentKey === phoneme.id) {
    focusGroup(options.letters || groups[0].letters);
    return;
  }

  closeLetterPractice();
  currentKey = phoneme.id;

  const total = groups.reduce((n, g) => n + g.words.length, 0);
  const first = options.letters || groups[0].letters;

  const panel = h(
    'div',
    {
      class: 'diag__panel lp__panel',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': phoneme.ipa + ' 按拼写分类练习'
    },
    h(
      'div',
      { class: 'diag__head lp__head' },
      h(
        'div',
        { class: 'lp__title-wrap' },
        h('span', { class: 'lp__ipa', text: phoneme.ipa }),
        h('span', { class: 'lp__sub', text: groups.length + ' 种拼写 · ' + total + ' 个练习词' })
      ),
      h('button', { class: 'diag__close', type: 'button', text: '关闭', onclick: closeLetterPractice })
    ),
    h(
      'div',
      { class: 'diag__body lp__body' },
      h('p', {
        class: 'lp__note',
        text: '下面这些词都读 ' + phoneme.ipa + '，但拼写不同。先看字母、再听声音，点单词就能发音。'
      }),
      groups.map((group) => groupSection(phoneme, group, group.letters === first))
    )
  );

  practicePanel = h('div', { class: 'diag lp', id: 'letter-practice-modal' }, panel);
  practicePanel.addEventListener('click', (event) => {
    if (event.target === practicePanel) closeLetterPractice();
  });
  document.addEventListener('keydown', onKey);
  document.body.appendChild(practicePanel);
}
