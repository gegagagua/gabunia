import { ORDERED_NEWS } from "@/lib/news";
import { fetchYouTubeCommunityNews } from "@/lib/youtube-community";

export async function GET() {
  try {
    const community = await fetchYouTubeCommunityNews();
    const items = [...community, ...ORDERED_NEWS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    return Response.json({ items });
  } catch {
    return Response.json({ items: ORDERED_NEWS });
  }
}
