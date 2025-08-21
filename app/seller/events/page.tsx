"use client"

import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SellerEventList from "@/components/seller-event-list";
import { Button } from "@/components/ui/button";

export default function SellerEventsPage() {
    const user = useQuery(api.users.getUser);
    const userId = user?._id;
    if (!userId) redirect("/");

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="rounded-xl shadow-sm dark:shadow-foreground/10 border border-foreground/20 p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/seller"
                                className="text-foreground/50 hover:foreground/70 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground/90">My Events</h1>
                                <p className="mt-1 text-foreground/50">
                                    Manage your event listings and track sales
                                </p>
                            </div>
                        </div>
                        <Button variant="noShadow">
                            <Link
                                href="/seller/new-event"
                                className="flex items-center justify-center gap-2px-4 py-2 rounded-lg transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Create Event
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Event List */}
                <div className="rounded-xl shadow-md dark:shadow-foreground/10 border border-foreground/20 p-6">
                    <SellerEventList />
                </div>
            </div>
        </div>
    );
}