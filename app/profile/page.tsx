"use client"

import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Image from "next/image";

const ProfilePage = () => {
    const user = useQuery(api.users.getUser);

    if (user === undefined) {
        return (
            <div className="min-h-content flex items-center justify-center">
                <Spinner size='lg' />
            </div>
        )
    }

    return (
        <div className="min-h-content flex flex-col md:flex-row items-center justify-center gap-20 p-4">
            <div className="flex-shrink-0">
                {user?.image && <Image src={user?.image} width={350} height={350} alt="UserImage" className="rounded-full border-4 border-main w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover" />}
            </div>

            <div className="text-center md:text-left">
                <div className="mb-4">
                    <label className="text-md font-medium text-foreground/70">Name:</label>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{user?.name}</h2>
                </div>
                <div>
                    <label className="text-md font-medium text-foreground/70">Email:</label>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold break-all">{user?.email}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
