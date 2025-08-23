"use client"

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useStorageUrl } from '@/lib/utils'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Badge } from './ui/badge'
import { CalendarDays, Check, CircleArrowRight, LoaderCircle, MapPin, PencilIcon, StarIcon, Ticket, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import PurchaseTicket from './purchase-ticket'

const EventCard = ({ eventId }: { eventId: Id<"events"> }) => {
    const router = useRouter();
    const user = useQuery(api.users.getUser);
    const event = useQuery(api.events.getById, { eventId });
    const availability = useQuery(api.events.getEventAvailability, { eventId });
    const userTicket = useQuery(api.tickets.getUserTicketForEvent, { eventId, userId: user?._id ?? "" });
    const imageUrl = useStorageUrl(event?.imageStorageId)
    const queuePosition = useQuery(api.waitingList.getQueuePosition, {
        eventId,
        userId: user?._id ?? ""
    })

    if (!event || !availability) {
        return null
    }

    const isPastEvent = event.eventDate < Date.now();
    const isEventOwner = user?._id === event?.userId;

    const renderQueuePosition = () => {
        if (!queuePosition || queuePosition.status !== "waiting") return null;

        if (availability.purchasedCount >= availability.totalTickets) {
            return (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                        <Ticket className="w-5 h-5 text-foreground/40 mr-2" />
                        <span className="text-foreground/60">Event is sold out</span>
                    </div>
                </div>
            );
        }

        if (queuePosition.position === 2) {
            return (
                <div className="flex flex-col lg:flex-row items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex items-center">
                        <CircleArrowRight className="w-5 h-5 text-amber-500 mr-2" />
                        <span className="text-amber-700 font-medium">
                            You&apos;re next in line! (Queue position:{" "}
                            {queuePosition.position})
                        </span>
                    </div>
                    <div className="flex items-center">
                        <LoaderCircle className="w-4 h-4 mr-1 animate-spin text-amber-500" />
                        <span className="text-amber-600 text-sm">Waiting for ticket</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center">
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin text-blue-500" />
                    <span className="text-blue-700">Queue position</span>
                </div>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                    #{queuePosition.position}
                </span>
            </div>
        )
    };

    const renderTicketStatus = () => {
        if (!user) return null;

        if (isEventOwner) {
            return (
                <div className="mt-4">
                    <Button
                        variant="noShadow"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/seller/events/${eventId}/edit`);
                        }}
                        className="w-full text-foreground/70 border-2 border-border dark:text-foreground/90 px-6 py-2 rounded-lg font-medium hover:bg-lime-600 cursor-pointer transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <PencilIcon className="w-5 h-5 dark:text-foreground/70 text-foreground/70" />
                        Edit Event
                    </Button>
                </div>
            )
        }

        if (userTicket) {
            return (
                <div className="mt-4 flex items-center justify-between p-3 rounded-lg border-2 border-lime-500">
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-700 font-medium">
                            You have a ticket!
                        </span>
                    </div>
                    <button
                        onClick={() => router.push(`/tickets`)}
                        className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full font-medium shadow-sm transition-colors duration-200 flex items-center gap-1"
                    >
                        View your ticket
                    </button>
                </div>
            );
        }

        if (queuePosition) {
            return (
                <div className="mt-4">
                    {queuePosition.status === "offered" && (
                        <PurchaseTicket eventId={eventId} />
                    )}
                    {renderQueuePosition()}
                    {queuePosition.status === "expired" && (
                        <div className="p-3 bg-red-200 rounded-lg border border-red-300">
                            <span className="text-red-700 font-medium flex items-center">
                                <XCircle className="w-5 h-5 mr-2" />
                                Offer expired
                            </span>
                        </div>
                    )}
                </div>
            );
        }

        return null;
    }

    return (
        <Card onClick={() => router.push(`/event/${eventId}`)} className={`rounded-lg pt-0 cursor-pointer overflow-hidden hover:scale-[1.03] transition duration-200 relative ${isPastEvent ? "opacity-75 hover:opacity-100" : ""}`}>

            {/* Event Image */}
            <CardHeader className='pt-0 px-0'>
                {imageUrl && (
                    <div className="relative w-full h-48">
                        <Image
                            src={imageUrl}
                            alt={event.name}
                            fill
                            className='object-cover'
                            priority
                        />
                    </div>
                )}
            </CardHeader>

            {/* Event Details */}
            <CardContent>
                <div className={`${imageUrl ? "relative" : ""}`}>
                    <div className="flex items-start justify-between">
                        {/* Event Name and Owner badge */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground/90">{event.name}</h2>
                            <div className="flex flex-row gap-2 mt-2">
                                {isEventOwner && (
                                    <Badge>
                                        <StarIcon />
                                        Your Event
                                    </Badge>
                                )}
                                {isPastEvent && (
                                    <Badge>
                                        Past Event
                                    </Badge>
                                )}
                            </div>

                        </div>
                        {/* Price Tag */}
                        <div className="flex flex-col items-end gap-2 ml-4">
                            <span
                                className={`px-4 py-1.5 font-semibold rounded-full ${isPastEvent
                                    ? "bg-foreground/5 text-foreground/50"
                                    : "bg-green-200 dark:bg-green-900 text-green-700 dark:text-green-300"
                                    }`}
                            >
                                ${event.price.toFixed(2)}
                            </span>
                            {availability.purchasedCount >= availability.totalTickets && (
                                <span className="px-4 py-1.5 bg-red-50 text-red-700 font-semibold rounded-full text-sm">
                                    Sold Out
                                </span>
                            )}
                        </div>
                    </div>

                </div>

                <div className="mt-4 space-y-3">
                    <div className="flex items-center text-foreground/60">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                    </div>

                    <div className="flex items-center text-foreground/60">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        <span>
                            {new Date(event.eventDate).toLocaleDateString()}{" "}
                            {isPastEvent && "(Ended)"}
                        </span>
                    </div>

                    <div className="flex items-center text-foreground/60">
                        <Ticket className="w-4 h-4 mr-2" />
                        <span>
                            {availability.totalTickets - availability.purchasedCount} /{" "}
                            {availability.totalTickets} available
                            {!isPastEvent && availability.activeOffers > 0 && (
                                <span className="text-amber-600 text-sm ml-2">
                                    ({availability.activeOffers}{" "}
                                    {availability.activeOffers === 1 ? "person" : "people"} trying
                                    to buy)
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                <p className="mt-4 text-foreground/60 text-sm line-clamp-2">
                    {event.description}
                </p>

                <div onClick={(e) => e.stopPropagation()}>
                    {!isPastEvent && renderTicketStatus()}
                </div>
            </CardContent>

        </Card>
    )
}

export default EventCard
