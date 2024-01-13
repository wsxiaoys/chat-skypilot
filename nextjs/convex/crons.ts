import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
    "update title description embeddings",
    { seconds: 15 }, // every minute
    internal.posts.computeTitleDescriptionEmbeddingForTenItems
);

export default crons;