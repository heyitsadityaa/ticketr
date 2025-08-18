'use client'

import { useAuthActions } from '@convex-dev/auth/react';
import React from 'react'
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

const SignOutButton = () => {
    const { signOut } = useAuthActions();
    return (
        <Button variant='neutral' onClick={() => void signOut()}>
            <LogOut />
            <span>
                SignOut
            </span>
        </Button>
    )
}

export default SignOutButton
