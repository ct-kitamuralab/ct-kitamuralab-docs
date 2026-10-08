import type { CollectionEntry } from "astro:content";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getRecentUpdates, updateDate } from "../src/lib/recent-updates";

let cwd: string;

function git(...args: string[]) {
  execFileSync("git", args, { cwd, stdio: "pipe" });
}

function commit(file: string, date: string) {
  git("add", "--", file);
  execFileSync("git", ["commit", "-m", "Private commit message"], {
    cwd,
    stdio: "pipe",
    env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
  });
}

function entry(id: string, filePath = `${id}.md`, draft = false) {
  return { id, filePath, data: { title: `記事 ${id}`, draft } } as CollectionEntry<"docs">;
}

beforeEach(() => {
  cwd = mkdtempSync(join(tmpdir(), "docs-recent-updates-"));
  git("init");
  git("config", "user.name", "Docs Test");
  git("config", "user.email", "docs@example.com");
  git("config", "commit.gpgsign", "false");
});

afterEach(() => {
  rmSync(cwd, { recursive: true, force: true });
});

describe("recent-updates", () => {
  it("新規と更新を区別し、最新順に指定件数だけ返す", async () => {
    writeFileSync(join(cwd, "old.md"), "first");
    commit("old.md", "2026-09-01T10:00:00+09:00");
    writeFileSync(join(cwd, "new.md"), "new");
    commit("new.md", "2026-10-01T10:00:00+09:00");
    writeFileSync(join(cwd, "old.md"), "updated");
    commit("old.md", "2026-10-02T10:00:00+09:00");
    const updates = await getRecentUpdates([entry("new"), entry("old")], 5, cwd);
    expect(updates.map(({ id, kind }) => ({ id, kind }))).toEqual([
      { id: "old", kind: "updated" }, { id: "new", kind: "new" },
    ]);
    expect(updates[0].date).toBe("2026-10-02T10:00:00+09:00");
    expect(await getRecentUpdates([entry("new"), entry("old")], 1, cwd)).toHaveLength(1);
    expect(JSON.stringify(updates)).not.toContain("Private commit message");
  });

  it("トップページ、下書き、未コミットの記事は表示しない", async () => {
    for (const id of ["index", "draft", "public"]) writeFileSync(join(cwd, `${id}.md`), id);
    git("add", ".");
    commit("public.md", "2026-10-01T10:00:00+09:00");
    writeFileSync(join(cwd, "untracked.md"), "untracked");
    const updates = await getRecentUpdates([
      entry("index"), entry("draft", "draft.md", true), entry("public"), entry("untracked"),
    ], 5, cwd);
    expect(updates.map(({ id }) => id)).toEqual(["public"]);
  });

  it("ファイル移動後も履歴を引き継ぎ、未コミットの編集は日付に反映しない", async () => {
    writeFileSync(join(cwd, "before.md"), "original");
    commit("before.md", "2026-09-01T10:00:00+09:00");
    git("mv", "before.md", "after.md");
    commit("after.md", "2026-10-01T10:00:00+09:00");
    writeFileSync(join(cwd, "after.md"), "local edit");
    const updates = await getRecentUpdates([entry("after")], 5, cwd);
    expect(updates[0].kind).toBe("updated");
    expect(updates[0].date).toBe("2026-10-01T10:00:00+09:00");
  });

  it("表示日は日本時間に統一する", () => {
    expect(updateDate("2026-10-01T23:00:00Z")).toBe("2026-10-02");
  });
});
