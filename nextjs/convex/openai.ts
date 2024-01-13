import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from 'openai';
import { api } from "./_generated/api";

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


export const computePostTitleDescriptionEmbeding = internalAction({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.runQuery(api.posts.getPost, { postId: args.postId });
    if (!post) {
      return;
    }

    const resp = await openai.embeddings.create({
      input: `${post.title}\n\n${post.description}`,
      model: "text-embedding-ada-002"
    });

    const embedding = resp.data[0].embedding;
    await ctx.runMutation(api.posts.setPostTitleDescriptionEmbedding, {
      postId: args.postId,
      embedding,
    })
  },
});