import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUsersStripeConnectId = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), args.userId))
            .filter((q) => q.neq(q.field("stripeConnectId"), undefined))
            .first();
        return user?.stripeConnectId;
    },
})

export const updateOrCreateUserStripeConnectId = mutation({
    args: {
        userId: v.id("users"),
        stripeConnectId: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
            .filter((q) => q.eq(q.field("_id"), args.userId))
            .first()

        if (!user) {
            throw new Error("User not found");
        }

        await ctx.db.patch(args.userId, {
            stripeConnectId: args.stripeConnectId
        });
        return { success: true };
    }
})

export const getUser = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            return null; // No authenticated user
        }

        // Get the current logged-in user by their ID
        const user = await ctx.db.get(userId);
        return user;
    },
});

export const getById = query({
    args: { userId: v.id("users") },
    handler: async (ctx, { userId }) => {
        return await ctx.db.get(userId);
    },
})

// export const getUserByToken = query({
//     args: { tokenIdentifier: v.string() },
//     handler: async (ctx, { tokenIdentifier }) => {
//         return await ctx.db
//             .query("users")
//             .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
//             .unique();
//     },
// });