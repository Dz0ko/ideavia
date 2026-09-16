import * as db from "../db";
import type { Store, Submission } from "./types";

/** Local SQLite store (file at ./data/idevia.db). Default for development and single-server hosting. */
export const sqliteStore: Store = {
  async track(input) {
    db.track(input);
  },
  async addSubmission(input) {
    return db.addSubmission(input);
  },
  async listSubmissions(status) {
    return db.listSubmissions(status) as Submission[];
  },
  async updateSubmissionStatus(id, status) {
    db.updateSubmissionStatus(id, status);
  },
  async deleteSubmission(id) {
    db.deleteSubmission(id);
  },
  async getStats(days) {
    return db.getStats(days);
  },
};
