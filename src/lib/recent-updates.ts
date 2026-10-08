import type { CollectionEntry } from "astro:content";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export type RecentUpdate = {
  id: string;
  title: string;
  date: string;
  kind: "new" | "updated";
};

// Only committed article changes count. --follow preserves history across renames.
export async function getRecentUpdates(
  entries: CollectionEntry<"docs">[],
  limit = 5,
  cwd = process.cwd(),
): Promise<RecentUpdate[]> {
  const updates = await Promise.all(
    entries.filter((entry) => entry.id !== "index" && !entry.data.draft && entry.filePath).map(async (entry) => {
      const { stdout } = await execFileAsync("git", [
        "log", "--follow", "--format=%H %cI", "--", entry.filePath!,
      ], { cwd });
      const commits = stdout.trim().split("\n").filter(Boolean);
      if (commits.length === 0) return null;
      const [latestHash, date] = commits[0].split(" ");
      const [firstHash] = commits[commits.length - 1].split(" ");
      return {
        id: entry.id,
        title: entry.data.title,
        date,
        kind: latestHash === firstHash ? "new" : "updated",
      } satisfies RecentUpdate;
    }),
  );

  return updates.filter((update): update is RecentUpdate => update !== null)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.id.localeCompare(b.id))
    .slice(0, limit);
}

export function updateDate(date: string) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date(date));
}

export function updateLabel(kind: RecentUpdate["kind"]) {
  return kind === "new" ? "新規" : "更新";
}
