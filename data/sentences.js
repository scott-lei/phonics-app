// data/sentences.js
// 句子跟读练习库
//
// 字段说明：
//   id             唯一标识（sent-xxx）
//   text           英文句子
//   translation    中文翻译
//   targetPhoneme  目标音素 / 组合的 id（关联 phonemes.js / combos.js）
//   highlight      需要高亮的字母组合（模式）
//   highlightWords 句中包含该模式的单词（界面据此定位高亮范围；为空则整句按模式匹配）
//   note           补充说明（可选）

export const sentences = [
  // ==================== 短元音 /æ/ ====================
  {
    id: 'sent-cat-mat',
    text: 'The cat sat on the mat.',
    translation: '猫坐在垫子上。',
    targetPhoneme: 'short-a',
    highlight: ['a'],
    highlightWords: ['cat', 'sat', 'mat']
  },
  {
    id: 'sent-black-bag',
    text: 'A black bag is in the hand.',
    translation: '一个黑包在手里。',
    targetPhoneme: 'short-a',
    highlight: ['a'],
    highlightWords: ['black', 'bag', 'hand']
  },

  // ==================== 短元音 /ɪ/ ====================
  {
    id: 'sent-pig-big',
    text: 'The pig is big and fit.',
    translation: '这只猪又大又壮。',
    targetPhoneme: 'short-i',
    highlight: ['i'],
    highlightWords: ['pig', 'big', 'fit']
  },
  {
    id: 'sent-fish-dish',
    text: 'Fish and chips are on the dish.',
    translation: '鱼和薯条在盘子里。',
    targetPhoneme: 'short-i',
    highlight: ['i'],
    highlightWords: ['Fish', 'chips', 'dish']
  },

  // ==================== 双元音 /eɪ/ ====================
  {
    id: 'sent-rain-way',
    text: 'The rain is on the way.',
    translation: '雨在路上。',
    targetPhoneme: 'diph-ei',
    highlight: ['ai', 'ay'],
    highlightWords: ['rain', 'way']
  },
  {
    id: 'sent-play-game',
    text: 'Play a game with the tape.',
    translation: '用带子玩个游戏。',
    targetPhoneme: 'diph-ei',
    highlight: ['ay', 'a_e'],
    highlightWords: ['Play', 'game', 'tape']
  },

  // ==================== 辅音组合 sh ====================
  {
    id: 'sent-she-shells',
    text: 'She sells shells by the shore.',
    translation: '她在海边卖贝壳。',
    targetPhoneme: 'cons-sh',
    highlight: ['sh'],
    highlightWords: ['She', 'shells', 'shore']
  },
  {
    id: 'sent-ship-shop',
    text: 'The ship is in the shop.',
    translation: '船在商店里。',
    targetPhoneme: 'cons-sh',
    highlight: ['sh'],
    highlightWords: ['ship', 'shop']
  },

  // ==================== 辅音组合 th ====================
  {
    id: 'sent-this-mother',
    text: 'This is my mother.',
    translation: '这是我妈妈。',
    targetPhoneme: 'cons-dh',
    highlight: ['th'],
    highlightWords: ['This', 'mother'],
    note: 'th 发浊音 /ð/'
  },
  {
    id: 'sent-three-things',
    text: 'Three thin things.',
    translation: '三样薄东西。',
    targetPhoneme: 'cons-th',
    highlight: ['th'],
    highlightWords: ['Three', 'thin', 'things'],
    note: 'th 发清音 /θ/'
  },

  // ==================== Magic e ====================
  {
    id: 'sent-cake-plate',
    text: 'The cake is on the plate.',
    translation: '蛋糕在盘子里。',
    targetPhoneme: 'diph-ei',
    highlight: ['a_e'],
    highlightWords: ['cake', 'plate'],
    note: '词尾 e 不发音，a 发 /eɪ/'
  },
  {
    id: 'sent-bike-white',
    text: 'My bike is white.',
    translation: '我的自行车是白色的。',
    targetPhoneme: 'diph-ai',
    highlight: ['i_e'],
    highlightWords: ['bike', 'white'],
    note: '词尾 e 不发音，i 发 /aɪ/'
  }
];

export default sentences;
