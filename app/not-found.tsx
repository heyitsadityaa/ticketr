"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import React from 'react'

const NotFound = () => {
    return (
        <div className="min-h-content flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-foreground/90 mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-foreground/70 mb-4">
                    Page Not Found
                </h2>
                <p className="text-foreground/60 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist.
                </p>
                <Button asChild>
                    <Link href="/" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Go Home
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default NotFound
