"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SearchIcon } from 'lucide-react';

export default function Search() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <form onSubmit={handleSearch}>
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className='lg:w-[400px] md:w-[200px] w-[150px]'
                    placeholder="Search for events..." />
            </form>
            <Button type='submit' onClick={handleSearch} size='sm' variant="default">
                <span className="hidden md:block">Search</span>
                <SearchIcon className='block md:hidden' />
            </Button>
        </div>
    )
}
