import crypto from "node:crypto";

export const POLL_OPTIONS = [
  {
    id: "science",
    label: "სამეცნიერო - გეოლოგია, კლიმატი, ცოცხალი ბუნება, ისტორია, ადამიანი",
  },
  {
    id: "mystery",
    label: "მისტიკა, კრიმინალი, ექსპედიციები და ამოუხსნელი მოვლენები",
  },
  {
    id: "interviews",
    label: "ინტერვიუები საინტერესო ადამიანებთან (კომენტარში დაწერეთ თემები)",
  },
  {
    id: "travel",
    label: "სამოგზაურო ბლოგები, ქვეყნების და ქალაქების უცნობი ფაქტები",
  },
] as const;

export type PollOptionId = (typeof POLL_OPTIONS)[number]["id"];

type PollStore = {
  votes: Record<PollOptionId, number>;
  voters: Record<string, PollOptionId>;
  totalVotes: number;
};

function getInitialVotes(): Record<PollOptionId, number> {
  return POLL_OPTIONS.reduce((acc, option) => {
    acc[option.id] = 0;
    return acc;
  }, {} as Record<PollOptionId, number>);
}

function getStore(): PollStore {
  const globalState = globalThis as typeof globalThis & {
    __gabuniaPollStore?: PollStore;
  };
  if (!globalState.__gabuniaPollStore) {
    globalState.__gabuniaPollStore = {
      votes: getInitialVotes(),
      voters: {},
      totalVotes: 0,
    };
  }
  return globalState.__gabuniaPollStore;
}

function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return headers.get("x-real-ip") || headers.get("cf-connecting-ip") || "unknown";
}

export function getVoterKey(headers: Headers): string {
  const ip = getClientIp(headers);
  const userAgent = headers.get("user-agent") || "unknown";
  return crypto.createHash("sha256").update(`${ip}:${userAgent}`).digest("hex");
}

function isPollOptionId(value: string): value is PollOptionId {
  return POLL_OPTIONS.some((option) => option.id === value);
}

export function getPollSnapshot(headers: Headers) {
  const store = getStore();
  const voterKey = getVoterKey(headers);
  const votedOptionId = store.voters[voterKey] ?? null;
  const options = POLL_OPTIONS.map((option) => {
    const votes = store.votes[option.id];
    const percent = store.totalVotes === 0 ? 0 : Math.round((votes / store.totalVotes) * 100);
    return {
      ...option,
      votes,
      percent,
    };
  });
  return {
    totalVotes: store.totalVotes,
    hasVoted: Boolean(votedOptionId),
    votedOptionId,
    options,
  };
}

export function submitPollVote(optionId: string, headers: Headers) {
  if (!isPollOptionId(optionId)) {
    return { ok: false as const, status: 400, error: "INVALID_OPTION" };
  }

  const store = getStore();
  const voterKey = getVoterKey(headers);
  if (store.voters[voterKey]) {
    return { ok: false as const, status: 409, error: "ALREADY_VOTED" };
  }

  store.votes[optionId] += 1;
  store.voters[voterKey] = optionId;
  store.totalVotes += 1;
  return { ok: true as const };
}
