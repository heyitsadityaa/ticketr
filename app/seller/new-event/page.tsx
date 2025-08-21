export const metadata: Metadata = {
    title: "Create Event",
    description: "Create Event Page",
};

import EventForm from "@/components/event-form";
import { Metadata } from "next";

export default function NewEventPage() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="rounded-lg shadow-lg dark:shadow-foreground/10 overflow-hidden">
                <div className="bg-gradient-to-r from-lime-400 to-lime-600 dark:text-black px-6 py-8 text-foreground">
                    <h2 className="text-2xl font-bold">Create New Event</h2>
                    <p className="text-foreground/80 dark:text-black/80 mt-2">
                        List your event and start selling tickets
                    </p>
                </div>

                <div className="p-6">
                    <EventForm mode="create" />
                </div>
            </div>
        </div>
    );
}