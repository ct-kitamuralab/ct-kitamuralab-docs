export const sidebar = [
        { label: "概要", slug: "index" },
        {
          label: "利用を始める",
          items: [
            { label: "概要", slug: "getting-started" },
            { label: "利用対象と申請", slug: "getting-started/application" },
            { label: "利用前の準備", slug: "getting-started/prerequisites" },
            { label: "初回ログイン", slug: "getting-started/first-login" },
            {
              label: "Coder Workspace",
              items: [
                { label: "概要", slug: "getting-started/coder" },
                { label: "Workspaceを作成する", slug: "getting-started/coder/create-workspace" },
                { label: "VS Code Web", slug: "getting-started/coder/vscode-web" },
                { label: "VS Code Desktop", slug: "getting-started/coder/vscode-desktop" },
                { label: "開発ツール", slug: "getting-started/coder/development-tools" },
                { label: "GPUを利用する", slug: "getting-started/coder/gpu" },
                { label: "ファイルと永続化", slug: "getting-started/coder/persistence" },
                { label: "Workspaceの操作", slug: "getting-started/coder/lifecycle" },
              ],
            },
          ],
        },
        {
          label: "開発ガイド",
          items: [
            { label: "Linux(Mac OS)ターミナルの基本", slug: "guides/linux-terminal" },
            {
              label: "Git/Github",
              items: [
                { label: "Gitとは", slug: "guides/git-github" },
                { label: "変更をCommitする", slug: "guides/git-commit" },
                { label: "GitHubへ保存する", slug: "guides/github" },
              ],
            },
            {
              label: "Python",
              items: [
                { label: "Python環境", slug: "guides/python" },
                { label: "パッケージ管理：pipとuv", slug: "guides/python-packages" },
              ],
            },
            {
              label: "データベース",
              items: [
                { label: "DBの考え方と使い分け", slug: "guides/database" },
                { label: "SQLiteの導入", slug: "guides/database/sqlite-installation" },
                { label: "基本操作", slug: "guides/database/table-design" },
                { label: "テーブルの正規化", slug: "guides/database/normalization" },
                { label: "DB用語集", slug: "guides/database/glossary" },
              ],
            },
            {
              label: "AI Coding Agent",
              items: [
                { label: "概要", slug: "guides/ai-coding-agents" },
                { label: "Codexのログイン", slug: "guides/ai-coding-agents/codex-login" },
              ],
            },
          ],
        },
        {
          label: "運用と安全",
          items: [
            { label: "利用ルール", slug: "operations/rules" },
            { label: "トラブルシューティング", slug: "operations/troubleshooting" },
          ],
        },
      ];

export function directoryLinks(sectionLabel) {
  const section = sidebar.find((item) => item.label === sectionLabel);
  if (!section?.items) throw new Error(`Unknown sidebar section: ${sectionLabel}`);
  function firstSlug(item) {
    return item.items ? firstSlug(item.items[0]) : item.slug;
  }
  return section.items.map((item) => ({ label: item.label, slug: firstSlug(item) }));
}
