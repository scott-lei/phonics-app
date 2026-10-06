// data/word-groups.js
// 「拼写 → 练习单词」分组库
//
// 用途：同一个音有几种常见拼写，就分成几组练习词，一组一组地把「字母 → 音」练熟。
//
// 结构：{ 音素id: { 拼写: [{ word, zh }] } }
//   音素 id 与 data/phonemes.js 一致；
//   拼写键必须与该音素 letters 数组里的拼写一一对应（顺序也保持一致）；
//   每组 3-6 个词，都是真实含该拼写、且该拼写在词中确实读这个音的词。

export const wordGroups = {
  /* ==================== 短元音 Short Vowels ==================== */

  'short-a': {
    a: [
      { word: 'cat', zh: '猫' }, { word: 'map', zh: '地图' }, { word: 'bag', zh: '包' },
      { word: 'hand', zh: '手' }, { word: 'black', zh: '黑色的' }, { word: 'apple', zh: '苹果' }
    ]
  },

  'short-e': {
    e: [
      { word: 'bed', zh: '床' }, { word: 'pen', zh: '钢笔' }, { word: 'red', zh: '红色的' },
      { word: 'ten', zh: '十' }, { word: 'egg', zh: '蛋' }
    ],
    ea: [
      { word: 'head', zh: '头' }, { word: 'bread', zh: '面包' }, { word: 'ready', zh: '准备好的' },
      { word: 'weather', zh: '天气' }, { word: 'heavy', zh: '重的' }
    ]
  },

  'short-i': {
    i: [
      { word: 'sit', zh: '坐' }, { word: 'pig', zh: '猪' }, { word: 'big', zh: '大的' },
      { word: 'fish', zh: '鱼' }, { word: 'milk', zh: '牛奶' }, { word: 'six', zh: '六' }
    ],
    y: [
      { word: 'gym', zh: '健身房' }, { word: 'myth', zh: '神话' }, { word: 'system', zh: '系统' },
      { word: 'symbol', zh: '符号' }
    ],
    ui: [
      { word: 'build', zh: '建造' }, { word: 'guitar', zh: '吉他' }, { word: 'biscuit', zh: '饼干' },
      { word: 'guilt', zh: '内疚' }
    ]
  },

  'short-o': {
    o: [
      { word: 'hot', zh: '热的' }, { word: 'dog', zh: '狗' }, { word: 'box', zh: '盒子' },
      { word: 'clock', zh: '钟' }, { word: 'stop', zh: '停止' }, { word: 'orange', zh: '橙子' }
    ],
    a: [
      { word: 'want', zh: '想要' }, { word: 'wash', zh: '洗' }, { word: 'watch', zh: '手表' },
      { word: 'what', zh: '什么' }, { word: 'was', zh: '是（过去式）' }, { word: 'wallet', zh: '钱包' }
    ]
  },

  'short-u': {
    u: [
      { word: 'cup', zh: '杯子' }, { word: 'bus', zh: '公共汽车' }, { word: 'sun', zh: '太阳' },
      { word: 'mum', zh: '妈妈' }, { word: 'lunch', zh: '午餐' }, { word: 'number', zh: '数字' }
    ],
    o: [
      { word: 'love', zh: '爱' }, { word: 'come', zh: '来' }, { word: 'son', zh: '儿子' },
      { word: 'money', zh: '钱' }, { word: 'month', zh: '月份' }
    ],
    ou: [
      { word: 'young', zh: '年轻的' }, { word: 'touch', zh: '触摸' }, { word: 'country', zh: '国家' },
      { word: 'enough', zh: '足够的' }, { word: 'double', zh: '双倍的' }
    ]
  },

  'short-oo': {
    oo: [
      { word: 'book', zh: '书' }, { word: 'look', zh: '看' }, { word: 'good', zh: '好的' },
      { word: 'foot', zh: '脚' }, { word: 'wood', zh: '木头' }, { word: 'cook', zh: '厨师' }
    ],
    u: [
      { word: 'put', zh: '放' }, { word: 'full', zh: '满的' }, { word: 'pull', zh: '拉' },
      { word: 'push', zh: '推' }
    ],
    o: [
      { word: 'wolf', zh: '狼' }, { word: 'woman', zh: '女人' }
    ]
  },

  'short-schwa': {
    a: [
      { word: 'about', zh: '关于' }, { word: 'banana', zh: '香蕉' }, { word: 'sofa', zh: '沙发' },
      { word: 'ago', zh: '以前' }, { word: 'China', zh: '中国' }
    ],
    e: [
      { word: 'open', zh: '打开' }, { word: 'seven', zh: '七' }, { word: 'chicken', zh: '鸡' },
      { word: 'taken', zh: '拿走的' }
    ],
    o: [
      { word: 'lesson', zh: '课' }, { word: 'carrot', zh: '胡萝卜' }, { word: 'lemon', zh: '柠檬' },
      { word: 'button', zh: '纽扣' }
    ],
    er: [
      { word: 'teacher', zh: '老师' }, { word: 'sister', zh: '姐妹' }, { word: 'water', zh: '水' },
      { word: 'letter', zh: '信' }, { word: 'brother', zh: '兄弟' }
    ],
    or: [
      { word: 'doctor', zh: '医生' }, { word: 'actor', zh: '演员' }, { word: 'visitor', zh: '访客' },
      { word: 'mirror', zh: '镜子' }
    ]
  },

  /* ==================== 长元音 Long Vowels ==================== */

  'long-ee': {
    ee: [
      { word: 'see', zh: '看见' }, { word: 'tree', zh: '树' }, { word: 'green', zh: '绿色的' },
      { word: 'sleep', zh: '睡觉' }, { word: 'feet', zh: '脚（复数）' }
    ],
    ea: [
      { word: 'eat', zh: '吃' }, { word: 'sea', zh: '海' }, { word: 'read', zh: '读' },
      { word: 'tea', zh: '茶' }, { word: 'season', zh: '季节' }
    ],
    e: [
      { word: 'he', zh: '他' }, { word: 'me', zh: '我（宾格）' }, { word: 'we', zh: '我们' },
      { word: 'she', zh: '她' }, { word: 'these', zh: '这些' }
    ],
    ie: [
      { word: 'field', zh: '田野' }, { word: 'piece', zh: '一块' }, { word: 'chief', zh: '首领' },
      { word: 'believe', zh: '相信' }
    ],
    ey: [
      { word: 'key', zh: '钥匙' }, { word: 'keyboard', zh: '键盘' }, { word: 'monkey', zh: '猴子' },
      { word: 'donkey', zh: '驴' }
    ]
  },

  'long-ar': {
    ar: [
      { word: 'car', zh: '汽车' }, { word: 'park', zh: '公园' }, { word: 'star', zh: '星星' },
      { word: 'farm', zh: '农场' }, { word: 'garden', zh: '花园' }
    ],
    a: [
      { word: 'father', zh: '父亲' }, { word: 'class', zh: '班级' }, { word: 'bath', zh: '洗澡' },
      { word: 'glass', zh: '玻璃杯' }, { word: 'ask', zh: '问' }
    ],
    al: [
      { word: 'calm', zh: '平静的' }, { word: 'half', zh: '一半' }, { word: 'palm', zh: '手掌' },
      { word: 'calf', zh: '小牛' }
    ]
  },

  'long-or': {
    or: [
      { word: 'fork', zh: '叉子' }, { word: 'horse', zh: '马' }, { word: 'short', zh: '短的' },
      { word: 'born', zh: '出生的' }, { word: 'morning', zh: '早上' }
    ],
    oor: [
      { word: 'door', zh: '门' }, { word: 'floor', zh: '地板' }
    ],
    aw: [
      { word: 'saw', zh: '锯子' }, { word: 'draw', zh: '画' }, { word: 'straw', zh: '稻草' },
      { word: 'law', zh: '法律' }, { word: 'dawn', zh: '黎明' }
    ],
    au: [
      { word: 'autumn', zh: '秋天' }, { word: 'August', zh: '八月' }, { word: 'because', zh: '因为' },
      { word: 'sauce', zh: '酱汁' }
    ],
    al: [
      { word: 'talk', zh: '说话' }, { word: 'walk', zh: '走路' }, { word: 'ball', zh: '球' },
      { word: 'small', zh: '小的' }, { word: 'tall', zh: '高的' }
    ]
  },

  'long-oo': {
    oo: [
      { word: 'moon', zh: '月亮' }, { word: 'food', zh: '食物' }, { word: 'school', zh: '学校' },
      { word: 'room', zh: '房间' }, { word: 'zoo', zh: '动物园' }
    ],
    u: [
      { word: 'rule', zh: '规则' }, { word: 'ruler', zh: '尺子' }, { word: 'June', zh: '六月' },
      { word: 'rude', zh: '粗鲁的' }
    ],
    ue: [
      { word: 'blue', zh: '蓝色的' }, { word: 'true', zh: '真的' }, { word: 'glue', zh: '胶水' },
      { word: 'clue', zh: '线索' }
    ],
    o: [
      { word: 'do', zh: '做' }, { word: 'who', zh: '谁' }, { word: 'whose', zh: '谁的' },
      { word: 'move', zh: '移动' }, { word: 'lose', zh: '丢失' }
    ],
    ui: [
      { word: 'fruit', zh: '水果' }, { word: 'juice', zh: '果汁' }, { word: 'suit', zh: '西装' },
      { word: 'cruise', zh: '乘船游览' }
    ]
  },

  'long-er': {
    er: [
      { word: 'her', zh: '她（宾格）' }, { word: 'term', zh: '学期' }, { word: 'serve', zh: '服务' },
      { word: 'verb', zh: '动词' }, { word: 'person', zh: '人' }
    ],
    ir: [
      { word: 'bird', zh: '鸟' }, { word: 'girl', zh: '女孩' }, { word: 'first', zh: '第一' },
      { word: 'shirt', zh: '衬衫' }, { word: 'thirty', zh: '三十' }
    ],
    ur: [
      { word: 'turn', zh: '转弯' }, { word: 'nurse', zh: '护士' }, { word: 'purple', zh: '紫色的' },
      { word: 'hurt', zh: '受伤' }, { word: 'Thursday', zh: '星期四' }
    ],
    or: [
      { word: 'word', zh: '单词' }, { word: 'work', zh: '工作' }, { word: 'world', zh: '世界' },
      { word: 'worse', zh: '更差的' }
    ],
    ear: [
      { word: 'learn', zh: '学习' }, { word: 'earth', zh: '地球' }, { word: 'early', zh: '早的' },
      { word: 'heard', zh: '听说（过去式）' }
    ]
  },

  /* ==================== 双元音 Diphthongs ==================== */

  'diph-ei': {
    a_e: [
      { word: 'cake', zh: '蛋糕' }, { word: 'name', zh: '名字' }, { word: 'game', zh: '游戏' },
      { word: 'plane', zh: '飞机' }, { word: 'late', zh: '迟的' }
    ],
    ai: [
      { word: 'rain', zh: '雨' }, { word: 'wait', zh: '等待' }, { word: 'train', zh: '火车' },
      { word: 'paint', zh: '油漆' }, { word: 'tail', zh: '尾巴' }
    ],
    ay: [
      { word: 'day', zh: '天；日' }, { word: 'play', zh: '玩' }, { word: 'say', zh: '说' },
      { word: 'stay', zh: '停留' }, { word: 'May', zh: '五月' }
    ],
    ey: [
      { word: 'they', zh: '他们' }, { word: 'hey', zh: '嘿' }, { word: 'grey', zh: '灰色的' },
      { word: 'obey', zh: '服从' }
    ],
    ea: [
      { word: 'great', zh: '很棒的' }, { word: 'break', zh: '打破' }, { word: 'steak', zh: '牛排' }
    ]
  },

  'diph-ai': {
    i_e: [
      { word: 'bike', zh: '自行车' }, { word: 'time', zh: '时间' }, { word: 'kite', zh: '风筝' },
      { word: 'write', zh: '写' }, { word: 'drive', zh: '驾驶' }
    ],
    igh: [
      { word: 'high', zh: '高的' }, { word: 'night', zh: '夜晚' }, { word: 'light', zh: '光' },
      { word: 'right', zh: '右边' }, { word: 'fight', zh: '打架' }
    ],
    y: [
      { word: 'my', zh: '我的' }, { word: 'fly', zh: '飞' }, { word: 'sky', zh: '天空' },
      { word: 'try', zh: '尝试' }, { word: 'why', zh: '为什么' }
    ],
    ie: [
      { word: 'pie', zh: '派' }, { word: 'tie', zh: '领带' }, { word: 'lie', zh: '说谎' },
      { word: 'die', zh: '死' }
    ]
  },

  'diph-oi': {
    oi: [
      { word: 'coin', zh: '硬币' }, { word: 'join', zh: '加入' }, { word: 'point', zh: '要点' },
      { word: 'voice', zh: '声音' }, { word: 'soil', zh: '土壤' }
    ],
    oy: [
      { word: 'boy', zh: '男孩' }, { word: 'toy', zh: '玩具' }, { word: 'enjoy', zh: '享受' },
      { word: 'royal', zh: '皇家的' }, { word: 'oyster', zh: '牡蛎' }
    ]
  },

  'diph-ou': {
    o_e: [
      { word: 'nose', zh: '鼻子' }, { word: 'home', zh: '家' }, { word: 'rose', zh: '玫瑰' },
      { word: 'hope', zh: '希望' }, { word: 'note', zh: '笔记' }
    ],
    oa: [
      { word: 'boat', zh: '船' }, { word: 'road', zh: '路' }, { word: 'coat', zh: '外套' },
      { word: 'soap', zh: '肥皂' }, { word: 'goat', zh: '山羊' }
    ],
    ow: [
      { word: 'snow', zh: '雪' }, { word: 'grow', zh: '生长' }, { word: 'show', zh: '展示' },
      { word: 'slow', zh: '慢的' }, { word: 'window', zh: '窗户' }
    ],
    o: [
      { word: 'go', zh: '去' }, { word: 'no', zh: '不' }, { word: 'so', zh: '所以' },
      { word: 'open', zh: '打开' }, { word: 'hello', zh: '你好' }
    ],
    oe: [
      { word: 'toe', zh: '脚趾' }, { word: 'hoe', zh: '锄头' }, { word: 'goes', zh: '去（三单）' }
    ]
  },

  'diph-au': {
    ou: [
      { word: 'house', zh: '房子' }, { word: 'out', zh: '外面' }, { word: 'mouth', zh: '嘴' },
      { word: 'cloud', zh: '云' }, { word: 'sound', zh: '声音' }
    ],
    ow: [
      { word: 'cow', zh: '奶牛' }, { word: 'now', zh: '现在' }, { word: 'how', zh: '怎样' },
      { word: 'brown', zh: '棕色的' }, { word: 'flower', zh: '花' }
    ]
  },

  'diph-ia': {
    ear: [
      { word: 'hear', zh: '听见' }, { word: 'near', zh: '近的' }, { word: 'dear', zh: '亲爱的' },
      { word: 'fear', zh: '害怕' }, { word: 'year', zh: '年' }
    ],
    eer: [
      { word: 'deer', zh: '鹿' }, { word: 'cheer', zh: '欢呼' }, { word: 'beer', zh: '啤酒' },
      { word: 'engineer', zh: '工程师' }
    ],
    ere: [
      { word: 'here', zh: '这里' }, { word: 'mere', zh: '仅仅的' }, { word: 'severe', zh: '严重的' }
    ]
  },

  'diph-ea': {
    air: [
      { word: 'hair', zh: '头发' }, { word: 'chair', zh: '椅子' }, { word: 'pair', zh: '一对' },
      { word: 'fair', zh: '公平的' }, { word: 'stair', zh: '楼梯' }
    ],
    are: [
      { word: 'care', zh: '关心' }, { word: 'share', zh: '分享' }, { word: 'dare', zh: '敢' },
      { word: 'square', zh: '正方形' }, { word: 'bare', zh: '赤裸的' }
    ],
    ear: [
      { word: 'bear', zh: '熊' }, { word: 'wear', zh: '穿' }, { word: 'pear', zh: '梨' },
      { word: 'swear', zh: '发誓' }
    ],
    ere: [
      { word: 'where', zh: '哪里' }, { word: 'there', zh: '那里' }, { word: 'nowhere', zh: '无处' },
      { word: 'somewhere', zh: '某处' }
    ]
  },

  'diph-ua': {
    oor: [
      { word: 'poor', zh: '贫穷的' }, { word: 'moor', zh: '荒野' }
    ],
    our: [
      { word: 'tour', zh: '旅行' }, { word: 'tourist', zh: '游客' }
    ],
    ure: [
      { word: 'sure', zh: '确定的' }, { word: 'cure', zh: '治愈' }, { word: 'pure', zh: '纯净的' },
      { word: 'ensure', zh: '确保' }
    ]
  },

  /* ==================== 清辅音 Voiceless Consonants ==================== */

  'cons-p': {
    p: [
      { word: 'pen', zh: '钢笔' }, { word: 'pig', zh: '猪' }, { word: 'cup', zh: '杯子' },
      { word: 'map', zh: '地图' }, { word: 'happy', zh: '快乐的' }
    ],
    pp: [
      { word: 'apple', zh: '苹果' }, { word: 'supper', zh: '晚餐' }, { word: 'puppy', zh: '小狗' },
      { word: 'zipper', zh: '拉链' }
    ]
  },

  'cons-t': {
    t: [
      { word: 'top', zh: '顶部' }, { word: 'cat', zh: '猫' }, { word: 'sit', zh: '坐' },
      { word: 'water', zh: '水' }, { word: 'time', zh: '时间' }
    ],
    tt: [
      { word: 'letter', zh: '信' }, { word: 'better', zh: '更好的' }, { word: 'little', zh: '小的' },
      { word: 'butter', zh: '黄油' }
    ],
    ed: [
      { word: 'washed', zh: '洗（过去式）' }, { word: 'looked', zh: '看（过去式）' },
      { word: 'stopped', zh: '停止（过去式）' }, { word: 'helped', zh: '帮助（过去式）' },
      { word: 'jumped', zh: '跳（过去式）' }
    ]
  },

  'cons-k': {
    k: [
      { word: 'key', zh: '钥匙' }, { word: 'kite', zh: '风筝' }, { word: 'milk', zh: '牛奶' },
      { word: 'book', zh: '书' }, { word: 'king', zh: '国王' }
    ],
    c: [
      { word: 'cat', zh: '猫' }, { word: 'cup', zh: '杯子' }, { word: 'cold', zh: '冷的' },
      { word: 'come', zh: '来' }, { word: 'class', zh: '班级' }
    ],
    ck: [
      { word: 'duck', zh: '鸭子' }, { word: 'back', zh: '后面' }, { word: 'clock', zh: '钟' },
      { word: 'black', zh: '黑色的' }, { word: 'sick', zh: '生病的' }
    ],
    ch: [
      { word: 'school', zh: '学校' }, { word: 'Christmas', zh: '圣诞节' },
      { word: 'chemist', zh: '药剂师' }, { word: 'ache', zh: '疼痛' }
    ]
  },

  'cons-f': {
    f: [
      { word: 'fish', zh: '鱼' }, { word: 'fan', zh: '扇子' }, { word: 'five', zh: '五' },
      { word: 'foot', zh: '脚' }, { word: 'farm', zh: '农场' }
    ],
    ff: [
      { word: 'off', zh: '关掉' }, { word: 'coffee', zh: '咖啡' }, { word: 'cliff', zh: '悬崖' },
      { word: 'stuff', zh: '东西' }
    ],
    ph: [
      { word: 'phone', zh: '电话' }, { word: 'photo', zh: '照片' }, { word: 'graph', zh: '图表' },
      { word: 'elephant', zh: '大象' }
    ],
    gh: [
      { word: 'laugh', zh: '笑' }, { word: 'enough', zh: '足够的' }, { word: 'tough', zh: '艰难的' },
      { word: 'cough', zh: '咳嗽' }
    ]
  },

  'cons-s': {
    s: [
      { word: 'sun', zh: '太阳' }, { word: 'bus', zh: '公共汽车' }, { word: 'sit', zh: '坐' },
      { word: 'seven', zh: '七' }, { word: 'sister', zh: '姐妹' }
    ],
    ss: [
      { word: 'class', zh: '班级' }, { word: 'grass', zh: '草' }, { word: 'miss', zh: '想念' },
      { word: 'kiss', zh: '亲吻' }
    ],
    c: [
      { word: 'city', zh: '城市' }, { word: 'cent', zh: '分' }, { word: 'ice', zh: '冰' },
      { word: 'cinema', zh: '电影院' }, { word: 'pencil', zh: '铅笔' }
    ],
    ce: [
      { word: 'face', zh: '脸' }, { word: 'nice', zh: '好的' }, { word: 'dance', zh: '跳舞' },
      { word: 'rice', zh: '米饭' }, { word: 'place', zh: '地方' }
    ]
  },

  'cons-sh': {
    sh: [
      { word: 'ship', zh: '船' }, { word: 'fish', zh: '鱼' }, { word: 'shop', zh: '商店' },
      { word: 'wash', zh: '洗' }, { word: 'she', zh: '她' }
    ],
    ti: [
      { word: 'nation', zh: '国家' }, { word: 'station', zh: '车站' }, { word: 'action', zh: '行动' },
      { word: 'patient', zh: '病人' }
    ],
    ci: [
      { word: 'special', zh: '特别的' }, { word: 'official', zh: '官方的' },
      { word: 'delicious', zh: '美味的' }, { word: 'musician', zh: '音乐家' }
    ],
    s: [
      { word: 'sure', zh: '确定的' }, { word: 'sugar', zh: '糖' }
    ]
  },

  'cons-ch': {
    ch: [
      { word: 'chair', zh: '椅子' }, { word: 'church', zh: '教堂' }, { word: 'lunch', zh: '午餐' },
      { word: 'teacher', zh: '老师' }, { word: 'rich', zh: '富有的' }
    ],
    tch: [
      { word: 'watch', zh: '手表' }, { word: 'catch', zh: '抓住' }, { word: 'match', zh: '比赛' },
      { word: 'kitchen', zh: '厨房' }, { word: 'fetch', zh: '去取来' }
    ],
    t: [
      { word: 'nature', zh: '自然' }, { word: 'picture', zh: '图片' }, { word: 'future', zh: '未来' },
      { word: 'adventure', zh: '冒险' }
    ]
  },

  'cons-th': {
    th: [
      { word: 'think', zh: '想' }, { word: 'three', zh: '三' }, { word: 'mouth', zh: '嘴' },
      { word: 'bath', zh: '洗澡' }, { word: 'thank', zh: '感谢' }
    ]
  },

  'cons-h': {
    h: [
      { word: 'hat', zh: '帽子' }, { word: 'hot', zh: '热的' }, { word: 'house', zh: '房子' },
      { word: 'hand', zh: '手' }, { word: 'help', zh: '帮助' }
    ],
    wh: [
      { word: 'who', zh: '谁' }, { word: 'whose', zh: '谁的' }, { word: 'whole', zh: '整个的' },
      { word: 'whom', zh: '谁（宾格）' }
    ]
  },

  'cons-tr': {
    tr: [
      { word: 'tree', zh: '树' }, { word: 'train', zh: '火车' }, { word: 'try', zh: '尝试' },
      { word: 'street', zh: '街道' }, { word: 'truck', zh: '卡车' }
    ]
  },

  'cons-ts': {
    ts: [
      { word: 'cats', zh: '猫（复数）' }, { word: 'seats', zh: '座位（复数）' },
      { word: 'gets', zh: '得到（三单）' }, { word: 'sports', zh: '运动' },
      { word: 'gifts', zh: '礼物（复数）' }
    ],
    tes: [
      { word: 'gates', zh: '大门（复数）' }, { word: 'notes', zh: '笔记（复数）' },
      { word: 'dates', zh: '日期（复数）' }, { word: 'plates', zh: '盘子（复数）' }
    ]
  },

  /* ==================== 浊辅音 Voiced Consonants ==================== */

  'cons-b': {
    b: [
      { word: 'bed', zh: '床' }, { word: 'big', zh: '大的' }, { word: 'book', zh: '书' },
      { word: 'bag', zh: '包' }, { word: 'baby', zh: '婴儿' }
    ],
    bb: [
      { word: 'rabbit', zh: '兔子' }, { word: 'hobby', zh: '爱好' }, { word: 'cabbage', zh: '卷心菜' },
      { word: 'rubber', zh: '橡皮' }
    ]
  },

  'cons-d': {
    d: [
      { word: 'dog', zh: '狗' }, { word: 'red', zh: '红色的' }, { word: 'dad', zh: '爸爸' },
      { word: 'door', zh: '门' }, { word: 'day', zh: '天' }
    ],
    dd: [
      { word: 'ladder', zh: '梯子' }, { word: 'middle', zh: '中间' }, { word: 'sudden', zh: '突然的' },
      { word: 'address', zh: '地址' }
    ],
    ed: [
      { word: 'played', zh: '玩（过去式）' }, { word: 'opened', zh: '打开（过去式）' },
      { word: 'listened', zh: '听（过去式）' }, { word: 'cleaned', zh: '打扫（过去式）' },
      { word: 'moved', zh: '移动（过去式）' }
    ]
  },

  'cons-g': {
    g: [
      { word: 'go', zh: '去' }, { word: 'bag', zh: '包' }, { word: 'big', zh: '大的' },
      { word: 'girl', zh: '女孩' }, { word: 'green', zh: '绿色的' }
    ],
    gg: [
      { word: 'bigger', zh: '更大的' }, { word: 'egg', zh: '蛋' }, { word: 'luggage', zh: '行李' },
      { word: 'beggar', zh: '乞丐' }
    ],
    gh: [
      { word: 'ghost', zh: '鬼' }, { word: 'spaghetti', zh: '意大利面' }
    ]
  },

  'cons-v': {
    v: [
      { word: 'van', zh: '货车' }, { word: 'seven', zh: '七' }, { word: 'five', zh: '五' },
      { word: 'very', zh: '非常' }, { word: 'river', zh: '河' }
    ],
    ve: [
      { word: 'love', zh: '爱' }, { word: 'give', zh: '给' }, { word: 'live', zh: '居住' },
      { word: 'have', zh: '有' }, { word: 'save', zh: '拯救' }
    ]
  },

  'cons-z': {
    z: [
      { word: 'zoo', zh: '动物园' }, { word: 'zip', zh: '拉链' }, { word: 'zero', zh: '零' },
      { word: 'zebra', zh: '斑马' }, { word: 'lazy', zh: '懒的' }
    ],
    s: [
      { word: 'is', zh: '是' }, { word: 'has', zh: '有（三单）' }, { word: 'nose', zh: '鼻子' },
      { word: 'easy', zh: '容易的' }, { word: 'music', zh: '音乐' }
    ],
    zz: [
      { word: 'buzz', zh: '嗡嗡叫' }, { word: 'jazz', zh: '爵士乐' }, { word: 'dizzy', zh: '头晕的' },
      { word: 'puzzle', zh: '拼图' }
    ],
    se: [
      { word: 'rose', zh: '玫瑰' }, { word: 'cheese', zh: '奶酪' }, { word: 'please', zh: '请' },
      { word: 'these', zh: '这些' }
    ]
  },

  'cons-zh': {
    si: [
      { word: 'vision', zh: '视觉' }, { word: 'decision', zh: '决定' },
      { word: 'television', zh: '电视' }, { word: 'division', zh: '分开' }
    ],
    su: [
      { word: 'measure', zh: '测量' }, { word: 'pleasure', zh: '愉快' },
      { word: 'treasure', zh: '宝藏' }, { word: 'usual', zh: '通常的' }
    ],
    ge: [
      { word: 'beige', zh: '米色' }, { word: 'garage', zh: '车库' }, { word: 'massage', zh: '按摩' }
    ]
  },

  'cons-j': {
    j: [
      { word: 'jam', zh: '果酱' }, { word: 'jump', zh: '跳' }, { word: 'juice', zh: '果汁' },
      { word: 'jacket', zh: '夹克' }, { word: 'joke', zh: '玩笑' }
    ],
    g: [
      { word: 'giant', zh: '巨人' }, { word: 'gym', zh: '健身房' }, { word: 'magic', zh: '魔法' },
      { word: 'gentle', zh: '温柔的' }, { word: 'danger', zh: '危险' }
    ],
    dge: [
      { word: 'bridge', zh: '桥' }, { word: 'judge', zh: '法官' }, { word: 'edge', zh: '边缘' },
      { word: 'fridge', zh: '冰箱' }, { word: 'badge', zh: '徽章' }
    ],
    ge: [
      { word: 'age', zh: '年龄' }, { word: 'page', zh: '页' }, { word: 'large', zh: '大的' },
      { word: 'huge', zh: '巨大的' }, { word: 'change', zh: '改变' }
    ]
  },

  'cons-dh': {
    th: [
      { word: 'this', zh: '这个' }, { word: 'mother', zh: '母亲' }, { word: 'they', zh: '他们' },
      { word: 'breathe', zh: '呼吸' }, { word: 'father', zh: '父亲' }
    ]
  },

  'cons-m': {
    m: [
      { word: 'man', zh: '男人' }, { word: 'mum', zh: '妈妈' }, { word: 'milk', zh: '牛奶' },
      { word: 'map', zh: '地图' }, { word: 'time', zh: '时间' }
    ],
    mm: [
      { word: 'summer', zh: '夏天' }, { word: 'hammer', zh: '锤子' }, { word: 'comment', zh: '评论' },
      { word: 'swimming', zh: '游泳' }
    ],
    mb: [
      { word: 'lamb', zh: '小羊' }, { word: 'climb', zh: '爬' }, { word: 'comb', zh: '梳子' },
      { word: 'thumb', zh: '拇指' }
    ]
  },

  'cons-n': {
    n: [
      { word: 'net', zh: '网' }, { word: 'sun', zh: '太阳' }, { word: 'nine', zh: '九' },
      { word: 'nose', zh: '鼻子' }, { word: 'name', zh: '名字' }
    ],
    nn: [
      { word: 'dinner', zh: '晚餐' }, { word: 'funny', zh: '有趣的' }, { word: 'sunny', zh: '晴朗的' },
      { word: 'running', zh: '跑步' }
    ],
    kn: [
      { word: 'know', zh: '知道' }, { word: 'knee', zh: '膝盖' }, { word: 'knife', zh: '刀' },
      { word: 'knock', zh: '敲' }
    ],
    gn: [
      { word: 'sign', zh: '标志' }, { word: 'design', zh: '设计' }, { word: 'foreign', zh: '外国的' },
      { word: 'campaign', zh: '运动；活动' }
    ]
  },

  'cons-ng': {
    ng: [
      { word: 'sing', zh: '唱歌' }, { word: 'long', zh: '长的' }, { word: 'ring', zh: '戒指' },
      { word: 'going', zh: '去' }, { word: 'morning', zh: '早上' }
    ],
    n: [
      { word: 'bank', zh: '银行' }, { word: 'pink', zh: '粉色的' }, { word: 'think', zh: '想' },
      { word: 'thank', zh: '感谢' }, { word: 'uncle', zh: '叔叔' }
    ]
  },

  'cons-l': {
    l: [
      { word: 'leg', zh: '腿' }, { word: 'light', zh: '光' }, { word: 'love', zh: '爱' },
      { word: 'milk', zh: '牛奶' }, { word: 'blue', zh: '蓝色的' }
    ],
    ll: [
      { word: 'bell', zh: '铃' }, { word: 'ball', zh: '球' }, { word: 'yellow', zh: '黄色的' },
      { word: 'hello', zh: '你好' }, { word: 'small', zh: '小的' }
    ]
  },

  'cons-r': {
    r: [
      { word: 'red', zh: '红色的' }, { word: 'run', zh: '跑' }, { word: 'rice', zh: '米饭' },
      { word: 'road', zh: '路' }, { word: 'bread', zh: '面包' }
    ],
    rr: [
      { word: 'carry', zh: '携带' }, { word: 'sorry', zh: '抱歉的' }, { word: 'hurry', zh: '匆忙' },
      { word: 'marry', zh: '结婚' }
    ],
    wr: [
      { word: 'write', zh: '写' }, { word: 'wrong', zh: '错误的' }, { word: 'wrist', zh: '手腕' },
      { word: 'wrap', zh: '包裹' }
    ]
  },

  'cons-w': {
    w: [
      { word: 'wet', zh: '湿的' }, { word: 'win', zh: '赢' }, { word: 'water', zh: '水' },
      { word: 'window', zh: '窗户' }, { word: 'week', zh: '星期' }
    ],
    wh: [
      { word: 'when', zh: '什么时候' }, { word: 'wheel', zh: '轮子' }, { word: 'white', zh: '白色的' },
      { word: 'why', zh: '为什么' }, { word: 'which', zh: '哪一个' }
    ]
  },

  'cons-y': {
    y: [
      { word: 'yes', zh: '是的' }, { word: 'yellow', zh: '黄色的' }, { word: 'year', zh: '年' },
      { word: 'young', zh: '年轻的' }, { word: 'you', zh: '你' }
    ],
    u: [
      { word: 'music', zh: '音乐' }, { word: 'use', zh: '使用' }, { word: 'cute', zh: '可爱的' },
      { word: 'human', zh: '人类' }, { word: 'huge', zh: '巨大的' }
    ],
    i: [
      { word: 'onion', zh: '洋葱' }, { word: 'million', zh: '百万' }, { word: 'senior', zh: '年长的' },
      { word: 'companion', zh: '同伴' }
    ]
  },

  'cons-dr': {
    dr: [
      { word: 'dream', zh: '梦' }, { word: 'dress', zh: '连衣裙' }, { word: 'drive', zh: '驾驶' },
      { word: 'drum', zh: '鼓' }, { word: 'children', zh: '孩子们' }
    ]
  },

  'cons-dz': {
    ds: [
      { word: 'beds', zh: '床（复数）' }, { word: 'hands', zh: '手（复数）' },
      { word: 'needs', zh: '需要（三单）' }, { word: 'friends', zh: '朋友（复数）' },
      { word: 'words', zh: '单词（复数）' }
    ],
    des: [
      { word: 'rides', zh: '骑（三单）' }, { word: 'grades', zh: '年级（复数）' },
      { word: 'decides', zh: '决定（三单）' }
    ]
  }
};

export default wordGroups;
