/**
 * pages/flashcards.js —— 闪卡模式
 * 随机抽词，正面单词 / 背面音标 + 中文释义；认识 / 不认识，不认识的进入复习队列
 */

import { buildWordBank } from '../data-index.js';
import { h, badge, audioButton, clear, toast, sectionHeader } from '../ui.js';

function shuffle(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

export function renderFlashcardsPage(container) {
  const bank = buildWordBank();

  const state = {
    deck: shuffle(bank),
    index: 0,
    round: 1,
    known: 0,
    review: []
  };

  const progressEl = h('span', { class: 'fc-progress__text' });
  const statKnown = h('span', { class: 'fc-stat fc-stat--known' });
  const statReview = h('span', { class: 'fc-stat fc-stat--review' });
  const roundEl = h('span', { class: 'fc-round' });

  const frontWord = h('div', { class: 'fc-face__word' });
  const frontHint = h('div', { class: 'fc-face__hint', text: '点击卡片查看释义与音标' });
  const backIpa = h('div', { class: 'fc-face__ipa' });
  const backZh = h('div', { class: 'fc-face__zh' });
  const backSrc = h('div', { class: 'fc-face__src' });

  const flipInner = h(
    'div',
    { class: 'fc-inner' },
    h('div', { class: 'fc-face fc-face--front' }, frontWord, frontHint),
    h('div', { class: 'fc-face fc-face--back' }, backIpa, backZh, backSrc)
  );
  const cardEl = h(
    'div',
    { class: 'fc-card', tabindex: '0', role: 'button', 'aria-label': '闪卡，点击翻面' },
    flipInner
  );

  const listenSlot = h('span', { class: 'fc-listen-slot' });
  let listenBtn = null;

  const unknownBtn = h('button', { class: 'btn btn--ghost btn--warn', type: 'button', text: '不认识' });
  const knownBtn = h('button', { class: 'btn btn--primary btn--ok', type: 'button', text: '认识' });
  const restartBtn = h('button', { class: 'btn btn--ghost', type: 'button', text: '重新开始' });
  const tools = h('div', { class: 'fc-tools' }, unknownBtn, listenSlot, knownBtn);
  const finishBox = h('div', { class: 'fc-finish', hidden: true });

  function current() {
    return state.deck[state.index];
  }

  function updateStats() {
    progressEl.textContent = state.index + ' / ' + state.deck.length;
    statKnown.textContent = '已认识 ' + state.known;
    statReview.textContent = '待复习 ' + state.review.length;
    roundEl.textContent = state.round > 1 ? '第 ' + state.round + ' 轮复习' : '第 1 轮';
  }

  function showCard() {
    const word = current();
    if (!word) {
      finish();
      return;
    }

    cardEl.classList.remove('is-flipped');
    frontWord.textContent = word.word;
    backIpa.textContent = word.ipa || '';
    backZh.textContent = word.zh || '（暂无释义）';

    clear(backSrc);
    if (word.sources.length) {
      backSrc.appendChild(h('span', { class: 'fc-face__src-label', text: '出自' }));
      for (const src of word.sources.slice(0, 3)) backSrc.appendChild(badge(src, 'gray'));
    }

    clear(listenSlot);
    listenBtn = audioButton(word.word, { label: '听发音' });
    listenBtn.disabled = true; // 翻面后才可发音
    listenSlot.appendChild(listenBtn);

    updateStats();
  }

  function nextCard(remembered) {
    const word = current();
    if (!word) return;

    if (remembered) {
      state.known += 1;
      state.review = state.review.filter((w) => w.word !== word.word);
    } else if (!state.review.some((w) => w.word === word.word)) {
      state.review.push(word);
    }
    state.index += 1;

    if (state.index >= state.deck.length) {
      if (state.review.length) {
        state.round += 1;
        state.deck = shuffle(state.review);
        state.review = [];
        state.index = 0;
        toast('进入第 ' + state.round + ' 轮复习：' + state.deck.length + ' 个词');
      } else {
        finish();
        return;
      }
    }
    showCard();
  }

  function finish() {
    cardEl.hidden = true;
    tools.hidden = true;
    finishBox.hidden = false;
    progressEl.textContent = '全部完成';
    roundEl.textContent = '已完成';
    clear(finishBox);
    finishBox.appendChild(
      h(
        'div',
        { class: 'fc-finish__inner' },
        h('h3', { class: 'fc-finish__title', text: '本轮全部完成' }),
        h('p', {
          class: 'fc-finish__text',
          text: '共 ' + bank.length + ' 个单词，认识 ' + state.known + ' 个。'
        }),
        h('button', { class: 'btn btn--primary', type: 'button', text: '再来一轮', onclick: reset })
      )
    );
  }

  function reset() {
    state.deck = shuffle(bank);
    state.index = 0;
    state.round = 1;
    state.known = 0;
    state.review = [];
    cardEl.hidden = false;
    tools.hidden = false;
    finishBox.hidden = true;
    showCard();
  }

  cardEl.addEventListener('click', () => {
    if (cardEl.hidden) return;
    const flipped = cardEl.classList.toggle('is-flipped');
    if (flipped && listenBtn) listenBtn.disabled = false;
  });

  cardEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      cardEl.click();
    }
  });

  unknownBtn.addEventListener('click', () => nextCard(false));
  knownBtn.addEventListener('click', () => nextCard(true));
  restartBtn.addEventListener('click', reset);

  function onKey(event) {
    // 离开本页后自动失效
    if (!document.body.contains(cardEl) || cardEl.hidden) return;
    const tag = (event.target && event.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

    if (event.key === ' ') {
      event.preventDefault();
      cardEl.click();
    } else if (event.key === 'ArrowLeft') {
      nextCard(false);
    } else if (event.key === 'ArrowRight') {
      nextCard(true);
    }
  }
  document.addEventListener('keydown', onKey);

  container.appendChild(
    h(
      'section',
      { class: 'section' },
      sectionHeader('闪卡模式', '随机抽词，先说出口再翻面核对', bank.length),
      h(
        'div',
        { class: 'fc-wrap' },
        h(
          'div',
          { class: 'fc-bar' },
          h('span', { class: 'fc-progress' }, roundEl, progressEl),
          h('span', { class: 'fc-stats' }, statKnown, statReview),
          restartBtn
        ),
        cardEl,
        tools,
        finishBox,
        h('p', { class: 'fc-tip', text: '快捷键：空格翻面 · 左方向键=不认识 · 右方向键=认识' })
      )
    )
  );

  showCard();
}
