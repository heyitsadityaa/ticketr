"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useEffect } from "react";
import Ticket from "@/components/ticket";

export default function TicketPage() {
    const params = useParams();
    const user = useQuery(api.users.getUser)
    const ticket = useQuery(api.tickets.getTicketWithDetails, {
        ticketId: params.id as Id<"tickets">,
    });

    useEffect(() => {
        if (!user) {
            redirect("/");
        }

        if (!ticket || ticket.userId !== user._id) {
            redirect("/tickets");
        }

        if (!ticket.event) {
            redirect("/tickets");
        }
    }, [user, ticket]);

    if (!ticket || !ticket.event) {
        return null;
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 space-y-8">
                    {/* Navigation and Actions */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/tickets"
                            className="flex items-center text-foreground/60 hover:text-foreground/90 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to My Tickets
                        </Link>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 text-foreground/60 hover:text-foreground/90 transition-colors rounded-lg hover:bg-lime-200">
                                <Download className="w-4 h-4" />
                                <span className="text-sm">Save</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-foreground/60 hover:text-foreground/90 transition-colors rounded-lg hover:bg-lime-200">
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm">Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Event Info Summary */}
                    <div
                        className={`bg-background p-6 rounded-lg shadow-sm dark:shadow-foreground/10 border ${ticket.event.is_cancelled ? "border-red-500" : "border-foreground/10"}`}
                    >
                        <h1 className="text-2xl font-bold text-foreground/90">
                            {ticket.event.name}
                        </h1>
                        <p className="mt-1 text-foreground/60">
                            {new Date(ticket.event.eventDate).toLocaleDateString()} at{" "}
                            {ticket.event.location}
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${ticket.event.is_cancelled
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-200 text-green-700"
                                    }`}
                            >
                                {ticket.event.is_cancelled ? "Cancelled" : "Valid Ticket"}
                            </span>
                            <span className="text-sm text-foreground/50">
                                Purchased on {new Date(ticket.purchasedAt).toLocaleDateString()}
                            </span>
                        </div>
                        {ticket.event.is_cancelled && (
                            <p className="mt-4 text-sm text-red-600">
                                This event has been cancelled. A refund will be processed if it
                                hasn&apos;t been already.
                            </p>
                        )}
                    </div>
                </div>

                {/* Ticket Component */}
                <Ticket ticketId={ticket._id} />

                {/* Additional Information */}
                <div
                    className={`mt-8 rounded-lg p-4 ${ticket.event.is_cancelled
                        ? "bg-red-100 border-red-100 border"
                        : "border-foreground/10 border"
                        }`}
                >
                    <h3
                        className={`text-sm font-medium ${ticket.event.is_cancelled ? "text-red-900" : "text-lime-700"
                            }`}
                    >
                        Need Help?
                    </h3>
                    <p
                        className={`mt-1 text-sm ${ticket.event.is_cancelled ? "text-red-700" : "text-lime-600"
                            }`}
                    >
                        {ticket.event.is_cancelled
                            ? "For questions about refunds or cancellations, please contact our support team at team@ticketer.com"
                            : "If you have any issues with your ticket, please contact our support team at team@ticketer.com"}
                    </p>
                </div>
            </div>
        </div>
    );
}