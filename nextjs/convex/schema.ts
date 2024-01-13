import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    answer: v.string(),
    description: v.string(),
    title: v.string(),
    title_description_embedding: v.optional(v.array(v.float64())),
  }).vectorIndex("by_title_description_embedding", {
    vectorField: "title_description_embedding",
    dimensions: 1536,
  }).searchIndex("search_title", {
    searchField: "title",
  }).searchIndex("search_description", {
    searchField: "description",
  }).searchIndex("search_answer", {
    searchField: "answer",
  })
});
