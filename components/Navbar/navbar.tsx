'use client'

import { ModeToggle } from '@/components/toggle-button';
import { Spinner } from '@/components/spinner';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlignJustify, LogOut, User } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useTheme } from 'next-themes';
import Search from './search';

const Navbar = () => {
    const user = useQuery(api.users.getUser);
    const { signOut } = useAuthActions();
    const { setTheme } = useTheme()

    return (
        <div className="p-4 border-b-2 border-border z-50">
            <div className='flex justify-between items-center'>
                <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={() => redirect("/")} className="w-12 h-8 flex items-center justify-center border border-border">
                        Logo
                    </button>
                    <Search />
                </div>

                <div className="block md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size='icon'>
                                <AlignJustify />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <button onClick={() => redirect("/seller")}>Sell Tickets</button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <button onClick={() => redirect("/tickets")}>My Tickets</button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {user === undefined ? (
                                    <DropdownMenuItem>
                                        <Spinner size="sm" />
                                    </DropdownMenuItem>
                                ) : user === null ? (
                                    <DropdownMenuItem onClick={() => redirect("/auth")}>
                                        <span>Sign In</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <User />
                                            <span>{user.name}</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>
                                                    <User />
                                                    <span>Profile</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => void signOut()}>
                                                    <LogOut />
                                                    <span>Sign Out</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                )}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <span>
                                        Theme
                                    </span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem onClick={() => setTheme("light")}>
                                            Light
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                                            Dark
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme("system")}>
                                            System
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>

                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="hidden md:block">
                    <div className="flex items-center gap-4">
                        <Button onClick={() => redirect("/seller")}>Sell Tickets</Button>
                        <Button onClick={() => redirect("/tickets")}>My Tickets</Button>
                        {user === undefined ? (
                            <Spinner size="default" />
                        ) : user === null ? (
                            <Button onClick={() => redirect("/auth")}>Sign In</Button>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <Button className='rounded-full size-10' size='icon'>
                                            <AvatarImage src={user.image} alt="userImage" className='size-8 rounded-full' />
                                            <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Button>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => void signOut()}>
                                            <LogOut />
                                            <span>SignOut</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar;