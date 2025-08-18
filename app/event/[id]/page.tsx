"use client"

import EventCard from "@/components/event-card";
import JoinQueue from "@/components/join-queue";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { useStorageUrl } from "@/lib/utils";
import { useQuery } from "convex/react"
import { CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";

const EventPage = () => {
    const params = useParams();
    const user = useQuery(api.users.getUser);
    const event = useQuery(api.events.getById, {
        eventId: params.id as Id<"events">
    });
    const availability = useQuery(api.events.getEventAvailability, {
        eventId: params.id as Id<"events">,
    });
    const imageUrl = useStorageUrl(event?.imageStorageId);

    if (!event || !availability) {
        return (
            <div className="min-h-content flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }


    return (
        <div className="min-h-content">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="rounded-xl border-2 border-border overflow-hidden">
                    {imageUrl && (
                        <div className="aspect-[21/9] relative w-full">
                            <Image
                                src={imageUrl}
                                alt={event.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left Column - Event Details */}
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-4xl font-bold text-foreground/90 mb-4">
                                        {event.name}
                                    </h1>
                                    <p className="text-lg text-foreground/60">{event.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 rounded-lg border border-border">
                                        <div className="flex items-center text-foreground/60 mb-1">
                                            <CalendarDays className="w-5 h-5 mr-2 text-lime-600" />
                                            <span className="text-sm font-medium">Date</span>
                                        </div>
                                        <p className="text-foreground/90">
                                            {new Date(event.eventDate).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg border border-border">
                                        <div className="flex items-center text-foreground/60 mb-1">
                                            <MapPin className="w-5 h-5 mr-2 text-lime-600" />
                                            <span className="text-sm font-medium">Location</span>
                                        </div>
                                        <p className="text-foreground/90">{event.location}</p>
                                    </div>

                                    <div className="p-4 rounded-lg border border-border">
                                        <div className="flex items-center text-foreground/60 mb-1">
                                            <Ticket className="w-5 h-5 mr-2 text-lime-600" />
                                            <span className="text-sm font-medium">Price</span>
                                        </div>
                                        <p className="text-foreground/90">${event.price.toFixed(2)}</p>
                                    </div>

                                    <div className="p-4 rounded-lg border border-border">
                                        <div className="flex items-center text-foreground/60 mb-1">
                                            <Users className="w-5 h-5 mr-2 text-lime-600" />
                                            <span className="text-sm font-medium">Availability</span>
                                        </div>
                                        <p className="text-foreground/90">
                                            {availability.totalTickets - availability.purchasedCount}{" "}
                                            / {availability.totalTickets} left
                                        </p>
                                    </div>
                                </div>

                                {/* Additional Event Information */}
                                <div className="border border-border rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-main mb-2">
                                        Event Information
                                    </h3>
                                    <ul className="space-y-2 text-main/90 dark:text-main/70 ">
                                        <li>• Please arrive 30 minutes before the event starts</li>
                                        <li>• Tickets are non-refundable</li>
                                        <li>• Age restriction: 18+</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Right Column - Ticket Purchase Card */}
                            <div>
                                <div className="sticky top-8 space-y-4">
                                    <EventCard eventId={params.id as Id<"events">} />

                                    {user ? (
                                        <JoinQueue
                                            eventId={params.id as Id<"events">}
                                            userId={user._id}
                                        />
                                    ) : (
                                        <Button onClick={() => redirect("/auth")} size="lg" className="w-full bg-gradient-to-r from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
                                            Sign in to buy tickets
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPage
