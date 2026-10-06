# 自然拼读 Phonics · 英语发音学习平台

面向英语初学者（儿童 / 成人零基础）的**英语自然拼读学习 Web 应用**。核心闭环：**看音素 → 听发音 → 跟读练习 → 闪卡记忆**。

纯 HTML / CSS / JavaScript，**零外部依赖、零构建工具、无后端**，浏览器直接打开即可使用。

---

## 功能

| 标签页 | 内容 | 规模 |
|---|---|---|
| **音素** | 48 个国际音标卡片：IPA、口型提示、"音 → 字母"常见拼写、例词发音 | 48 音素 / 210 例词 |
| **组合** | 常见字母组合（含 Magic e）的拼读规则 | 69 组合 |
| **规则** | 例外读音规则（如 kn-、-mb、-gh） | 14 条 |
| **句子** | 整句跟读练习，命中音素高亮 | 12 句 |
| **闪卡** | 单词闪卡记忆，含音标与中文释义 | 拼写分组 144 组 / 650 词 |

**48 音素口径**（与国内教材一致）：元音 20（单元音 12 = 短元音 7 + 长元音 5，双元音 8）+ 辅音 28（清辅音 11 + 浊辅音 17）。`/tr/ /dr/ /ts/ /dz/` 按国内教材计为独立音素。

其他能力：

- **口音切换**：英音 / 美音
- **语速调节**：多档可选
- **发音来源**：自动 / 系统语音 / 在线发音，选择持久化到 `localStorage`
- **发音自检面板**：展示浏览器支持情况、系统语音数量、匹配到的发音人、最近错误，一键复制诊断报告
- **拼写分类练习**：点音素卡上的任一拼写标签，弹出该拼写对应的单词组（点击发音）
- **响应式**：适配手机与桌面

---

## 目录结构

```
phonics-app/
├── index.html                 # 模块版入口（需 HTTP 服务）
├── phonics-standalone.html    # 单文件版（双击即用，CSS/JS 全内联）
├── css/
│   └── style.css
├── data/                      # 纯数据模块（ES Module 导出）
│   ├── phonemes.js            # 48 音素
│   ├── combos.js              # 69 字母组合
│   ├── irregulars.js          # 14 条例外规则
│   ├── sentences.js           # 12 句跟读
│   └── word-groups.js         # 拼写分组练习词（144 组 / 650 词）
├── js/
│   ├── app.js                 # 应用外壳：设置、标签导航、页面调度
│   ├── speech.js              # 唯一发音入口（双通道）
│   ├── data-index.js          # 数据索引与统计
│   ├── diagnostics.js         # 发音自检面板
│   ├── letter-practice.js     # 拼写分类练习弹窗
│   ├── ui.js                  # 通用组件与提示
│   └── pages/                 # 5 个标签页
├── build-standalone.mjs       # 单文件版打包脚本
└── web.config                 # IIS 站点配置（MIME + 默认文档）
```

---

## 运行方式

### 方式一：双击单文件版（最简单）

直接双击 `phonics-standalone.html`。CSS 与全部模块已内联，`file://` 下可用。

### 方式二：本地服务器跑模块版（推荐开发用）

```bash
cd phonics-app
python -m http.server 8080
# 打开 http://localhost:8080/
```

> 注意：直接双击 `index.html` 会因浏览器安全策略拦截 ES Module 加载，页面给出提示并引导改用单文件版。这是正常现象。

### 方式三：IIS

站点根指向项目根目录，`web.config` 已显式声明 `.js` / `.mjs` / `.json` / `.css` 等 MIME 类型与默认文档。

---

## 构建

修改 `js/` `css/` `data/` 下任何源码后，**必须重新生成单文件版**：

```bash
node build-standalone.mjs
```

打包脚本在内联正则匹配不上时会**直接抛错**，不会静默产出残缺产物。

---

## 发音模块设计

`js/speech.js` 是唯一发音入口，对外只暴露 `speak() / stop() / isSupported() / setAccent() / setRate() / onReady() / setOnlineTTS()` 等接口，页面层不直接触碰 `speechSynthesis`。

**双通道策略**：

1. **系统通道**（Web Speech API，优先）：等待语音列表就绪（`voiceschanged` + 轮询 + 1.5s 结论）；`cancel()` 后延迟 70ms 再 `speak()`（Chrome 同 tick 会互相吞掉）；1.6s 内未收到 `onstart` 判定为静默失败 → 换发音人重试 → 再兜底。每个 Promise 都有硬超时，避免按钮永久卡在"播放中…"。
2. **在线通道**（兜底）：`<audio>` 播放在线发音接口。该接口只对**单词**稳定返回音频，**整句会 500**，因此整句拆词依次播放（最多 24 词，词间 110ms）——对拼读练习反而更合适。

**替换为云 TTS 只需改 `js/speech.js` 一个文件**，或调用 `setOnlineTTS(fn)` 替换在线通道。

---

## 开发约定

### 数据模块（`data/*.js`）

- 音素字段：`id`、`ipa`、`type`、`category`、`voiced`（仅辅音）、`letters`、`exampleWords`、`mouthTip`
- 例词结构固定为 `{ word, ipa, zh }`（闪卡依赖 `zh` 与 `ipa`）
- `letters` = 该音的常见字母 / 字母组合拼写，按常见度排序，**第一条为最常见**；Magic e 统一写 `a_e` / `i_e` 下划线形式
- `word-groups.js` 的键与 `phonemes.js` 的 `letters` **一一对应且顺序一致**
- 句子额外带 `highlightWords`（`highlight` 里的模式不是字面子串，界面无法直接定位）
- id 命名：小写 + 连字符（`short-a`、`combo-ai`、`irregular-kn`、`sent-cat-mat`）

### ⚠️ 打包器限制

`build-standalone.mjs` 会把所有模块内联进**同一个 IIFE**，因此各文件顶层的 `let` / `const` / `function` 名**不能重名**，否则语法自检会直接报 `Identifier 'x' has already been declared`。

**新增 js 模块前先做顶层标识符查重**：

```bash
grep -rh "^\(let\|const\|var\|function\)[ {]" js/ | sort | uniq -d
```

已被占用的常见名：`overlay`、`state`。

---

## 待办

- [ ] 跟读评测（Web Speech Recognition）——句子页按钮目前为占位
- [ ] 腾讯云 TTS 接入——`speech.js` 接口已留好

---

## 浏览器支持

推荐最新版 Chrome / Edge / Safari。若系统未安装语音包，应用会自动切换到在线发音兜底（需联网）。

---

## License

MIT
