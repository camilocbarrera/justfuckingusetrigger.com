import { codeToHtml, type ThemeRegistration } from 'shiki';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

const cssVariablesTheme: ThemeRegistration = {
  name: 'css-variables',
  type: 'dark',
  colors: {
    'editor.background': 'var(--shiki-color-background)',
    'editor.foreground': 'var(--shiki-color-text)',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: 'var(--shiki-token-comment)' },
    },
    {
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: 'var(--shiki-token-string)' },
    },
    {
      scope: ['constant', 'constant.numeric', 'constant.language', 'constant.character'],
      settings: { foreground: 'var(--shiki-token-constant)' },
    },
    {
      scope: ['keyword', 'keyword.control', 'keyword.operator', 'storage.type', 'storage.modifier'],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call'],
      settings: { foreground: 'var(--shiki-token-function)' },
    },
    {
      scope: ['variable', 'variable.parameter', 'variable.other'],
      settings: { foreground: 'var(--shiki-token-parameter)' },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: { foreground: 'var(--shiki-token-punctuation)' },
    },
    {
      scope: ['entity.name.type', 'support.type', 'support.class', 'entity.name.class'],
      settings: { foreground: 'var(--shiki-token-function)' },
    },
    {
      scope: ['meta.object-literal.key', 'variable.object.property'],
      settings: { foreground: 'var(--shiki-token-parameter)' },
    },
    {
      scope: ['entity.name.tag'],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: 'var(--shiki-token-function)' },
    },
  ],
};

export async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const lines = code.split('\n');
  const lineCount = lines.length;
  const lineNumberWidth = String(lineCount).length;

  const htmlLines = await Promise.all(
    lines.map(async (line) => {
      if (line.trim() === '') {
        return '<span class="empty-line">&nbsp;</span>';
      }
      const html = await codeToHtml(line, {
        lang: language,
        theme: cssVariablesTheme,
      });
      return html.replace(/<\/?pre[^>]*>/g, '').replace(/<\/?code[^>]*>/g, '');
    })
  );

  return (
    <div className="code-block overflow-x-auto rounded-lg border border-border/30 bg-[#121317]">
      {filename && (
        <div className="px-4 py-3 text-xs font-mono border-b border-border/30 text-[#878C99]">
          {filename}
        </div>
      )}
      <div className="shiki-container p-4">
        <pre className="font-mono text-sm leading-relaxed">
          <code>
            {htmlLines.map((html, index) => (
              <div key={index} className="flex">
                <span 
                  className="select-none text-[#3a3a4a] text-right pr-4 shrink-0"
                  style={{ width: `${lineNumberWidth + 2}ch` }}
                >
                  {index + 1}
                </span>
                <span 
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: html }} 
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
