"use client"

import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React, { Suspense } from 'react'
import { Spinner } from './spinner'
import { CalendarDays, Ticket } from 'lucide-react'
import EventCard from './event-card'

const EventList = () => {
    const events = useQuery(api.events.get)

    if (events === undefined) {
        return (
            <div className="flex justify-center items-center min-h-content">
                <Spinner size="lg" />
            </div>
        )
    }

    const upcomingEvents = events
        .filter((event) => event.eventDate > Date.now())
        .sort((a, b) => a.eventDate - b.eventDate)

    const pastEvents = events
        .filter((event) => event.eventDate <= Date.now())
        .sort((a, b) => b.eventDate - a.eventDate)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
                <div>
                    <h1 className='text-3xl font-bold text-foreground'>Upcoming Events</h1>
                    <p className="mt-2 text-foreground/60">Discover & book tickets for amazing events</p>
                </div>
                <div className="px-4 py-2 rounded-lg border shadow-sm dark:shadow-foreground/20 border-foreground/10">
                    <div className="flex items-center gap-2 text-foreground/60">
                        <CalendarDays className="w-5 h-5" />
                        <span className="font-medium sm:hidden">{upcomingEvents.length}</span>
                        <span className="font-medium hidden sm:inline">{upcomingEvents.length} Upcoming Events</span>
                    </div>
                </div>
            </div>

            {/* Upcoming Events Grid */}
            {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {upcomingEvents.map((event) => (
                        <EventCard key={event._id} eventId={event._id} />
                    ))}
                </div>
            ) : (
                <div className="bg-foreground/50 rounded-lg p-12 text-center mb-12">
                    <Ticket className='w-12 h-12 text-foreground/40 mx-auto mb-4' />
                    <h3 className="text-lg font-medium text-foreground/90">No Upcoming events</h3>
                    <p className="text-foreground/60 mt-1">Check back later for new events</p>
                </div>
            )}

            {/* Past Events Section */}
            {pastEvents.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold text-foreground/90 mb-6">Past Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pastEvents.map((event) => (
                            <EventCard key={event._id} eventId={event._id} />
                        ))}
                    </div>
                </>
            )}

        </div>

    )
}

export default EventList
