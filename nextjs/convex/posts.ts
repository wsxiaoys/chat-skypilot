import { api, internal } from "./_generated/api";
import { internalAction, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getPost = query({
    args: { postId: v.id("posts") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.postId);
    },
});

export const getPostWithoutTitleDescriptionEmbedding = query({
    args: { count: v.number() },
    handler: async (ctx, args) => {
        return await ctx.db.query("posts").filter(q => q.eq(q.field("title_description_embedding"), undefined)).take(args.count);
    },
})

export const setPostTitleDescriptionEmbedding = mutation({
    args: { postId: v.id("posts"), embedding: v.array(v.float64()) },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.postId, {
            title_description_embedding: args.embedding,
        })
    },
})

export const computeTitleDescriptionEmbeddingForTenItems = internalAction({
  args: {},
  handler: async (ctx, args) => {
    const posts = await ctx.runQuery(api.posts.getPostWithoutTitleDescriptionEmbedding, { count: 10 });
    const actions = posts.map(post => ctx.runAction(internal.openai.computePostTitleDescriptionEmbeding, { postId: post._id }))
    await Promise.all(actions);
  }
})