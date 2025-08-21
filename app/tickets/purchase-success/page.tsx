"use client"

import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import Ticket from "@/components/ticket";
import { useQuery } from "convex/react";
import { Spinner } from "@/components/spinner";
import { useMemo } from "react";
import { Id } from "@/convex/_generated/dataModel";

function TicketSuccess() {
    // Always call useQuery for user
    const user = useQuery(api.users.getUser);

    // Create a safe userId that's never undefined
    const userId = useMemo(() => user?._id, [user]);

    // Always call useQuery - use empty string as fallback
    // This ensures the hook is always called
    const tickets = useQuery(api.events.getUserTickets, {
        userId: userId as Id<"users"> || "" as Id<"users">
    });

    // Handle loading state
    if (user === undefined || tickets === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    // Handle no user state
    if (!user) {
        redirect("/auth/signin");
        return null;
    }

    // Handle no tickets state
    if (!tickets || tickets.length === 0) {
        redirect("/");
        return null;
    }

    const latestTicket = tickets[tickets.length - 1];

    return (
        <div className="min-h-content py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground/90">
                        Ticket Purchase Successful!
                    </h1>
                    <p className="mt-2 text-foreground/60">
                        Your ticket has been confirmed and is ready to use
                    </p>
                </div>

                <Ticket ticketId={latestTicket._id} />
            </div>
        </div>
    );
}

export default TicketSuccess;