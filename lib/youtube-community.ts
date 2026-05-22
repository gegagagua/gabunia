import { NewsItem } from "@/lib/news";

type UnknownRecord = Record<string, unknown>;

type CacheEntry = {
  expiresAt: number;
  items: NewsItem[];
};

let cache: CacheEntry | null = null;

const CACHE_TTL_MS = 1000 * 60 * 30;
const CHANNEL_POSTS_URL = "https://www.youtube.com/@vasil_gabunia/posts";
const EXCLUDED_CONTENT_SNIPPETS = ["გთხოვთ მონიშნოთ თქვენთვის სასურველი თე"];

function extractObjectAfter(source: string, marker: string): string | null {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    return null;
  }
  const start = source.indexOf("{", markerIndex);
  if (start === -1) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === "\"") {
        inString = false;
      }
      continue;
    }

    if (ch === "\"") {
      inString = true;
      continue;
    }

    if (ch === "{") {
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(start, i + 1);
      }
    }
  }

  return null;
}

function walkTree(root: unknown): UnknownRecord[] {
  const out: UnknownRecord[] = [];
  const queue: unknown[] = [root];

  while (queue.length > 0) {
    const current = queue.shift();
    if (Array.isArray(current)) {
      for (const item of current) {
        queue.push(item);
      }
      continue;
    }
    if (!current || typeof current !== "object") {
      continue;
    }
    const record = current as UnknownRecord;
    out.push(record);
    for (const value of Object.values(record)) {
      queue.push(value);
    }
  }

  return out;
}

function extractTextRuns(node: unknown): string {
  if (!node || typeof node !== "object") {
    return "";
  }
  const runs = (node as UnknownRecord).runs;
  if (!Array.isArray(runs)) {
    return "";
  }
  return runs
    .map((run) => {
      if (!run || typeof run !== "object") {
        return "";
      }
      const text = (run as UnknownRecord).text;
      return typeof text === "string" ? text : "";
    })
    .join("");
}

function formatDateFromLabel(label: string): string {
  const now = new Date();
  const lowered = label.toLowerCase();
  const numberMatch = lowered.match(/\d+/);
  const amount = numberMatch ? Number(numberMatch[0]) : 0;

  if (lowered.includes("today") || lowered.includes("დღეს")) {
    return now.toISOString().slice(0, 10);
  }

  const date = new Date(now);
  if (
    lowered.includes("minute") ||
    lowered.includes("minutes") ||
    lowered.includes("წუთ")
  ) {
    date.setMinutes(date.getMinutes() - Math.max(1, amount));
  } else if (
    lowered.includes("hour") ||
    lowered.includes("hours") ||
    lowered.includes("საათ")
  ) {
    date.setHours(date.getHours() - Math.max(1, amount));
  } else if (
    lowered.includes("day") ||
    lowered.includes("days") ||
    lowered.includes("დღ")
  ) {
    date.setDate(date.getDate() - Math.max(1, amount));
  } else if (
    lowered.includes("week") ||
    lowered.includes("weeks") ||
    lowered.includes("კვირ")
  ) {
    date.setDate(date.getDate() - Math.max(1, amount) * 7);
  } else if (
    lowered.includes("month") ||
    lowered.includes("months") ||
    lowered.includes("თვე")
  ) {
    date.setMonth(date.getMonth() - Math.max(1, amount));
  } else if (
    lowered.includes("year") ||
    lowered.includes("years") ||
    lowered.includes("წელ")
  ) {
    date.setFullYear(date.getFullYear() - Math.max(1, amount));
  }

  return date.toISOString().slice(0, 10);
}

function pickBestThumbnail(thumbnails: unknown): string | null {
  if (!Array.isArray(thumbnails) || thumbnails.length === 0) {
    return null;
  }
  const sorted = thumbnails
    .filter((item): item is { url?: string; width?: number } => !!item && typeof item === "object")
    .sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  if (sorted.length === 0) {
    return null;
  }
  return typeof sorted[0].url === "string" ? sorted[0].url : null;
}

function extractPostImages(backstageAttachment: UnknownRecord | undefined): string[] {
  if (!backstageAttachment) {
    return [];
  }
  const imageUrls: string[] = [];
  const multi = backstageAttachment.postMultiImageRenderer as UnknownRecord | undefined;
  if (multi && Array.isArray(multi.images)) {
    for (const item of multi.images) {
      if (!item || typeof item !== "object") {
        continue;
      }
      const renderer = (item as UnknownRecord).backstageImageRenderer as UnknownRecord | undefined;
      const image = renderer?.image as UnknownRecord | undefined;
      const best = pickBestThumbnail(image?.thumbnails);
      if (best) {
        imageUrls.push(best);
      }
    }
  }

  const single = backstageAttachment.backstageImageRenderer as UnknownRecord | undefined;
  const singleBest = pickBestThumbnail((single?.image as UnknownRecord | undefined)?.thumbnails);
  if (singleBest) {
    imageUrls.push(singleBest);
  }

  const video = backstageAttachment.videoRenderer as UnknownRecord | undefined;
  const videoBest = pickBestThumbnail((video?.thumbnail as UnknownRecord | undefined)?.thumbnails);
  if (videoBest) {
    imageUrls.push(videoBest);
  }

  return [...new Set(imageUrls)];
}

function toLocalizedValue(value: string): Record<"ka" | "en" | "ru", string> {
  return { ka: value, en: value, ru: value };
}

function toLocalizedContent(value: string[]): Record<"ka" | "en" | "ru", string[]> {
  return { ka: value, en: value, ru: value };
}

function toSlug(postId: string): string {
  return `community-${postId.toLowerCase().replace(/[^a-z0-9-]+/g, "-")}`;
}

function normalizeBackstagePost(renderer: UnknownRecord): NewsItem | null {
  const postId = typeof renderer.postId === "string" ? renderer.postId : "";
  if (!postId) {
    return null;
  }

  const rawText = extractTextRuns(renderer.contentText);
  if (EXCLUDED_CONTENT_SNIPPETS.some((snippet) => rawText.includes(snippet))) {
    return null;
  }
  const contentLines = rawText
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const firstLine = contentLines[0] ?? "YouTube Community Post";
  const title = firstLine.length > 96 ? `${firstLine.slice(0, 93)}...` : firstLine;
  const summaryText = rawText.replace(/\s+/g, " ").trim();
  const summary = summaryText.length > 190 ? `${summaryText.slice(0, 187)}...` : summaryText;
  const publishedLabel = extractTextRuns(renderer.publishedTimeText);
  const publishedAt = formatDateFromLabel(publishedLabel);
  const images = extractPostImages(renderer.backstageAttachment as UnknownRecord | undefined);

  return {
    slug: toSlug(postId),
    category: "channel",
    publishedAt,
    title: toLocalizedValue(title),
    summary: toLocalizedValue(summary || title),
    content: toLocalizedContent(contentLines.length > 0 ? contentLines : [summary || title]),
    images,
    sourceUrl: `https://www.youtube.com/post/${postId}`,
  };
}

async function fetchJson(url: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export async function fetchYouTubeCommunityNews(): Promise<NewsItem[]> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.items;
  }

  const htmlResponse = await fetch(CHANNEL_POSTS_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    next: { revalidate: 1800 },
  });
  if (!htmlResponse.ok) {
    return [];
  }
  const html = await htmlResponse.text();

  const initialJsonText = extractObjectAfter(html, "var ytInitialData = ");
  const contextJsonText = extractObjectAfter(html, "\"INNERTUBE_CONTEXT\":");
  const apiKeyMatch = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/);

  if (!initialJsonText || !contextJsonText || !apiKeyMatch) {
    return [];
  }

  const initialData = JSON.parse(initialJsonText) as UnknownRecord;
  const innertubeContext = JSON.parse(contextJsonText) as UnknownRecord;
  const apiKey = apiKeyMatch[1];

  const responses: UnknownRecord[] = [initialData];
  const seenTokens = new Set<string>();
  const maxRequests = 80;

  for (let index = 0; index < responses.length && index < maxRequests; index += 1) {
    const current = responses[index];
    const tokens = walkTree(current)
      .map((node) => {
        const command = node.continuationCommand as UnknownRecord | undefined;
        const token = command?.token;
        return typeof token === "string" ? token : null;
      })
      .filter((token): token is string => !!token);

    for (const token of tokens) {
      if (seenTokens.has(token)) {
        continue;
      }
      seenTokens.add(token);
      try {
        const body = JSON.stringify({
          context: innertubeContext,
          continuation: token,
        });
        const nextResponse = await fetchJson(`https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0",
          },
          body,
        });
        if (nextResponse && typeof nextResponse === "object") {
          responses.push(nextResponse as UnknownRecord);
        }
      } catch {
        continue;
      }
    }
  }

  const bySlug = new Map<string, NewsItem>();
  for (const response of responses) {
    for (const node of walkTree(response)) {
      const renderer = node.backstagePostRenderer;
      if (!renderer || typeof renderer !== "object") {
        continue;
      }
      const item = normalizeBackstagePost(renderer as UnknownRecord);
      if (!item) {
        continue;
      }
      if (!bySlug.has(item.slug)) {
        bySlug.set(item.slug, item);
      }
    }
  }

  const items = [...bySlug.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  cache = { items, expiresAt: Date.now() + CACHE_TTL_MS };
  return items;
}
