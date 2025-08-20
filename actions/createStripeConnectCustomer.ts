"use server"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { stripe } from "@/lib/stripe"
import { ConvexHttpClient } from "convex/browser"
import { fetchQuery } from "convex/nextjs";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set")
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function createStripeConnectCustomer(userId: Id<"users">) {
    const user = await convex.query(api.users.getById, { userId });

    if (!user) {
        throw new Error("User not found");
    }

    // Check if user already has a connect account
    const existingStripeConnectId = await convex.query(
        api.users.getUsersStripeConnectId, {
        userId: user._id
    }
    )

    if (existingStripeConnectId) {
        return { account: existingStripeConnectId };
    }

    //  Create new connect account
    const account = await stripe.accounts.create({
        type: "express",
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        }
    });

    //  Update user with stripe connect id
    await convex.mutation(api.users.updateOrCreateUserStripeConnectId, {
        userId: user._id,
        stripeConnectId: account.id,
    });

    return { account: account.id }
}