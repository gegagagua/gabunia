import { getPollSnapshot, submitPollVote } from "@/lib/poll";

export async function GET(request: Request) {
  const data = getPollSnapshot(request.headers);
  return Response.json(data);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { optionId?: string };
    const result = submitPollVote(body.optionId ?? "", request.headers);
    const data = getPollSnapshot(request.headers);

    if (!result.ok) {
      return Response.json({ error: result.error, ...data }, { status: result.status });
    }

    return Response.json(data, { status: 201 });
  } catch {
    const data = getPollSnapshot(request.headers);
    return Response.json({ error: "INVALID_REQUEST", ...data }, { status: 400 });
  }
}
