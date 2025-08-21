import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUserTicketForEvent = query({
    args: {
        eventId: v.id("events"),
        userId: v.string(),
    },
    handler: async (ctx, { eventId, userId }) => {
        const ticket = await ctx.db.query("tickets").withIndex("by_user_event", (q) => q.eq("userId", userId).eq("eventId", eventId)).first()

        return ticket;
    }
})

export const getTicketWithDetails = query({
    args: { ticketId: v.id("tickets") },
    handler: async (ctx, { ticketId }) => {
        const ticket = await ctx.db.get(ticketId);
        if (!ticket) return null;

        const event = await ctx.db.get(ticket.eventId);

        return {
            ...ticket,
            event,
        };
    },
});