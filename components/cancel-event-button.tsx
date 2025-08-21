"use client";

import { useState } from "react";
import { Ban } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { refundEventTickets } from "@/actions/refundEventTickets";
import { Button } from "./ui/button";

export default function CancelEventButton({
    eventId,
}: {
    eventId: Id<"events">;
}) {
    const [isCancelling, setIsCancelling] = useState(false);
    const router = useRouter();
    const cancelEvent = useMutation(api.events.cancelEvent);

    const handleCancel = async () => {
        if (
            !confirm(
                "Are you sure you want to cancel this event? All tickets will be refunded and the event will be cancelled permanently."
            )
        ) {
            return;
        }

        setIsCancelling(true);
        try {
            await refundEventTickets(eventId);
            await cancelEvent({ eventId });
            toast("Event cancelled", {
                description: "All tickets have been refunded successfully.",
            });
            router.push("/seller/events");
        } catch (error) {
            console.error("Failed to cancel event:", error);
            toast.error("Error", {
                description: "Failed to cancel event. Please try again.",
            });
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <Button
            onClick={handleCancel}
            disabled={isCancelling}
            variant={"noShadow"}
            className="flex bg-red-100 hover:bg-red-200 items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
        >
            <Ban className="w-4 h-4" />
            <span>{isCancelling ? "Processing..." : "Cancel Event"}</span>
        </Button>
    );
}