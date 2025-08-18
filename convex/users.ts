import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

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