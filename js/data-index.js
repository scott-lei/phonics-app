/**
 * data-index.js —— 数据聚合层
 * 把 4 个数据文件汇总，并派生界面需要的结构：
 *   - 词库（闪卡用）：单词 -> 音标 / 中文释义 / 来源
 *   - 句子高亮切分
 *   - 各类统计信息
 */

import { phonemes, phonemeCategories } from '../data/phonemes.js';
import { combos, comboCategories } from '../data/combos.js';
import { irregulars } from '../data/irregulars.js';
import { sentences } from '../data/sentences.js';
import { wordGroups } from '../data/word-groups.js';

export { phonemes, phonemeCategories, combos, comboCategories, irregulars, sentences, wordGroups };

/** 按 category 分组 */
export function groupBy(list, key) {
  const map = new Map();
  for (const item of list) {
    const k = item[key];
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(item);
  }
  return map;
}

/** 音素按类型的中文标签 */
export const PHONEME_TYPE_LABEL = {
  vowel: '元音',
  diphthong: '双元音',
  consonant: '辅音'
};

const CATEGORY_BADGE_KIND = {
  'short-vowel': 'blue',
  'long-vowel': 'green',
  diphthong: 'purple',
  'voiceless-consonant': 'gray',
  'voiced-consonant': 'amber'
};

export function phonemeBadgeKind(category) {
  return CATEGORY_BADGE_KIND[category] || 'blue';
}

/* ------------------------------ 词库 ------------------------------ */

let wordBankCache = null;

/**
 * 汇总全部例词，生成闪卡词库
 * @returns {{word:string, ipa:string, zh:string, sources:string[]}[]}
 */
export function buildWordBank() {
  if (wordBankCache) return wordBankCache;

  const map = new Map();
  const add = (entry, source) => {
    if (!entry || !entry.word) return;
    const key = entry.word.toLowerCase();
    if (!map.has(key)) {
      map.set(key, { word: entry.word, ipa: entry.ipa || '', zh: entry.zh || '', sources: [] });
    }
    const record = map.get(key);
    if (!record.ipa && entry.ipa) record.ipa = entry.ipa;
    if (!record.zh && entry.zh) record.zh = entry.zh;
    if (!record.sources.includes(source)) record.sources.push(source);
  };

  for (const p of phonemes) {
    for (const w of p.exampleWords) add(w, '音素 ' + p.ipa);
  }
  for (const c of combos) {
    for (const w of c.examples) add(w, '组合 ' + c.combo);
  }
  for (const r of irregulars) {
    for (const w of r.examples) add(w, '规则 ' + r.pattern);
  }

  wordBankCache = Array.from(map.values());
  return wordBankCache;
}

/* ------------------------------ 拼写分组词库 ------------------------------ */

/**
 * 某个音素的「拼写 → 练习单词」分组
 * 顺序严格跟随该音素的 letters 数组（最常见的拼写排在最前）
 * @param {string} phonemeId
 * @returns {{letters:string, words:{word:string, zh:string}[]}[]}
 */
export function letterGroupsOf(phonemeId) {
  const groups = wordGroups[phonemeId];
  if (!groups) return [];

  const phoneme = phonemes.find((p) => p.id === phonemeId);
  const order = phoneme && Array.isArray(phoneme.letters) ? phoneme.letters : Object.keys(groups);

  return order
    .filter((letters) => Array.isArray(groups[letters]) && groups[letters].length)
    .map((letters) => ({ letters, words: groups[letters] }));
}

let letterStatsCache = null;

/** 拼写分组练习的总量统计 */
export function letterPracticeStats() {
  if (letterStatsCache) return letterStatsCache;

  let groupCount = 0;
  let wordCount = 0;
  for (const groups of Object.values(wordGroups)) {
    for (const words of Object.values(groups)) {
      groupCount += 1;
      wordCount += words.length;
    }
  }
  letterStatsCache = { groupCount, wordCount };
  return letterStatsCache;
}

/* ------------------------------ 句子高亮 ------------------------------ */

/**
 * 把单词切分为「高亮 / 非高亮」片段
 * 支持 'a' 这类直接匹配，也支持 'a_e' 这类魔法 e 模式（分段匹配）
 * @returns {{text:string, hl:boolean}[]}
 */
export function highlightSegments(word, patterns) {
  const len = word.length;
  const marks = new Array(len).fill(false);
  const lower = word.toLowerCase();

  for (const pattern of patterns || []) {
    if (!pattern) continue;
    if (pattern.indexOf('_') >= 0) {
      for (const part of pattern.split('_')) {
        if (!part) continue;
        const idx = lower.indexOf(part.toLowerCase());
        if (idx >= 0) {
          for (let i = idx; i < idx + part.length && i < len; i += 1) marks[i] = true;
        }
      }
    } else {
      const needle = pattern.toLowerCase();
      let from = 0;
      let idx = lower.indexOf(needle, from);
      while (idx >= 0) {
        for (let i = idx; i < idx + needle.length && i < len; i += 1) marks[i] = true;
        from = idx + 1;
        idx = lower.indexOf(needle, from);
      }
    }
  }

  const segments = [];
  let current = null;
  for (let i = 0; i < len; i += 1) {
    if (current && current.hl === marks[i]) {
      current.text += word[i];
    } else {
      current = { text: word[i], hl: marks[i] };
      segments.push(current);
    }
  }
  return segments;
}

/** 去掉单词尾部的标点，用于匹配 highlightWords */
export function bareWord(token) {
  return token.replace(/[^A-Za-z']/g, '');
}

/** 音素构成（元音 / 辅音拆分），界面用来展示「48 = 20 + 28」 */
export function phonemeBreakdown() {
  const vowels = phonemes.filter((p) => p.type === 'vowel' || p.type === 'diphthong');
  const consonants = phonemes.filter((p) => p.type === 'consonant');
  const monophthongs = vowels.filter((p) => p.type === 'vowel');
  const diphthongs = vowels.filter((p) => p.type === 'diphthong');
  const voiceless = consonants.filter((p) => !p.voiced);
  const voiced = consonants.filter((p) => p.voiced);

  return {
    total: phonemes.length,
    vowelCount: vowels.length,
    consonantCount: consonants.length,
    monophthongCount: monophthongs.length,
    diphthongCount: diphthongs.length,
    voicelessCount: voiceless.length,
    voicedCount: voiced.length
  };
}

/** 全局统计 */
export function stats() {
  const bank = buildWordBank();
  const breakdown = phonemeBreakdown();
  return {
    phonemeCount: phonemes.length,
    vowelCount: breakdown.vowelCount,
    consonantCount: breakdown.consonantCount,
    comboCount: combos.length,
    irregularCount: irregulars.length,
    sentenceCount: sentences.length,
    wordCount: bank.length
  };
}
