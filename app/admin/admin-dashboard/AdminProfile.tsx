'use client'

import { useSession } from "next-auth/react";

export const AdminUser = () => {
    const {data:session} = useSession()
    console.log('Client Session', session)
    return (
        <pre>{JSON.stringify(session)}</pre>
    )
}