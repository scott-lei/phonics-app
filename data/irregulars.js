// data/irregulars.js
// 不规则发音规则库
//
// 字段说明：
//   id           唯一标识（irregular-xxx）
//   pattern      模式（中文）
//   description  规则说明（中文）
//   examples     例词数组，每项 { word, ipa, zh, note }

export const irregulars = [
  {
    id: 'irregular-c',
    pattern: 'c 在 e / i / y 前',
    description: '发 /s/，否则发 /k/',
    examples: [
      { word: 'city', ipa: '/ˈsɪti/', zh: '城市', note: 'c + i → /s/' },
      { word: 'cent', ipa: '/sent/', zh: '分（货币）', note: 'c + e → /s/' },
      { word: 'cycle', ipa: '/ˈsaɪkl/', zh: '循环', note: 'c + y → /s/' },
      { word: 'cat', ipa: '/kæt/', zh: '猫', note: 'c + a → /k/' },
      { word: 'cup', ipa: '/kʌp/', zh: '杯子', note: 'c + u → /k/' },
      { word: 'cold', ipa: '/kəʊld/', zh: '冷的', note: 'c + o → /k/' }
    ]
  },
  {
    id: 'irregular-g',
    pattern: 'g 在 e / i / y 前',
    description: '常发 /dʒ/，但有特例',
    examples: [
      { word: 'giant', ipa: '/ˈdʒaɪənt/', zh: '巨人', note: 'g + i → /dʒ/' },
      { word: 'gym', ipa: '/dʒɪm/', zh: '体育馆', note: 'g + y → /dʒ/' },
      { word: 'age', ipa: '/eɪdʒ/', zh: '年龄', note: 'g + e → /dʒ/' },
      { word: 'give', ipa: '/ɡɪv/', zh: '给', note: '特例：仍发 /ɡ/' },
      { word: 'girl', ipa: '/ɡɜːl/', zh: '女孩', note: '特例：仍发 /ɡ/' },
      { word: 'get', ipa: '/ɡet/', zh: '得到', note: '特例：仍发 /ɡ/' }
    ]
  },
  {
    id: 'irregular-y',
    pattern: 'y 的多重发音',
    description: '词首 /j/，词尾单音节 /aɪ/，词尾多音节 /i/',
    examples: [
      { word: 'yes', ipa: '/jes/', zh: '是的', note: '词首 → /j/' },
      { word: 'my', ipa: '/maɪ/', zh: '我的', note: '词尾（单音节）→ /aɪ/' },
      { word: 'fly', ipa: '/flaɪ/', zh: '飞', note: '词尾（单音节）→ /aɪ/' },
      { word: 'happy', ipa: '/ˈhæpi/', zh: '快乐的', note: '词尾（多音节）→ /i/' },
      { word: 'baby', ipa: '/ˈbeɪbi/', zh: '婴儿', note: '词尾（多音节）→ /i/' }
    ]
  },
  {
    id: 'irregular-x',
    pattern: 'x 的多重发音',
    description: '通常发 /ks/，有时发 /ɡz/ 或 /z/',
    examples: [
      { word: 'box', ipa: '/bɒks/', zh: '盒子', note: '通常 → /ks/' },
      { word: 'six', ipa: '/sɪks/', zh: '六', note: '通常 → /ks/' },
      { word: 'exam', ipa: '/ɪɡˈzæm/', zh: '考试', note: '有时 → /ɡz/' },
      { word: 'exact', ipa: '/ɪɡˈzækt/', zh: '精确的', note: '有时 → /ɡz/' },
      { word: 'xylophone', ipa: '/ˈzaɪləfəʊn/', zh: '木琴', note: '有时 → /z/' }
    ]
  },
  {
    id: 'irregular-o',
    pattern: 'o 的特殊发音',
    description: '在 m / n / v 前常发 /ʌ/',
    examples: [
      { word: 'love', ipa: '/lʌv/', zh: '爱', note: 'o 在 v 前 → /ʌ/' },
      { word: 'come', ipa: '/kʌm/', zh: '来', note: 'o 在 m 前 → /ʌ/' },
      { word: 'son', ipa: '/sʌn/', zh: '儿子', note: 'o 在 n 前 → /ʌ/' },
      { word: 'money', ipa: '/ˈmʌni/', zh: '钱', note: 'o 在 n 前 → /ʌ/' }
    ]
  },
  {
    id: 'irregular-kn',
    pattern: '不发音字母 kn',
    description: '词首 k 不发音',
    examples: [
      { word: 'know', ipa: '/nəʊ/', zh: '知道', note: 'k 不发音' },
      { word: 'knee', ipa: '/niː/', zh: '膝盖', note: 'k 不发音' },
      { word: 'knife', ipa: '/naɪf/', zh: '刀', note: 'k 不发音' },
      { word: 'knock', ipa: '/nɒk/', zh: '敲', note: 'k 不发音' }
    ]
  },
  {
    id: 'irregular-wr',
    pattern: '不发音字母 wr',
    description: '词首 w 不发音',
    examples: [
      { word: 'write', ipa: '/raɪt/', zh: '写', note: 'w 不发音' },
      { word: 'wrong', ipa: '/rɒŋ/', zh: '错误的', note: 'w 不发音' },
      { word: 'wrist', ipa: '/rɪst/', zh: '手腕', note: 'w 不发音' },
      { word: 'wrap', ipa: '/ræp/', zh: '包裹', note: 'w 不发音' }
    ]
  },
  {
    id: 'irregular-mb',
    pattern: '不发音字母 mb',
    description: '词尾 b 不发音',
    examples: [
      { word: 'lamb', ipa: '/læm/', zh: '羔羊', note: 'b 不发音' },
      { word: 'climb', ipa: '/klaɪm/', zh: '爬', note: 'b 不发音' },
      { word: 'comb', ipa: '/kəʊm/', zh: '梳子', note: 'b 不发音' },
      { word: 'thumb', ipa: '/θʌm/', zh: '拇指', note: 'b 不发音' }
    ]
  },
  {
    id: 'irregular-gh',
    pattern: '不发音字母 gh',
    description: 'gh 不发音或发 /f/',
    examples: [
      { word: 'night', ipa: '/naɪt/', zh: '夜晚', note: 'gh 不发音' },
      { word: 'high', ipa: '/haɪ/', zh: '高的', note: 'gh 不发音' },
      { word: 'through', ipa: '/θruː/', zh: '穿过', note: 'gh 不发音' },
      { word: 'laugh', ipa: '/lɑːf/', zh: '笑', note: 'gh 发 /f/' },
      { word: 'enough', ipa: '/ɪˈnʌf/', zh: '足够的', note: 'gh 发 /f/' }
    ]
  },
  {
    id: 'irregular-silent-e',
    pattern: '不发音字母 e',
    description: '词尾 e 不发音，使前面元音发长音',
    examples: [
      { word: 'cake', ipa: '/keɪk/', zh: '蛋糕', note: '词尾 e 不发音，a 发 /eɪ/' },
      { word: 'bike', ipa: '/baɪk/', zh: '自行车', note: '词尾 e 不发音，i 发 /aɪ/' },
      { word: 'nose', ipa: '/nəʊz/', zh: '鼻子', note: '词尾 e 不发音，o 发 /əʊ/' },
      { word: 'cute', ipa: '/kjuːt/', zh: '可爱的', note: '词尾 e 不发音，u 发 /juː/' }
    ]
  },
  {
    id: 'irregular-tion',
    pattern: '-tion 结尾',
    description: '发 /ʃən/',
    examples: [
      { word: 'nation', ipa: '/ˈneɪʃn/', zh: '国家', note: '-tion → /ʃən/' },
      { word: 'station', ipa: '/ˈsteɪʃn/', zh: '车站', note: '-tion → /ʃən/' },
      { word: 'action', ipa: '/ˈækʃn/', zh: '行动', note: '-tion → /ʃən/' }
    ]
  },
  {
    id: 'irregular-sion',
    pattern: '-sion 结尾',
    description: '发 /ʒən/ 或 /ʃən/',
    examples: [
      { word: 'vision', ipa: '/ˈvɪʒn/', zh: '视觉', note: '-sion → /ʒən/' },
      { word: 'decision', ipa: '/dɪˈsɪʒn/', zh: '决定', note: '-sion → /ʒən/' },
      { word: 'mission', ipa: '/ˈmɪʃn/', zh: '任务', note: '-sion → /ʃən/' }
    ]
  },
  {
    id: 'irregular-ough',
    pattern: '-ough 多种发音',
    description: '多种读法，需单独记忆',
    examples: [
      { word: 'though', ipa: '/ðəʊ/', zh: '虽然', note: '发 /əʊ/' },
      { word: 'through', ipa: '/θruː/', zh: '穿过', note: '发 /uː/' },
      { word: 'cough', ipa: '/kɒf/', zh: '咳嗽', note: '发 /ɒf/' },
      { word: 'tough', ipa: '/tʌf/', zh: '艰难的', note: '发 /ʌf/' },
      { word: 'thought', ipa: '/θɔːt/', zh: '想法', note: '发 /ɔːt/' }
    ]
  },
  {
    id: 'irregular-double',
    pattern: '双写辅音',
    description: '只发一次音',
    examples: [
      { word: 'letter', ipa: '/ˈletə/', zh: '信', note: 'tt 只发一次 /t/' },
      { word: 'summer', ipa: '/ˈsʌmə/', zh: '夏天', note: 'mm 只发一次 /m/' },
      { word: 'happy', ipa: '/ˈhæpi/', zh: '快乐的', note: 'pp 只发一次 /p/' },
      { word: 'rabbit', ipa: '/ˈræbɪt/', zh: '兔子', note: 'bb 只发一次 /b/' }
    ]
  }
];

export default irregulars;
