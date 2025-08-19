"use client"

import { createStripeConnectCustomer } from '@/actions/createStripeConnectCustomer';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React, { useEffect } from 'react'
import { fetchMutation, fetchQuery } from "convex/nextjs";

const SellerDashboard = () => {
    const [result, setResult] = React.useState<any>(null);
    const user = useQuery(api.users.getUser);

    useEffect(() => {
        if (user?._id) {
            createStripeConnectCustomer(user._id);
        }
    }, [user?._id]);


    return (
        <div>
            Welcome {user?._id}
        </div>
    )
}

export default SellerDashboard;