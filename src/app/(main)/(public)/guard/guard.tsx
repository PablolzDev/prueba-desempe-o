'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

interface Iprops{
    children: React.ReactNode
}

export default function PGuard({children}: Iprops) {
    const { data, status } = useSession()
    const router = useRouter();
    console.log(data, status)

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard')
            console.log("works")
        }
    }, [status])

    if (status === 'unauthenticated') {
        return (
            <>{children}</>
        )
    }
}