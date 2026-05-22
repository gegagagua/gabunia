import videos from "@/data/videos.json";

export type VideoTag = "science" | "nature" | "history" | "geography";

export type VideoItem = {
  id: string;
  title: string;
  author: string;
  url: string;
  thumbnail: string;
  position: number;
  tags: VideoTag[];
};

const RULES: { tag: VideoTag; words: string[] }[] = [
  { tag: "science", words: ["მეცნიერ", "science", "physics", "biology", "ქიმ", "астро", "наук"] },
  { tag: "nature", words: ["დინოზავ", "t-rex", "tyranno", "ვულკან", "ცხოველ", "ბუნებ", "volcano", "жив"] },
  { tag: "history", words: ["ისტორი", "საბჭოთა", "war", "ომ", "არქეო", "ancient", "history", "тайн", "совет"] },
  { tag: "geography", words: ["საქართველო", "ქალაქ", "კუნძულ", "country", "world", "geo", "ზღვა", "океан", "географ"] },
];

function detectTags(title: string): VideoTag[] {
  const text = title.toLowerCase();
  const tags = RULES.filter((rule) => rule.words.some((word) => text.includes(word))).map((rule) => rule.tag);
  if (tags.length > 0) {
    return tags;
  }
  return ["science"];
}

export const ALL_VIDEOS: VideoItem[] = videos.map((video) => ({
  ...video,
  tags: detectTags(video.title),
}));

export const LATEST_VIDEOS: VideoItem[] = ALL_VIDEOS.slice(0, 4);
