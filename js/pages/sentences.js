/**
 * pages/sentences.js —— 句子跟读练习页
 * 目标字母组合高亮 + 听整句 + 逐词听 + 跟读（预留语音识别接入位）
 */

import {
  sentences,
  phonemes,
  combos,
  highlightSegments,
  bareWord
} from '../data-index.js';
import { h, audioButton, bindSpeak, sectionHeader, toast } from '../ui.js';

/** 目标 id -> 展示信息 */
const targetIndex = new Map();
for (const p of phonemes) {
  targetIndex.set(p.id, { kind: '音素', display: p.ipa, label: p.ipa });
}
for (const c of combos) {
  targetIndex.set(c.id, { kind: '组合', display: c.combo, label: c.combo + ' ' + c.sounds.join(' / ') });
}

function targetInfo(id) {
  return targetIndex.get(id) || { kind: '目标', display: id, label: id };
}

function renderSentenceText(sentence) {
  const tokens = sentence.text.split(/(\s+)/);
  const targets = new Set((sentence.highlightWords || []).map((w) => bareWord(w).toLowerCase()));
  const container = h('p', { class: 'sentence__text' });

  for (const token of tokens) {
    if (/^\s+$/.test(token)) {
      container.appendChild(document.createTextNode(token));
      continue;
    }

    const word = bareWord(token);
    const isTarget = targets.size === 0 ? true : targets.has(word.toLowerCase());
    const span = h('span', {
      class: 'sw' + (isTarget ? ' sw--target' : ''),
      dataset: { word }
    });

    const patterns = isTarget ? sentence.highlight : [];
    for (const segment of highlightSegments(token, patterns)) {
      if (segment.hl) span.appendChild(h('span', { class: 'hl', text: segment.text }));
      else span.appendChild(document.createTextNode(segment.text));
    }

    if (word) bindSpeak(span, word);
    container.appendChild(span);
  }

  return container;
}

function sentenceCard(sentence) {
  const info = targetInfo(sentence.targetPhoneme);

  const meta = h(
    'div',
    { class: 'sentence__meta' },
    h('span', { class: 'badge badge--blue', text: '目标 ' + info.label }),
    h(
      'span',
      { class: 'sentence__patterns' },
      sentence.highlight.map((p) => h('code', { class: 'pattern-tag', text: p }))
    )
  );

  const text = renderSentenceText(sentence);
  const zh = h('p', { class: 'sentence__zh', text: sentence.translation });
  const note = sentence.note ? h('p', { class: 'sentence__note', text: sentence.note }) : null;
  const hint = h('p', { class: 'sentence__hint' });

  const wordModeBtn = h('button', { class: 'btn btn--ghost', type: 'button', text: '逐词听' });
  const card = h('article', { class: 'card sentence-card' });

  wordModeBtn.addEventListener('click', () => {
    const on = card.classList.toggle('is-word-mode');
    wordModeBtn.classList.toggle('is-on', on);
    hint.textContent = on ? '逐词模式已开启：点击任意单词单独发音' : '';
  });

  const readAloudBtn = h('button', { class: 'btn btn--ghost', type: 'button', text: '跟读' });
  readAloudBtn.addEventListener('click', () => {
    hint.textContent = '跟读评测开发中：这里预留了语音识别（Web Speech Recognition）的接入位置。';
    toast('跟读功能开发中，敬请期待');
  });

  const tools = h(
    'div',
    { class: 'sentence__tools' },
    audioButton(sentence.text, { label: '听整句', className: 'btn--primary' }),
    wordModeBtn,
    readAloudBtn
  );

  card.appendChild(meta);
  card.appendChild(text);
  card.appendChild(zh);
  if (note) card.appendChild(note);
  card.appendChild(tools);
  card.appendChild(hint);
  return card;
}

export function renderSentencesPage(container) {
  container.appendChild(
    h(
      'section',
      { class: 'section' },
      sectionHeader('句子跟读练习', '高亮处即为目标字母组合，先听后读', sentences.length),
      h('div', { class: 'sentences' }, sentences.map((s) => sentenceCard(s)))
    )
  );
}
