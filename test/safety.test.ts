import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("..", import.meta.url));

const SCAN_DIRS = [join(root, "src"), join(root, "public")];
const SCAN_FILES = [join(root, "astro.config.mjs"), join(root, "package.json")];
const SCAN_EXTS = new Set(["md", "mdx", "ts", "astro", "css", "json", "svg", "html"]);

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(path));
    else if (SCAN_EXTS.has(entry.name.slice(entry.name.lastIndexOf(".") + 1))) files.push(path);
  }
  return files;
}

const scannedFiles = [...SCAN_DIRS.flatMap(walk), ...SCAN_FILES.filter((f) => statSync(f).isFile())];

type Pattern = { name: string; regex: RegExp };

const forbiddenPatterns: Pattern[] = [
  { name: "private IPv4 (10.x)", regex: /(?<![\d.])10\.\d{1,3}\.\d{1,3}\.\d{1,3}(?![\d.])/g },
  { name: "private IPv4 (192.168.x)", regex: /(?<![\d.])192\.168\.\d{1,3}\.\d{1,3}(?![\d.])/g },
  { name: "private IPv4 (172.16-31.x)", regex: /(?<![\d.])172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}(?![\d.])/g },
  { name: "loopback address", regex: /(?<![\d.])(localhost|127\.0\.0\.1)(?![\d.])/g },
  { name: "link-local IPv4", regex: /(?<![\d.])169\.254\.\d{1,3}\.\d{1,3}(?![\d.])/g },
  { name: "tailnet hostname (*.ts.net)", regex: /\.ts\.net\b/g },
  { name: "internal hostname (*.local)", regex: /\.local\b/g },
  { name: "connection string with credentials", regex: /\w{3,}:\/\/[^@\s/]+:[^@\s/]+@/g },
  { name: "OpenAI-style API key", regex: /\bsk-[A-Za-z0-9_-]{20,}\b/g },
  { name: "GitHub token", regex: /\b(?:ghp_|gho_|ghs_|ghu_|github_pat_)[A-Za-z0-9_]{20,}\b/g },
  { name: "AWS access key", regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { name: "Slack token", regex: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g },
];

function findViolations(patterns: Pattern[]): string[] {
  const violations: string[] = [];
  for (const file of scannedFiles) {
    const raw = readFileSync(file, "utf8");
    raw.split("\n").forEach((line, i) => {
      for (const pattern of patterns) {
        pattern.regex.lastIndex = 0;
        if (pattern.regex.test(line)) {
          violations.push(`${file.slice(root.length + 1)}:${i + 1} [${pattern.name}] ${line.trim().slice(0, 120)}`);
        }
      }
    });
  }
  return violations;
}

describe("safety: 公開しない情報の漏えいチェック", () => {
  it("スキャン対象ファイルが収集されている", () => {
    expect(scannedFiles.length).toBeGreaterThanOrEqual(40);
    expect(scannedFiles.some((f) => f.endsWith(".mdx"))).toBe(true);
  });

  it("パターンが実際に検出できる（陽性対照）", () => {
    // 検出用のサンプルはリポジトリに残さないよう、実行時に断片から組み立てる
    const samples: [string, string][] = [
      [["10", "0", "1", "5"].join("."), "private IPv4 (10.x)"],
      [["192", "168", "0", "1"].join("."), "private IPv4 (192.168.x)"],
      [["172", "16", "0", "1"].join("."), "private IPv4 (172.16-31.x)"],
      [["http", "://", "local", "host"].join(""), "loopback address"],
      ["node-a." + "ts" + ".net", "tailnet hostname (*.ts.net)"],
      ["box" + ".local", "internal hostname (*.local)"],
      [["pg", "sql", "://user", ":", "pass", "@db"].join(""), "connection string with credentials"],
      [["sk-", "a".repeat(24)].join(""), "OpenAI-style API key"],
      [["ghp_", "b".repeat(24)].join(""), "GitHub token"],
      [["AKIA", "A".repeat(16)].join(""), "AWS access key"],
      [["xoxb-", "c".repeat(12)].join(""), "Slack token"],
    ];
    for (const [sample, name] of samples) {
      expect(findViolationsForString(sample), `not detected: ${name}`).toContain(name);
    }
    expect(findViolationsForString("no sensitive info here")).toEqual([]);
  });

  it("内部ネットワーク情報やCredentialがソースに含まれていない", () => {
    expect(findViolations(forbiddenPatterns)).toEqual([]);
  });
});

function findViolationsForString(text: string): string[] {
  const found: string[] = [];
  for (const pattern of forbiddenPatterns) {
    pattern.regex.lastIndex = 0;
    if (pattern.regex.test(text)) found.push(pattern.name);
  }
  return found;
}
