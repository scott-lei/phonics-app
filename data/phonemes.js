// data/phonemes.js
// 音素库：短元音 / 长元音 / 双元音 / 清辅音 / 浊辅音
//
// 共 48 个音素（国内英语教学的「48 个国际音标」口径）：
//   元音 20 个 = 单元音 12（短元音 7 + 长元音 5）+ 双元音 8
//   辅音 28 个 = 清辅音 11 + 浊辅音 17
//   其中 /tr/ /dr/ /ts/ /dz/ 按国内教材口径计为独立音素（破擦音 / 辅音连缀）
//
// 字段说明：
//   id          唯一标识（英文小写 + 连字符）
//   ipa         IPA 符号，如 '/æ/'
//   type        'vowel' | 'diphthong' | 'consonant'
//   category    分组：'short-vowel' | 'long-vowel' | 'diphthong'
//                       | 'voiceless-consonant' | 'voiced-consonant'
//   voiced      仅辅音有该字段：true = 浊音（声带振动），false = 清音
//   letters     该音素常见的字母 / 字母组合拼写（自然拼读的「字母→音」对应），按常见度排序
//   exampleWords 例词数组，每项 { word, ipa, zh }
//   mouthTip    中文口型 / 发音提示

export const phonemes = [
  // ==================== 短元音 Short Vowels ====================
  {
    id: 'short-a',
    letters: ['a'],
    ipa: '/æ/',
    type: 'vowel',
    category: 'short-vowel',
    exampleWords: [
      { word: 'cat', ipa: '/kæt/', zh: '猫' },
      { word: 'map', ipa: '/mæp/', zh: '地图' },
      { word: 'bag', ipa: '/bæɡ/', zh: '包' },
      { word: 'hand', ipa: '/hænd/', zh: '手' },
      { word: 'black', ipa: '/blæk/', zh: '黑色的' }
    ],
    mouthTip: '嘴巴张大，舌尖抵下齿'
  },
  {
    id: 'short-e',
    letters: ['e', 'ea'],
    ipa: '/e/',
    type: 'vowel',
    category: 'short-vowel',
    exampleWords: [
      { word: 'bed', ipa: '/bed/', zh: '床' },
      { word: 'pen', ipa: '/pen/', zh: '钢笔' },
      { word: 'red', ipa: '/red/', zh: '红色的' },
      { word: 'egg', ipa: '/eɡ/', zh: '蛋' },
      { word: 'ten', ipa: '/ten/', zh: '十' }
    ],
    mouthTip: '嘴微张，舌位比 /æ/ 高'
  },
  {
    id: 'short-i',
    letters: ['i', 'y', 'ui'],
    ipa: '/ɪ/',
    type: 'vowel',
    category: 'short-vowel',
    exampleWords: [
      { word: 'sit', ipa: '/sɪt/', zh: '坐' },
      { word: 'pig', ipa: '/pɪɡ/', zh: '猪' },
      { word: 'big', ipa: '/bɪɡ/', zh: '大的' },
      { word: 'fish', ipa: '/fɪʃ/', zh: '鱼' },
      { word: 'milk', ipa: '/mɪlk/', zh: '牛奶' }
    ],
    mouthTip: '嘴扁平，舌前部抬起'
  },
  {
    id: 'short-o',
    letters: ['o', 'a'],
    ipa: '/ɒ/',
    type: 'vowel',
    category: 'short-vowel',
    exampleWords: [
      { word: 'hot', ipa: '/hɒt/', zh: '热的' },
      { word: 'dog', ipa: '/dɒɡ/', zh: '狗' },
      { word: 'box', ipa: '/bɒks/', zh: '盒子' },
      { word: 'clock', ipa: '/klɒk/', zh: '钟' },
      { word: 'stop', ipa: '/stɒp/', zh: '停止' }
    ],
    mouthTip: '嘴张大成圆形'
  },
  {
    id: 'short-u',
    letters: ['u', 'o', 'ou'],
    ipa: '/ʌ/',
    type: 'vowel',
    category: 'short-vowel',
    exampleWords: [
      { word: 'cup', ipa: '/kʌp/', zh: '杯子' },
      { word: 'bus', ipa: '/bʌs/', zh: '公共汽车' },
      { word: 'sun', ipa: '/sʌn/', zh: '太阳' },
      { word: 'mum', ipa: '/mʌm/', zh: '妈妈' },
      { word: 'love', ipa: '/lʌv/', zh: '爱' }
    ],
    mouthTip: '嘴半开，舌位中央'
  },
  {
    id: 'short-oo',
    letters: ['oo', 'u', 'o'],
    ipa: '/ʊ/',
    type: 'vowel',
    category: 'short-vowel',
    exampleWords: [
      { word: 'book', ipa: '/bʊk/', zh: '书' },
      { word: 'look', ipa: '/lʊk/', zh: '看' },
      { word: 'good', ipa: '/ɡʊd/', zh: '好的' },
      { word: 'foot', ipa: '/fʊt/', zh: '脚' },
      { word: 'put', ipa: '/pʊt/', zh: '放' }
    ],
    mouthTip: '嘴唇微圆，舌后部抬起'
  },
  {
    id: 'short-schwa',
    letters: ['a', 'e', 'o', 'er', 'or'],
    ipa: '/ə/',
    type: 'vowel',
    category: 'short-vowel',
    exampleWords: [
      { word: 'about', ipa: '/əˈbaʊt/', zh: '关于' },
      { word: 'banana', ipa: '/bəˈnɑːnə/', zh: '香蕉' },
      { word: 'teacher', ipa: '/ˈtiːtʃə/', zh: '老师' },
      { word: 'sofa', ipa: '/ˈsəʊfə/', zh: '沙发' },
      { word: 'ago', ipa: '/əˈɡəʊ/', zh: '以前' }
    ],
    mouthTip: '英语里最放松的元音，嘴唇自然半开、不圆唇，几乎都出现在非重读音节'
  },

  // ==================== 长元音 Long Vowels ====================
  {
    id: 'long-ee',
    letters: ['ee', 'ea', 'e', 'ie', 'ey'],
    ipa: '/iː/',
    type: 'vowel',
    category: 'long-vowel',
    exampleWords: [
      { word: 'see', ipa: '/siː/', zh: '看见' },
      { word: 'tree', ipa: '/triː/', zh: '树' },
      { word: 'eat', ipa: '/iːt/', zh: '吃' },
      { word: 'green', ipa: '/ɡriːn/', zh: '绿色的' },
      { word: 'key', ipa: '/kiː/', zh: '钥匙' }
    ],
    mouthTip: '嘴角向两边拉开，像微笑'
  },
  {
    id: 'long-ar',
    letters: ['ar', 'a', 'al'],
    ipa: '/ɑː/',
    type: 'vowel',
    category: 'long-vowel',
    exampleWords: [
      { word: 'car', ipa: '/kɑː/', zh: '汽车' },
      { word: 'park', ipa: '/pɑːk/', zh: '公园' },
      { word: 'far', ipa: '/fɑː/', zh: '远的' },
      { word: 'star', ipa: '/stɑː/', zh: '星星' },
      { word: 'father', ipa: '/ˈfɑːðə/', zh: '父亲' }
    ],
    mouthTip: '嘴张大，舌位靠后'
  },
  {
    id: 'long-or',
    letters: ['or', 'oor', 'aw', 'au', 'al'],
    ipa: '/ɔː/',
    type: 'vowel',
    category: 'long-vowel',
    exampleWords: [
      { word: 'fork', ipa: '/fɔːk/', zh: '叉子' },
      { word: 'horse', ipa: '/hɔːs/', zh: '马' },
      { word: 'door', ipa: '/dɔː/', zh: '门' },
      { word: 'four', ipa: '/fɔː/', zh: '四' },
      { word: 'talk', ipa: '/tɔːk/', zh: '说话' }
    ],
    mouthTip: '嘴唇收圆前突'
  },
  {
    id: 'long-oo',
    letters: ['oo', 'u', 'ue', 'o', 'ui'],
    ipa: '/uː/',
    type: 'vowel',
    category: 'long-vowel',
    exampleWords: [
      { word: 'moon', ipa: '/muːn/', zh: '月亮' },
      { word: 'food', ipa: '/fuːd/', zh: '食物' },
      { word: 'blue', ipa: '/bluː/', zh: '蓝色的' },
      { word: 'school', ipa: '/skuːl/', zh: '学校' },
      { word: 'rule', ipa: '/ruːl/', zh: '规则' }
    ],
    mouthTip: '嘴唇收圆前突，比 /ʊ/ 更紧'
  },
  {
    id: 'long-er',
    letters: ['er', 'ir', 'ur', 'or', 'ear'],
    ipa: '/ɜː/',
    type: 'vowel',
    category: 'long-vowel',
    exampleWords: [
      { word: 'bird', ipa: '/bɜːd/', zh: '鸟' },
      { word: 'girl', ipa: '/ɡɜːl/', zh: '女孩' },
      { word: 'turn', ipa: '/tɜːn/', zh: '转弯' },
      { word: 'nurse', ipa: '/nɜːs/', zh: '护士' },
      { word: 'learn', ipa: '/lɜːn/', zh: '学习' }
    ],
    mouthTip: '嘴半开，舌位中央，不圆唇'
  },

  // ==================== 双元音 Diphthongs ====================
  {
    id: 'diph-ei',
    letters: ['a_e', 'ai', 'ay', 'ey', 'ea'],
    ipa: '/eɪ/',
    type: 'diphthong',
    category: 'diphthong',
    exampleWords: [
      { word: 'rain', ipa: '/reɪn/', zh: '雨' },
      { word: 'day', ipa: '/deɪ/', zh: '天；日' },
      { word: 'cake', ipa: '/keɪk/', zh: '蛋糕' },
      { word: 'name', ipa: '/neɪm/', zh: '名字' },
      { word: 'play', ipa: '/pleɪ/', zh: '玩' }
    ],
    mouthTip: '从 /e/ 滑向 /ɪ/，口型由半开到扁平'
  },
  {
    id: 'diph-ai',
    letters: ['i_e', 'igh', 'y', 'ie'],
    ipa: '/aɪ/',
    type: 'diphthong',
    category: 'diphthong',
    exampleWords: [
      { word: 'bike', ipa: '/baɪk/', zh: '自行车' },
      { word: 'my', ipa: '/maɪ/', zh: '我的' },
      { word: 'high', ipa: '/haɪ/', zh: '高的' },
      { word: 'time', ipa: '/taɪm/', zh: '时间' },
      { word: 'night', ipa: '/naɪt/', zh: '夜晚' }
    ],
    mouthTip: '从 /a/ 滑向 /ɪ/，口型由大到扁'
  },
  {
    id: 'diph-oi',
    letters: ['oi', 'oy'],
    ipa: '/ɔɪ/',
    type: 'diphthong',
    category: 'diphthong',
    exampleWords: [
      { word: 'coin', ipa: '/kɔɪn/', zh: '硬币' },
      { word: 'boy', ipa: '/bɔɪ/', zh: '男孩' },
      { word: 'join', ipa: '/dʒɔɪn/', zh: '加入' },
      { word: 'toy', ipa: '/tɔɪ/', zh: '玩具' },
      { word: 'voice', ipa: '/vɔɪs/', zh: '声音' }
    ],
    mouthTip: '从 /ɔ/ 滑向 /ɪ/，嘴唇由圆变扁'
  },
  {
    id: 'diph-ou',
    letters: ['o_e', 'oa', 'ow', 'o', 'oe'],
    ipa: '/əʊ/',
    type: 'diphthong',
    category: 'diphthong',
    exampleWords: [
      { word: 'nose', ipa: '/nəʊz/', zh: '鼻子' },
      { word: 'home', ipa: '/həʊm/', zh: '家' },
      { word: 'boat', ipa: '/bəʊt/', zh: '船' },
      { word: 'snow', ipa: '/snəʊ/', zh: '雪' },
      { word: 'go', ipa: '/ɡəʊ/', zh: '去' }
    ],
    mouthTip: '从 /ə/ 滑向 /ʊ/，口型由中到圆'
  },
  {
    id: 'diph-au',
    letters: ['ou', 'ow'],
    ipa: '/aʊ/',
    type: 'diphthong',
    category: 'diphthong',
    exampleWords: [
      { word: 'house', ipa: '/haʊs/', zh: '房子' },
      { word: 'cow', ipa: '/kaʊ/', zh: '奶牛' },
      { word: 'now', ipa: '/naʊ/', zh: '现在' },
      { word: 'out', ipa: '/aʊt/', zh: '外面' },
      { word: 'flower', ipa: '/ˈflaʊə/', zh: '花' }
    ],
    mouthTip: '从 /a/ 滑向 /ʊ/，口型由大收圆'
  },
  {
    id: 'diph-ia',
    letters: ['ear', 'eer', 'ere'],
    ipa: '/ɪə/',
    type: 'diphthong',
    category: 'diphthong',
    exampleWords: [
      { word: 'hear', ipa: '/hɪə/', zh: '听见' },
      { word: 'near', ipa: '/nɪə/', zh: '近的' },
      { word: 'deer', ipa: '/dɪə/', zh: '鹿' },
      { word: 'cheer', ipa: '/tʃɪə/', zh: '欢呼' },
      { word: 'ear', ipa: '/ɪə/', zh: '耳朵' }
    ],
    mouthTip: '从 /ɪ/ 滑向 /ə/，口型由扁到中'
  },
  {
    id: 'diph-ea',
    letters: ['air', 'are', 'ear', 'ere'],
    ipa: '/eə/',
    type: 'diphthong',
    category: 'diphthong',
    exampleWords: [
      { word: 'hair', ipa: '/heə/', zh: '头发' },
      { word: 'chair', ipa: '/tʃeə/', zh: '椅子' },
      { word: 'bear', ipa: '/beə/', zh: '熊' },
      { word: 'where', ipa: '/weə/', zh: '哪里' },
      { word: 'air', ipa: '/eə/', zh: '空气' }
    ],
    mouthTip: '从 /e/ 滑向 /ə/，口型由半开到中'
  },
  {
    id: 'diph-ua',
    letters: ['oor', 'our', 'ure'],
    ipa: '/ʊə/',
    type: 'diphthong',
    category: 'diphthong',
    exampleWords: [
      { word: 'poor', ipa: '/pʊə/', zh: '贫穷的' },
      { word: 'tour', ipa: '/tʊə/', zh: '旅行' },
      { word: 'sure', ipa: '/ʃʊə/', zh: '确定的' },
      { word: 'cure', ipa: '/kjʊə/', zh: '治愈' }
    ],
    mouthTip: '从 /ʊ/ 滑向 /ə/，口型由圆到中'
  },

  // ==================== 清辅音 Voiceless Consonants ====================
  {
    id: 'cons-p',
    letters: ['p', 'pp'],
    ipa: '/p/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'pen', ipa: '/pen/', zh: '钢笔' },
      { word: 'cup', ipa: '/kʌp/', zh: '杯子' },
      { word: 'map', ipa: '/mæp/', zh: '地图' },
      { word: 'happy', ipa: '/ˈhæpi/', zh: '快乐的' }
    ],
    mouthTip: '双唇紧闭后突然放开'
  },
  {
    id: 'cons-t',
    letters: ['t', 'tt', 'ed'],
    ipa: '/t/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'top', ipa: '/tɒp/', zh: '顶部' },
      { word: 'cat', ipa: '/kæt/', zh: '猫' },
      { word: 'sit', ipa: '/sɪt/', zh: '坐' },
      { word: 'water', ipa: '/ˈwɔːtə/', zh: '水' }
    ],
    mouthTip: '舌尖抵上齿龈后放开'
  },
  {
    id: 'cons-k',
    letters: ['k', 'c', 'ck', 'ch'],
    ipa: '/k/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'cat', ipa: '/kæt/', zh: '猫' },
      { word: 'cup', ipa: '/kʌp/', zh: '杯子' },
      { word: 'book', ipa: '/bʊk/', zh: '书' },
      { word: 'school', ipa: '/skuːl/', zh: '学校' }
    ],
    mouthTip: '舌后部抵软腭后放开'
  },
  {
    id: 'cons-f',
    letters: ['f', 'ff', 'ph', 'gh'],
    ipa: '/f/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'fish', ipa: '/fɪʃ/', zh: '鱼' },
      { word: 'fan', ipa: '/fæn/', zh: '扇子' },
      { word: 'phone', ipa: '/fəʊn/', zh: '电话' },
      { word: 'laugh', ipa: '/lɑːf/', zh: '笑' }
    ],
    mouthTip: '上齿轻触下唇，气流挤出'
  },
  {
    id: 'cons-s',
    letters: ['s', 'ss', 'c', 'ce'],
    ipa: '/s/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'sun', ipa: '/sʌn/', zh: '太阳' },
      { word: 'bus', ipa: '/bʌs/', zh: '公共汽车' },
      { word: 'city', ipa: '/ˈsɪti/', zh: '城市' },
      { word: 'class', ipa: '/klɑːs/', zh: '班级' }
    ],
    mouthTip: '舌尖靠近上齿龈，气流挤出'
  },
  {
    id: 'cons-sh',
    letters: ['sh', 'ti', 'ci', 's'],
    ipa: '/ʃ/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'ship', ipa: '/ʃɪp/', zh: '船' },
      { word: 'fish', ipa: '/fɪʃ/', zh: '鱼' },
      { word: 'sure', ipa: '/ʃʊə/', zh: '确定的' },
      { word: 'nation', ipa: '/ˈneɪʃn/', zh: '国家' }
    ],
    mouthTip: '舌面靠近硬腭，气流挤出'
  },
  {
    id: 'cons-ch',
    letters: ['ch', 'tch', 't'],
    ipa: '/tʃ/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'chair', ipa: '/tʃeə/', zh: '椅子' },
      { word: 'much', ipa: '/mʌtʃ/', zh: '许多' },
      { word: 'watch', ipa: '/wɒtʃ/', zh: '手表' },
      { word: 'nature', ipa: '/ˈneɪtʃə/', zh: '自然' }
    ],
    mouthTip: '/t/ 和 /ʃ/ 快速连发'
  },
  {
    id: 'cons-th',
    letters: ['th'],
    ipa: '/θ/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'think', ipa: '/θɪŋk/', zh: '想' },
      { word: 'three', ipa: '/θriː/', zh: '三' },
      { word: 'mouth', ipa: '/maʊθ/', zh: '嘴' },
      { word: 'bath', ipa: '/bɑːθ/', zh: '洗澡' }
    ],
    mouthTip: '舌尖轻触上齿，气流挤出'
  },
  {
    id: 'cons-h',
    letters: ['h', 'wh'],
    ipa: '/h/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'hat', ipa: '/hæt/', zh: '帽子' },
      { word: 'hot', ipa: '/hɒt/', zh: '热的' },
      { word: 'who', ipa: '/huː/', zh: '谁' },
      { word: 'ahead', ipa: '/əˈhed/', zh: '在前面' }
    ],
    mouthTip: '气流从喉部自由流出'
  },
  {
    id: 'cons-tr',
    letters: ['tr'],
    ipa: '/tr/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'tree', ipa: '/triː/', zh: '树' },
      { word: 'train', ipa: '/treɪn/', zh: '火车' },
      { word: 'try', ipa: '/traɪ/', zh: '尝试' },
      { word: 'street', ipa: '/striːt/', zh: '街道' }
    ],
    mouthTip: '舌尖抵上齿龈后放开并立刻卷向 /r/，两个音快速连发（破擦音）'
  },
  {
    id: 'cons-ts',
    letters: ['ts', 'tes'],
    ipa: '/ts/',
    type: 'consonant',
    category: 'voiceless-consonant',
    voiced: false,
    exampleWords: [
      { word: 'cats', ipa: '/kæts/', zh: '猫（复数）' },
      { word: 'seats', ipa: '/siːts/', zh: '座位（复数）' },
      { word: 'gets', ipa: '/ɡets/', zh: '得到（三单）' },
      { word: 'sports', ipa: '/spɔːts/', zh: '运动' }
    ],
    mouthTip: '/t/ 与 /s/ 快速连发，舌尖先抵齿龈再送气，声带不振动'
  },

  // ==================== 浊辅音 Voiced Consonants ====================
  {
    id: 'cons-b',
    letters: ['b', 'bb'],
    ipa: '/b/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'bed', ipa: '/bed/', zh: '床' },
      { word: 'big', ipa: '/bɪɡ/', zh: '大的' },
      { word: 'baby', ipa: '/ˈbeɪbi/', zh: '婴儿' },
      { word: 'club', ipa: '/klʌb/', zh: '俱乐部' }
    ],
    mouthTip: '双唇紧闭后放开，声带振动'
  },
  {
    id: 'cons-d',
    letters: ['d', 'dd', 'ed'],
    ipa: '/d/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'dog', ipa: '/dɒɡ/', zh: '狗' },
      { word: 'red', ipa: '/red/', zh: '红色的' },
      { word: 'dad', ipa: '/dæd/', zh: '爸爸' },
      { word: 'ladder', ipa: '/ˈlædə/', zh: '梯子' }
    ],
    mouthTip: '舌尖抵上齿龈后放开，声带振动'
  },
  {
    id: 'cons-g',
    letters: ['g', 'gg', 'gh'],
    ipa: '/ɡ/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'go', ipa: '/ɡəʊ/', zh: '去' },
      { word: 'bag', ipa: '/bæɡ/', zh: '包' },
      { word: 'big', ipa: '/bɪɡ/', zh: '大的' },
      { word: 'ghost', ipa: '/ɡəʊst/', zh: '鬼' }
    ],
    mouthTip: '舌后部抵软腭后放开，声带振动'
  },
  {
    id: 'cons-v',
    letters: ['v', 've'],
    ipa: '/v/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'van', ipa: '/væn/', zh: '货车' },
      { word: 'love', ipa: '/lʌv/', zh: '爱' },
      { word: 'seven', ipa: '/ˈsevn/', zh: '七' },
      { word: 'give', ipa: '/ɡɪv/', zh: '给' }
    ],
    mouthTip: '上齿轻触下唇，声带振动'
  },
  {
    id: 'cons-z',
    letters: ['z', 's', 'zz', 'se'],
    ipa: '/z/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'zoo', ipa: '/zuː/', zh: '动物园' },
      { word: 'zip', ipa: '/zɪp/', zh: '拉链' },
      { word: 'is', ipa: '/ɪz/', zh: '是' },
      { word: 'nose', ipa: '/nəʊz/', zh: '鼻子' }
    ],
    mouthTip: '舌尖靠近上齿龈，声带振动'
  },
  {
    id: 'cons-zh',
    letters: ['si', 'su', 'ge'],
    ipa: '/ʒ/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'measure', ipa: '/ˈmeʒə/', zh: '测量' },
      { word: 'vision', ipa: '/ˈvɪʒn/', zh: '视觉' },
      { word: 'pleasure', ipa: '/ˈpleʒə/', zh: '愉快' }
    ],
    mouthTip: '舌面靠近硬腭，声带振动'
  },
  {
    id: 'cons-j',
    letters: ['j', 'g', 'dge', 'ge'],
    ipa: '/dʒ/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'jam', ipa: '/dʒæm/', zh: '果酱' },
      { word: 'jump', ipa: '/dʒʌmp/', zh: '跳' },
      { word: 'bridge', ipa: '/brɪdʒ/', zh: '桥' },
      { word: 'age', ipa: '/eɪdʒ/', zh: '年龄' }
    ],
    mouthTip: '/d/ 和 /ʒ/ 快速连发'
  },
  {
    id: 'cons-dh',
    letters: ['th'],
    ipa: '/ð/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'this', ipa: '/ðɪs/', zh: '这个' },
      { word: 'mother', ipa: '/ˈmʌðə/', zh: '母亲' },
      { word: 'they', ipa: '/ðeɪ/', zh: '他们' },
      { word: 'breathe', ipa: '/briːð/', zh: '呼吸' }
    ],
    mouthTip: '舌尖轻触上齿，声带振动'
  },
  {
    id: 'cons-m',
    letters: ['m', 'mm', 'mb'],
    ipa: '/m/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'man', ipa: '/mæn/', zh: '男人' },
      { word: 'mum', ipa: '/mʌm/', zh: '妈妈' },
      { word: 'summer', ipa: '/ˈsʌmə/', zh: '夏天' },
      { word: 'come', ipa: '/kʌm/', zh: '来' }
    ],
    mouthTip: '双唇闭合，气流从鼻腔出'
  },
  {
    id: 'cons-n',
    letters: ['n', 'nn', 'kn', 'gn'],
    ipa: '/n/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'net', ipa: '/net/', zh: '网' },
      { word: 'sun', ipa: '/sʌn/', zh: '太阳' },
      { word: 'nine', ipa: '/naɪn/', zh: '九' },
      { word: 'dinner', ipa: '/ˈdɪnə/', zh: '晚餐' }
    ],
    mouthTip: '舌尖抵上齿龈，气流从鼻腔出'
  },
  {
    id: 'cons-ng',
    letters: ['ng', 'n'],
    ipa: '/ŋ/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'sing', ipa: '/sɪŋ/', zh: '唱歌' },
      { word: 'long', ipa: '/lɒŋ/', zh: '长的' },
      { word: 'bank', ipa: '/bæŋk/', zh: '银行' },
      { word: 'going', ipa: '/ˈɡəʊɪŋ/', zh: '去' }
    ],
    mouthTip: '舌后部抵软腭，气流从鼻腔出'
  },
  {
    id: 'cons-l',
    letters: ['l', 'll'],
    ipa: '/l/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'leg', ipa: '/leɡ/', zh: '腿' },
      { word: 'bell', ipa: '/bel/', zh: '铃' },
      { word: 'light', ipa: '/laɪt/', zh: '光' },
      { word: 'yellow', ipa: '/ˈjeləʊ/', zh: '黄色的' }
    ],
    mouthTip: '舌尖抵上齿龈，气流从舌两侧出'
  },
  {
    id: 'cons-r',
    letters: ['r', 'rr', 'wr'],
    ipa: '/r/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'red', ipa: '/red/', zh: '红色的' },
      { word: 'run', ipa: '/rʌn/', zh: '跑' },
      { word: 'carry', ipa: '/ˈkæri/', zh: '携带' },
      { word: 'brown', ipa: '/braʊn/', zh: '棕色的' }
    ],
    mouthTip: '舌尖卷起不触上腭'
  },
  {
    id: 'cons-w',
    letters: ['w', 'wh'],
    ipa: '/w/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'wet', ipa: '/wet/', zh: '湿的' },
      { word: 'win', ipa: '/wɪn/', zh: '赢' },
      { word: 'queen', ipa: '/kwiːn/', zh: '女王' },
      { word: 'one', ipa: '/wʌn/', zh: '一' }
    ],
    mouthTip: '双唇收圆前突'
  },
  {
    id: 'cons-y',
    letters: ['y', 'u', 'i'],
    ipa: '/j/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'yes', ipa: '/jes/', zh: '是的' },
      { word: 'yellow', ipa: '/ˈjeləʊ/', zh: '黄色的' },
      { word: 'music', ipa: '/ˈmjuːzɪk/', zh: '音乐' },
      { word: 'use', ipa: '/juːz/', zh: '使用' }
    ],
    mouthTip: '舌面靠近硬腭'
  },
  {
    id: 'cons-dr',
    letters: ['dr'],
    ipa: '/dr/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'dream', ipa: '/driːm/', zh: '梦' },
      { word: 'dress', ipa: '/dres/', zh: '连衣裙' },
      { word: 'drive', ipa: '/draɪv/', zh: '驾驶' },
      { word: 'children', ipa: '/ˈtʃɪldrən/', zh: '孩子们' }
    ],
    mouthTip: '/d/ 与 /r/ 快速连发，声带振动，不要读成汉语的「珠」'
  },
  {
    id: 'cons-dz',
    letters: ['ds', 'des'],
    ipa: '/dz/',
    type: 'consonant',
    category: 'voiced-consonant',
    voiced: true,
    exampleWords: [
      { word: 'beds', ipa: '/bedz/', zh: '床（复数）' },
      { word: 'hands', ipa: '/hændz/', zh: '手（复数）' },
      { word: 'needs', ipa: '/niːdz/', zh: '需要（三单）' },
      { word: 'friends', ipa: '/frendz/', zh: '朋友（复数）' }
    ],
    mouthTip: '/d/ 与 /z/ 快速连发，声带振动，末尾的 /z/ 要拖出声音'
  }
];

// 分组元信息，供界面分区展示使用
export const phonemeCategories = [
  { key: 'short-vowel', label: '短元音', subtitle: 'Short Vowels' },
  { key: 'long-vowel', label: '长元音', subtitle: 'Long Vowels' },
  { key: 'diphthong', label: '双元音', subtitle: 'Diphthongs' },
  { key: 'voiceless-consonant', label: '清辅音', subtitle: 'Voiceless Consonants' },
  { key: 'voiced-consonant', label: '浊辅音', subtitle: 'Voiced Consonants' }
];

export default phonemes;
