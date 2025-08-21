import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,

    users: defineTable({
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        email: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),
        stripeConnectId: v.optional(v.string()),
        // tokenIdentifier: v.string(),
    })
        .index("email", ["email"])
        .index("phone", ["phone"]),
    // .index("by_token", ["tokenIdentifier"]),

    events: defineTable({
        name: v.string(),
        description: v.string(),
        location: v.string(),
        eventDate: v.number(),
        price: v.number(),
        totalTickets: v.number(),
        userId: v.string(),
        imageStorageId: v.optional(v.id("_storage")),
        is_cancelled: v.optional(v.boolean())
    }),

    tickets: defineTable({
        eventId: v.id("events"),
        userId: v.string(),
        purchasedAt: v.number(),
        status: v.union(
            v.literal("valid"),
            v.literal("used"),
            v.literal("refunded"),
            v.literal("cancelled")
        ),
        paymentIntentId: v.optional(v.string()),
        amount: v.optional(v.number())
    })

        .index("by_event", ["eventId"])
        .index("by_user", ["userId"])
        .index("by_user_event", ["userId", "eventId"])
        .index("by_payment_intent", ["paymentIntentId"]),

    waitingList: defineTable({
        eventId: v.id("events"),
        userId: v.string(),
        status: v.union(
            v.literal("waiting"),
            v.literal("offered"),
            v.literal("purchased"),
            v.literal("expired"),
        ),
        offerExpiresAt: v.optional(v.number())
    })
        .index("by_event_status", ["eventId", "status"])
        .index("by_user_event", ["userId", "eventId"])
        .index("by_user", ["userId"]),

});

export default schema;