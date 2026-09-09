'use client';
import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import { registerDesignTools } from '@/lib/webmcp';
import { DataCharts } from '@/app/data-charts';
import {
  ArrowDownToLine,
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  FileText,
  Grid2X2,
  Layers,
  LayoutDashboard,
  Monitor,
  Palette,
  Plus,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Type,
  X,
  MousePointer2,
  CircleHelp,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  SlidersHorizontal,
  BookOpen,
  ChartNoAxesCombined,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  roles,
  palettes,
  chartPalettes,
  defaults,
  fonts,
  fontNames,
  typeSizes,
  tokens,
  checks,
  chartChecks,
  markdown,
  sanitize,
  type Design,
  type ColorKey,
} from '@/lib/design';
const sections = [
  { id: 'colors', label: '配色体系', icon: Palette },
  { id: 'type', label: '字体排版', icon: Type },
  { id: 'space', label: '布局间距', icon: Grid2X2 },
  { id: 'component', label: '组件风格', icon: MousePointer2 },
  { id: 'data', label: '数据可视化', icon: ChartNoAxesCombined },
];
function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <Select value={value} onValueChange={(v) => v && onChange(v)}>
        <SelectTrigger className="select-field" aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
function Range({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (n: number) => void;
}) {
  return (
    <div className="range-field">
      <div>
        <label>{label}</label>
        <output>
          {value}
          {unit}
        </output>
      </div>
      <Slider
        aria-label={label}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
      />
      <div className="range-limits">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
function ColorField({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [invalid, setInvalid] = useState(false);
  useEffect(() => {
    setDraft(value);
    setInvalid(false);
  }, [value]);
  return (
    <div className="color-row">
      <label className="color-picker" style={{ background: value }}>
        <input
          type="color"
          value={value}
          aria-label={label + '取色器'}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
        />
      </label>
      <div className="color-description">
        <strong>{label}</strong>
        <span>{description}</span>
      </div>
      <div className="hex-wrap">
        <input
          aria-label={label + ' HEX'}
          className={invalid ? 'hex invalid' : 'hex'}
          value={draft}
          maxLength={7}
          spellCheck={false}
          onChange={(e) => {
            setDraft(e.target.value);
            if (/^#[0-9a-f]{6}$/i.test(e.target.value)) {
              onChange(e.target.value.toUpperCase());
              setInvalid(false);
            }
          }}
          onBlur={() => {
            if (!/^#[0-9a-f]{6}$/i.test(draft)) setInvalid(true);
          }}
        />
        {invalid && <span className="hex-error">请输入 #RRGGBB</span>}
      </div>
    </div>
  );
}
export default function Studio() {
  const [s, setS] = useState<Design>(defaults),
    [ready, setReady] = useState(false),
    [saved, setSaved] = useState(true),
    [section, setSection] = useState('colors'),
    [view, setView] = useState('studio'),
    [scene, setScene] = useState('dashboard'),
    [device, setDevice] = useState('desktop'),
    [toast, setToast] = useState(''),
    [help, setHelp] = useState(false),
    [reset, setReset] = useState(false),
    [sample, setSample] = useState(''),
    [sampleDone, setSampleDone] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('tone-design-v1');
      if (raw) {
        const parsed = sanitize(JSON.parse(raw));
        if (parsed) setS(parsed);
        else setToast('本机草稿无法读取，已载入默认方案。');
      }
    } catch {
      setToast('无法读取本机草稿，仍可编辑和导出。');
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem('tone-design-v1', JSON.stringify(s));
        setSaved(true);
      } catch {
        setSaved(false);
      }
    }
  }, [s, ready]);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 3200);
    return () => clearTimeout(id);
  }, [toast]);
  function update<K extends keyof Design>(key: K, value: Design[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }
  function color(key: ColorKey, value: string) {
    setS((prev) => ({
      ...prev,
      palette: '自定义配色',
      colors: { ...prev.colors, [key]: value },
    }));
  }
  function applyPalette(p: (typeof palettes)[number]) {
    setS((prev) => ({ ...prev, palette: p.name, colors: { ...p.colors } }));
    setToast(`已应用「${p.name}」，字体与布局保持当前设置`);
  }
  function applyChartPalette(p: (typeof chartPalettes)[number]) {
    setS((prev) => ({
      ...prev,
      chartPalette: p.name,
      chartColors: [...p.colors],
    }));
    setToast(`已应用图表色板「${p.name}」`);
  }
  function chartColor(index: number, value: string) {
    setS((prev) => ({
      ...prev,
      chartPalette: '自定义图表色板',
      chartColors: prev.chartColors.map((color, i) =>
        i === index ? value : color,
      ),
    }));
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([markdown(s)], { type: 'text/markdown;charset=utf-8' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = `${s.name.replace(/[\\/:*?"<>|\r\n]/g, '').trim() || 'DESIGN'}.md`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setToast('规范已导出，可交给 CodeBuddy 使用');
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown(s));
      setToast('完整规范已复制');
    } catch {
      setToast('浏览器未允许复制，请使用「导出规范」下载文件');
    }
  }
  const stateRef = useRef(s);
  stateRef.current = s;
  useEffect(
    () =>
      registerDesignTools(
        () => stateRef.current,
        (name) => {
          const p = palettes.find((p) => p.name === name)!;
          flushSync(() =>
            setS((prev) => ({
              ...prev,
              palette: p.name,
              colors: { ...p.colors },
            })),
          );
        },
      ),
    [],
  );
  const ts = typeSizes(s),
    results = checks(s),
    chartResults = chartChecks(s),
    chartFailed = chartResults.filter((item) => !item.pass).length,
    failed = results.filter(([, r]) => r < 4.5).length;
  return (
    <div className="app-shell">
      <header className="app-header">
        <a
          href="#"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            setView('studio');
          }}
          aria-label="基调首页"
        >
          <span className="brand-mark">
            <i />
            <i />
            <i />
          </span>
          <b>
            基调<span>TONE</span>
          </b>
        </a>
        <span className="header-separator" />
        <span className="product-label">设计规范工作台</span>
        <div className="header-right">
          <span className="save-status">
            <span className={saved ? 'status-dot' : 'status-dot unsaved'} />
            {!ready ? '正在载入' : saved ? '已保存到本机' : '未保存，请导出'}
          </span>
          <button className="btn dark" onClick={download}>
            <ArrowDownToLine size={16} />
            导出规范 <span className="md-label">.md</span>
          </button>
        </div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div className="side-top">
            <span className="side-caption">我的工作空间</span>
            <button
              className={'side-item ' + (view === 'studio' ? 'active' : '')}
              onClick={() => setView('studio')}
            >
              <SlidersHorizontal />
              规范编辑器
              <ChevronRight className="side-arrow" />
            </button>
            <button
              className={
                'side-item ' + (view === 'inspiration' ? 'active' : '')
              }
              onClick={() => setView('inspiration')}
            >
              <Sparkles />
              配色灵感
              <span className="count">
                {String(palettes.length).padStart(2, '0')}
              </span>
            </button>
            <button
              className={'side-item ' + (view === 'document' ? 'active' : '')}
              onClick={() => setView('document')}
            >
              <FileText />
              规范文档
            </button>
            <div className="side-rule" />
            <span className="side-caption">设计基础</span>
            {sections.map((item, i) => (
              <button
                key={item.id}
                className={
                  'side-section ' +
                  (view === 'studio' && section === item.id ? 'current' : '')
                }
                onClick={() => {
                  setSection(item.id);
                  if (item.id === 'data') setScene('data');
                  setView('studio');
                }}
              >
                <span className="section-number">0{i + 1}</span>
                <span>{item.label}</span>
                <Check size={13} />
              </button>
            ))}
          </div>
          <div className="side-bottom">
            <div className="learning-note">
              <Layers size={20} />
              <strong>先定规则，再写页面。</strong>
              <p>把一次设计选择，变成每个页面都遵循的共识。</p>
            </div>
            <button className="help-button" onClick={() => setHelp(!help)}>
              <CircleHelp size={16} />
              如何使用这份规范
              <ArrowUpRight size={14} />
            </button>
          </div>
        </aside>
        <main className="main-content">
          <div className="project-heading">
            <div className="project-title-row">
              <input
                value={s.name}
                aria-label="规范名称"
                maxLength={60}
                onChange={(e) => update('name', e.target.value)}
              />
              <span className="draft-tag">本机草稿</span>
            </div>
            <div className="project-description">
              <p>从一组好的选择，开始一个有秩序的界面。</p>
              <button className="text-button" onClick={() => setReset(true)}>
                <RotateCcw size={14} />
                恢复默认
              </button>
            </div>
          </div>
          {reset && (
            <div className="inline-question">
              <span>将替换当前配色和全部设置，是否恢复？</span>
              <button className="btn" onClick={() => setReset(false)}>
                取消
              </button>
              <button
                className="btn dark"
                onClick={() => {
                  setS({ ...defaults, colors: { ...defaults.colors } });
                  setReset(false);
                  setToast('已恢复默认规范');
                }}
              >
                恢复默认
              </button>
            </div>
          )}
          {help && (
            <section className="help-panel">
              <button
                className="icon-button close-help"
                aria-label="关闭使用说明"
                onClick={() => setHelp(false)}
              >
                <X size={16} />
              </button>
              <h2>让规则成为下一次生成的起点</h2>
              <p>
                先选配色，再统一字号、间距与组件。观察右侧效果，导出 Markdown
                后放进项目，告诉
                CodeBuddy：“先读取这份设计规范，所有页面都引用其中的变量。”
              </p>
              <p>
                以后调整样式时，同时更新规范，避免每个页面长出一套新规则。配置只保存在当前浏览器，换设备前请导出。
              </p>
            </section>
          )}
          {view === 'studio' && (
            <div className="editor-layout">
              <section className="settings-panel">
                <Tabs
                  value={section}
                  onValueChange={(v) => {
                    setSection(String(v));
                    if (v === 'data') setScene('data');
                  }}
                >
                  <TabsList className="editor-tabs" aria-label="规范分类">
                    {sections.map((item) => (
                      <TabsTrigger value={item.id} key={item.id}>
                        <item.icon size={17} />
                        <span>{item.label.slice(0, 2)}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="colors">
                    <div className="settings-content">
                      <div className="section-title">
                        <h2>配色体系</h2>
                        <span>COLOR SYSTEM</span>
                      </div>
                      <p className="section-description">
                        让每一种颜色，都有明确的角色。
                      </p>
                      <button
                        className="current-palette"
                        onClick={() => setView('inspiration')}
                      >
                        <div>
                          <span>当前灵感</span>
                          <strong>
                            {s.palette}
                            <ArrowUpRight size={14} />
                          </strong>
                        </div>
                        <div className="mini-swatches">
                          {[
                            'primary',
                            'text',
                            'muted',
                            'border',
                            'background',
                          ].map((k) => (
                            <i
                              key={k}
                              style={{ background: s.colors[k as ColorKey] }}
                            />
                          ))}
                        </div>
                      </button>
                      <div className="subheading">
                        品牌与基础<span>点击色块或输入 HEX</span>
                      </div>
                      {roles.slice(0, 6).map(([key, label, desc]) => (
                        <ColorField
                          key={key}
                          label={label}
                          description={desc}
                          value={s.colors[key]}
                          onChange={(v) => color(key, v)}
                        />
                      ))}
                      <div className="subheading status-heading">
                        语义状态色<span>用来表达状态，而非装饰</span>
                      </div>
                      <div className="status-colors">
                        {roles.slice(6).map(([key, label]) => (
                          <label key={key}>
                            <input
                              type="color"
                              value={s.colors[key]}
                              aria-label={label}
                              onChange={(e) =>
                                color(key, e.target.value.toUpperCase())
                              }
                            />
                            <span>{label.slice(0, 2)}</span>
                            <code>{s.colors[key]}</code>
                          </label>
                        ))}
                      </div>
                      <div className="tip">
                        <CircleHelp size={16} />
                        <p>
                          主色不需要填满页面。把它留给最重要的操作，其他内容交给中性色。
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="type">
                    <div className="settings-content">
                      <div className="section-title">
                        <h2>字体排版</h2>
                        <span>TYPOGRAPHY</span>
                      </div>
                      <p className="section-description">
                        用一套比例，建立清晰的信息层级。
                      </p>
                      <Choice
                        label="字体气质"
                        value={fontNames[s.font]}
                        options={Object.values(fontNames)}
                        onChange={(v) =>
                          update(
                            'font',
                            Object.keys(fontNames).find(
                              (k) => fontNames[k] === v,
                            )!,
                          )
                        }
                      />
                      <div
                        className="font-specimen"
                        style={{ fontFamily: fonts[s.font] }}
                      >
                        有序之美 <em>Aa</em>
                        <span>好的排版，让内容自己说话。</span>
                      </div>
                      <Range
                        label="正文基准字号"
                        value={s.base}
                        min={12}
                        max={18}
                        unit="px"
                        onChange={(v) => update('base', v)}
                      />
                      <Choice
                        label="字号层级比例"
                        value={String(s.scale)}
                        options={['1.125', '1.2', '1.25', '1.333', '1.5']}
                        onChange={(v) => update('scale', Number(v))}
                      />
                      <Range
                        label="正文行高"
                        value={s.lineHeight}
                        min={1.3}
                        max={2}
                        step={0.1}
                        onChange={(v) =>
                          update('lineHeight', Number(v.toFixed(1)))
                        }
                      />
                      <div className="type-ladder">
                        {[
                          ['H1', '页面标题', ts.h1],
                          ['H2', '区块标题', ts.h2],
                          ['H3', '子标题', ts.h3],
                          ['P', '正文内容', ts.body],
                          ['Aa', '辅助说明', ts.caption],
                        ].map(([tag, label, size]) => (
                          <div key={tag}>
                            <code>{tag}</code>
                            <span
                              style={{
                                fontSize: Number(size),
                                fontFamily: fonts[s.font],
                              }}
                            >
                              {label}
                            </span>
                            <small>{size}px</small>
                          </div>
                        ))}
                      </div>
                      <div className="tip">
                        <Type size={17} />
                        <p>
                          同一层级只用一种字号。中文优先使用设备上的对应字体，实际字形随系统变化。
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="space">
                    <div className="settings-content">
                      <div className="section-title">
                        <h2>布局间距</h2>
                        <span>SPACING</span>
                      </div>
                      <p className="section-description">
                        间距有规律，界面才会有呼吸感。
                      </p>
                      <Choice
                        label="基础间距单位"
                        value={s.unit + 'px'}
                        options={['4px', '6px', '8px']}
                        onChange={(v) => update('unit', parseInt(v))}
                      />
                      <div className="spacing-bars">
                        {[1, 2, 3, 4, 6, 8].map((n) => (
                          <div key={n}>
                            <code>{n}×</code>
                            <i style={{ width: s.unit * n * 3 }} />
                            <span>{s.unit * n}px</span>
                          </div>
                        ))}
                      </div>
                      <Choice
                        label="界面密度"
                        value={s.density}
                        options={['紧凑', '舒适', '宽松']}
                        onChange={(v) => update('density', v)}
                      />
                      <div className="spacing-diagram">
                        <div
                          style={{
                            padding:
                              s.unit *
                              (s.density === '紧凑'
                                ? 4
                                : s.density === '宽松'
                                  ? 8
                                  : 6),
                          }}
                        >
                          <span>内容区域</span>
                        </div>
                        <small>容器内边距 {tokens(s)['--p-padding']}</small>
                      </div>
                      <div className="tip">
                        <Grid2X2 size={17} />
                        <p>
                          相关内容靠近，独立区块分开。所有间距使用基础单位的倍数，减少零散数值。
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="component">
                    <div className="settings-content">
                      <div className="section-title">
                        <h2>组件风格</h2>
                        <span>COMPONENTS</span>
                      </div>
                      <p className="section-description">
                        统一细节，让不同页面自然成为一体。
                      </p>
                      <Range
                        label="统一圆角"
                        value={s.radius}
                        min={0}
                        max={24}
                        unit="px"
                        onChange={(v) => update('radius', v)}
                      />
                      <div className="radius-specimen">
                        <div style={{ borderRadius: s.radius }}>Aa</div>
                        <span>
                          {s.radius === 0
                            ? '利落的直角'
                            : s.radius <= 8
                              ? '克制的圆角'
                              : '柔和的圆角'}
                        </span>
                      </div>
                      <Choice
                        label="容器阴影"
                        value={s.shadow}
                        options={['无阴影', '轻盈', '柔和']}
                        onChange={(v) => update('shadow', v)}
                      />
                      <Choice
                        label="主按钮样式"
                        value={s.button}
                        options={['实色', '描边']}
                        onChange={(v) => update('button', v)}
                      />
                      <div className="component-rules">
                        <h3>一起遵循的规则</h3>
                        <p>
                          <Check />
                          边框统一使用 1px
                        </p>
                        <p>
                          <Check />
                          键盘操作保留清晰的焦点轮廓
                        </p>
                        <p>
                          <Check />
                          禁用、错误与加载各有反馈
                        </p>
                        <p>
                          <Check />
                          动效仅用于解释状态变化
                        </p>
                      </div>
                      <div className="tip">
                        <MousePointer2 size={17} />
                        <p>
                          按钮、输入框和卡片共用同一组规则。切换右侧“基础组件”，检查它们是否协调。
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="data">
                    <div className="settings-content data-settings">
                      <div className="section-title">
                        <h2>数据可视化</h2>
                        <span>DATA VISUALIZATION</span>
                      </div>
                      <p className="section-description">
                        一张图只回答一个问题，所有图共用一套视觉语言。
                      </p>
                      <Choice
                        label="图表色板"
                        value={s.chartPalette}
                        options={chartPalettes.map((p) => p.name)}
                        onChange={(name) =>
                          applyChartPalette(
                            chartPalettes.find((p) => p.name === name)!,
                          )
                        }
                      />
                      <ul
                        className="chart-palette-gallery"
                        aria-label="图表色板快速选择"
                      >
                        {chartPalettes.map((palette) => (
                          <li key={palette.name}>
                            <button
                              type="button"
                              className={
                                'chart-palette-option ' +
                                (s.chartPalette === palette.name
                                  ? 'selected'
                                  : '')
                              }
                              aria-label={`应用图表色板 ${palette.name}`}
                              aria-pressed={s.chartPalette === palette.name}
                              onClick={() => applyChartPalette(palette)}
                            >
                              <span>{palette.name}</span>
                              <i>
                                {palette.colors.map((color) => (
                                  <b
                                    key={color}
                                    style={{ background: color }}
                                  />
                                ))}
                              </i>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="chart-palette-editor">
                        {s.chartColors.map((value, index) => (
                          <label key={index}>
                            <input
                              type="color"
                              value={value}
                              aria-label={`图表色 ${index + 1}`}
                              onChange={(e) =>
                                chartColor(index, e.target.value.toUpperCase())
                              }
                            />
                            <span>{index + 1}</span>
                            <code>{value}</code>
                          </label>
                        ))}
                      </div>
                      <p className="palette-note">
                        {chartPalettes.find((p) => p.name === s.chartPalette)
                          ?.note ?? '自定义 · 请确保相邻系列容易区分'}
                      </p>
                      <div
                        className={
                          'chart-contrast-note ' +
                          (chartFailed ? 'has-warning' : '')
                        }
                      >
                        {chartFailed ? (
                          <CircleAlert size={15} />
                        ) : (
                          <ShieldCheck size={15} />
                        )}
                        <span>
                          {chartFailed
                            ? `${chartFailed} 个颜色与卡片背景不足 3:1`
                            : '6 个图表色均通过 3:1 图形对比度检查'}
                        </span>
                      </div>
                      <div className="subheading status-heading">
                        图表文字层级<span>全局统一</span>
                      </div>
                      <Range
                        label="卡片标题"
                        value={s.chartTitleSize}
                        min={14}
                        max={20}
                        unit="px"
                        onChange={(v) => update('chartTitleSize', v)}
                      />
                      <Range
                        label="数据标签与说明"
                        value={s.chartLabelSize}
                        min={11}
                        max={16}
                        unit="px"
                        onChange={(v) => update('chartLabelSize', v)}
                      />
                      <Range
                        label="坐标轴与图例"
                        value={s.chartAxisSize}
                        min={10}
                        max={14}
                        unit="px"
                        onChange={(v) => update('chartAxisSize', v)}
                      />
                      <div className="subheading status-heading">
                        图表卡片<span>标题在左上，操作在右上</span>
                      </div>
                      <Range
                        label="卡片内边距"
                        value={s.chartCardPadding}
                        min={16}
                        max={32}
                        step={4}
                        unit="px"
                        onChange={(v) => update('chartCardPadding', v)}
                      />
                      <Choice
                        label="图例位置"
                        value={s.chartLegend}
                        options={['顶部左对齐', '顶部右对齐', '底部左对齐']}
                        onChange={(v) => update('chartLegend', v)}
                      />
                      <Choice
                        label="网格线"
                        value={s.chartGrid}
                        options={['仅横向', '横纵都有', '不显示']}
                        onChange={(v) => update('chartGrid', v)}
                      />
                      <div className="tip">
                        <ChartNoAxesCombined size={17} />
                        <p>
                          单序列优先使用品牌主色；多序列才使用分类色。正负状态沿用全局语义色，并同时保留文字或符号。
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="settings-footer">
                  <ShieldCheck size={14} />
                  <span>所有调整会同步到预览与文档</span>
                </div>
              </section>
              <section className="preview-column">
                <div className="preview-topline">
                  <div>
                    <span className="live-dot" />
                    <strong>实时预览</strong>
                    <span className="preview-hint">让规则落在真实界面上</span>
                  </div>
                  <div className="device-controls">
                    <button
                      aria-label="桌面预览"
                      aria-pressed={device === 'desktop'}
                      className={device === 'desktop' ? 'selected' : ''}
                      onClick={() => setDevice('desktop')}
                    >
                      <Monitor size={17} />
                    </button>
                    <button
                      aria-label="移动端预览"
                      aria-pressed={device === 'mobile'}
                      className={device === 'mobile' ? 'selected' : ''}
                      onClick={() => setDevice('mobile')}
                    >
                      <Smartphone size={16} />
                    </button>
                  </div>
                </div>
                <Tabs value={scene} onValueChange={(v) => setScene(String(v))}>
                  <TabsList className="scene-tabs">
                    <TabsTrigger value="dashboard">
                      <LayoutDashboard size={14} />
                      业务看板
                    </TabsTrigger>
                    <TabsTrigger value="components">
                      <Layers size={14} />
                      基础组件
                    </TabsTrigger>
                    <TabsTrigger value="article">
                      <BookOpen size={14} />
                      内容页面
                    </TabsTrigger>
                    <TabsTrigger value="data">
                      <ChartNoAxesCombined size={14} />
                      数据图表
                    </TabsTrigger>
                  </TabsList>
                  <div className="preview-mat">
                    <div
                      className={
                        'preview-browser ' +
                        (device === 'mobile' ? 'mobile' : '')
                      }
                    >
                      <div className="browser-chrome">
                        <div>
                          <i />
                          <i />
                          <i />
                        </div>
                        <span>
                          your-project /{' '}
                          {scene === 'dashboard'
                            ? 'overview'
                            : scene === 'components'
                              ? 'components'
                              : scene === 'data'
                                ? 'data-visualization'
                                : 'article'}
                        </span>
                        <span className="browser-caption">示例页面</span>
                      </div>
                      <div
                        className={
                          'sample-ui ' +
                          (s.button === '描边' ? 'outline-buttons' : '')
                        }
                        style={tokens(s) as CSSProperties}
                      >
                        <TabsContent value="dashboard">
                          <div className="sample-nav">
                            <div className="sample-logo">
                              <Layers size={18} />
                              <b>Workspace</b>
                            </div>
                            <div className="sample-nav-right">
                              <span>工作台</span>
                              <span className="avatar">L</span>
                            </div>
                          </div>
                          <div className="sample-content">
                            <div className="sample-heading">
                              <div>
                                <p className="sample-breadcrumb">
                                  工作空间 / 项目概览
                                </p>
                                <h1>每一个进展，都值得看见。</h1>
                                <p>把想法变成行动，专注于真正重要的事。</p>
                              </div>
                              <button
                                className="p-button"
                                onClick={() =>
                                  setToast(
                                    '这是主按钮的效果示例；当前设计已同步到规范。',
                                  )
                                }
                              >
                                <Plus size={14} />
                                新建项目
                              </button>
                            </div>
                            <div className="sample-stats">
                              <div>
                                <span>进行中项目</span>
                                <strong>
                                  12<small>个</small>
                                </strong>
                                <p>
                                  <span className="positive">+2</span> 较上个月
                                </p>
                              </div>
                              <div>
                                <span>本周已完成</span>
                                <strong>
                                  38<small>项</small>
                                </strong>
                                <p>稳步推进每一个目标</p>
                              </div>
                              <div>
                                <span>任务完成率</span>
                                <strong>
                                  86<small>%</small>
                                </strong>
                                <p>
                                  <span className="positive">+12%</span> 较上周
                                </p>
                              </div>
                            </div>
                            <div className="sample-detail">
                              <section className="activity">
                                <div className="sample-section-head">
                                  <h2>项目进展</h2>
                                  <span>本周</span>
                                </div>
                                <div className="p-table-wrap">
                                  <table className="p-table">
                                    <thead>
                                      <tr>
                                        <th>项目名称</th>
                                        <th>状态</th>
                                        <th>负责人</th>
                                        <th>进度</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {[
                                        ['品牌官网改版', '进行中', '林', 72],
                                        ['设计系统搭建', '进行中', '陈', 45],
                                        ['用户反馈整理', '已完成', '周', 100],
                                      ].map(
                                        ([name, status, owner, percent]) => (
                                          <tr key={name}>
                                            <td>
                                              <span className="project-symbol">
                                                <Layers size={14} />
                                              </span>
                                              {name}
                                            </td>
                                            <td>
                                              <span
                                                className={
                                                  'p-badge ' +
                                                  (status === '已完成'
                                                    ? 'success'
                                                    : '')
                                                }
                                              >
                                                {status}
                                              </span>
                                            </td>
                                            <td>
                                              <span className="owner">
                                                {owner}
                                              </span>
                                            </td>
                                            <td>
                                              <div className="p-progress">
                                                <i
                                                  style={{
                                                    width: percent + '%',
                                                  }}
                                                />
                                              </div>
                                              <small>{percent}%</small>
                                            </td>
                                          </tr>
                                        ),
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </section>
                              <section className="weekly">
                                <div className="sample-section-head">
                                  <h2>本周节奏</h2>
                                  <ArrowUpRight size={16} />
                                </div>
                                <div
                                  className="bar-chart"
                                  aria-label="周一至周日任务完成数量示意"
                                >
                                  {[45, 72, 58, 90, 65, 37, 22].map((v, i) => (
                                    <div key={i}>
                                      <i
                                        style={{
                                          height: v + '%',
                                          opacity:
                                            i === 3 ? 1 : 0.35 + i * 0.07,
                                        }}
                                      />
                                      <span>
                                        {
                                          [
                                            '一',
                                            '二',
                                            '三',
                                            '四',
                                            '五',
                                            '六',
                                            '日',
                                          ][i]
                                        }
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <p>每一小步，都是进步。</p>
                              </section>
                            </div>
                            <div className="sample-notice">
                              <CheckCircle2 size={17} />
                              <span>所有项目已同步，开始今天的创造吧。</span>
                              <span className="notice-time">刚刚</span>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="components">
                          <div className="sample-content component-preview">
                            <h1>细节，一以贯之。</h1>
                            <p>同一套规则，从按钮延伸到每个交互。</p>
                            <section>
                              <h2>按钮与状态</h2>
                              <div className="button-examples">
                                <button
                                  className="p-button"
                                  onClick={() =>
                                    setToast('主要操作：使用品牌主色突出优先级')
                                  }
                                >
                                  主要操作
                                  <ArrowRight size={14} />
                                </button>
                                <button
                                  className="p-secondary"
                                  onClick={() =>
                                    setToast('次要操作：使用中性色保持层级')
                                  }
                                >
                                  次要操作
                                </button>
                                <button className="p-button" disabled>
                                  不可用
                                </button>
                              </div>
                            </section>
                            <section>
                              <h2>表单输入</h2>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  if (sample.trim()) setSampleDone(true);
                                }}
                              >
                                <label htmlFor="sample-name">项目名称</label>
                                <div className="sample-form">
                                  <input
                                    id="sample-name"
                                    value={sample}
                                    required
                                    placeholder="输入一个项目名称"
                                    onChange={(e) => {
                                      setSample(e.target.value);
                                      setSampleDone(false);
                                    }}
                                  />
                                  <button className="p-button" type="submit">
                                    保存
                                  </button>
                                </div>
                                {sampleDone ? (
                                  <p className="positive">
                                    <CheckCircle2 size={14} />
                                    示例“{sample}”已保存
                                  </p>
                                ) : (
                                  <p>用明确的标签，帮助用户理解输入内容。</p>
                                )}
                              </form>
                            </section>
                            <section>
                              <h2>语义状态</h2>
                              <div className="button-examples">
                                <span className="p-badge success">
                                  <CheckCircle2 size={13} />
                                  已完成
                                </span>
                                <span className="p-badge warning">
                                  <CircleAlert size={13} />
                                  待确认
                                </span>
                                <span className="p-badge danger">
                                  <X size={13} />
                                  未通过
                                </span>
                              </div>
                            </section>
                            <section className="sample-card">
                              <h2>让组件共享同一种语言</h2>
                              <p>
                                统一圆角、边框、留白与字体，减少每次做设计时的重复决定。
                              </p>
                            </section>
                          </div>
                        </TabsContent>
                        <TabsContent value="article">
                          <article className="sample-content article-preview">
                            <p className="sample-breadcrumb">
                              设计笔记 / 基础方法
                            </p>
                            <h1>好的设计，从一致性开始。</h1>
                            <p className="article-lead">
                              当每一个细节遵循同一套规则，内容就有了清晰、自然的表达。
                            </p>
                            <hr />
                            <h2>先建立秩序，再表达个性</h2>
                            <p>
                              设计规范不是限制创造力，而是把重复的决定交给规则。标题如何分级，文字用什么颜色，区块之间留多少空间——这些选择共同决定了页面的气质。
                            </p>
                            <blockquote>
                              让重要的内容醒目，让次要的信息安静。
                            </blockquote>
                            <h2>从最小的一组规则开始</h2>
                            <p>
                              选择一种主色、一组文字层级和一个间距单位，再让按钮、表单与卡片共同遵循它们。随着产品成长，逐步补充真正需要的规范。
                            </p>
                            <h3>将规则带进下一次创造</h3>
                            <p>
                              把规范交给你的编码工具，每个新页面就有了共同的起点。
                            </p>
                          </article>
                        </TabsContent>
                        <TabsContent value="data">
                          <DataCharts design={s} />
                        </TabsContent>
                      </div>
                    </div>
                  </div>
                </Tabs>
                <div
                  className={'contrast-strip ' + (failed ? 'has-warning' : '')}
                >
                  <ShieldCheck size={18} />
                  <div>
                    <strong>
                      {failed
                        ? `${failed} 组文字对比度需要调整`
                        : '文字清晰，阅读更轻松'}
                    </strong>
                    <span>
                      正文对比度 {results[0][1].toFixed(2)}:1 · 已检查{' '}
                      {results.length} 组配对
                    </span>
                  </div>
                  <button onClick={() => setView('document')}>
                    {failed ? '查看问题' : '查看检查'}
                    <ArrowUpRight size={14} />
                  </button>
                </div>
                <section className="inspiration-strip">
                  <div>
                    <h2>换个基调，看看灵感。</h2>
                    <button
                      className="text-button"
                      onClick={() => setView('inspiration')}
                    >
                      全部配色
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="palette-mini-grid">
                    {palettes.slice(0, 4).map((p) => (
                      <button
                        key={p.name}
                        className={
                          'mini-palette ' +
                          (s.palette === p.name ? 'chosen' : '')
                        }
                        onClick={() => applyPalette(p)}
                      >
                        <div className="palette-strip">
                          {[
                            'primary',
                            'text',
                            'muted',
                            'border',
                            'background',
                          ].map((k) => (
                            <i
                              key={k}
                              style={{ background: p.colors[k as ColorKey] }}
                            />
                          ))}
                        </div>
                        <span>
                          {p.name}
                          {s.palette === p.name ? (
                            <Check size={13} />
                          ) : (
                            <ArrowUpRight size={13} />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              </section>
            </div>
          )}
          {view === 'inspiration' && (
            <section className="inspiration-page">
              <div className="page-section-heading">
                <div>
                  <h1>找到你的基调。</h1>
                  <p>
                    选择一组起点，再把它变成自己的设计语言。只替换颜色，保留你的排版与组件设置。
                  </p>
                </div>
                <button className="btn" onClick={() => setView('studio')}>
                  返回编辑器
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="palette-gallery">
                {palettes.map((p) => (
                  <button
                    key={p.name}
                    className={
                      'palette-card ' + (s.palette === p.name ? 'selected' : '')
                    }
                    onClick={() => applyPalette(p)}
                  >
                    <div
                      className="large-palette"
                      style={{ background: p.colors.background }}
                    >
                      <div
                        className="palette-type"
                        style={{ color: p.colors.text }}
                      >
                        Aa
                        <span style={{ color: p.colors.primary }}>
                          有序之美
                        </span>
                      </div>
                      <div className="palette-blocks">
                        {['primary', 'text', 'muted', 'border'].map((k) => (
                          <i
                            key={k}
                            style={{ background: p.colors[k as ColorKey] }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="palette-info">
                      <div>
                        <h2>
                          {p.name}
                          <span>{p.en}</span>
                        </h2>
                        <p>{p.mood}</p>
                      </div>
                      {s.palette === p.name ? (
                        <span className="applied">
                          <Check size={14} />
                          已应用
                        </span>
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
          {view === 'document' && (
            <section className="document-page">
              <div className="page-section-heading">
                <div>
                  <h1>让设计有据可依。</h1>
                  <p>
                    这份规范与你的设置保持同步，直接交给 CodeBuddy
                    或其他编码工具。
                  </p>
                </div>
                <button className="btn" onClick={copy}>
                  <Copy size={16} />
                  复制全文
                </button>
              </div>
              <div className="document-grid">
                <div className="markdown-panel">
                  <div className="document-toolbar">
                    <FileText size={16} />
                    <span>DESIGN.md</span>
                    <span>{markdown(s).length.toLocaleString()} 字符</span>
                  </div>
                  <pre tabIndex={0}>{markdown(s)}</pre>
                </div>
                <aside className="document-summary">
                  <h2>文档包含</h2>
                  {[
                    '设计原则与使用边界',
                    '9 个语义颜色',
                    '5 级字体层级',
                    '间距与响应式规则',
                    '组件样式与交互状态',
                    '图表文字、色板与卡片规范',
                    '柱状、折线、饼状与桑基图规则',
                    '可复用 CSS 变量',
                    '可读性检查结果',
                    'CodeBuddy 执行要求',
                  ].map((t) => (
                    <p key={t}>
                      <Check size={15} />
                      {t}
                    </p>
                  ))}
                  <div className="side-rule" />
                  <h2>文字对比度检查</h2>
                  {results.map(([label, r]) => (
                    <div
                      className={'check-row ' + (r < 4.5 ? 'fail' : '')}
                      key={label}
                    >
                      <span>{label}</span>
                      <strong>
                        {r.toFixed(2)}:1{' '}
                        {r >= 4.5 ? (
                          <Check size={13} />
                        ) : (
                          <CircleAlert size={13} />
                        )}
                      </strong>
                    </div>
                  ))}
                  <p className="check-note">
                    检查阈值为 4.5:1，仅覆盖以上文字配对，不代表整站无障碍认证。
                  </p>
                  <button className="btn dark full" onClick={download}>
                    <ArrowDownToLine size={16} />
                    下载 Markdown
                  </button>
                  <button
                    className="text-button"
                    onClick={() => setView('studio')}
                  >
                    继续调整规范
                    <ArrowRight size={14} />
                  </button>
                </aside>
              </div>
            </section>
          )}
          <footer className="workspace-footer">
            <span>好的界面，有自己的基调。</span>
            <span>选择 · 组合 · 形成规范</span>
          </footer>
        </main>
      </div>
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={17} />
          {toast}
          <button aria-label="关闭提示" onClick={() => setToast('')}>
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
