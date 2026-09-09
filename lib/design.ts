export const roles = [
  ['primary', '品牌主色', '主要按钮、选中状态与关键链接'],
  ['background', '页面背景', '整个页面的底色'],
  ['surface', '容器背景', '卡片、表单与浮层'],
  ['text', '主要文字', '标题、正文与重要信息'],
  ['muted', '次要文字', '说明、标签与辅助信息'],
  ['border', '边框颜色', '分隔线、输入框与容器边界'],
  ['success', '成功状态', '完成、通过与正向反馈'],
  ['warning', '警告状态', '待处理、提醒与风险'],
  ['danger', '错误状态', '失败、删除与异常'],
] as const;
export type ColorKey = (typeof roles)[number][0];
export type Colors = Record<ColorKey, string>;
export type Design = {
  name: string;
  palette: string;
  colors: Colors;
  font: string;
  base: number;
  scale: number;
  lineHeight: number;
  unit: number;
  density: string;
  radius: number;
  shadow: string;
  button: string;
};
const semantic = { success: '#247351', warning: '#9A650C', danger: '#C13E3E' };
export const palettes = [
  {
    name: '松间白',
    en: 'Pine & Paper',
    mood: '沉静 · 清晰',
    colors: {
      primary: '#356859',
      background: '#F5F6F3',
      surface: '#FFFFFF',
      text: '#24342D',
      muted: '#68746C',
      border: '#DFE5DF',
      ...semantic,
    },
  },
  {
    name: '落日来信',
    en: 'Terracotta',
    mood: '温暖 · 人文',
    colors: {
      primary: '#A74B35',
      background: '#FAF6F1',
      surface: '#FFFFFF',
      text: '#392D29',
      muted: '#7C6B63',
      border: '#E8DED4',
      ...semantic,
    },
  },
  {
    name: '深海航线',
    en: 'Deep Atlantic',
    mood: '理性 · 专注',
    colors: {
      primary: '#285B87',
      background: '#F2F5F8',
      surface: '#FFFFFF',
      text: '#213245',
      muted: '#647588',
      border: '#D9E2EB',
      ...semantic,
    },
  },
  {
    name: '墨与留白',
    en: 'Ink & Space',
    mood: '克制 · 纯粹',
    colors: {
      primary: '#303033',
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#242426',
      muted: '#707075',
      border: '#E0E0E3',
      ...semantic,
    },
  },
  {
    name: '暮色葡萄',
    en: 'After Hours',
    mood: '独特 · 柔和',
    colors: {
      primary: '#71518A',
      background: '#F7F4F9',
      surface: '#FFFFFF',
      text: '#342B3C',
      muted: '#796C83',
      border: '#E5DDEB',
      ...semantic,
    },
  },
  {
    name: '柠檬书页',
    en: 'Citrus Notes',
    mood: '明快 · 自由',
    colors: {
      primary: '#6D691D',
      background: '#FAFAEF',
      surface: '#FFFFFF',
      text: '#333526',
      muted: '#70725E',
      border: '#E4E5D1',
      ...semantic,
    },
  },
  {
    name: '玫瑰砂岩',
    en: 'Rose Stone',
    mood: '细腻 · 亲切',
    colors: {
      primary: '#A34765',
      background: '#FAF4F5',
      surface: '#FFFFFF',
      text: '#3C2D33',
      muted: '#816970',
      border: '#E9DDE1',
      ...semantic,
    },
  },
  {
    name: '午夜电台',
    en: 'Midnight Radio',
    mood: '深邃 · 夜间',
    colors: {
      primary: '#9EB9F6',
      background: '#181C24',
      surface: '#222834',
      text: '#EEF1F7',
      muted: '#A4AEBD',
      border: '#454F60',
      success: '#83C5A4',
      warning: '#E3BF72',
      danger: '#F19494',
    },
  },
];
export const fonts: Record<string, string> = {
  sans: '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif',
  serif: '"Songti SC", "Noto Serif CJK SC", SimSun, serif',
  humanist: '"Avenir Next", "PingFang SC", "Microsoft YaHei", sans-serif',
};
export const fontNames: Record<string, string> = {
  sans: '现代黑体',
  serif: '人文宋体',
  humanist: '柔和几何',
};
export const defaults: Design = {
  name: '我的设计规范',
  palette: palettes[0].name,
  colors: { ...palettes[0].colors },
  font: 'sans',
  base: 14,
  scale: 1.25,
  lineHeight: 1.6,
  unit: 4,
  density: '舒适',
  radius: 8,
  shadow: '轻盈',
  button: '实色',
};
export function luminance(hex: string) {
  const v = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((c) => parseInt(c, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}
export function contrast(a: string, b: string) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
export function onColor(color: string) {
  return contrast(color, '#FFFFFF') >= contrast(color, '#171717')
    ? '#FFFFFF'
    : '#171717';
}
export function typeSizes(s: Design) {
  return {
    caption: Math.max(12, s.base - 2),
    body: s.base,
    h3: Math.round(s.base * s.scale),
    h2: Math.round(s.base * s.scale ** 2),
    h1: Math.round(s.base * s.scale ** 3),
  };
}
export function tokens(s: Design): Record<string, string> {
  const c = s.colors,
    t = typeSizes(s),
    pad = s.unit * (s.density === '紧凑' ? 4 : s.density === '宽松' ? 8 : 6);
  return {
    '--p-primary': c.primary,
    '--p-background': c.background,
    '--p-surface': c.surface,
    '--p-text': c.text,
    '--p-muted': c.muted,
    '--p-border': c.border,
    '--p-success': c.success,
    '--p-warning': c.warning,
    '--p-danger': c.danger,
    '--p-on-primary': onColor(c.primary),
    '--p-soft': `color-mix(in srgb, ${c.primary} 10%, ${c.surface})`,
    '--p-hover': `color-mix(in srgb, ${c.primary} 88%, ${onColor(c.primary) === '#FFFFFF' ? '#000000' : '#FFFFFF'})`,
    '--p-font': fonts[s.font],
    '--p-body': `${t.body}px`,
    '--p-caption': `${t.caption}px`,
    '--p-h1': `${t.h1}px`,
    '--p-h2': `${t.h2}px`,
    '--p-h3': `${t.h3}px`,
    '--p-line': String(s.lineHeight),
    '--p-unit': `${s.unit}px`,
    '--p-padding': `${pad}px`,
    '--p-gap': `${s.unit * 4}px`,
    '--p-radius': `${s.radius}px`,
    '--p-control': `${s.density === '紧凑' ? 32 : s.density === '宽松' ? 44 : 38}px`,
    '--p-shadow':
      s.shadow === '无阴影'
        ? 'none'
        : s.shadow === '轻盈'
          ? '0 3px 12px rgb(0 0 0 / 4%)'
          : '0 8px 24px rgb(0 0 0 / 10%)',
  };
}
export function checks(s: Design) {
  const c = s.colors;
  return [
    ['正文 / 容器', contrast(c.text, c.surface)],
    ['正文 / 页面', contrast(c.text, c.background)],
    ['辅助文字 / 容器', contrast(c.muted, c.surface)],
    ['辅助文字 / 页面', contrast(c.muted, c.background)],
    ['主色文字 / 容器', contrast(c.primary, c.surface)],
    ['按钮文字 / 主色', contrast(onColor(c.primary), c.primary)],
  ] as [string, number][];
}
export function sanitize(value: unknown): Design | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Design;
  if (
    !v.colors ||
    !roles.every(([key]) => /^#[0-9a-f]{6}$/i.test(v.colors[key]))
  )
    return null;
  return {
    ...defaults,
    ...v,
    name: typeof v.name === 'string' ? v.name.slice(0, 60) : defaults.name,
    font: v.font in fonts ? v.font : 'sans',
    base: Math.max(12, Math.min(18, Number(v.base) || 14)),
    scale: Math.max(1.125, Math.min(1.5, Number(v.scale) || 1.25)),
    lineHeight: Math.max(1.3, Math.min(2, Number(v.lineHeight) || 1.6)),
    unit: [4, 6, 8].includes(v.unit) ? v.unit : 4,
    density: ['紧凑', '舒适', '宽松'].includes(v.density) ? v.density : '舒适',
    radius: Math.max(0, Math.min(24, Number(v.radius) || 0)),
    shadow: ['无阴影', '轻盈', '柔和'].includes(v.shadow) ? v.shadow : '轻盈',
    button: ['实色', '描边'].includes(v.button) ? v.button : '实色',
  };
}
export function markdown(s: Design) {
  const t = typeSizes(s);
  const warn = checks(s).filter(([, r]) => r < 4.5);
  return `# ${s.name.replace(/[\r\n#]/g, ' ').trim() || '我的设计规范'}

> 由基调生成。此文件是本项目所有页面的统一视觉约束；请先阅读，再生成或修改 UI。

## 1. 设计原则
- 使用语义变量，不在各个页面单独定义颜色、字号、圆角与间距。
- 先建立信息层级，再使用颜色。主色用于主要操作；状态色只表达业务状态。
- 同级标题、同类按钮、相同表单字段跨页面保持一致。
- 新增样式前优先复用现有 Token；确需扩展时，先更新本文档。

## 2. 颜色体系
方案：${s.palette}

| 语义 | 色值 | 用途 |
| --- | --- | --- |
${roles.map(([k, label, use]) => `| ${label} | ${s.colors[k]} | ${use} |`).join('\n')}
| 主按钮文字 | ${onColor(s.colors.primary)} | 根据主色自动选择高对比文字 |

不要把品牌主色用于所有正文，不要用警告或错误色作装饰。同一状态保留同一颜色，颜色之外同时使用文字或图标说明。

## 3. 字体与排版
- 字体方案：${fontNames[s.font]}。字体栈：\`${fonts[s.font]}\`。按设备可用字体回退，不保证各系统字形完全相同。
- 正文基准：${s.base}px；层级倍率：${s.scale}；正文行高：${s.lineHeight}。

| 层级 | 字号 | 字重 | 用途 |
| --- | --- | --- | --- |
| H1 | ${t.h1}px | 600 | 页面唯一主标题 |
| H2 | ${t.h2}px | 600 | 区块标题 |
| H3 | ${t.h3}px | 600 | 子区块标题 |
| 正文 | ${t.body}px | 400 | 常规内容、表单输入 |
| 辅助 | ${t.caption}px | 400 | 次要说明，不能承载唯一关键指令 |

标题行高 1.3；数字使用 tabular-nums；正文每行建议不超过 75 个字符。禁止随意增加零散字号。

## 4. 布局与间距
- 基础单位：${s.unit}px。允许间距：${[1, 2, 3, 4, 6, 8, 12].map((x) => x * s.unit + 'px').join('、')}。
- 密度：${s.density}；容器内边距：${tokens(s)['--p-padding']}；区块间距：${s.unit * 4}px；控件最小高度：${tokens(s)['--p-control']}。
- 桌面采用可伸缩内容区；小于 768px 时多列堆叠，表格在自身容器内横向滚动，禁止页面整体溢出。
- 移动端交互目标至少 44px；放大文字后允许换行和布局重排。

## 5. 组件风格与状态
- 统一圆角：${s.radius}px；边框：1px solid var(--p-border)；阴影：${s.shadow}。
- 主按钮：${s.button === '实色' ? '主色背景 + 主按钮文字色' : '透明背景 + 主色文字及边框'}。次按钮：容器背景 + 正文颜色 + 边框。危险操作使用错误色并配明确文字。
- Hover：主按钮${s.button === '实色' ? '使用 --p-hover' : '使用 --p-soft'}；链接加下划线。
- Focus：2px 实线主色轮廓，offset 3px，不移除键盘焦点。
- Disabled：opacity .45，禁止触发动作；Loading：保留按钮尺寸，显示文字状态并阻止重复提交。
- Error：错误文字靠近输入项；Empty：说明原因和下一步；Success：明确反馈结果，不仅变色。
- 动效仅用于状态反馈，时长 160ms，尊重 prefers-reduced-motion。

## 6. CSS 变量
以下变量与工作台实时预览使用同一份配置。生产中可按 16px 根字号换算为 rem。

\`\`\`css
:root {
${Object.entries(tokens(s))
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n')}
}
.primary-button {
  background: ${s.button === '实色' ? 'var(--p-primary)' : 'transparent'};
  color: ${s.button === '实色' ? 'var(--p-on-primary)' : 'var(--p-primary)'};
  border: 1px solid var(--p-primary);
  border-radius: var(--p-radius);
  min-height: var(--p-control);
  padding-inline: calc(var(--p-unit) * 4);
}
.primary-button:hover { background: ${s.button === '实色' ? 'var(--p-hover)' : 'var(--p-soft)'}; }
:focus-visible { outline: 2px solid var(--p-primary); outline-offset: 3px; }
\`\`\`

## 7. 可读性检查
普通文字使用 4.5:1 作为对比度检查阈值；以下仅检查列出的配对，不代表整站无障碍认证。

| 颜色配对 | 对比度 | 结果 |
| --- | --- | --- |
${checks(s)
  .map(
    ([label, r]) =>
      `| ${label} | ${r.toFixed(2)}:1 | ${r >= 4.5 ? '通过' : '需要调整'} |`,
  )
  .join('\n')}

${warn.length ? `注意：当前 ${warn.length} 组配色尚未通过普通文字检查，请调整后用于相应场景。` : '以上配对均通过普通文字对比度检查。'}
状态色、边框、图表及 hover 状态仍需在实际组件中结合背景验证。不得仅用颜色传达信息。

## 8. 给 CodeBuddy 的执行要求
请先读取本文件，再实现页面。将上述变量集中维护，所有页面及复用组件引用它们。不得自动替换成默认蓝紫渐变，不得添加无语义的彩色卡片或 Emoji 图标，不得自行修改字体层级。使用同一套线性图标库。完成后检查桌面和移动端、键盘焦点、表单反馈、溢出和对比度。遇到规范缺失时提出具体扩展建议，避免静默引入第二套样式。
`;
}
