/**
 * pages/phonemes.js —— 音素浏览页
 * 卡片网格展示全部音素：IPA、类型标签、发音提示、例词（可点击发音）
 */

import {
  phonemes,
  phonemeCategories,
  phonemeBreakdown,
  letterGroupsOf,
  letterPracticeStats,
  groupBy,
  phonemeBadgeKind
} from '../data-index.js';
import { h, badge, wordChip, audioButton, bindSpeak, sectionHeader } from '../ui.js';
import { openLetterPractice } from '../letter-practice.js';

/** 页面顶部的构成说明 */
function breakdownLead() {
  const b = phonemeBreakdown();
  return h(
    'div',
    { class: 'lead-strip' },
    h(
      'div',
      { class: 'lead-strip__main' },
      h('b', { text: String(b.total) }),
      h('span', { text: '个音素' })
    ),
    h(
      'div',
      { class: 'lead-strip__detail' },
      h('span', { text: '元音 ' + b.vowelCount + ' 个 = 单元音 ' + b.monophthongCount + ' + 双元音 ' + b.diphthongCount }),
      h('span', { text: '辅音 ' + b.consonantCount + ' 个 = 清辅音 ' + b.voicelessCount + ' + 浊辅音 ' + b.voicedCount })
    ),
    h('p', { class: 'lead-strip__note', text: '/tr/ /dr/ /ts/ /dz/ 按国内教材口径计为独立音素，卡片上的「听发音」用首个例词带出该音。' }),
    h('p', { class: 'lead-strip__note', text: '每张卡片的「常见拼写」表示这个音最常由哪些字母或字母组合发出，例如 /æ/ 来自 a，/iː/ 来自 ee、ea、e 等。' }),
    h('p', {
      class: 'lead-strip__note',
      text:
        '点任意一个拼写标签，就能按「同音不同拼写」分组练习单词：全站已整理 ' +
        letterPracticeStats().groupCount +
        ' 组、共 ' +
        letterPracticeStats().wordCount +
        ' 个练习词。'
    })
  );
}

/** 音素 → 常见拼写（字母 / 字母组合），点标签即按拼写分类练词 */
function lettersRow(phoneme) {
  const list = Array.isArray(phoneme.letters) ? phoneme.letters : [];
  if (!list.length) return null;

  const totalWords = letterGroupsOf(phoneme.id).reduce((n, g) => n + g.words.length, 0);

  return h(
    'div',
    { class: 'letters' },
    h('span', { class: 'letters__label', text: '常见拼写' }),
    h(
      'div',
      { class: 'letters__list' },
      list.map((item) =>
        h('button', {
          class: 'letter-chip',
          type: 'button',
          text: item,
          title: '看 ' + item.replace('_', ' + ') + ' 的练习词（通常发 ' + phoneme.ipa + '）',
          onclick: () => openLetterPractice(phoneme, { letters: item })
        })
      )
    ),
    totalWords
      ? h('button', {
          class: 'letters__more',
          type: 'button',
          text: '分类练习 ' + totalWords + ' 词',
          title: phoneme.ipa + ' 的 ' + list.length + ' 种拼写，共 ' + totalWords + ' 个练习词',
          onclick: () => openLetterPractice(phoneme)
        })
      : null
  );
}

function phonemeCard(phoneme) {
  const head = h(
    'div',
    { class: 'card__head' },
    h('div', { class: 'ipa ipa--lg', text: phoneme.ipa, title: '点击试听' }),
    h(
      'div',
      { class: 'card__tags' },
      h('span', { class: 'badge badge--' + phonemeBadgeKind(phoneme.category), text: labelOf(phoneme.category) }),
      phoneme.type === 'consonant'
        ? h('span', {
            class: 'badge badge--' + (phoneme.voiced ? 'voiced' : 'voiceless'),
            text: phoneme.voiced ? '浊音 · 声带振动' : '清音 · 声带不振动'
          })
        : null
    )
  );

  const ipaEl = head.querySelector('.ipa');
  const sample = phoneme.exampleWords[0];
  bindSpeak(ipaEl, sample.word);

  const words = h(
    'div',
    { class: 'words' },
    phoneme.exampleWords.map((word) => wordChip(word))
  );

  const foot = h(
    'div',
    { class: 'card__foot' },
    audioButton(sample.word, { label: '听 ' + sample.word }),
    h('span', { class: 'card__hint', text: '以例词带出该音' })
  );

  return h(
    'article',
    { class: 'card phoneme-card' },
    head,
    lettersRow(phoneme),
    h('p', { class: 'mouth-tip', text: phoneme.mouthTip }),
    words,
    foot
  );
}

function labelOf(category) {
  const found = phonemeCategories.find((c) => c.key === category);
  return found ? found.label : category;
}

export function renderPhonemesPage(container) {
  const grouped = groupBy(phonemes, 'category');

  container.appendChild(breakdownLead());

  for (const category of phonemeCategories) {
    const list = grouped.get(category.key) || [];
    if (!list.length) continue;

    container.appendChild(
      h(
        'section',
        { class: 'section' },
        sectionHeader(category.label, category.subtitle, list.length),
        h('div', { class: 'grid grid--phoneme' }, list.map((p) => phonemeCard(p)))
      )
    );
  }
}
