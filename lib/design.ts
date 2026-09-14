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
  iconLibrary: string;
  iconStyle: string;
  iconSize: number;
  iconStroke: number;
  metricValueSize: number;
  cardHeaderHeight: number;
  chartPalette: string;
  chartColors: string[];
  chartTitleSize: number;
  chartLabelSize: number;
  chartAxisSize: number;
  chartCardPadding: number;
  chartLegend: string;
  chartGrid: string;
  chartHeight: number;
  chartMaxCategories: number;
  chartBarGap: number;
  chartLabelStrategy: string;
  pageGrid: string;
  contentWidth: number;
  tableRowHeight: number;
  motionDuration: number;
  motionEasing: string;
  darkMode: string;
};
const semantic = { success: '#087A5B', warning: '#9A5B00', danger: '#C13F55' };
export const palettes = [
  {
    name: '晴空蓝',
    en: 'Clear Sky',
    mood: '清爽 · 可信',
    colors: {
      primary: '#2563EB',
      background: '#F6F9FF',
      surface: '#FFFFFF',
      text: '#172033',
      muted: '#5F6B7C',
      border: '#DCE6F5',
      ...semantic,
    },
  },
  {
    name: '海盐青',
    en: 'Sea Salt',
    mood: '洁净 · 专注',
    colors: {
      primary: '#087A72',
      background: '#F2FBF9',
      surface: '#FFFFFF',
      text: '#123B39',
      muted: '#5D706E',
      border: '#D5EDEA',
      ...semantic,
    },
  },
  {
    name: '薄荷叶',
    en: 'Mint Leaf',
    mood: '自然 · 轻盈',
    colors: {
      primary: '#2F735C',
      background: '#F4FAF7',
      surface: '#FFFFFF',
      text: '#18382E',
      muted: '#60736C',
      border: '#D9EAE2',
      ...semantic,
    },
  },
  {
    name: '冰川青',
    en: 'Glacier Cyan',
    mood: '明净 · 理性',
    colors: {
      primary: '#08758A',
      background: '#F1FAFC',
      surface: '#FFFFFF',
      text: '#153A43',
      muted: '#5B7177',
      border: '#D4EAEF',
      ...semantic,
    },
  },
  {
    name: '矢车菊',
    en: 'Cornflower',
    mood: '现代 · 开阔',
    colors: {
      primary: '#4F63C7',
      background: '#F5F7FF',
      surface: '#FFFFFF',
      text: '#242B50',
      muted: '#656C86',
      border: '#DEE2F5',
      ...semantic,
    },
  },
  {
    name: '雨后紫',
    en: 'After Rain',
    mood: '柔和 · 清晰',
    colors: {
      primary: '#6D51B5',
      background: '#F8F5FF',
      surface: '#FFFFFF',
      text: '#342850',
      muted: '#70677F',
      border: '#E7DFF4',
      ...semantic,
    },
  },
  {
    name: '鸢尾蓝',
    en: 'Blue Iris',
    mood: '稳健 · 灵动',
    colors: {
      primary: '#3858B8',
      background: '#F4F6FD',
      surface: '#FFFFFF',
      text: '#202D51',
      muted: '#626D86',
      border: '#DCE2F1',
      ...semantic,
    },
  },
  {
    name: '樱花露',
    en: 'Sakura Dew',
    mood: '轻柔 · 亲和',
    colors: {
      primary: '#B33F70',
      background: '#FFF6FA',
      surface: '#FFFFFF',
      text: '#49263A',
      muted: '#7B6671',
      border: '#F0DDE7',
      ...semantic,
    },
  },
  {
    name: '珊瑚汽水',
    en: 'Coral Soda',
    mood: '明快 · 有温度',
    colors: {
      primary: '#C34E45',
      background: '#FFF7F5',
      surface: '#FFFFFF',
      text: '#482B29',
      muted: '#7A6966',
      border: '#F0DFDB',
      ...semantic,
    },
  },
  {
    name: '杏桃光',
    en: 'Apricot Light',
    mood: '温暖 · 通透',
    colors: {
      primary: '#A6531F',
      background: '#FFF9F3',
      surface: '#FFFFFF',
      text: '#442F24',
      muted: '#776A62',
      border: '#EFE2D6',
      ...semantic,
    },
  },
  {
    name: '金盏花',
    en: 'Marigold',
    mood: '活力 · 清爽',
    colors: {
      primary: '#8C6500',
      background: '#FFFBEE',
      surface: '#FFFFFF',
      text: '#3B3421',
      muted: '#716C5C',
      border: '#ECE5C9',
      ...semantic,
    },
  },
  {
    name: '青柠叶',
    en: 'Lime Leaf',
    mood: '新鲜 · 有序',
    colors: {
      primary: '#537315',
      background: '#F8FBEF',
      surface: '#FFFFFF',
      text: '#303A20',
      muted: '#68715B',
      border: '#E2EACF',
      ...semantic,
    },
  },
  {
    name: '湖心绿',
    en: 'Lake Green',
    mood: '安定 · 清透',
    colors: {
      primary: '#16725E',
      background: '#F2FAF7',
      surface: '#FFFFFF',
      text: '#183B32',
      muted: '#5E736D',
      border: '#D6EAE3',
      ...semantic,
    },
  },
  {
    name: '海湾蓝',
    en: 'Bay Blue',
    mood: '专业 · 轻快',
    colors: {
      primary: '#1767A2',
      background: '#F3F9FD',
      surface: '#FFFFFF',
      text: '#19374D',
      muted: '#60717E',
      border: '#D8E7F0',
      ...semantic,
    },
  },
  {
    name: '石墨纸',
    en: 'Graphite Paper',
    mood: '克制 · 中性',
    colors: {
      primary: '#374151',
      background: '#F7F8FA',
      surface: '#FFFFFF',
      text: '#202631',
      muted: '#667080',
      border: '#E0E4EA',
      ...semantic,
    },
  },
  {
    name: '深夜蓝',
    en: 'Night Blue',
    mood: '沉浸 · 夜间',
    colors: {
      primary: '#8FB7FF',
      background: '#111827',
      surface: '#1B2433',
      text: '#F3F7FD',
      muted: '#AAB6C7',
      border: '#3B475A',
      success: '#65C9A2',
      warning: '#E5B85C',
      danger: '#F18494',
    },
  },
];
export const fonts: Record<string, string> = {
  sans: '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif',
  serif: '"Songti SC", "Noto Serif CJK SC", SimSun, serif',
  humanist: '"Avenir Next", "PingFang SC", "Microsoft YaHei", sans-serif',
};
export const iconPackages: Record<string, string> = {
  Lucide: 'lucide-react',
  Phosphor: '@phosphor-icons/react',
  Heroicons: '@heroicons/react',
};
export const fontNames: Record<string, string> = {
  sans: '现代黑体',
  serif: '人文宋体',
  humanist: '柔和几何',
};
export const chartPalettes = [
  {
    name: '清泉分类',
    note: '高辨识分类 · 通用运营看板',
    colors: ['#2563EB', '#07887A', '#7656D8', '#CC4F74', '#B85C00', '#3F6F8F'],
  },
  {
    name: '海岛清风',
    note: '蓝青为主 · 清爽数据产品',
    colors: ['#0B74B8', '#008A78', '#5865C7', '#B34F8C', '#C26018', '#4B7180'],
  },
  {
    name: '果园晴日',
    note: '自然鲜明 · 业务类别较多',
    colors: ['#2F7D32', '#007F8B', '#6E59A8', '#C23E55', '#A76800', '#3A6EA5'],
  },
  {
    name: '春野花束',
    note: '清新多彩 · 标签与图形并用',
    colors: ['#187B65', '#4D7C0F', '#5065B5', '#A84C8A', '#C2563B', '#1D7A99'],
  },
  {
    name: '北欧晨光',
    note: '克制柔和 · 管理驾驶舱',
    colors: ['#3468C0', '#16867A', '#6658B6', '#B24E6B', '#AF6412', '#486A78'],
  },
  {
    name: '晴空信号',
    note: '清亮强调 · 实时监控与告警',
    colors: ['#006EB8', '#087F7B', '#5368D4', '#C14678', '#AC5D00', '#3C748F'],
  },
  {
    name: '蓝色层级',
    note: '顺序色板 · 同一指标由深到浅',
    colors: ['#0B4F8A', '#1768AC', '#2C7FB8', '#438FC1', '#4B8EBB', '#4F96C2'],
  },
  {
    name: '青色层级',
    note: '顺序色板 · 密度、进度与强弱',
    colors: ['#075E59', '#08766F', '#148C82', '#2C958A', '#37978C', '#42998E'],
  },
  {
    name: '紫色层级',
    note: '顺序色板 · 同类指标分层',
    colors: ['#4C3A86', '#5C46A0', '#6D54B8', '#7E65C8', '#8A72CB', '#947DD0'],
  },
  {
    name: '冷暖分歧',
    note: '分歧色板 · 围绕基准值比较',
    colors: ['#2458A6', '#3478BE', '#4B94B9', '#C76D5E', '#B84E52', '#93343D'],
  },
  {
    name: '盈亏分歧',
    note: '正负语义 · 必须同时显示符号与数值',
    colors: ['#0B6B57', '#17836A', '#4C9A88', '#DC765F', '#C85555', '#A83D48'],
  },
  {
    name: '中性强调',
    note: '多数降噪 · 单一重点高亮',
    colors: ['#2F66C7', '#52657E', '#5F6F82', '#6C7988', '#75818E', '#7E8995'],
  },
] as const;
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
  iconLibrary: 'Lucide',
  iconStyle: '线性',
  iconSize: 20,
  iconStroke: 2,
  metricValueSize: 30,
  cardHeaderHeight: 56,
  chartPalette: chartPalettes[0].name,
  chartColors: [...chartPalettes[0].colors],
  chartTitleSize: 16,
  chartLabelSize: 12,
  chartAxisSize: 11,
  chartCardPadding: 20,
  chartLegend: '顶部左对齐',
  chartGrid: '仅横向',
  chartHeight: 320,
  chartMaxCategories: 12,
  chartBarGap: 32,
  chartLabelStrategy: '自适应（推荐）',
  pageGrid: '12 列',
  contentWidth: 1440,
  tableRowHeight: 44,
  motionDuration: 160,
  motionEasing: '标准缓动',
  darkMode: '自动生成',
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
    '--p-info': c.primary,
    '--p-on-primary': onColor(c.primary),
    '--p-soft': `color-mix(in srgb, ${c.primary} 10%, ${c.surface})`,
    '--p-primary-hover': `color-mix(in srgb, ${c.primary} 88%, ${onColor(c.primary) === '#FFFFFF' ? '#000000' : '#FFFFFF'})`,
    '--p-primary-active': `color-mix(in srgb, ${c.primary} 76%, ${onColor(c.primary) === '#FFFFFF' ? '#000000' : '#FFFFFF'})`,
    '--p-primary-disabled': `color-mix(in srgb, ${c.primary} 40%, ${c.surface})`,
    '--p-hover': `color-mix(in srgb, ${c.primary} 88%, ${onColor(c.primary) === '#FFFFFF' ? '#000000' : '#FFFFFF'})`,
    '--p-surface-hover': `color-mix(in srgb, ${c.primary} 5%, ${c.surface})`,
    '--p-surface-active': `color-mix(in srgb, ${c.primary} 10%, ${c.surface})`,
    '--p-text-tertiary': `color-mix(in srgb, ${c.text} 58%, ${c.surface})`,
    '--p-text-disabled': `color-mix(in srgb, ${c.text} 38%, ${c.surface})`,
    '--p-focus': `color-mix(in srgb, ${c.primary} 72%, #FFFFFF)`,
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
    '--p-icon-size': `${s.iconSize}px`,
    '--p-icon-stroke': String(s.iconStroke),
    '--p-metric-value': `${s.metricValueSize}px`,
    '--p-card-header': `${s.cardHeaderHeight}px`,
    '--p-grid-columns': s.pageGrid.startsWith('8') ? '8' : '12',
    '--p-content-max': `${s.contentWidth}px`,
    '--p-table-row': `${s.tableRowHeight}px`,
    '--p-motion': `${s.motionDuration}ms`,
    '--p-ease':
      s.motionEasing === '快速进出'
        ? 'cubic-bezier(.2, 0, 0, 1)'
        : 'cubic-bezier(.2, .8, .2, 1)',
    '--p-shadow':
      s.shadow === '无阴影'
        ? 'none'
        : s.shadow === '轻盈'
          ? '0 3px 12px rgb(0 0 0 / 4%)'
          : '0 8px 24px rgb(0 0 0 / 10%)',
    '--chart-title': `${s.chartTitleSize}px`,
    '--chart-label': `${s.chartLabelSize}px`,
    '--chart-axis': `${s.chartAxisSize}px`,
    '--chart-card-padding': `${s.chartCardPadding}px`,
    '--chart-height': `${s.chartHeight}px`,
    '--chart-bar-gap': `${s.chartBarGap}%`,
    ...Object.fromEntries(
      s.chartColors.map((color, index) => [`--chart-${index + 1}`, color]),
    ),
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
export function chartChecks(s: Design) {
  return s.chartColors.map((color, index) => ({
    label: `图表色 ${index + 1}`,
    color,
    ratio: contrast(color, s.colors.surface),
    pass: contrast(color, s.colors.surface) >= 3,
  }));
}
const legacyPaletteMap: Record<string, string> = {
  松间白: '湖心绿',
  落日来信: '珊瑚汽水',
  深海航线: '海湾蓝',
  墨与留白: '石墨纸',
  暮色葡萄: '雨后紫',
  柠檬书页: '金盏花',
  玫瑰砂岩: '樱花露',
  午夜电台: '深夜蓝',
};
const legacyChartPaletteMap: Record<string, string> = {
  清晰分类: '清泉分类',
  克制商务: '北欧晨光',
  单色层级: '蓝色层级',
};
export function sanitize(value: unknown): Design | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Design;
  if (
    !v.colors ||
    !roles.every(([key]) => /^#[0-9a-f]{6}$/i.test(v.colors[key]))
  )
    return null;
  const paletteName = legacyPaletteMap[v.palette] ?? v.palette;
  const migratedPalette = palettes.find((item) => item.name === paletteName);
  const chartPaletteName =
    legacyChartPaletteMap[v.chartPalette] ?? v.chartPalette;
  const migratedChartPalette = chartPalettes.find(
    (item) => item.name === chartPaletteName,
  );
  return {
    ...defaults,
    ...v,
    palette: paletteName,
    colors:
      legacyPaletteMap[v.palette] && migratedPalette
        ? { ...migratedPalette.colors }
        : v.colors,
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
    iconLibrary: ['Lucide', 'Phosphor', 'Heroicons'].includes(v.iconLibrary)
      ? v.iconLibrary
      : defaults.iconLibrary,
    iconStyle: ['线性', '面性'].includes(v.iconStyle)
      ? v.iconStyle
      : defaults.iconStyle,
    iconSize: [16, 20, 24].includes(v.iconSize)
      ? v.iconSize
      : defaults.iconSize,
    iconStroke: [1.5, 1.75, 2, 2.25].includes(v.iconStroke)
      ? v.iconStroke
      : defaults.iconStroke,
    metricValueSize: [24, 28, 30, 32, 36, 40].includes(v.metricValueSize)
      ? v.metricValueSize
      : defaults.metricValueSize,
    cardHeaderHeight: [48, 56, 64, 72].includes(v.cardHeaderHeight)
      ? v.cardHeaderHeight
      : defaults.cardHeaderHeight,
    chartPalette:
      typeof chartPaletteName === 'string'
        ? chartPaletteName
        : defaults.chartPalette,
    chartColors:
      legacyChartPaletteMap[v.chartPalette] && migratedChartPalette
        ? [...migratedChartPalette.colors]
        : Array.isArray(v.chartColors) &&
            v.chartColors.length === 6 &&
            v.chartColors.every((color) => /^#[0-9a-f]{6}$/i.test(color))
          ? v.chartColors
          : [...defaults.chartColors],
    chartTitleSize: Math.max(
      14,
      Math.min(20, Number(v.chartTitleSize) || defaults.chartTitleSize),
    ),
    chartLabelSize: Math.max(
      11,
      Math.min(16, Number(v.chartLabelSize) || defaults.chartLabelSize),
    ),
    chartAxisSize: Math.max(
      10,
      Math.min(14, Number(v.chartAxisSize) || defaults.chartAxisSize),
    ),
    chartCardPadding: Math.max(
      16,
      Math.min(32, Number(v.chartCardPadding) || defaults.chartCardPadding),
    ),
    chartLegend: ['顶部左对齐', '顶部右对齐', '底部左对齐'].includes(
      v.chartLegend,
    )
      ? v.chartLegend
      : defaults.chartLegend,
    chartGrid: ['仅横向', '横纵都有', '不显示'].includes(v.chartGrid)
      ? v.chartGrid
      : defaults.chartGrid,
    chartHeight: [280, 320, 360, 400].includes(v.chartHeight)
      ? v.chartHeight
      : defaults.chartHeight,
    chartMaxCategories: [8, 12, 15].includes(v.chartMaxCategories)
      ? v.chartMaxCategories
      : defaults.chartMaxCategories,
    chartBarGap: [16, 20, 24, 28, 32, 36, 40, 44, 48].includes(v.chartBarGap)
      ? v.chartBarGap
      : defaults.chartBarGap,
    chartLabelStrategy: ['自适应（推荐）', '固定展示', '交互查看'].includes(
      v.chartLabelStrategy,
    )
      ? v.chartLabelStrategy
      : defaults.chartLabelStrategy,
    pageGrid: ['8 列', '12 列'].includes(v.pageGrid)
      ? v.pageGrid
      : defaults.pageGrid,
    contentWidth: [1200, 1440, 1600].includes(v.contentWidth)
      ? v.contentWidth
      : defaults.contentWidth,
    tableRowHeight: [36, 40, 44, 48, 52, 56].includes(v.tableRowHeight)
      ? v.tableRowHeight
      : defaults.tableRowHeight,
    motionDuration: [0, 160, 240].includes(v.motionDuration)
      ? v.motionDuration
      : defaults.motionDuration,
    motionEasing: ['标准缓动', '快速进出'].includes(v.motionEasing)
      ? v.motionEasing
      : defaults.motionEasing,
    darkMode: ['自动生成', '暂不导出'].includes(v.darkMode)
      ? v.darkMode
      : defaults.darkMode,
  };
}
export function markdown(s: Design) {
  const t = typeSizes(s);
  const warn = checks(s).filter(([, r]) => r < 4.5);
  const chartWarn = chartChecks(s).filter((item) => !item.pass);
  return `# ${s.name.replace(/[\r\n#]/g, ' ').trim() || '我的设计规范'}

> 由基调生成 · 规范版本 v1.1。此文件是本项目所有页面的统一视觉约束；请先阅读，再生成或修改 UI。

## 0. 变更门禁（必须执行）

> 本文件是前端与设计变更的执行契约，不是交付后的参考资料。任何 Agent、开发者或设计师在创建、修改、重构页面、组件、样式或图表前，必须完整阅读本文件并遵循以下顺序；未完成任一步，不得开始实现。

1. **先读规范**：确认本次涉及的颜色、排版、布局、组件、数据展示与可访问性规则。
2. **先写变更计划**：在代码前用 3–5 行说明“改什么、复用哪些 Token/组件、可能缺什么规范”。
3. **只复用，不临时造规则**：优先引用本文档中的变量和组件规则；禁止为单个页面新建零散 HEX、字号、间距、圆角、阴影或图表色板。
4. **规范缺失时先补文档**：需要新 Token、组件状态、页面模式或图表规则时，先提出补充建议，更新规范与预览，再改业务代码；不得静默引入第二套样式。
5. **完成前验收**：逐项检查桌面与移动端、键盘焦点、加载/空/错/无权限状态、文本和图形对比度、表格溢出、图表标签与数据口径；最后报告本次复用和新增的规范项。

每次交付必须附带以下声明：

\`\`\`text
已阅读 DESIGN_SYSTEM.md。
本次范围：…
复用的 Token / 组件：…
新增或补充的规范：无 / …
已检查：响应式、状态反馈、键盘焦点、对比度、数据口径。
\`\`\`

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

### 2.1 Token 分层与交互状态

颜色只允许按“原始色板 → 语义角色 → 组件状态”三层使用：原始色板只在 Token 定义中出现；页面引用语义角色；按钮、输入框、表格等组件再引用状态 Token。禁止组件内直接写 HEX。

| 组件状态 | Token | 规则 |
| --- | --- | --- |
| 默认 | --p-primary / --p-surface | 可交互对象的初始状态 |
| 悬停 | --p-primary-hover / --p-surface-hover | 只用于有指针或键盘焦点的对象 |
| 按下 | --p-primary-active / --p-surface-active | 必须短暂且不改变布局 |
| 禁用 | --p-primary-disabled / --p-text-disabled | 不可操作且保留原因说明 |
| 焦点 | --p-focus | 2px 轮廓、3px offset，始终可见 |

文本分为主要、次要、三级、禁用四层：--p-text、--p-muted、--p-text-tertiary、--p-text-disabled。${s.darkMode === '自动生成' ? '深色模式已纳入导出：从语义 Token 反推深色表面，不直接反转或复制浅色 HEX；正文对比度仍须达到 4.5:1。' : '当前未导出深色模式；新增深色页面前必须先补齐同名语义 Token，不能临时换色。'}

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

标题行高 1.3；正文行高遵循“字号 + 8px”的稳定节奏；数字使用 tabular-nums；正文每行建议不超过 75 个字符。表格和指标的数字右对齐，日期、金额、百分比的位数变化不得造成跳动。禁止随意增加零散字号或 500/700 等无定义字重。

## 4. 布局与间距
- 基础单位：${s.unit}px。允许间距：${[1, 2, 3, 4, 6, 8, 12].map((x) => x * s.unit + 'px').join('、')}。
- 密度：${s.density}；容器内边距：${tokens(s)['--p-padding']}；区块间距：${s.unit * 4}px；控件最小高度：${tokens(s)['--p-control']}。
- 桌面采用可伸缩内容区；小于 768px 时多列堆叠，表格在自身容器内横向滚动，禁止页面整体溢出。
- 移动端交互目标至少 44px；放大文字后允许换行和布局重排。
- 页面采用 ${s.pageGrid}响应式网格，内容最大宽度 ${s.contentWidth}px。桌面保留导航和内容层级；窄屏优先保留任务主路径，侧栏可收起但当前位置必须清楚。

### 页面模板
| 模板 | 首屏结构 | 必备规则 |
| --- | --- | --- |
| 看板 | 标题与时间范围 → 关键指标 → 关键图表/待办 | 一个页面只突出一个决策主题 |
| 列表 | 标题与主操作 → 筛选/结果数 → 表格 → 分页 | 批量操作只在选中后出现 |
| 详情 | 返回/面包屑 → 标题与状态 → 内容分区 | 状态、责任人和更新时间靠近标题 |
| 创建/编辑 | 标题 → 分组表单 → 固定操作区 | 字段标签可见，错误贴近字段 |
| 设置 | 分类导航 → 单一设置组 → 保存反馈 | 未保存变更必须可辨识 |

## 5. 组件风格与状态
- 统一圆角：${s.radius}px；边框：1px solid var(--p-border)；阴影：${s.shadow}。
- 主按钮：${s.button === '实色' ? '主色背景 + 主按钮文字色' : '透明背景 + 主色文字及边框'}。次按钮：容器背景 + 正文颜色 + 边框。危险操作使用错误色并配明确文字。
- Hover：主按钮${s.button === '实色' ? '使用 --p-hover' : '使用 --p-soft'}；链接加下划线。
- Focus：2px 实线主色轮廓，offset 3px，不移除键盘焦点。
- Disabled：opacity .45，禁止触发动作；Loading：保留按钮尺寸，显示文字状态并阻止重复提交。
- Error：错误文字靠近输入项；Empty：说明原因和下一步；Success：明确反馈结果，不仅变色。
- 动效仅用于状态反馈，时长 ${s.motionDuration}ms，节奏 ${s.motionEasing}。进入、退出、展开、反馈四类动效只使用这一组合；尊重 prefers-reduced-motion。

### 5.1 图标系统
- 唯一来源：${s.iconLibrary}，包名 \`${iconPackages[s.iconLibrary]}\`；风格：${s.iconStyle}；标准尺寸：${s.iconSize}px；${s.iconStyle === '线性' ? `描边 ${s.iconStroke}px，使用 currentColor` : '使用图标库原生 filled 版本，禁止给线性图标直接填充'}。同一页面不得混用不同图标库、线性与面性风格，不得使用 Emoji、Iconfont 私有字符或来源不明的 SVG 替代。
- 16px 用于表格行内与紧凑辅助操作，20px 用于按钮、表单和导航，24px 用于模块入口；只有空状态或功能说明可放大到 32–48px。
- 图标与文字间距 8px；图标按钮可见尺寸至少 32px，点击热区至少 40×40px，移动端至少 44×44px。图标不得单独承担陌生业务含义，默认同时显示文字标签。
- 装饰图标设置 aria-hidden；无可见文字的图标按钮必须有 aria-label；切换类图标还要暴露 aria-pressed 或 aria-expanded。
- 状态图标固定语义：信息/进行中使用主色，成功使用 success，注意/待处理使用 warning，错误/危险使用 danger，停用/未知使用 muted；颜色之外必须保留图标或文字。

| 状态 | 颜色 | 文案/图标要求 |
| --- | --- | --- |
| 信息、进行中、选中 | ${s.colors.primary} | 使用信息、时钟或选中图标，并写明当前状态 |
| 成功、正常、已完成 | ${s.colors.success} | 使用勾选图标和完成文案 |
| 注意、待处理、临期 | ${s.colors.warning} | 使用警告图标并说明处理时限 |
| 错误、阻断、危险 | ${s.colors.danger} | 使用错误图标，提供原因与恢复操作 |
| 停用、未知、次要 | ${s.colors.muted} | 使用中性文案，不得伪装成成功或失败 |

### 5.2 卡片与指标卡
- 普通卡片由 Header、Content、可选 Footer 组成。Header 最小高度 ${s.cardHeaderHeight}px，标题左对齐，主要操作右对齐；标题超过一行时允许两行，操作区保持顶部对齐，不压缩标题到省略号。
- 卡片内边距沿用 ${tokens(s)['--p-padding']}；标题与副标题间距 4px，Header 与内容间距 16px，正文区块间距 16–24px。卡片禁止再嵌套同等级卡片。
- KPI 卡只表达一个核心指标：标题 12–14px / 500，数值 ${s.metricValueSize}px / 600，单位 12–14px并与数字基线对齐，环比/同比 12px置于数值下方。数字使用 tabular-nums；数值最多两行，超长时缩写为万/亿并在 Tooltip 展示完整值。
- 同一行 KPI 卡高度一致；默认 3–4 张/行，卡片宽度小于 220px 时改为两列或单列，禁止继续缩小字号。没有比较基准时不显示伪造的涨跌状态。

## 6. 企业页面、数据与反馈
- 页面模式必须从“看板、列表、详情、创建/编辑”中选择，并明确本页的主要任务和主要操作；不要把多种任务堆到同一首屏。
- 列表与表格：默认行高 ${s.tableRowHeight}px；表头固定语义和对齐方式，数值右对齐、文本左对齐、状态居中；提供筛选、排序、分页或明确的结果数量。列过多时只允许表格容器横向滚动，不允许整页横向溢出。
- 状态基线：异步区域必须具备加载、空数据、错误、无权限四种状态。加载优先用与最终布局等宽高的骨架；空数据说明原因和下一步；错误说明可恢复动作；无权限说明如何申请。
- 操作反馈：保存、提交、导入等动作必须有进行中、成功和失败反馈；危险操作在执行前二次确认，成功后尽可能提供撤销；不使用只靠颜色的反馈。
- 数据表达：金额、百分比、日期、时区、单位和小数位在同一页面保持一致；未知值显示“—”并说明原因，禁止用 0 冒充缺失数据。敏感字段按权限脱敏，导出、复制与批量操作应记录或提示范围。
- 动效：默认 ${s.motionDuration === 0 ? '不使用动效' : `${s.motionDuration}ms`}；只用于解释状态或层级变化，不以循环、闪烁或位移吸引注意。系统开启减少动效时必须静止。

| 高风险场景 | 必须呈现 |
| --- | --- |
| 无权限 | 原因、所需权限与申请入口/联系人 |
| 批量操作 | 已选数量、影响范围与可撤销结果 |
| 危险操作 | 明确对象、不可逆影响与二次确认 |
| 并发冲突 | 哪个版本更新、可比较内容与保留/覆盖动作 |
| 保存失败 | 字段是否保留、失败原因与重试入口 |

## 7. 数据可视化规范
- 图表先回答一个问题，再选择图形。标题直接写清指标或结论，避免“数据分析”“趋势图”一类空泛标题。
- 图表卡片：标题位于左上角，字号 ${s.chartTitleSize}px、字重 600；副标题、数据标签与注释字号 ${s.chartLabelSize}px；坐标轴、刻度、图例和数据来源字号 ${s.chartAxisSize}px。所有文字允许按容器换行，禁止用缩小到 10px 以下的方式塞进一行。
- 卡片内边距：${s.chartCardPadding}px；标题区最小高度 ${s.cardHeaderHeight}px，绘图区基准高度 ${s.chartHeight}px；标题区、图例区、绘图区、结论区和来源区保持稳定顺序。标题最多两行，筛选或操作放在标题区右侧并保持顶部对齐。
- 图例：${s.chartLegend}；网格线：${s.chartGrid}。网格线使用边框色，不抢数据；轴线只在理解刻度所必需时出现。
- 坐标轴保留 4–6 个主要刻度；单位写在轴标题或卡片副标题中，不在每个刻度重复。数值统一千分位和小数位，0 基线必须可识别，截断坐标轴时要明确标注。
- 图例每行建议不超过 4 项，优先直接标注数据；系列超过 6 个时改用筛选、分面或小多图。注释只标记峰值、异常、目标等关键事件，单图最多 3 条，避免遮挡数据。
- 数据文字使用主要文字色；坐标轴、图例、口径和来源使用次要文字色；正负向语义分别使用成功色和错误色，不能只靠红绿区分。
- 分类色板（${s.chartPalette}）：${s.chartColors.join('、')}。同一业务对象跨图保持同色；单序列默认使用品牌主色，多序列再启用分类色。
- 标签策略：${s.chartLabelStrategy}。默认顺序是“完整显示 → 两行换行 → 缩写并提供 Tooltip → 间隔抽样 → 横向滚动/切换横向图”，不得直接裁掉关键标签。轴标签与图例不得小于 10px，业务中台建议保持 ${s.chartAxisSize}px。
- 分类数量上限：单张图默认最多 ${s.chartMaxCategories} 个可见类别；超出后优先聚合“其他”、提供 Top N/完整表格或切换为可筛选视图，禁止无限压缩柱宽、扇区或字号。
- 图表色与卡片背景的图形对比度：${chartChecks(s)
    .map(
      (item) =>
        `${item.label} ${item.ratio.toFixed(2)}:1 ${item.pass ? '通过' : '需调整'}`,
    )
    .join('；')}。图形对象以 3:1 为检查阈值。

| 图表 | 适用问题 | 统一规则 |
| --- | --- | --- |
| 柱状图 | 类别比较、排名 | 数值轴从 0 开始；柱宽 24–56px，当前柱间距 ${s.chartBarGap}%；建议 5–12 根，最多 ${s.chartMaxCategories} 根；长标签先两行，再改横向条形；无业务顺序时按数值排序；单序列不使用彩虹色。 |
| 折线图 | 连续时间趋势 | 建议 8–24 个时间点，超过 24 点按周期抽样或缩放；线宽 2px、点默认隐藏；最多 4 条同时可见，重点序列实线高亮，其余降噪；缺失值断线并标注，不得自动补 0 或连线。 |
| 饼图 / 环图 | 少量类别的粗略占比 | 只展示 2–5 个主要扇区，其余合并“其他”；环图外径建议 160–240px、内径为外径 55–65%；显示总量或明确分母；差异小于 5% 或需要精确比较时改用 100% 堆叠条形图。禁用 3D 与分离扇区。 |
| 桑基图 | 阶段间的数量流向 | 3–8 个阶段/主节点，节点宽 12–20px、同列间距至少 12px；从左到右，流带宽度映射数值，透明度 55–75%；标签贴近节点并保留数值，控制交叉，流入与流出口径必须守恒。 |

### 图表响应式与交互
- 绘图区使用容器宽度自适应，高度以 ${s.chartHeight}px 为基准而非绝对锁死：宽度小于 480px 时最低 240px；桑基图或长分类可在卡片内部横向滚动，但页面本身不得横向滚动。
- Tooltip 必须包含系列/类别、完整值、单位、时间与口径；跟随焦点和指针，不能遮住当前数据点。Hover 可增强反馈，但同等信息必须可通过键盘焦点和可见数据表获得。
- 数据更新不得造成卡片跳高；加载骨架与最终绘图区同尺寸。空数据、错误、无权限和数据截断都在图表卡片内说明原因与下一步。
- 卡片底部必须保留“来源、更新时间、统计周期、单位/币种”四类元信息；若某项不适用可省略，不得写模糊的“数据来源：系统”。

图表不能只用颜色传达信息：同时使用直接标签、线型、节点名称或数值。Tooltip 保留系列名、原始值、单位与时间；数字统一千分位和小数位。加载、空数据、错误、数据截断状态都要在卡片内部给出原因和下一步。
${chartWarn.length ? `当前有 ${chartWarn.length} 个图表色与容器背景的对比度不足 3:1；调整后再用于小型数据标记、细线或相邻区域。` : '当前图表色均通过与容器背景的 3:1 图形对比度检查。'}

## 8. CSS 变量
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

## 9. 可读性检查
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
状态色、边框、图表色及 hover 状态仍需在实际组件中结合背景验证。不得仅用颜色传达信息。

## 10. 给 CodeBuddy 与其他 Agent 的执行要求
开始任何前端或设计任务前，先执行本文件“0. 变更门禁”。这是强制流程，不能以“改动很小”“已有样式”“赶时间”为由跳过。将上述变量集中维护，所有页面、复用组件与图表引用它们。不得自动替换成默认蓝紫渐变，不得让每张图自行生成色板，不得添加无语义的彩色卡片或 Emoji 图标，不得自行修改字体层级。

每次改动前，Agent 必须先输出范围、复用 Token/组件和待补规范；每次改动后，必须输出验收结果和实际影响的 Token/组件。若任务涉及图表，先写明分析问题、指标口径、比较对象和适用图形；若涉及表格或业务流程，先说明页面模式、空/错/无权限状态与危险操作反馈。遇到规范缺失时，提出具体扩展建议，先更新本文件与预览，再改代码。
`;
}
