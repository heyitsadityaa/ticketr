'use client'

import SignInWithGitHub from '@/components/signIn-with-github'
import SignInWithGoogle from '@/components/signIn-with-google'
import SignOutButton from '@/components/signout'
import { Spinner } from '@/components/spinner'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import React from 'react'

const Auth = () => {
    return (
        <div className='flex items-center justify-center min-h-content'>
            <Unauthenticated>
                <div className='flex gap-2 flex-col items-center justify-center'>
                    <SignInWithGoogle />
                    <SignInWithGitHub />
                </div>
            </Unauthenticated>

            <AuthLoading>
                <Spinner size='lg' className='flex items-center justify-center' />
            </AuthLoading>

        </div>
    )
}

export default Auth;
