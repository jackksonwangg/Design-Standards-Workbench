'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import type { Design } from '@/lib/design';

type Kind = 'bar' | 'line' | 'pie' | 'sankey';

function Grid({
  mode,
  lines = [55, 105, 155, 205],
}: {
  mode: string;
  lines?: number[];
}) {
  if (mode === '不显示') return null;
  return (
    <g className="chart-grid">
      {lines.map((y) => (
        <line key={'h' + y} x1="54" x2="546" y1={y} y2={y} />
      ))}
      {mode === '横纵都有' &&
        [54, 136, 218, 300, 382, 464, 546].map((x) => (
          <line key={'v' + x} x1={x} x2={x} y1="32" y2="205" />
        ))}
    </g>
  );
}

function BarChart({ design }: { design: Design }) {
  const values = [68, 118, 86, 154, 132, 183];
  const slot = 82;
  const barWidth = Math.max(
    24,
    Math.round(slot * (1 - design.chartBarGap / 100)),
  );
  return (
    <svg
      viewBox="0 0 600 250"
      role="img"
      aria-label="六个区域业务规模柱状图示例"
    >
      <Grid mode={design.chartGrid} lines={[17, 64, 111, 158, 205]} />
      <g className="chart-axis-labels">
        <text x="28" y="209">
          0
        </text>
        <text x="18" y="162">
          50
        </text>
        <text x="12" y="115">
          100
        </text>
        <text x="12" y="68">
          150
        </text>
        <text x="12" y="21">
          200
        </text>
        {['华南', '华东', '华北', '西南', '华中', '海外'].map((label, i) => (
          <text key={label} x={82 + i * 82} y="230" textAnchor="middle">
            {label}
          </text>
        ))}
      </g>
      {values.map((v, i) => (
        <g key={v}>
          <rect
            className="chart-bar"
            x={82 + i * slot - barWidth / 2}
            y={205 - (v / 200) * 188}
            width={barWidth}
            height={(v / 200) * 188}
            rx="3"
            fill="var(--p-primary)"
          />
          <text
            className="chart-value"
            x={82 + i * 82}
            y={197 - (v / 200) * 188}
            textAnchor="middle"
          >
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
}

function LineChart({ design }: { design: Design }) {
  return (
    <svg
      viewBox="0 0 600 250"
      role="img"
      aria-label="十二个月业务量趋势折线图示例"
    >
      <Grid mode={design.chartGrid} />
      <g className="chart-axis-labels">
        <text x="24" y="209">
          0
        </text>
        <text x="12" y="159">
          2k
        </text>
        <text x="12" y="109">
          4k
        </text>
        <text x="12" y="59">
          6k
        </text>
        {['01', '03', '05', '07', '09', '11'].map((m, i) => (
          <text key={m} x={62 + i * 96} y="230">
            {m}月
          </text>
        ))}
      </g>
      <polyline
        className="chart-line secondary"
        points="54,170 99,160 144,174 189,142 234,150 279,118 324,126 369,91 414,105 459,76 504,88 546,60"
      />
      <polyline
        className="chart-line primary"
        points="54,188 99,178 144,152 189,160 234,127 279,139 324,102 369,114 414,78 459,90 504,56 546,70"
      />
      <g className="chart-annotation">
        <circle cx="504" cy="56" r="4" />
        <line x1="504" y1="50" x2="504" y2="28" />
        <text x="504" y="20" textAnchor="middle">
          峰值 6,240
        </text>
      </g>
    </svg>
  );
}

function PieChart() {
  return (
    <div className="pie-layout">
      <div className="donut" role="img" aria-label="四个产品的收入占比环图示例">
        <div>
          <strong>8,420</strong>
          <span>收入总计 / 万元</span>
        </div>
      </div>
      <div className="direct-labels">
        {[
          ['基础云', '42%', 1],
          ['数据库', '27%', 2],
          ['AI 平台', '19%', 3],
          ['其他', '12%', 4],
        ].map(([name, value, i]) => (
          <div key={String(name)}>
            <i style={{ background: `var(--chart-${i})` }} />
            <span>{name}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function SankeyChart() {
  return (
    <svg
      className="sankey-svg"
      viewBox="0 0 650 250"
      role="img"
      aria-label="渠道流量经过了解、试用、咨询三个阶段流向产品的桑基图示例；流入与流出均为一百八十万访次"
    >
      <g className="sankey-links" fill="none">
        <path
          d="M90 40 C220 40 220 40 350 40"
          stroke="var(--chart-1)"
          strokeWidth="30"
        />
        <path
          d="M90 64 C220 64 220 99 350 99"
          stroke="var(--chart-1)"
          strokeWidth="18"
        />
        <path
          d="M90 116 C220 116 220 61 350 61"
          stroke="var(--chart-2)"
          strokeWidth="12"
        />
        <path
          d="M90 134 C220 134 220 120 350 120"
          stroke="var(--chart-2)"
          strokeWidth="24"
        />
        <path
          d="M90 149 C220 149 220 184 350 184"
          stroke="var(--chart-2)"
          strokeWidth="6"
        />
        <path
          d="M90 190 C220 190 220 135 350 135"
          stroke="var(--chart-3)"
          strokeWidth="6"
        />
        <path
          d="M90 199 C220 199 220 193 350 193"
          stroke="var(--chart-3)"
          strokeWidth="12"
        />
        <path
          d="M370 46 C460 46 460 46 550 46"
          stroke="var(--chart-4)"
          strokeWidth="42"
        />
        <path
          d="M370 114 C460 114 460 114 550 114"
          stroke="var(--chart-5)"
          strokeWidth="48"
        />
        <path
          d="M370 189 C460 189 460 189 550 189"
          stroke="var(--chart-6)"
          strokeWidth="18"
        />
      </g>
      <g className="sankey-nodes">
        <rect x="75" y="25" width="15" height="48" fill="var(--chart-1)" />
        <rect x="75" y="110" width="15" height="42" fill="var(--chart-2)" />
        <rect x="75" y="185" width="15" height="18" fill="var(--chart-3)" />
        <rect x="350" y="25" width="20" height="42" fill="var(--chart-4)" />
        <rect x="350" y="90" width="20" height="48" fill="var(--chart-5)" />
        <rect x="350" y="180" width="20" height="18" fill="var(--chart-6)" />
        <rect x="550" y="25" width="15" height="42" fill="var(--chart-4)" />
        <rect x="550" y="90" width="15" height="48" fill="var(--chart-5)" />
        <rect x="550" y="180" width="15" height="18" fill="var(--chart-6)" />
      </g>
      <g className="chart-axis-labels sankey-labels">
        <text x="68" y="22" textAnchor="end">
          自然流量 80
        </text>
        <text x="68" y="107" textAnchor="end">
          活动触达 70
        </text>
        <text x="68" y="182" textAnchor="end">
          伙伴渠道 30
        </text>
        <text x="360" y="20" textAnchor="middle">
          了解 70
        </text>
        <text x="360" y="85" textAnchor="middle">
          试用 80
        </text>
        <text x="360" y="216" textAnchor="middle">
          咨询 30
        </text>
        <text x="572" y="49">
          基础云 70
        </text>
        <text x="572" y="117">
          数据库 80
        </text>
        <text x="572" y="192">
          AI 平台 30
        </text>
      </g>
    </svg>
  );
}

function AccessibleData({ kind }: { kind: Kind }) {
  const rows: Record<Kind, string[][]> = {
    bar: [
      ['华南', '68 万元'],
      ['华东', '118 万元'],
      ['华北', '86 万元'],
      ['西南', '154 万元'],
      ['华中', '132 万元'],
      ['海外', '183 万元'],
    ],
    line: [
      ['1 月', '实际 0.7k', '目标 1.4k'],
      ['2 月', '实际 1.1k', '目标 1.8k'],
      ['3 月', '实际 2.0k', '目标 1.2k'],
      ['4 月', '实际 1.7k', '目标 2.5k'],
      ['5 月', '实际 2.9k', '目标 2.2k'],
      ['6 月', '实际 2.5k', '目标 3.2k'],
      ['7 月', '实际 3.8k', '目标 3.5k'],
      ['8 月', '实际 3.3k', '目标 4.3k'],
      ['9 月', '实际 4.8k', '目标 4.0k'],
      ['10 月', '实际 4.4k', '目标 5.0k'],
      ['11 月', '实际 6.24k', '目标 4.7k'],
      ['12 月', '实际 5.7k', '目标 5.4k'],
    ],
    pie: [
      ['基础云', '42%', '3,536 万元'],
      ['数据库', '27%', '2,273 万元'],
      ['AI 平台', '19%', '1,600 万元'],
      ['其他', '12%', '1,011 万元'],
    ],
    sankey: [
      ['自然流量', '了解', '50 万访次'],
      ['自然流量', '试用', '30 万访次'],
      ['活动触达', '了解', '20 万访次'],
      ['活动触达', '试用', '40 万访次'],
      ['活动触达', '咨询', '10 万访次'],
      ['伙伴渠道', '试用', '10 万访次'],
      ['伙伴渠道', '咨询', '20 万访次'],
      ['了解', '基础云', '70 万访次'],
      ['试用', '数据库', '80 万访次'],
      ['咨询', 'AI 平台', '30 万访次'],
    ],
  };
  return (
    <table className="visually-hidden">
      <caption>{kind === 'sankey' ? '桑基图流向明细' : '图表数据明细'}</caption>
      <tbody>
        {rows[kind].map((row, index) => (
          <tr key={index}>
            {row.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function DataCharts({ design }: { design: Design }) {
  const [kind, setKind] = useState<Kind>('bar');
  const meta: Record<
    Kind,
    { title: string; question: string; takeaway: string }
  > = {
    bar: {
      title: '各区域业务规模',
      question: '哪个区域贡献最高？',
      takeaway: '海外区域规模最高，较华南高 169%',
    },
    line: {
      title: '近 12 个月业务量趋势',
      question: '增长是否持续？',
      takeaway: '总体保持增长，11 月达到阶段峰值',
    },
    pie: {
      title: '产品收入构成',
      question: '收入集中在哪些产品？',
      takeaway: '基础云与数据库合计贡献 69%',
    },
    sankey: {
      title: '渠道到产品的转化路径',
      question: '流量最终去了哪里？',
      takeaway: '活动触达主要流向数据库产品',
    },
  };
  const legend = (
    <div className={'chart-legend legend-' + design.chartLegend}>
      {kind === 'line' ? (
        <>
          <span>
            <i style={{ background: 'var(--chart-1)' }} />
            实际值
          </span>
          <span>
            <i style={{ background: 'var(--chart-2)' }} />
            目标值
          </span>
        </>
      ) : kind === 'bar' ? (
        <span>
          <i style={{ background: 'var(--p-primary)' }} />
          业务规模 / 万元
        </span>
      ) : (
        <span>颜色对应业务分类，标签同时保留名称与数值</span>
      )}
    </div>
  );
  return (
    <div className="data-preview-page">
      <div className="data-preview-intro">
        <div>
          <p className="sample-breadcrumb">数据中心 / 经营概览</p>
          <h1>数据要说明问题。</h1>
          <p>统一文字、颜色和容器，让每张图都更容易读懂。</p>
        </div>
        <span className="synthetic-label">
          <Info size={12} />
          演示数据
        </span>
      </div>
      <div className="chart-type-switch" role="group" aria-label="图表类型">
        {(
          [
            ['bar', '柱状图'],
            ['line', '折线图'],
            ['pie', '饼状图'],
            ['sankey', '桑基图'],
          ] as [Kind, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            aria-pressed={kind === id}
            className={kind === id ? 'active' : ''}
            onClick={() => setKind(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <section className="chart-card">
        <header className="chart-card-header">
          <div>
            <h2>{meta[kind].title}</h2>
            <p>{meta[kind].question} · 2026 年度</p>
          </div>
          <span className="chart-card-index" aria-hidden="true">
            {(['bar', 'line', 'pie', 'sankey'] as Kind[]).indexOf(kind) + 1} / 4
          </span>
        </header>
        <div className="chart-spec-strip" aria-label="当前图表规格">
          <span>绘图区 {design.chartHeight}px</span>
          <span>最多 {design.chartMaxCategories} 类</span>
          <span>柱间距 {design.chartBarGap}%</span>
          <span>{design.chartLabelStrategy}</span>
        </div>
        {design.chartLegend !== '底部左对齐' && legend}
        <div
          className="chart-stage"
          role="region"
          aria-label={`${meta[kind].title}图表区域，可横向滚动`}
          tabIndex={0}
        >
          {kind === 'bar' ? (
            <BarChart design={design} />
          ) : kind === 'line' ? (
            <LineChart design={design} />
          ) : kind === 'pie' ? (
            <PieChart />
          ) : (
            <SankeyChart />
          )}
          <AccessibleData kind={kind} />
        </div>
        {design.chartLegend === '底部左对齐' && legend}
        <div className="chart-takeaway">
          <strong>读图结论</strong>
          <span>{meta[kind].takeaway}</span>
        </div>
        <footer className="chart-source">
          来源：业务经营数据仓库 · 更新于 2026-09-09 09:00 ·{' '}
          {kind === 'sankey'
            ? '单位：万访次；流入与流出均为 180'
            : '单位与口径为演示'}
        </footer>
      </section>
    </div>
  );
}
