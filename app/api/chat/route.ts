export async function POST(req: Request) {
  const { messages, system } = await req.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) return Response.json({ content: "API key is not configured." }, { status: 500 });

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system,
      messages,
    }),
  });

  const data = await res.json();
  const content = data?.content?.[0]?.text ?? "პასუხი ვერ მოვიდა.";
  return Response.json({ content });
}
