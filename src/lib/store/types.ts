import type { getStats } from "../db";

export type Stats = ReturnType<typeof getStats>;

export type TrackInput = {
  visitorId: string;
  sessionId: string;
  path: string;
  referrer?: string | null;
  ua?: string | null;
  device?: string | null;
  country?: string | null;
  screenW?: number | null;
  kind: "pageview" | "heartbeat";
};

export type SubmissionInput = {
  type?: string | null;
  idea?: string | null;
  name: string;
  company?: string | null;
  email: string;
  budget?: string | null;
  country?: string | null;
  source?: string | null;
};

export type Submission = {
  id: number;
  ts: number;
  type: string | null;
  idea: string | null;
  name: string;
  company: string | null;
  email: string;
  budget: string | null;
  status: string;
  country: string | null;
  source?: string | null;
};

export const SUBMISSION_STATUSES = ["new", "contacted", "in_progress", "won", "archived"] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

/**
 * The single seam between the app and its database.
 * Implemented by ./sqlite.ts (default) and ./supabase.ts (when configured).
 */
export interface Store {
  track(input: TrackInput): Promise<void>;
  addSubmission(input: SubmissionInput): Promise<number>;
  listSubmissions(status?: string): Promise<Submission[]>;
  updateSubmissionStatus(id: number, status: SubmissionStatus): Promise<void>;
  deleteSubmission(id: number): Promise<void>;
  getStats(days: number): Promise<Stats>;
}
