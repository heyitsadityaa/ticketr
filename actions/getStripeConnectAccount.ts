"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function getStripeConnectAccount(userId: Id<"users">) {
    const user = await convex.query(api.users.getById, { userId });

    if (!user) {
        throw new Error("User not found");
    }

    if (!userId) {
        throw new Error("Not authenticated");
    }

    const stripeConnectId = await convex.query(
        api.users.getUsersStripeConnectId,
        {
            userId,
        }
    );

    return {
        stripeConnectId: stripeConnectId || null,
    };
}