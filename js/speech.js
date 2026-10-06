/**
 * speech.js —— 发音模块（可整体替换）
 *
 * 发音有两条通道，界面只调用 speak()，不需要关心用哪条：
 *   1) 系统语音：浏览器原生 Web Speech API（window.speechSynthesis），离线可用
 *   2) 在线兜底：<audio> 播放在线 TTS 音频（默认有道词典发音接口），
 *      在系统语音不可用 / 无声时自动接管，保证「点发音一定能出声」。
 *      该接口只对单词稳定返回音频，所以整句会被拆成词依次播放（逐词连读）。
 *
 * 将来若整套换成腾讯云 TTS，只需重写本文件并保持下面的导出接口不变，
 * 其余代码（页面、按钮）一行都不用改：
 *
 *   isSupported()            当前环境是否支持发音（系统或在线任一可用即为 true）
 *   listAccents()            可选口音列表 [{ key, label }]
 *   setAccent(key) / getAccent()
 *   listRates() / setRate(n) / getRate(n)
 *   listSources()            可选发音来源 [{ key, label, hint }]
 *   setSource(key) / getSource()      key: 'auto' | 'system' | 'online'
 *   onReady(cb)              语音列表就绪（或确认拿不到）后回调一次
 *   onStatus(cb)             状态事件：listening / playing / stop / fail / fallback
 *   speak(text, options)     朗读，返回 Promise<boolean>（完整播完为 true）
 *   stop()                   立即停止
 *   getLastError() / explainError(code)
 *   diagnose() / diagnoseText()      环境自检数据 / 可复制的文本报告
 *   test(kind)               自检用：强制走某条通道试音，返回详细结果
 *   setOnlineTTS(fn)         替换在线发音地址生成函数（换腾讯云 TTS 从这里接）
 */

const ACCENTS = [
  { key: 'en-GB', label: '英音' },
  { key: 'en-US', label: '美音' }
];

const RATE_OPTIONS = [
  { value: 0.6, label: '0.6× 很慢' },
  { value: 0.8, label: '0.8× 慢' },
  { value: 0.9, label: '0.9× 推荐' },
  { value: 1, label: '1.0× 正常' }
];

const SOURCE_OPTIONS = [
  { key: 'auto', label: '自动', hint: '优先系统语音，无声时自动改用在线发音' },
  { key: 'system', label: '系统语音', hint: '只用浏览器内置语音（离线可用，音质取决于系统语音包）' },
  { key: 'online', label: '在线发音', hint: '只用在线 TTS 音频（音质更好，需要联网）' }
];

/* 各阶段等待上限，避免按钮一直卡在「播放中…」 */
const TIMING = {
  voicesWait: 1500, // 等语音列表就绪
  startWait: 1600, // 等系统语音真正开口（超时视为静默失败）
  hardLimit: 20000, // 单次系统朗读硬上限
  onlineLimit: 12000, // 单段在线音频硬上限
  cancelGap: 70 // cancel 之后再 speak 的间隔（Chrome 会吞掉同一 tick 的朗读）
};

/* 在线兜底一次最多播多少个词（整句会被拆成词依次播放） */
const MAX_ONLINE_WORDS = 24;

const state = {
  accent: 'en-GB',
  rate: 0.9,
  source: 'auto',
  voices: [],
  voiceReady: false,
  voicesSettled: false,
  readyNotified: false,
  readyCallbacks: [],
  statusCallbacks: [],
  pollTimer: null,
  audio: null,
  audioCancel: null,
  playToken: 0,
  lastError: '',
  lastResult: null,
  lastText: '',
  lastStartedAt: 0,
  startedAt: 0,
  lastVia: '',
  fallbackCount: 0
};

let speakToken = 0;
const ERROR_TEXT = {
  'no-support': '当前浏览器不支持语音合成',
  'no-voice': '系统没有可用的英语语音包',
  'no-start': '系统语音没有发声（发音人不可用或被系统静音）',
  'not-allowed': '浏览器阻止了本次播放，请再点一次',
  interrupted: '朗读被新的播放打断',
  canceled: '朗读已取消',
  'audio-blocked': '在线音频被浏览器拦截，请再点一次',
  network: '在线发音加载失败（可能无网络或接口不可达）',
  unknown: '发音失败'
};

/* ------------------------------ 基础查询 ------------------------------ */

/** 系统语音是否可用 */
export function isSystemSupported() {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof window.SpeechSynthesisUtterance === 'function'
  );
}

/** 在线兜底是否可用（有 Audio 能力即可） */
export function isOnlineSupported() {
  return typeof window !== 'undefined' && typeof window.Audio === 'function';
}

/** 当前环境是否支持发音（两条通道任一可用） */
export function isSupported() {
  return isSystemSupported() || isOnlineSupported();
}

export function listAccents() {
  return ACCENTS.map((a) => ({ ...a }));
}

export function listRates() {
  return RATE_OPTIONS.map((r) => ({ ...r }));
}

export function listSources() {
  return SOURCE_OPTIONS.map((s) => ({ ...s }));
}

export function getAccent() {
  return state.accent;
}

export function setAccent(key) {
  if (ACCENTS.some((a) => a.key === key)) state.accent = key;
}

export function getRate() {
  return state.rate;
}

export function setRate(n) {
  const num = Number(n);
  if (!Number.isNaN(num) && num >= 0.1 && num <= 2) state.rate = num;
}

export function getSource() {
  return state.source;
}

export function setSource(key) {
  if (SOURCE_OPTIONS.some((s) => s.key === key)) state.source = key;
}

export function getLastError() {
  return state.lastError;
}

export function explainError(code) {
  return ERROR_TEXT[code] || ERROR_TEXT.unknown;
}

/** 语音列表是否已就绪 */
export function isVoiceReady() {
  return state.voiceReady;
}

/** 语音列表就绪（或确认拿不到）后回调，只回调一次 */
export function onReady(cb) {
  if (typeof cb !== 'function') return;
  if (state.voicesSettled) {
    cb(state.voices.slice());
    return;
  }
  state.readyCallbacks.push(cb);
}

/** 发音状态事件：listening(准备) / voices(语音列表) / playing(开始) / stop / fail / fallback */
export function onStatus(cb) {
  if (typeof cb === 'function') state.statusCallbacks.push(cb);
}

function emit(type, payload) {
  for (const cb of state.statusCallbacks) {
    try {
      cb(type, payload);
    } catch (err) {
      console.warn('[speech] onStatus 回调出错', err);
    }
  }
}

function settleReady() {
  if (state.voicesSettled) return;
  state.voicesSettled = true;
  const cbs = state.readyCallbacks.splice(0);
  cbs.forEach((cb) => {
    try {
      cb(state.voices.slice());
    } catch (err) {
      console.warn('[speech] onReady 回调出错', err);
    }
  });
  state.readyNotified = true;
}

/* ------------------------------ 语音列表 ------------------------------ */

function refreshVoices() {
  if (!isSystemSupported()) return false;
  let list = [];
  try {
    list = window.speechSynthesis.getVoices() || [];
  } catch (err) {
    list = [];
  }
  if (!list.length) return false;
  state.voices = list;
  state.voiceReady = true;
  if (state.pollTimer) {
    clearInterval(state.pollTimer);
    state.pollTimer = null;
  }
  settleReady();
  emit('voices', list);
  return true;
}

let voicesPromise = null;

/** 等待语音列表就绪；拿不到也要在 timeout 后给出结论，绝不悬挂 */
function ensureVoices(timeout = TIMING.voicesWait) {
  if (!isSystemSupported()) return Promise.resolve([]);
  if (refreshVoices()) return Promise.resolve(state.voices);
  // 已经有过结论（确认没有语音包）就不再白等，直接交给上层走兜底
  if (state.voicesSettled) return Promise.resolve(state.voices);
  if (voicesPromise) return voicesPromise;

  voicesPromise = new Promise((resolve) => {
    const t0 = Date.now();
    const timer = setInterval(() => {
      if (refreshVoices()) {
        clearInterval(timer);
        resolve(state.voices);
        return;
      }
      if (Date.now() - t0 >= timeout) {
        clearInterval(timer);
        settleReady(); // 明确告知：拿不到语音列表
        emit('voices', []);
        resolve(state.voices);
      }
    }, 100);
  });
  return voicesPromise;
}

if (isSystemSupported()) {
  state.startedAt = Date.now();
  refreshVoices();
  // Chrome / Edge 首次调用 getVoices() 常返回空数组，需要等 voiceschanged
  try {
    window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices);
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  } catch (err) {
    /* 忽略 */
  }
  // 少数浏览器既不触发事件也不立刻返回，做几次轮询兜底
  state.pollTimer = setInterval(() => {
    if (refreshVoices()) {
      if (state.pollTimer) {
        clearInterval(state.pollTimer);
        state.pollTimer = null;
      }
      return;
    }
    // 一直拿不到就 4 秒后收工，交给 ensureVoices 下结论
    if (!state.voices.length && Date.now() - state.startedAt > 4000 && state.pollTimer) {
      clearInterval(state.pollTimer);
      state.pollTimer = null;
      settleReady();
    }
  }, 250);
}

/** 为指定语言挑一个尽量自然的发音人 */
export function findVoice(lang, list) {
  const pool = list || state.voices;
  if (!pool || !pool.length) return null;
  const target = String(lang || '').toLowerCase().replace('_', '-');
  const base = target.split('-')[0];

  let best = null;
  let bestScore = -1;

  for (const voice of pool) {
    const vLang = String(voice.lang || '').toLowerCase().replace('_', '-');
    let score;
    if (vLang === target) score = 100;
    else if (vLang.startsWith(base + '-')) score = 40;
    else if (vLang === base) score = 30;
    else continue;

    const name = String(voice.name || '').toLowerCase();
    if (voice.localService) score += 8;
    if (/natural|premium|enhanced|neural|online/.test(name)) score += 7;
    if (/google/.test(name)) score += 6;
    if (/female|samantha|aria|libby|hazel|zira|sonia|jenny/.test(name)) score += 3;

    if (score > bestScore) {
      bestScore = score;
      best = voice;
    }
  }
  return best;
}

/** 英文语音列表（自检面板展示用） */
export function listEnglishVoices() {
  return state.voices
    .filter((v) => /^en/i.test(String(v.lang || '')))
    .map((v) => ({ name: v.name, lang: v.lang, local: !!v.localService }));
}

/* ------------------------------ 通道二：在线发音 ------------------------------ */

/**
 * 默认在线发音地址：有道词典发音接口
 * type=1 英音 / type=2 美音，单词和整句都支持
 * 换腾讯云 TTS 时调用 setOnlineTTS() 换掉这个函数即可
 */
let onlineTTS = function defaultOnlineTTS(text, accent) {
  const type = String(accent || '').toLowerCase().startsWith('en-us') ? 2 : 1;
  return 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(text) + '&type=' + type;
};

export function setOnlineTTS(fn) {
  if (typeof fn === 'function') onlineTTS = fn;
}

export function getOnlineUrl(text, accent) {
  return onlineTTS(text, accent || state.accent);
}

function stopAudio() {
  state.playToken += 1;
  const cancel = state.audioCancel;
  state.audioCancel = null;
  if (!state.audio) {
    if (cancel) cancel();
    return;
  }
  const audio = state.audio;
  state.audio = null;
  try {
    audio.onended = null;
    audio.onerror = null;
    audio.pause();
    audio.currentTime = 0;
  } catch (err) {
    /* 忽略 */
  }
  if (cancel) cancel();
}

/** 在线接口按词取音，所以整句会被拆成一个个词 */
function tokenizeForOnline(text) {
  const words = String(text).match(/[A-Za-z][A-Za-z'’-]*/g) || [];
  return words.slice(0, MAX_ONLINE_WORDS);
}

/** 播一个词的音频 */
function playOneWord(word, options) {
  return new Promise((resolve) => {
    let audio;
    try {
      audio = new window.Audio();
    } catch (err) {
      state.lastError = 'no-support';
      resolve(false);
      return;
    }

    let settled = false;
    let limit = null;
    const finish = (ok, code) => {
      if (settled) return;
      settled = true;
      if (limit) clearTimeout(limit);
      state.audioCancel = null;
      if (state.audio === audio) state.audio = null;
      if (!ok && code) state.lastError = code;
      resolve(ok);
    };

    state.audio = audio;
    state.audioCancel = () => finish(false, 'canceled');

    audio.preload = 'auto';
    try {
      audio.playbackRate = Math.max(0.6, Math.min(1.4, state.rate));
      if ('preservesPitch' in audio) audio.preservesPitch = true;
      else if ('webkitPreservesPitch' in audio) audio.webkitPreservesPitch = true;
    } catch (err) {
      /* 忽略 */
    }
    audio.onended = () => finish(true);
    audio.onerror = () => finish(false, 'network');
    audio.src = onlineTTS(word, options.accent || state.accent);

    limit = setTimeout(() => finish(false, 'network'), TIMING.onlineLimit);

    let played;
    try {
      played = audio.play();
    } catch (err) {
      finish(false, 'audio-blocked');
      return;
    }
    if (played && typeof played.then === 'function') played.catch(() => finish(false, 'audio-blocked'));
  });
}

/**
 * 在线播放：单词直接播，整句拆成词依次播放
 * （在线接口只对单词稳定返回音频，整句走逐词连读，也是拼读练习想要的效果）
 */
function playOnline(text, options = {}) {
  if (!isOnlineSupported()) {
    state.lastError = 'no-support';
    return Promise.resolve(false);
  }

  const tokens = tokenizeForOnline(text);
  if (!tokens.length) {
    state.lastError = 'unknown';
    return Promise.resolve(false);
  }

  stopAudio();
  const myToken = state.playToken;

  return new Promise((resolve) => {
    let index = 0;
    let playedAny = false;

    const step = () => {
      if (myToken !== state.playToken) {
        // 被 stop() 打断
        resolve(false);
        return;
      }
      if (index >= tokens.length) {
        resolve(playedAny);
        return;
      }

      const word = tokens[index];
      index += 1;

      playOneWord(word, options).then((ok) => {
        if (myToken !== state.playToken) {
          resolve(false);
          return;
        }
        if (ok) {
          playedAny = true;
          if (index === 1) emit('playing', { text, via: 'online' });
          setTimeout(step, 110); // 词间留一点空隙，听起来更像连读
          return;
        }
        // 第一个词就失败 => 判定整条通道不可用，别逐个重试浪费时间
        resolve(playedAny);
      });
    };

    step();
  });
}

/* ------------------------------ 通道一：系统语音 ------------------------------ */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 让系统语音读一次
 * @returns {Promise<boolean>} 是否真的开口并读完
 */
async function speakSystemOnce(text, options = {}) {
  if (!isSystemSupported()) {
    state.lastError = 'no-support';
    return false;
  }
  const synth = window.speechSynthesis;
  const token = ++speakToken;

  // 关键：Chrome 里 cancel() 之后同一 tick 内的 speak() 会被吞掉，必须隔开
  try {
    if (synth.speaking || synth.pending || synth.paused) {
      synth.cancel();
      await delay(TIMING.cancelGap);
    }
  } catch (err) {
    /* 忽略 */
  }
  if (token !== speakToken) return false;

  return new Promise((resolve) => {
    let started = false;
    let settled = false;
    let startTimer = null;
    let hardTimer = null;

    const finish = (ok, code) => {
      if (settled) return;
      settled = true;
      if (startTimer) clearTimeout(startTimer);
      if (hardTimer) clearTimeout(hardTimer);
      if (!ok && code) state.lastError = code;
      resolve(ok);
    };

    let utterance;
    try {
      utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = options.accent || state.accent;
      utterance.rate = options.rate != null ? options.rate : state.rate;
      utterance.pitch = options.pitch != null ? options.pitch : 1;
      utterance.volume = options.volume != null ? options.volume : 1;
      const voice = options.voice !== undefined ? options.voice : findVoice(utterance.lang);
      if (voice) utterance.voice = voice;
    } catch (err) {
      finish(false, 'no-support');
      return;
    }

    utterance.onstart = () => {
      started = true;
      state.lastStartedAt = Date.now();
      if (startTimer) clearTimeout(startTimer);
      emit('playing', { text, via: 'system' });
    };
    utterance.onend = () => finish(true);
    utterance.onerror = (event) => {
      const code = (event && event.error) || 'unknown';
      if (code === 'interrupted' && token !== speakToken) {
        finish(false, 'canceled');
        return;
      }
      finish(false, code);
    };

    try {
      if (typeof synth.resume === 'function') synth.resume(); // Chrome 有时会卡在 paused
      synth.speak(utterance);
    } catch (err) {
      finish(false, 'unknown');
      return;
    }

    // 静默失败检测：迟迟不开口就判定这条通道不行，交给上层重试 / 兜底
    startTimer = setTimeout(() => {
      if (started || settled) return;
      try {
        synth.cancel();
      } catch (err) {
        /* 忽略 */
      }
      finish(false, state.voices.length ? 'no-start' : 'no-voice');
    }, TIMING.startWait);

    hardTimer = setTimeout(() => finish(started, started ? '' : 'unknown'), TIMING.hardLimit);
  });
}

async function speakSystem(text, options = {}) {
  if (!isSystemSupported()) {
    state.lastError = 'no-support';
    return false;
  }

  await ensureVoices(TIMING.voicesWait);

  const accent = options.accent || state.accent;
  const picked = findVoice(accent);
  const attempts = [];
  if (picked) attempts.push(picked);
  if (state.voices.length && !picked) attempts.push(null);
  if (!attempts.length) attempts.push(null); // 一个语音都没有也试一次，避免误判

  for (let i = 0; i < attempts.length; i += 1) {
    const ok = await speakSystemOnce(text, { ...options, voice: attempts[i] });
    if (ok) return true;
    if (state.lastError === 'not-allowed' || state.lastError === 'no-support') return false;
  }
  return false;
}

/* ------------------------------ 对外主入口 ------------------------------ */

/**
 * 朗读一段文本（系统语音优先，必要时自动走在线兜底）
 * @param {string} text
 * @param {{rate?:number, pitch?:number, accent?:string, volume?:number,
 *          source?:'auto'|'system'|'online', allowFallback?:boolean}} [options]
 * @returns {Promise<boolean>} 是否完整播完
 */
export async function speak(text, options = {}) {
  const content = String(text == null ? '' : text).trim();
  if (!content) return false;

  const source = options.source || state.source;
  const allowFallback = options.allowFallback !== false && source === 'auto';

  state.lastText = content;
  state.lastError = '';
  emit('listening', { text: content, source });

  let ok = false;
  let via = 'system';

  if (source === 'online') {
    via = 'online';
    ok = await playOnline(content, options);
  } else {
    ok = await speakSystem(content, options);
    if (!ok && allowFallback) {
      via = 'online';
      state.fallbackCount += 1;
      emit('fallback', { text: content, reason: state.lastError });
      const firstError = state.lastError;
      ok = await playOnline(content, options);
      if (!ok && !state.lastError) state.lastError = firstError;
    }
  }

  if (!ok) {
    state.lastResult = false;
    emit('fail', { text: content, error: state.lastError });
  } else {
    state.lastResult = true;
    emit('stop', { text: content, via });
  }
  state.lastVia = ok ? via : '';
  return ok;
}

/** 立即停止朗读 */
export function stop() {
  speakToken += 1;
  if (isSystemSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch (err) {
      /* 忽略 */
    }
  }
  stopAudio();
  emit('stop', { manual: true });
}

/* ------------------------------ 自检 ------------------------------ */

/** 收集环境自检数据 */
export function diagnose() {
  const picked = findVoice(state.accent);
  return {
    systemSupported: isSystemSupported(),
    onlineSupported: isOnlineSupported(),
    voiceCount: state.voices.length,
    voicesSettled: state.voicesSettled,
    englishVoices: listEnglishVoices(),
    pickedVoice: picked ? picked.name + ' (' + picked.lang + ')' : '（无匹配）',
    accent: state.accent,
    rate: state.rate,
    source: state.source,
    lastError: state.lastError,
    lastErrorText: state.lastError ? explainError(state.lastError) : '',
    lastResult: state.lastResult,
    lastText: state.lastText,
    fallbackCount: state.fallbackCount,
    onlineUrlSample: getOnlineUrl('cat', state.accent),
    secureContext: typeof window !== 'undefined' ? String(!!window.isSecureContext) : 'n/a',
    protocol: typeof location !== 'undefined' ? location.protocol : '',
    href: typeof location !== 'undefined' ? location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
  };
}

/** 生成可复制的纯文本诊断报告 */
export function diagnoseText() {
  const d = diagnose();
  const lines = [];
  lines.push('=== 自然拼读 · 发音自检报告 ===');
  lines.push('页面地址      : ' + d.href);
  lines.push('协议/安全上下文: ' + d.protocol + ' / ' + d.secureContext);
  lines.push('系统语音支持  : ' + (d.systemSupported ? '是' : '否'));
  lines.push('系统语音数量  : ' + d.voiceCount + (d.voicesSettled ? '（已确认）' : '（仍在加载）'));
  lines.push('英文语音      : ' + (d.englishVoices.length ? d.englishVoices.map((v) => v.name + '/' + v.lang).join('、') : '（无）'));
  lines.push('匹配当前口音  : ' + d.pickedVoice);
  lines.push('当前口音/语速 : ' + d.accent + ' / ' + d.rate);
  lines.push('发音来源设置  : ' + d.source);
  lines.push('在线通道支持  : ' + (d.onlineSupported ? '是' : '否'));
  lines.push('在线地址示例  : ' + d.onlineUrlSample);
  lines.push('最近一次结果  : ' + (d.lastResult === null ? '尚未播放' : d.lastResult ? '成功' : '失败'));
  lines.push('最近一次错误  : ' + (d.lastError ? d.lastError + '（' + d.lastErrorText + '）' : '无'));
  lines.push('在线兜底次数  : ' + d.fallbackCount);
  lines.push('浏览器        : ' + d.userAgent);
  return lines.join('\n');
}

/**
 * 自检试音：强制走指定通道，返回耗时与错误码
 * @param {'system'|'online'} kind
 */
export async function test(kind) {
  const t0 = Date.now();
  const text = 'Hello, this is a pronunciation test.';
  const ok = await speak(text, { source: kind === 'online' ? 'online' : 'system', allowFallback: false });
  return {
    kind,
    ok,
    ms: Date.now() - t0,
    error: state.lastError || '',
    errorText: state.lastError ? explainError(state.lastError) : ''
  };
}
