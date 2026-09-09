import type { Design } from './design';
import { palettes, markdown, checks } from './design';
type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
  execute: (input: unknown) => unknown;
};
type Context = {
  registerTool: (
    tool: Tool,
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};
export function registerDesignTools(
  read: () => Design,
  apply: (name: string) => void,
) {
  const context = (document as Document & { modelContext?: Context })
    .modelContext;
  if (!context?.registerTool) return;
  const controller = new AbortController();
  const tools: Tool[] = [
    {
      name: 'read_design_specification',
      description: '读取当前规范的 Markdown 及文字对比度检查结果，不触发下载。',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: () => ({ markdown: markdown(read()), checks: checks(read()) }),
    },
    {
      name: 'apply_design_palette',
      description:
        '应用指定内置配色到当前规范，保留字体、间距、组件设置，并同步更新可见预览和本机草稿。',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', enum: palettes.map((p) => p.name) },
        },
        required: ['name'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input) => {
        if (
          !input ||
          typeof input !== 'object' ||
          !('name' in input) ||
          typeof input.name !== 'string' ||
          !palettes.some((p) => p.name === input.name)
        )
          throw new Error('请选择已存在的配色名称');
        apply(input.name);
        return { applied: input.name, colors: read().colors };
      },
    },
  ];
  for (const tool of tools) {
    try {
      void Promise.resolve(
        context.registerTool(tool, { signal: controller.signal }),
      ).catch(() => {});
    } catch {
      /* Optional API; UI works without it. */
    }
  }
  return () => controller.abort();
}
