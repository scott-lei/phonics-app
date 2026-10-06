// data/combos.js
// 字母组合库：元音组合 / 辅音组合（Digraph，发一个音）/ 辅音连缀（Blend，两个音都发）
//               / R 音节 / Magic e
//
// 字段说明：
//   id        唯一标识（combo-xxx）
//   combo     组合字母，如 'ai'、'a_e'
//   category  'vowel-digraph' | 'consonant-digraph' | 'consonant-blend'
//             | 'r-controlled' | 'magic-e'
//   sounds    该组合对应的发音（可能不止一个）
//   examples  例词数组，每项 { word, ipa, zh }
//   note      补充说明（可选，如「有两种发音」）

export const combos = [
  // ==================== 元音组合 Vowel Digraphs ====================
  {
    id: 'combo-ai',
    combo: 'ai',
    category: 'vowel-digraph',
    sounds: ['/eɪ/'],
    examples: [
      { word: 'rain', ipa: '/reɪn/', zh: '雨' },
      { word: 'wait', ipa: '/weɪt/', zh: '等待' },
      { word: 'train', ipa: '/treɪn/', zh: '火车' },
      { word: 'paint', ipa: '/peɪnt/', zh: '绘画' }
    ]
  },
  {
    id: 'combo-ay',
    combo: 'ay',
    category: 'vowel-digraph',
    sounds: ['/eɪ/'],
    examples: [
      { word: 'day', ipa: '/deɪ/', zh: '天；日' },
      { word: 'play', ipa: '/pleɪ/', zh: '玩' },
      { word: 'say', ipa: '/seɪ/', zh: '说' },
      { word: 'stay', ipa: '/steɪ/', zh: '停留' }
    ]
  },
  {
    id: 'combo-ea',
    combo: 'ea',
    category: 'vowel-digraph',
    sounds: ['/iː/', '/e/'],
    examples: [
      { word: 'eat', ipa: '/iːt/', zh: '吃' },
      { word: 'sea', ipa: '/siː/', zh: '海' },
      { word: 'read', ipa: '/riːd/', zh: '读（现在时）' },
      { word: 'bread', ipa: '/bred/', zh: '面包' },
      { word: 'head', ipa: '/hed/', zh: '头' }
    ],
    note: '多数发 /iː/，但在 bread、head 等词中发 /e/'
  },
  {
    id: 'combo-ee',
    combo: 'ee',
    category: 'vowel-digraph',
    sounds: ['/iː/'],
    examples: [
      { word: 'see', ipa: '/siː/', zh: '看见' },
      { word: 'tree', ipa: '/triː/', zh: '树' },
      { word: 'green', ipa: '/ɡriːn/', zh: '绿色的' },
      { word: 'sleep', ipa: '/sliːp/', zh: '睡觉' }
    ]
  },
  {
    id: 'combo-ey',
    combo: 'ey',
    category: 'vowel-digraph',
    sounds: ['/iː/', '/eɪ/'],
    examples: [
      { word: 'key', ipa: '/kiː/', zh: '钥匙' },
      { word: 'money', ipa: '/ˈmʌni/', zh: '钱' },
      { word: 'they', ipa: '/ðeɪ/', zh: '他们' },
      { word: 'hey', ipa: '/heɪ/', zh: '嘿' }
    ],
    note: 'key、money 中发 /iː/；they、hey 中发 /eɪ/'
  },
  {
    id: 'combo-ie',
    combo: 'ie',
    category: 'vowel-digraph',
    sounds: ['/aɪ/', '/iː/'],
    examples: [
      { word: 'pie', ipa: '/paɪ/', zh: '馅饼' },
      { word: 'tie', ipa: '/taɪ/', zh: '领带' },
      { word: 'field', ipa: '/fiːld/', zh: '田野' },
      { word: 'piece', ipa: '/piːs/', zh: '一块' }
    ],
    note: 'pie、tie 中发 /aɪ/；field、piece 中发 /iː/'
  },
  {
    id: 'combo-igh',
    combo: 'igh',
    category: 'vowel-digraph',
    sounds: ['/aɪ/'],
    examples: [
      { word: 'high', ipa: '/haɪ/', zh: '高的' },
      { word: 'night', ipa: '/naɪt/', zh: '夜晚' },
      { word: 'light', ipa: '/laɪt/', zh: '光' },
      { word: 'right', ipa: '/raɪt/', zh: '正确的' }
    ]
  },
  {
    id: 'combo-oa',
    combo: 'oa',
    category: 'vowel-digraph',
    sounds: ['/əʊ/'],
    examples: [
      { word: 'boat', ipa: '/bəʊt/', zh: '船' },
      { word: 'road', ipa: '/rəʊd/', zh: '路' },
      { word: 'coat', ipa: '/kəʊt/', zh: '外套' },
      { word: 'soap', ipa: '/səʊp/', zh: '肥皂' }
    ]
  },
  {
    id: 'combo-ow',
    combo: 'ow',
    category: 'vowel-digraph',
    sounds: ['/əʊ/', '/aʊ/'],
    examples: [
      { word: 'snow', ipa: '/snəʊ/', zh: '雪' },
      { word: 'grow', ipa: '/ɡrəʊ/', zh: '生长' },
      { word: 'cow', ipa: '/kaʊ/', zh: '奶牛' },
      { word: 'now', ipa: '/naʊ/', zh: '现在' }
    ],
    note: 'snow、grow 中发 /əʊ/；cow、now 中发 /aʊ/'
  },
  {
    id: 'combo-oe',
    combo: 'oe',
    category: 'vowel-digraph',
    sounds: ['/əʊ/'],
    examples: [
      { word: 'toe', ipa: '/təʊ/', zh: '脚趾' },
      { word: 'hoe', ipa: '/həʊ/', zh: '锄头' },
      { word: 'goes', ipa: '/ɡəʊz/', zh: '去（第三人称）' }
    ]
  },
  {
    id: 'combo-oo',
    combo: 'oo',
    category: 'vowel-digraph',
    sounds: ['/uː/', '/ʊ/'],
    examples: [
      { word: 'moon', ipa: '/muːn/', zh: '月亮' },
      { word: 'food', ipa: '/fuːd/', zh: '食物' },
      { word: 'book', ipa: '/bʊk/', zh: '书' },
      { word: 'look', ipa: '/lʊk/', zh: '看' }
    ],
    note: 'moon、food 中发长音 /uː/；book、look 中发短音 /ʊ/'
  },
  {
    id: 'combo-ou',
    combo: 'ou',
    category: 'vowel-digraph',
    sounds: ['/aʊ/', '/uː/'],
    examples: [
      { word: 'house', ipa: '/haʊs/', zh: '房子' },
      { word: 'out', ipa: '/aʊt/', zh: '外面' },
      { word: 'soup', ipa: '/suːp/', zh: '汤' },
      { word: 'group', ipa: '/ɡruːp/', zh: '小组' }
    ],
    note: 'house、out 中发 /aʊ/；soup、group 中发 /uː/'
  },
  {
    id: 'combo-oi',
    combo: 'oi',
    category: 'vowel-digraph',
    sounds: ['/ɔɪ/'],
    examples: [
      { word: 'coin', ipa: '/kɔɪn/', zh: '硬币' },
      { word: 'join', ipa: '/dʒɔɪn/', zh: '加入' },
      { word: 'point', ipa: '/pɔɪnt/', zh: '要点' },
      { word: 'voice', ipa: '/vɔɪs/', zh: '声音' }
    ]
  },
  {
    id: 'combo-oy',
    combo: 'oy',
    category: 'vowel-digraph',
    sounds: ['/ɔɪ/'],
    examples: [
      { word: 'boy', ipa: '/bɔɪ/', zh: '男孩' },
      { word: 'toy', ipa: '/tɔɪ/', zh: '玩具' },
      { word: 'enjoy', ipa: '/ɪnˈdʒɔɪ/', zh: '享受' }
    ]
  },
  {
    id: 'combo-au',
    combo: 'au',
    category: 'vowel-digraph',
    sounds: ['/ɔː/'],
    examples: [
      { word: 'autumn', ipa: '/ˈɔːtəm/', zh: '秋天' },
      { word: 'because', ipa: '/bɪˈkɒz/', zh: '因为' },
      { word: 'August', ipa: '/ˈɔːɡəst/', zh: '八月' }
    ]
  },
  {
    id: 'combo-aw',
    combo: 'aw',
    category: 'vowel-digraph',
    sounds: ['/ɔː/'],
    examples: [
      { word: 'saw', ipa: '/sɔː/', zh: '看见（过去式）' },
      { word: 'draw', ipa: '/drɔː/', zh: '画' },
      { word: 'straw', ipa: '/strɔː/', zh: '吸管；稻草' }
    ]
  },
  {
    id: 'combo-ew',
    combo: 'ew',
    category: 'vowel-digraph',
    sounds: ['/juː/', '/uː/'],
    examples: [
      { word: 'new', ipa: '/njuː/', zh: '新的' },
      { word: 'few', ipa: '/fjuː/', zh: '少数' },
      { word: 'grew', ipa: '/ɡruː/', zh: '生长（过去式）' },
      { word: 'flew', ipa: '/fluː/', zh: '飞（过去式）' }
    ],
    note: 'new、few 中发 /juː/；grew、flew 中发 /uː/'
  },
  {
    id: 'combo-ui',
    combo: 'ui',
    category: 'vowel-digraph',
    sounds: ['/uː/'],
    examples: [
      { word: 'fruit', ipa: '/fruːt/', zh: '水果' },
      { word: 'juice', ipa: '/dʒuːs/', zh: '果汁' },
      { word: 'build', ipa: '/bɪld/', zh: '建造' }
    ]
  },

  // ==================== 辅音组合 Consonant Digraphs ====================
  {
    id: 'combo-sh',
    combo: 'sh',
    category: 'consonant-digraph',
    sounds: ['/ʃ/'],
    examples: [
      { word: 'ship', ipa: '/ʃɪp/', zh: '船' },
      { word: 'fish', ipa: '/fɪʃ/', zh: '鱼' },
      { word: 'shop', ipa: '/ʃɒp/', zh: '商店' },
      { word: 'wash', ipa: '/wɒʃ/', zh: '洗' }
    ]
  },
  {
    id: 'combo-ch',
    combo: 'ch',
    category: 'consonant-digraph',
    sounds: ['/tʃ/'],
    examples: [
      { word: 'chair', ipa: '/tʃeə/', zh: '椅子' },
      { word: 'much', ipa: '/mʌtʃ/', zh: '许多' },
      { word: 'lunch', ipa: '/lʌntʃ/', zh: '午餐' },
      { word: 'teacher', ipa: '/ˈtiːtʃə/', zh: '老师' }
    ]
  },
  {
    id: 'combo-tch',
    combo: 'tch',
    category: 'consonant-digraph',
    sounds: ['/tʃ/'],
    examples: [
      { word: 'watch', ipa: '/wɒtʃ/', zh: '手表' },
      { word: 'catch', ipa: '/kætʃ/', zh: '抓住' },
      { word: 'match', ipa: '/mætʃ/', zh: '比赛' }
    ]
  },
  {
    id: 'combo-th',
    combo: 'th',
    category: 'consonant-digraph',
    sounds: ['/θ/', '/ð/'],
    examples: [
      { word: 'think', ipa: '/θɪŋk/', zh: '想' },
      { word: 'three', ipa: '/θriː/', zh: '三' },
      { word: 'this', ipa: '/ðɪs/', zh: '这个' },
      { word: 'mother', ipa: '/ˈmʌðə/', zh: '母亲' }
    ],
    note: 'think、three 中发清音 /θ/；this、mother 中发浊音 /ð/'
  },
  {
    id: 'combo-ph',
    combo: 'ph',
    category: 'consonant-digraph',
    sounds: ['/f/'],
    examples: [
      { word: 'phone', ipa: '/fəʊn/', zh: '电话' },
      { word: 'graph', ipa: '/ɡrɑːf/', zh: '图表' },
      { word: 'photo', ipa: '/ˈfəʊtəʊ/', zh: '照片' }
    ]
  },
  {
    id: 'combo-wh',
    combo: 'wh',
    category: 'consonant-digraph',
    sounds: ['/w/', '/h/'],
    examples: [
      { word: 'when', ipa: '/wen/', zh: '什么时候' },
      { word: 'wheel', ipa: '/wiːl/', zh: '轮子' },
      { word: 'who', ipa: '/huː/', zh: '谁' },
      { word: 'whose', ipa: '/huːz/', zh: '谁的' }
    ],
    note: '多数发 /w/；who、whose 中发 /h/'
  },
  {
    id: 'combo-ck',
    combo: 'ck',
    category: 'consonant-digraph',
    sounds: ['/k/'],
    examples: [
      { word: 'duck', ipa: '/dʌk/', zh: '鸭子' },
      { word: 'back', ipa: '/bæk/', zh: '背部' },
      { word: 'clock', ipa: '/klɒk/', zh: '钟' }
    ]
  },
  {
    id: 'combo-ng',
    combo: 'ng',
    category: 'consonant-digraph',
    sounds: ['/ŋ/'],
    examples: [
      { word: 'sing', ipa: '/sɪŋ/', zh: '唱歌' },
      { word: 'long', ipa: '/lɒŋ/', zh: '长的' },
      { word: 'ring', ipa: '/rɪŋ/', zh: '铃' },
      { word: 'going', ipa: '/ˈɡəʊɪŋ/', zh: '去' }
    ]
  },
  {
    id: 'combo-nk',
    combo: 'nk',
    category: 'consonant-digraph',
    sounds: ['/ŋk/'],
    examples: [
      { word: 'bank', ipa: '/bæŋk/', zh: '银行' },
      { word: 'pink', ipa: '/pɪŋk/', zh: '粉色的' },
      { word: 'think', ipa: '/θɪŋk/', zh: '想' }
    ]
  },
  {
    id: 'combo-qu',
    combo: 'qu',
    category: 'consonant-digraph',
    sounds: ['/kw/'],
    examples: [
      { word: 'queen', ipa: '/kwiːn/', zh: '女王' },
      { word: 'quick', ipa: '/kwɪk/', zh: '快的' },
      { word: 'question', ipa: '/ˈkwestʃən/', zh: '问题' }
    ]
  },
  {
    id: 'combo-gh',
    combo: 'gh',
    category: 'consonant-digraph',
    sounds: ['/f/', '不发音'],
    examples: [
      { word: 'laugh', ipa: '/lɑːf/', zh: '笑' },
      { word: 'enough', ipa: '/ɪˈnʌf/', zh: '足够的' },
      { word: 'night', ipa: '/naɪt/', zh: '夜晚' },
      { word: 'high', ipa: '/haɪ/', zh: '高的' }
    ],
    note: 'laugh、enough 中发 /f/；night、high 中不发音'
  },
  {
    id: 'combo-kn',
    combo: 'kn',
    category: 'consonant-digraph',
    sounds: ['/n/'],
    examples: [
      { word: 'know', ipa: '/nəʊ/', zh: '知道' },
      { word: 'knee', ipa: '/niː/', zh: '膝盖' },
      { word: 'knife', ipa: '/naɪf/', zh: '刀' }
    ],
    note: '词首 k 不发音'
  },
  {
    id: 'combo-wr',
    combo: 'wr',
    category: 'consonant-digraph',
    sounds: ['/r/'],
    examples: [
      { word: 'write', ipa: '/raɪt/', zh: '写' },
      { word: 'wrong', ipa: '/rɒŋ/', zh: '错误的' },
      { word: 'wrist', ipa: '/rɪst/', zh: '手腕' }
    ],
    note: '词首 w 不发音'
  },
  {
    id: 'combo-mb',
    combo: 'mb',
    category: 'consonant-digraph',
    sounds: ['/m/'],
    examples: [
      { word: 'lamb', ipa: '/læm/', zh: '羔羊' },
      { word: 'climb', ipa: '/klaɪm/', zh: '爬' },
      { word: 'comb', ipa: '/kəʊm/', zh: '梳子' }
    ],
    note: '词尾 b 不发音'
  },
  {
    id: 'combo-dge',
    combo: 'dge',
    category: 'consonant-digraph',
    sounds: ['/dʒ/'],
    examples: [
      { word: 'bridge', ipa: '/brɪdʒ/', zh: '桥' },
      { word: 'judge', ipa: '/dʒʌdʒ/', zh: '法官' },
      { word: 'edge', ipa: '/edʒ/', zh: '边缘' }
    ]
  },

  // ==================== 辅音连缀 Consonant Blends ====================
  {
    id: 'combo-bl',
    combo: 'bl',
    category: 'consonant-blend',
    sounds: ['/bl/'],
    examples: [
      { word: 'blue', ipa: '/bluː/', zh: '蓝色的' },
      { word: 'black', ipa: '/blæk/', zh: '黑色的' },
      { word: 'blow', ipa: '/bləʊ/', zh: '吹' }
    ]
  },
  {
    id: 'combo-cl',
    combo: 'cl',
    category: 'consonant-blend',
    sounds: ['/kl/'],
    examples: [
      { word: 'clock', ipa: '/klɒk/', zh: '钟' },
      { word: 'clean', ipa: '/kliːn/', zh: '干净的' },
      { word: 'class', ipa: '/klɑːs/', zh: '班级' }
    ]
  },
  {
    id: 'combo-fl',
    combo: 'fl',
    category: 'consonant-blend',
    sounds: ['/fl/'],
    examples: [
      { word: 'flag', ipa: '/flæɡ/', zh: '旗子' },
      { word: 'fly', ipa: '/flaɪ/', zh: '飞' },
      { word: 'flower', ipa: '/ˈflaʊə/', zh: '花' }
    ]
  },
  {
    id: 'combo-gl',
    combo: 'gl',
    category: 'consonant-blend',
    sounds: ['/ɡl/'],
    examples: [
      { word: 'glass', ipa: '/ɡlɑːs/', zh: '玻璃杯' },
      { word: 'glue', ipa: '/ɡluː/', zh: '胶水' },
      { word: 'glad', ipa: '/ɡlæd/', zh: '高兴的' }
    ]
  },
  {
    id: 'combo-pl',
    combo: 'pl',
    category: 'consonant-blend',
    sounds: ['/pl/'],
    examples: [
      { word: 'play', ipa: '/pleɪ/', zh: '玩' },
      { word: 'plane', ipa: '/pleɪn/', zh: '飞机' },
      { word: 'please', ipa: '/pliːz/', zh: '请' }
    ]
  },
  {
    id: 'combo-sl',
    combo: 'sl',
    category: 'consonant-blend',
    sounds: ['/sl/'],
    examples: [
      { word: 'sleep', ipa: '/sliːp/', zh: '睡觉' },
      { word: 'slow', ipa: '/sləʊ/', zh: '慢的' },
      { word: 'slide', ipa: '/slaɪd/', zh: '滑行' }
    ]
  },
  {
    id: 'combo-br',
    combo: 'br',
    category: 'consonant-blend',
    sounds: ['/br/'],
    examples: [
      { word: 'bread', ipa: '/bred/', zh: '面包' },
      { word: 'bring', ipa: '/brɪŋ/', zh: '带来' },
      { word: 'brown', ipa: '/braʊn/', zh: '棕色的' }
    ]
  },
  {
    id: 'combo-cr',
    combo: 'cr',
    category: 'consonant-blend',
    sounds: ['/kr/'],
    examples: [
      { word: 'cry', ipa: '/kraɪ/', zh: '哭' },
      { word: 'cross', ipa: '/krɒs/', zh: '穿过' },
      { word: 'cream', ipa: '/kriːm/', zh: '奶油' }
    ]
  },
  {
    id: 'combo-dr',
    combo: 'dr',
    category: 'consonant-blend',
    sounds: ['/dr/'],
    examples: [
      { word: 'dress', ipa: '/dres/', zh: '连衣裙' },
      { word: 'dream', ipa: '/driːm/', zh: '梦' },
      { word: 'drive', ipa: '/draɪv/', zh: '驾驶' }
    ]
  },
  {
    id: 'combo-fr',
    combo: 'fr',
    category: 'consonant-blend',
    sounds: ['/fr/'],
    examples: [
      { word: 'frog', ipa: '/frɒɡ/', zh: '青蛙' },
      { word: 'friend', ipa: '/frend/', zh: '朋友' },
      { word: 'fruit', ipa: '/fruːt/', zh: '水果' }
    ]
  },
  {
    id: 'combo-gr',
    combo: 'gr',
    category: 'consonant-blend',
    sounds: ['/ɡr/'],
    examples: [
      { word: 'green', ipa: '/ɡriːn/', zh: '绿色的' },
      { word: 'grape', ipa: '/ɡreɪp/', zh: '葡萄' },
      { word: 'grow', ipa: '/ɡrəʊ/', zh: '生长' }
    ]
  },
  {
    id: 'combo-pr',
    combo: 'pr',
    category: 'consonant-blend',
    sounds: ['/pr/'],
    examples: [
      { word: 'price', ipa: '/praɪs/', zh: '价格' },
      { word: 'print', ipa: '/prɪnt/', zh: '打印' },
      { word: 'pretty', ipa: '/ˈprɪti/', zh: '漂亮的' }
    ]
  },
  {
    id: 'combo-tr',
    combo: 'tr',
    category: 'consonant-blend',
    sounds: ['/tr/'],
    examples: [
      { word: 'tree', ipa: '/triː/', zh: '树' },
      { word: 'train', ipa: '/treɪn/', zh: '火车' },
      { word: 'try', ipa: '/traɪ/', zh: '尝试' }
    ]
  },
  {
    id: 'combo-sc',
    combo: 'sc',
    category: 'consonant-blend',
    sounds: ['/sk/'],
    examples: [
      { word: 'school', ipa: '/skuːl/', zh: '学校' },
      { word: 'scan', ipa: '/skæn/', zh: '扫描' },
      { word: 'score', ipa: '/skɔː/', zh: '得分' }
    ]
  },
  {
    id: 'combo-sk',
    combo: 'sk',
    category: 'consonant-blend',
    sounds: ['/sk/'],
    examples: [
      { word: 'skip', ipa: '/skɪp/', zh: '跳跃' },
      { word: 'desk', ipa: '/desk/', zh: '书桌' },
      { word: 'sky', ipa: '/skaɪ/', zh: '天空' }
    ]
  },
  {
    id: 'combo-sm',
    combo: 'sm',
    category: 'consonant-blend',
    sounds: ['/sm/'],
    examples: [
      { word: 'smile', ipa: '/smaɪl/', zh: '微笑' },
      { word: 'small', ipa: '/smɔːl/', zh: '小的' },
      { word: 'smoke', ipa: '/sməʊk/', zh: '烟' }
    ]
  },
  {
    id: 'combo-sn',
    combo: 'sn',
    category: 'consonant-blend',
    sounds: ['/sn/'],
    examples: [
      { word: 'snow', ipa: '/snəʊ/', zh: '雪' },
      { word: 'snake', ipa: '/sneɪk/', zh: '蛇' },
      { word: 'snack', ipa: '/snæk/', zh: '零食' }
    ]
  },
  {
    id: 'combo-sp',
    combo: 'sp',
    category: 'consonant-blend',
    sounds: ['/sp/'],
    examples: [
      { word: 'spin', ipa: '/spɪn/', zh: '旋转' },
      { word: 'spoon', ipa: '/spuːn/', zh: '勺子' },
      { word: 'sport', ipa: '/spɔːt/', zh: '运动' }
    ]
  },
  {
    id: 'combo-st',
    combo: 'st',
    category: 'consonant-blend',
    sounds: ['/st/'],
    examples: [
      { word: 'stop', ipa: '/stɒp/', zh: '停止' },
      { word: 'star', ipa: '/stɑː/', zh: '星星' },
      { word: 'street', ipa: '/striːt/', zh: '街道' }
    ]
  },
  {
    id: 'combo-sw',
    combo: 'sw',
    category: 'consonant-blend',
    sounds: ['/sw/'],
    examples: [
      { word: 'swim', ipa: '/swɪm/', zh: '游泳' },
      { word: 'sweet', ipa: '/swiːt/', zh: '甜的' },
      { word: 'swing', ipa: '/swɪŋ/', zh: '摆动' }
    ]
  },
  {
    id: 'combo-tw',
    combo: 'tw',
    category: 'consonant-blend',
    sounds: ['/tw/'],
    examples: [
      { word: 'twin', ipa: '/twɪn/', zh: '双胞胎之一' },
      { word: 'twelve', ipa: '/twelv/', zh: '十二' },
      { word: 'twenty', ipa: '/ˈtwenti/', zh: '二十' }
    ]
  },

  // ==================== R 音节 R-controlled ====================
  {
    id: 'combo-ar',
    combo: 'ar',
    category: 'r-controlled',
    sounds: ['/ɑː/'],
    examples: [
      { word: 'car', ipa: '/kɑː/', zh: '汽车' },
      { word: 'park', ipa: '/pɑːk/', zh: '公园' },
      { word: 'star', ipa: '/stɑː/', zh: '星星' },
      { word: 'farm', ipa: '/fɑːm/', zh: '农场' }
    ]
  },
  {
    id: 'combo-er',
    combo: 'er',
    category: 'r-controlled',
    sounds: ['/ɜː/'],
    examples: [
      { word: 'her', ipa: '/hɜː/', zh: '她的' },
      { word: 'term', ipa: '/tɜːm/', zh: '学期' },
      { word: 'teacher', ipa: '/ˈtiːtʃə/', zh: '老师' }
    ]
  },
  {
    id: 'combo-ir',
    combo: 'ir',
    category: 'r-controlled',
    sounds: ['/ɜː/'],
    examples: [
      { word: 'bird', ipa: '/bɜːd/', zh: '鸟' },
      { word: 'girl', ipa: '/ɡɜːl/', zh: '女孩' },
      { word: 'first', ipa: '/fɜːst/', zh: '第一' }
    ]
  },
  {
    id: 'combo-or',
    combo: 'or',
    category: 'r-controlled',
    sounds: ['/ɔː/'],
    examples: [
      { word: 'fork', ipa: '/fɔːk/', zh: '叉子' },
      { word: 'horse', ipa: '/hɔːs/', zh: '马' },
      { word: 'short', ipa: '/ʃɔːt/', zh: '短的' }
    ]
  },
  {
    id: 'combo-ur',
    combo: 'ur',
    category: 'r-controlled',
    sounds: ['/ɜː/'],
    examples: [
      { word: 'turn', ipa: '/tɜːn/', zh: '转弯' },
      { word: 'nurse', ipa: '/nɜːs/', zh: '护士' },
      { word: 'purple', ipa: '/ˈpɜːpl/', zh: '紫色的' }
    ]
  },
  {
    id: 'combo-air',
    combo: 'air',
    category: 'r-controlled',
    sounds: ['/eə/'],
    examples: [
      { word: 'hair', ipa: '/heə/', zh: '头发' },
      { word: 'chair', ipa: '/tʃeə/', zh: '椅子' },
      { word: 'pair', ipa: '/peə/', zh: '一对' }
    ]
  },
  {
    id: 'combo-ear',
    combo: 'ear',
    category: 'r-controlled',
    sounds: ['/ɪə/', '/ɜː/'],
    examples: [
      { word: 'hear', ipa: '/hɪə/', zh: '听见' },
      { word: 'near', ipa: '/nɪə/', zh: '近的' },
      { word: 'learn', ipa: '/lɜːn/', zh: '学习' },
      { word: 'earth', ipa: '/ɜːθ/', zh: '地球' }
    ],
    note: 'hear、near 中发 /ɪə/；learn、earth 中发 /ɜː/'
  },
  {
    id: 'combo-eer',
    combo: 'eer',
    category: 'r-controlled',
    sounds: ['/ɪə/'],
    examples: [
      { word: 'deer', ipa: '/dɪə/', zh: '鹿' },
      { word: 'cheer', ipa: '/tʃɪə/', zh: '欢呼' },
      { word: 'beer', ipa: '/bɪə/', zh: '啤酒' }
    ]
  },
  {
    id: 'combo-oor',
    combo: 'oor',
    category: 'r-controlled',
    sounds: ['/ɔː/', '/ʊə/'],
    examples: [
      { word: 'door', ipa: '/dɔː/', zh: '门' },
      { word: 'floor', ipa: '/flɔː/', zh: '地板' },
      { word: 'poor', ipa: '/pʊə/', zh: '贫穷的' }
    ],
    note: 'door、floor 中发 /ɔː/；poor 中发 /ʊə/'
  },
  {
    id: 'combo-our',
    combo: 'our',
    category: 'r-controlled',
    sounds: ['/ɔː/', '/aʊə/'],
    examples: [
      { word: 'four', ipa: '/fɔː/', zh: '四' },
      { word: 'pour', ipa: '/pɔː/', zh: '倒' },
      { word: 'hour', ipa: '/ˈaʊə/', zh: '小时' }
    ],
    note: 'four、pour 中发 /ɔː/；hour 中发 /aʊə/'
  },

  // ==================== Magic e（元音 + 辅音 + 不发音 e）====================
  {
    id: 'combo-a-e',
    combo: 'a_e',
    category: 'magic-e',
    sounds: ['/eɪ/'],
    examples: [
      { word: 'cake', ipa: '/keɪk/', zh: '蛋糕' },
      { word: 'name', ipa: '/neɪm/', zh: '名字' },
      { word: 'game', ipa: '/ɡeɪm/', zh: '游戏' },
      { word: 'plane', ipa: '/pleɪn/', zh: '飞机' }
    ],
    note: '词尾 e 不发音，前面的 a 发字母本音 /eɪ/'
  },
  {
    id: 'combo-e-e',
    combo: 'e_e',
    category: 'magic-e',
    sounds: ['/iː/'],
    examples: [
      { word: 'these', ipa: '/ðiːz/', zh: '这些' },
      { word: 'Chinese', ipa: '/ˌtʃaɪˈniːz/', zh: '中国的' },
      { word: 'complete', ipa: '/kəmˈpliːt/', zh: '完整的' }
    ],
    note: '词尾 e 不发音，前面的 e 发字母本音 /iː/'
  },
  {
    id: 'combo-i-e',
    combo: 'i_e',
    category: 'magic-e',
    sounds: ['/aɪ/'],
    examples: [
      { word: 'bike', ipa: '/baɪk/', zh: '自行车' },
      { word: 'time', ipa: '/taɪm/', zh: '时间' },
      { word: 'kite', ipa: '/kaɪt/', zh: '风筝' },
      { word: 'write', ipa: '/raɪt/', zh: '写' }
    ],
    note: '词尾 e 不发音，前面的 i 发字母本音 /aɪ/'
  },
  {
    id: 'combo-o-e',
    combo: 'o_e',
    category: 'magic-e',
    sounds: ['/əʊ/'],
    examples: [
      { word: 'nose', ipa: '/nəʊz/', zh: '鼻子' },
      { word: 'home', ipa: '/həʊm/', zh: '家' },
      { word: 'rose', ipa: '/rəʊz/', zh: '玫瑰' },
      { word: 'hope', ipa: '/həʊp/', zh: '希望' }
    ],
    note: '词尾 e 不发音，前面的 o 发字母本音 /əʊ/'
  },
  {
    id: 'combo-u-e',
    combo: 'u_e',
    category: 'magic-e',
    sounds: ['/juː/', '/uː/'],
    examples: [
      { word: 'cute', ipa: '/kjuːt/', zh: '可爱的' },
      { word: 'tube', ipa: '/tjuːb/', zh: '管子' },
      { word: 'rule', ipa: '/ruːl/', zh: '规则' },
      { word: 'June', ipa: '/dʒuːn/', zh: '六月' }
    ],
    note: 'cute、tube 中发 /juː/；rule、June 中发 /uː/'
  }
];

// 分组元信息，供界面分区展示使用
export const comboCategories = [
  { key: 'vowel-digraph', label: '元音组合', subtitle: 'Vowel Digraphs' },
  { key: 'consonant-digraph', label: '辅音组合', subtitle: 'Consonant Digraphs（发一个音）' },
  { key: 'consonant-blend', label: '辅音连缀', subtitle: 'Consonant Blends（两个音都发）' },
  { key: 'r-controlled', label: 'R 音节', subtitle: 'R-controlled Vowels' },
  { key: 'magic-e', label: 'Magic e', subtitle: '元音 + 辅音 + 不发音 e' }
];

export default combos;
