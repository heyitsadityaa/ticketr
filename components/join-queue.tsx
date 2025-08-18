"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Clock, OctagonXIcon } from "lucide-react";
import { ConvexError } from "convex/values";
import { toast } from "sonner"
import { Spinner } from "./spinner";
import { WAITING_LIST_STATUS } from "@/convex/constant";
import { Button } from "./ui/button";

const JoinQueue = ({ eventId, userId }: { eventId: Id<"events">, userId: string }) => {
    const joinWaitingList = useMutation(api.events.joinWaitingList);
    const queuePosition = useQuery(api.waitingList.getQueuePosition, {
        eventId,
        userId,
    });
    const userTicket = useQuery(api.tickets.getUserTicketForEvent, {
        eventId,
        userId,
    });
    const availability = useQuery(api.events.getEventAvailability, { eventId });
    const event = useQuery(api.events.getById, { eventId });

    const handleJoinQueue = async () => {
        try {
            const result = await joinWaitingList({ eventId, userId });
            if (result.success) {
                console.log("Successfully joined waiting list");
                toast.success(result.message, {
                    duration: 5000,
                })
            }
        } catch (error) {
            if (
                error instanceof ConvexError &&
                error.message.includes("joined the waiting list too many times")
            ) {
                toast.warning("Slow down there!", {
                    description: error.data,
                    duration: 5000,
                })
            } else {
                console.error("Error joining waiting list:", error);
                toast.warning("Uh oh! Something went wrong.", {
                    description: "Failed to join queue. Please try again later."
                })
            }
        };
    }

    const isEventOwner = userId === event?.userId;
    const isPastEvent = event?.eventDate as number < Date.now()

    if (queuePosition === undefined || availability === undefined || !event) {
        return (
            <div className="min-h-content">
                <Spinner size='sm' />
            </div>
        )
    }

    if (userTicket) {
        return null;
    }

    return (
        <div>
            {(!queuePosition ||
                queuePosition.status === WAITING_LIST_STATUS.EXPIRED ||
                (queuePosition.status === WAITING_LIST_STATUS.OFFERED &&
                    queuePosition.offerExpiresAt &&
                    queuePosition.offerExpiresAt <= Date.now())) && (
                    <>
                        {isEventOwner ? (
                            <div className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-muted text-muted-foreground rounded-lg">
                                <OctagonXIcon className="w-5 h-5" />
                                <span>You cannot buy a ticket for your own event</span>
                            </div>
                        ) : isPastEvent ? (
                            <div className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-muted text-muted-foreground rounded-lg cursor-not-allowed">
                                <Clock className="w-5 h-5" />
                                <span>Event has ended</span>
                            </div>
                        ) : availability.purchasedCount >= availability?.totalTickets ? (
                            <div className="text-center p-4">
                                <p className="text-lg font-semibold text-destructive">
                                    Sorry, this event is sold out
                                </p>
                            </div>
                        ) : (
                            <Button
                                size="lg"
                                onClick={handleJoinQueue}
                                disabled={isPastEvent || isEventOwner}
                                className="w-full px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Buy Ticket
                            </Button>
                        )}
                    </>
                )}
        </div>
    )


}
export default JoinQueue