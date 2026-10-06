/**
 * pages/combos.js —— 组合练习页
 * 按「元音组合 / 辅音组合 / 辅音连缀 / R 音节 / Magic e」分区展示
 * 点击组合字母或例词均可发音
 */

import { combos, comboCategories, groupBy } from '../data-index.js';
import { h, wordChip, audioButton, bindSpeak, sectionHeader } from '../ui.js';

function comboCard(combo) {
  const sample = combo.examples[0];

  const letters = h('button', {
    class: 'combo-letters',
    type: 'button',
    text: combo.combo,
    title: '点击试听：' + sample.word
  });
  bindSpeak(letters, sample.word);

  const sounds = h(
    'div',
    { class: 'combo-sounds' },
    combo.sounds.map((s) => h('span', { class: 'ipa ipa--sm', text: s }))
  );

  const head = h('div', { class: 'card__head' }, h('div', { class: 'combo-head' }, letters, sounds));

  const words = h(
    'div',
    { class: 'words words--compact' },
    combo.examples.map((word) => wordChip(word))
  );

  const note = combo.note ? h('p', { class: 'combo-note', text: combo.note }) : null;

  const foot = h(
    'div',
    { class: 'card__foot' },
    audioButton(sample.word, { label: '听 ' + sample.word }),
    h('span', { class: 'card__hint', text: '先听，再跟读' })
  );

  return h('article', { class: 'card combo-card' }, head, note, words, foot);
}

export function renderCombosPage(container) {
  const grouped = groupBy(combos, 'category');

  for (const category of comboCategories) {
    const list = grouped.get(category.key) || [];
    if (!list.length) continue;

    container.appendChild(
      h(
        'section',
        { class: 'section' },
        sectionHeader(category.label, category.subtitle, list.length),
        h('div', { class: 'grid grid--combo' }, list.map((c) => comboCard(c)))
      )
    );
  }
}
