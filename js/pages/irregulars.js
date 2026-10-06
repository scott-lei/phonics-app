/**
 * pages/irregulars.js —— 不规则发音规则页
 * 展示 pattern / description / 例词（含备注），例词可点击发音
 */

import { irregulars } from '../data-index.js';
import { h, wordChip, badge, audioButton, sectionHeader } from '../ui.js';

function exampleRow(entry) {
  const chip = wordChip(entry);
  return h('div', { class: 'rule-example' }, chip, h('span', { class: 'rule-example__note', text: entry.note || '' }));
}

function ruleCard(rule) {
  const head = h(
    'div',
    { class: 'card__head' },
    h(
      'div',
      {},
      h('h3', { class: 'rule-pattern', text: rule.pattern }),
      h('p', { class: 'rule-desc', text: rule.description })
    ),
    badge(rule.examples.length + ' 例', 'gray')
  );

  const list = h('div', { class: 'rule-examples' }, rule.examples.map((e) => exampleRow(e)));

  const first = rule.examples[0];
  const foot = h(
    'div',
    { class: 'card__foot' },
    audioButton(first.word, { label: '听 ' + first.word })
  );

  return h('article', { class: 'card rule-card' }, head, list, foot);
}

export function renderIrregularsPage(container) {
  container.appendChild(
    h(
      'section',
      { class: 'section' },
      sectionHeader('不规则发音规则', '常见例外与不发音字母', irregulars.length),
      h('div', { class: 'grid grid--rule' }, irregulars.map((r) => ruleCard(r)))
    )
  );
}
